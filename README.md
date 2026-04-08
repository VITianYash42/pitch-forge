# PitchForge

PitchForge is an AI-powered monetization strategist for student projects.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add your Anthropic API key to `.env`:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

3. Start the app:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Frontend-only API calls are enabled with the required `anthropic-dangerous-direct-browser-calls` header.
- Model used: `claude-sonnet-4-20250514`.
