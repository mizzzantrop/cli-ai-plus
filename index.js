#!/usr/bin/env node

const { program } = require("commander");
const { OpenAI } = require("openai");
const Anthropic = require("@anthropic-ai/sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");
const fs = require("fs");
const fsPromises = require("fs").promises;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const path = require("path");
const chalk = require("chalk");
const fetch = require("node-fetch");

const CONFIG_FILE = path.join(__dirname, "config.json");
const MODELS_FILE = path.join(__dirname, "models.json");

let config = loadConfig();
const modelsData = loadModels();

function loadConfig() {
  try {
    const data = fs.readFileSync(CONFIG_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {
      defaultModel: "gemini-2.5-pro",
      systemPrompt: "I'm a versatile AI assistant focused on providing accurate, helpful information. I can analyze code, explain concepts, solve problems, and assist with various tasks. I prioritize clarity, relevance, and ethical considerations in my responses.",
      OPENAI_API_KEY: "",
      ANTHROPIC_API_KEY: "",
      GEMINI_API_KEY: "",
      GROQ_API_KEY: "",
      OPENROUTER_API_KEY: "",
      defaultProvider: "gemini",
    };
  }
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf8");
}

function loadModels() {
  try {
    const data = fs.readFileSync(MODELS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading models.json:", error);
    return {};
  }
}

async function question(query) {
  return new Promise((resolve) => {
    readline.question(query, resolve);
  });
}

async function calculateCost(modelName, provider, inputTokens, outputTokens) {
  const modelInfo = modelsData[provider]?.[modelName];
  if (!modelInfo) {
    return 0;
  }
  const inputCost = (modelInfo.input / 1000) * inputTokens;
  const outputCost = (modelInfo.output / 1000) * outputTokens;
  return inputCost + outputCost;
}

function formatAndOutputCodeBlock(output, codeFormattingFlag) {
  const codeBlockRegex = /```([\w-]+)?\n([\s\S]*?)\n```/g;
  let match;
  let formattedOutput = output;
  while ((match = codeBlockRegex.exec(output)) !== null) {
    const lang = match[1] || "";
    const code = match[2];
    const formattedCode = chalk.yellow(code);
    formattedOutput = formattedOutput.replace(match[0], `\`\`\`${lang}\n${formattedCode}\n\`\`\``);
    codeFormattingFlag = true;
  }
  if (!codeFormattingFlag) {
    console.log(output);
  } else {
    console.log(formattedOutput);
  }
  return codeFormattingFlag;
}

program
  .version("1.0.0")
  .description("CLI AI assistant")
  .option("-m, --model <model>", "Specify the model to use")
  .option("-p, --provider <provider>", "Specify the provider (openai, anthropic, gemini, groq, openrouter)")
  .option("-s, --system-prompt <prompt>", "Specify the system prompt")
  .option("--raw", "Output raw response without code formatting")
  .command("setup")
  .description("Configure API keys and default settings")
  .action(async () => {
    console.log(chalk.bold("\nCLI AI Plus Setup\n"));

    // Configure API keys
    console.log(
      "API Key Configuration " +
        chalk.red(
          "(warning: API keys will be stored in config.json file inside project's directory):"
        )
    );
    console.log(
      chalk.gray(
        "(Press Enter to keep existing value or leave blank to remove)\n"
      )
    );

    const openaiKey = await question(
      "Enter" + chalk.hex("#74AA9C")(" OpenAI ") + "API Key: "
    );
    if (openaiKey !== "") {
      config.OPENAI_API_KEY = openaiKey;
    }

    const anthropicKey = await question(
      "Enter" + chalk.hex("#da7756")(" Anthropic ") + "API Key: "
    );
    if (anthropicKey !== "") {
      config.ANTHROPIC_API_KEY = anthropicKey;
    }

    const geminiKey = await question(
      "Enter" + chalk.hex("#4285F4")(" Gemini ") + "API Key: "
    );
    if (geminiKey !== "") {
      config.GEMINI_API_KEY = geminiKey;
    }

    const groqKey = await question(
      "Enter" + chalk.hex("#DB4437")(" Groq ") + "API Key: "
    );
    if (groqKey !== "") {
      config.GROQ_API_KEY = groqKey;
    }

    const openrouterKey = await question(
      "Enter" + chalk.hex("#FF6B6B")(" OpenRouter ") + "API Key: " 
    );
    if (openrouterKey !== "") {
      config.OPENROUTER_API_KEY = openrouterKey;
    }

    // Configure default model
    const defaultModel = await question(
      `Enter default model (leave blank for ${config.defaultModel}): `
    );
    if (defaultModel !== "") {
      config.defaultModel = defaultModel;
    }

    // Configure default provider
    const defaultProvider = await question(
      `Enter default provider (openai, anthropic, gemini, groq, openrouter, leave blank for ${config.defaultProvider}): `
    );
    if (defaultProvider !== "") {
      config.defaultProvider = defaultProvider.toLowerCase();
    }

    // Configure default system prompt
    const defaultPrompt = await question(
      `Enter default system prompt (leave blank for current prompt):\n${config.systemPrompt}\n`
    );
    if (defaultPrompt !== "") {
      config.systemPrompt = defaultPrompt;
    }

    saveConfig(config);
    readline.close();
    console.log(chalk.green("\nConfiguration saved successfully!\n"));
  });

program
  .command("list-models")
  .description("List available models and select one by number")
  .action(async () => {
    console.log(chalk.bold("\nAvailable Models:\n"));
    let modelIndex = 0;
    const modelMap = [];
    
    for (const provider in modelsData) {
      console.log(chalk.green(`\nProvider: ${provider}\n`));
      for (const model in modelsData[provider]) {
        console.log(chalk.yellow(`${modelIndex}. ${model}`));
        modelMap.push({ provider, model });
        modelIndex++;
      }
    }
    
    readline.question(
      "\nEnter the number of the model to set as default (or 'q' to quit): ",
      (answer) => {
        if (answer.toLowerCase() === 'q') {
          console.log(chalk.blue("\nExiting without changes.\n"));
          readline.close();
          return;
        }
        
        const index = parseInt(answer, 10);
        if (!isNaN(index) && index >= 0 && index < modelMap.length) {
          const { provider, model } = modelMap[index];
          config.defaultProvider = provider;
          config.defaultModel = model;
          saveConfig(config);
          console.log(
            chalk.green(
              `\nDefault model set to ${model} (${provider}) successfully!\n`
            )
          );
        } else {
          console.log(chalk.red("\nInvalid model number.\n"));
        }
        readline.close();
      }
    );
  });

program
  .command("ask <question>")
  .description("Ask a question to the AI")
  .action(async (question, options) => {
    const modelName = options.model || config.defaultModel;
    const modelProvider = options.provider || config.defaultProvider;
    const systemPrompt = options.systemPrompt || config.systemPrompt;
    const rawOutput = options.raw || false;

    if (!modelsData[modelProvider]?.[modelName] && modelProvider !== "openrouter") {
      console.error(chalk.red(`Error: Model "${modelName}" not found for provider "${modelProvider}".`));
      process.exit(1);
    }

    // check if the user has set the API keys
    if (!config.ANTHROPIC_API_KEY && modelProvider === "anthropic") {
      console.error(chalk.red("Please set ANTHROPIC_API_KEY using 'ai setup'"));
      process.exit(1);
    }
    if (!config.OPENAI_API_KEY && modelProvider === "openai") {
      console.error(chalk.red("Please set OPENAI_API_KEY using 'ai setup'"));
      process.exit(1);
    }
    if (!config.GEMINI_API_KEY && modelProvider === "gemini") {
      console.error(chalk.red("Please set GEMINI_API_KEY using 'ai setup'"));
      process.exit(1);
    }
    if (!config.GROQ_API_KEY && modelProvider === "groq") {
      console.error(chalk.red("Please set GROQ_API_KEY using 'ai setup'"));
      process.exit(1);
    }
    if (!config.OPENROUTER_API_KEY && modelProvider === "openrouter") {
      console.error(chalk.red("Please set OPENROUTER_API_KEY using 'ai setup'"));
      process.exit(1);
    }

    try {
      let outputTokens = 0;
      let codeFormattingFlag = false;
      let output = "";

      if (modelProvider === "openai") {
        const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          model: modelName,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
        });
        output = completion.choices[0].message.content;
        outputTokens = completion.usage?.completion_tokens || 0;
      } else if (modelProvider === "anthropic") {
        const anthropic = new Anthropic({ apiKey: config.ANTHROPIC_API_KEY });
        const response = await anthropic.messages.create({
          model: modelName,
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: "user", content: question }],
        });
        output = response.content[0].text;
        outputTokens = response.usage?.output_tokens || 0;
      } else if (modelProvider === "gemini") {
        const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const generationConfig = {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        };
        
        // Создаем чат с системным промптом
        const chat = model.startChat({
          generationConfig,
          systemInstruction: systemPrompt,
        });
        
        const result = await chat.sendMessage(question);
        const response = await result.response;
        output = response.text();
        outputTokens = output.split(/\s+/).length; // Approximate token count
      } else if (modelProvider === "groq") {
        const groq = new Groq({ apiKey: config.GROQ_API_KEY });
        const chatCompletion = await groq.chat.completions.create({
          model: modelName,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
        });
        output = chatCompletion.choices[0].message.content;
        outputTokens = chatCompletion.usage?.completion_tokens || output.split(/\s+/).length || 0;
      } else if (modelProvider === "openrouter") {
        // OpenRouter implementation
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://github.com/mizzzantrop/cli-ai-plus",
            "X-Title": "CLI AI Plus"
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: question },
            ],
          }),
        });
        
        const data = await response.json();
        if (data.error) {
          throw new Error(`OpenRouter API error: ${data.error.message}`);
        }
        
        output = data.choices[0].message.content;
        outputTokens = data.usage?.completion_tokens || output.split(/\s+/).length || 0;
      } else {
        console.error(
          chalk.red(`Error: Invalid provider "${modelProvider}". Supported providers are openai, anthropic, gemini, groq, openrouter.`)
        );
        process.exit(1);
      }

      if (output) {
        if (!rawOutput) {
          codeFormattingFlag = formatAndOutputCodeBlock(output, codeFormattingFlag);
        } else {
          console.log(output);
        }

        const inputTokens = Math.ceil((question.length + systemPrompt.length) / 4); // Approximate token count
        const cost = await calculateCost(
          modelName,
          modelProvider,
          inputTokens,
          outputTokens
        );

        console.log(
          chalk.gray(
            `\n\nModel used: ${modelName} (${modelProvider})\nCost: $${cost.toFixed(
              6
            )} (Input: ~${inputTokens} tokens, Output: ~${outputTokens} tokens)`
          )
        );
      }

      process.exit(0);
    } catch (error) {
      console.error(chalk.red("Error:", error.message));
      process.exit(1);
    }
  });

// Add analyze command
program
  .command("analyze <file_path>")
  .description("Analyze the code in the specified file")
  .action(async (filePath, options) => {
    const modelName = options.model || config.defaultModel;
    const modelProvider = options.provider || config.defaultProvider;
    const systemPrompt = options.systemPrompt || config.systemPrompt;
    const rawOutput = options.raw || false;

    try {
      // Read the file content
      const fileContent = await fsPromises.readFile(filePath, "utf8");
      const fileName = path.basename(filePath);
      const fileExtension = path.extname(filePath).substring(1);

      // Create a prompt for code analysis
      const analysisPrompt = `Please analyze the following ${fileExtension} code from file "${fileName}" and identify any syntax errors, logical bugs, and suggest best practices or improvements:\n\n${fileContent}`;

      // Use the ask functionality with the analysis prompt
      const askOptions = { ...options, parent: { ...options } };
      await program.commands.find(cmd => cmd.name() === "ask").action(analysisPrompt, askOptions);
    } catch (error) {
      console.error(chalk.red("Error:", error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  program.outputHelp();
}