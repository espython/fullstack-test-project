# fullstack-test-project

# Easygen Fullstack Task

## Overview
This is a monorepo project using Turborepo for managing multiple applications. The project is structured using workspaces, with all applications located in the `apps/` directory.

## Project Structure
```
easygen-fullstack-task/
├── apps/               # Applications directory
│   ├── *              # Individual applications
├── package.json       # Root package configuration
└── turbo.json         # Turbo configuration
```

## Prerequisites
- Node.js (compatible with npm@9.8.1)
- npm package manager (version 9.8.1)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/espython/fullstack-test-project.git
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

- **`npm run dev`**: Runs all applications in development mode using Turborepo
  ```bash
  npm run dev
  ```

- **`npm run build`**: Builds all applications using Turborepo
  ```bash
  npm run build
  ```

- **`npm start`**: Starts the API server from the built files
  ```bash
  npm start
  ```

- **`npm run start:debug`**: Runs applications in debug mode with watch functionality
  ```bash
  npm run start:debug
  ```

## Workspace Configuration

This project uses npm workspaces to manage multiple applications. All applications are located in the `apps/*` directory. Each application in the workspace can be developed and built independently while sharing dependencies.

## Development Dependencies

- **turbo** (v2.2.3): Used for managing and orchestrating the monorepo build system

## Development

To start development:

1. Make sure all dependencies are installed:
```bash
npm install
```

2. Start the development servers:
```bash
npm run dev
```

## Building for Production

To build all applications:

1. Run the build command:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Debug Mode

To run the applications in debug mode with watch functionality:
```bash
npm run start:debug
```

## Repository Information

- **Repository**: [https://github.com/espython/fullstack-test-project](https://github.com/espython/fullstack-test-project)
- **Issues**: [https://github.com/espython/fullstack-test-project/issues](https://github.com/espython/fullstack-test-project/issues)
- **Author**: Eslam Mahmoud
- **License**: ISC

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

