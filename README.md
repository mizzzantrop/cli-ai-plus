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
   - `ai --model <model> ask <question>`
   - `ai -m <model> ask <question>`
- `ai setup` - Configure API keys and preferences
- `ai helloworld` - Test the installation

## Configuration

Before using the CLI, you'll need to:
1. Get API keys from [OpenAI](https://platform.openai.com/) and/or [Anthropic](https://www.anthropic.com/)
2. Run `ai setup` to configure your keys and preferences

## Models Supported
> Note: These are the models supported by default, you can change this by editing models.json

- OpenAI
  - GPT 4.1
  - GPT 4.1 mini
  - GPT 4.1 nano
  - GPT 4o
  - GPT 4o mini
  - o4
  - o4 mini
- Anthropic
  - Claude 3.7 Sonnet
  - Claude 3.5 Sonnet
  - Claude 3.5 Haiku
  - Claude 3 Haiku

## License

MIT

---

Enjoy using AI CLI! 😊