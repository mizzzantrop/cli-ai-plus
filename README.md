# cli-ai-plus

Welcome to cli-ai-plus, an enhanced open-source CLI application that brings the power of AI directly to your terminal. Interact with multiple leading AI models and analyze code files with ease, similar to the experience in tools like Cursor or Windsurf.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/mizzzantrop/cli-ai-plus.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd cli-ai-plus
    ```

3.  Install dependencies and install globally:

    ```bash
    npm install && npm install -g .
    ```

    >   Note: If you get a permission error, use: `sudo npm install -g .`

4.  Configure your API keys:

    ```bash
    ai setup
    ```

    This will guide you through setting up API keys for the AI providers you want to use.

5.  Test the installation:

    ```bash
    ai ask "Hello, how can you help me today?"
    ```

## API Keys

You'll need at least one API key to use cli-ai-plus. Get API keys from any of these providers:

-   [OpenAI](https://platform.openai.com/api-keys)
-   [Anthropic](https://console.anthropic.com/settings/keys)
-   [Google Cloud AI Platform (for Gemini)](https://console.cloud.google.com/apis/credentials)
-   [Groq](https://console.groq.com/keys)
-   [OpenRouter](https://openrouter.ai/keys) (provides access to free models)

## Usage

View all available commands:

```bash
ai --help
```

### Available Commands

-   `ai setup` - Configure API keys and default settings for various AI providers (OpenAI, Anthropic, Gemini, Groq, OpenRouter) and the default model.

-   `ai ask <question>` - Ask a question to the AI
    -   `ai --model <model> ask <question>`: Specify the model to use for the query.
    -   `ai -m <model> ask <question>`: Short version to specify the model.
    -   `ai --provider <provider> ask <question>`: Specify the AI provider (openai, anthropic, gemini, groq, openrouter).
    -   `ai -p <provider> ask <question>`: Short version to specify the provider.
    -   `ai --system-prompt <prompt> ask <question>`: Specify a custom system prompt for the current query.
    -   `ai -s <prompt> ask <question>`: Short version to specify the system prompt.
    -   `ai --raw ask <question>`: Output the raw response from the AI without code formatting.

-   `ai analyze <file_path>` - Analyze the code in the specified file. The AI will attempt to identify syntax errors, logical bugs, and suggest best practices. You can also use the `--model`, `--provider`, `--system-prompt`, and `--raw` options with this command.

-   `ai list-models` - List the available AI models supported by the CLI for each provider. You can also use this command to set a new default model interactively.

-   `ai help [command]` - Display help information for a specific command.

## Quick Start Examples

After setting up your API keys, try these commands:

```bash
# Ask a question using the default model
ai ask "What are the best practices for writing clean code?"

# Analyze a code file
ai analyze path/to/your/file.js

# Use a specific model and provider
ai -p openai -m gpt-4o-2024-08-06 ask "Explain how promises work in JavaScript"

# List available models and set a new default
ai list-models
```

## Models Supported

>   Note: These are the models supported based on the `models.json` file. You can modify this file to include or exclude specific models.

-   OpenAI
    -   gpt-4.1-2025-04-14
    -   gpt-4.1-mini-2025-04-14
    -   gpt-4.1-nano-2025-04-14
    -   gpt-4o-2024-08-06
    -   gpt-4o-mini-2024-07-18
    -   o4-2025-04-16
    -   o4-mini-2025-04-16
-   Anthropic
    -   claude-3-7-sonnet-20250219
    -   claude-3-5-sonnet-20241022
    -   claude-3-haiku-20240307
    -   claude-3-opus-20250219
    -   claude-3-medium-20241022
    -   claude-3-large-20240307
-   Gemini
    -   gemini-2.5-pro
    -   gemini-2.5-flash
    -   gemini-pro
    -   gemini-pro-vision
    -   gemini-ultra
    -   gemini-ultra-vision
    -   gemini-advanced
-   Groq
    -   mixtral-8x7b-32768
    -   llama2-70b-4096
    -   llama2-7b-4096
    -   gemma2-9b-it
    -   llama-3.3-70b-versatile
    -   llama-3.1-8b-instant
    -   compound-beta
    -   compound-beta-mini
-   OpenRouter (Free Models)
    -   agentica/deepcoder-14b-preview
    -   meta/llama-4-scout
    -   olympiccoder/olympiccoder-32b
    -   dolphin/dolphin3.0-r1-mistral-24b
    -   qwen/qwen2.5-coder-32b-instruct
    -   deepseek/deepseek-r1-0528-qwen3-8b
    -   meta/llama-4-maverick
    -   thudm/glm-z1-32b

## License

MIT

Enjoy using cli-ai-plus! 😊