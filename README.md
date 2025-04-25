# AI CLI

Welcome to AI CLI, an open source cli application that allows you to use an AI copilot right inside of your teminal, like you would in Cursor or Windsurf

## Installation

1. Navigate to the directory:
   ```bash
   cd cli-ai
   ```

2. Install globally:
   ```bash
   npm install -g .
   ```
   > Note: If you get a permission error, use: `sudo npm install -g .`

3. Test the installation:
   ```bash
   ai helloworld
   ```

## Usage

View all available commands:
```bash
ai --help
```

### Available Commands

- `ai ask <question>` - Ask a question to the AI
- `ai setup` - Configure API keys and preferences
- `ai helloworld` - Test the installation

## Configuration

Before using the CLI, you'll need to:
1. Get API keys from [OpenAI](https://platform.openai.com/) and/or [Anthropic](https://www.anthropic.com/)
2. Run `ai setup` to configure your keys and preferences

## Models Supported

- OpenAI
  - GPT-3.5 Turbo
- Anthropic
  - Claude 3 Haiku
  - Claude 3.5 Haiku
  - Claude 3.5 Sonnet
  - Claude 3.7 Sonnet

## License

MIT

---

Enjoy using AI CLI! 😊