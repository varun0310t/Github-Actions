# Express TypeScript App

[![Build and Deploy Express App](https://github.com/varun0310t/Github-Actions/actions/workflows/build-deploy.yml/badge.svg)](https://github.com/varun0310t/Github-Actions/actions/workflows/build-deploy.yml)
[![Simple Build](https://github.com/varun0310t/Github-Actions/actions/workflows/quick-build.yml/badge.svg)](https://github.com/varun0310t/Github-Actions/actions/workflows/quick-build.yml)

A basic Express.js application built with TypeScript.

## Features

- Express.js server with TypeScript
- Basic REST API endpoints
- Error handling middleware
- Development and production scripts
- Health check endpoint

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the TypeScript code to JavaScript
- `npm start` - Start the production server
- `npm run watch` - Start development server with file watching

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint
- `GET /api/users` - Get list of users

## Development

To start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Production

To build and run for production:

```bash
npm run build
npm start
```

## Project Structure

```
├── src/
│   └── index.ts          # Main application file
├── dist/                 # Compiled JavaScript files
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```
