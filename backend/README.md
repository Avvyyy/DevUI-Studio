# DevUI Studio Backend

AI-powered developer assistant backend built with Node.js, Express, and WatsonX AI.

## Features

- **Codebase Understanding**: Analyze and explain code structure
- **AI-Powered Design**: Generate UI and system architecture from ideas
- **Code Generation**: Create React/Vue components and backend code
- **Integration Guidance**: Get step-by-step implementation advice
- **Code Improvements**: Receive suggestions for better code quality

## Prerequisites

- Node.js 18+ 
- npm or yarn
- WatsonX AI API credentials

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from example:
```bash
cp .env.example .env
```

3. Configure your WatsonX AI credentials in `.env`:
```env
WATSONX_API_KEY=your_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## API Endpoints

### Codebase Understanding
- `POST /api/ai/explain-code` - Explain uploaded code files
- `POST /api/ai/suggest-feature-location` - Suggest where to add features
- `POST /api/ai/answer-question` - Answer code-related questions

### Design & Generation
- `POST /api/ai/generate-design` - Generate UI and system design
- `POST /api/ai/generate-ui-code` - Generate UI component code
- `POST /api/ai/generate-backend-code` - Generate backend API code

### Integration & Improvements
- `POST /api/ai/integration-guidance` - Get integration guidance
- `POST /api/ai/suggest-improvements` - Get code improvement suggestions

### Health
- `GET /health` - Health check endpoint
- `GET /` - API information

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── schemas/         # Validation schemas
│   ├── services/        # Business logic
│   └── server.ts        # Entry point
├── .env.example         # Environment variables template
├── package.json
└── tsconfig.json
```

## Technologies

- **Express**: Web framework
- **TypeScript**: Type safety
- **WatsonX AI**: AI model integration
- **Zod**: Schema validation
- **Multer**: File upload handling
- **Axios**: HTTP client
- **CORS**: Cross-origin resource sharing

## License

MIT