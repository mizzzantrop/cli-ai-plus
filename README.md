# cli-ai-plus

Welcome to cli-ai-plus, an enhanced open-source CLI application that brings the power of AI directly to your terminal. Interact with multiple leading AI models and analyze code files with ease, similar to the experience in tools like Cursor or Windsurf.

## Installation

1.  Navigate to the project directory:

    ```bash
    cd cli-ai-plus
    ```

2.  Install globally:

    ```bash
    npm install -g .
    ```

    >   Note: If you get a permission error, use: `sudo npm install -g .`

3.  Test the installation:

    ```bash
    ai helloworld
    ```

## Usage

View all available commands:

```bash
ai --help
```

### Available Commands

-   `ai ask <question>` - Ask a question to the AI
    -   `ai --model <model> ask <question>`: Specify the model to use for the query.
    -   `ai -m <model> ask <question>`: Short version to specify the model.
    -   `ai --provider <provider> ask <question>`: Specify the AI provider (openai, anthropic, gemini, groq).
    -   `ai -p <provider> ask <question>`: Short version to specify the provider.
    -   `ai --system-prompt <prompt> ask <question>`: Specify a custom system prompt for the current query.
    -   `ai -s <prompt> ask <question>`: Short version to specify the system prompt.
    -   `ai --raw ask <question>`: Output the raw response from the AI without code formatting.
-   `ai analyze <file_path>` - Analyze the code in the specified file. The AI will attempt to identify syntax errors, logical bugs, and suggest best practices. You can also use the `--model`, `--provider`, `--system-prompt`, and `--raw` options with this command.
-   `ai setup` - Configure API keys and default settings for various AI providers (OpenAI, Anthropic, Gemini, Groq) and the default model.
-   `ai list-models` - List the available AI models supported by the CLI for each provider. You can also use this command to set a new default model interactively.
-   `ai help [command]` - Display help information for a specific command.

## Configuration

Before using the CLI, you'll need to:

Get API keys from the following providers:

-   [OpenAI](https://platform.openai.com/api-keys)
-   [Anthropic](https://console.anthropic.com/settings/keys)
-   [Google Cloud AI Platform (for Gemini)](https://console.cloud.google.com/apis/credentials)
-   [Groq](https://console.groq.com/keys)

Run `ai setup` to configure your keys and default preferences.

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
-   Gemini
    -   gemini-pro
-   Groq
    -   gemma2-9b-it
    -   llama-3.3-70b-versatile
    -   llama-3.1-8b-instant
    -   compound-beta
    -   compound-beta-mini

## License

MIT

---

Enjoy using cli-ai-plus! 😊
