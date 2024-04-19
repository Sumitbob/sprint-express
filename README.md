# Node.js Boilerplate

This is a boilerplate project for Node.js applications.

## Features

- Express.js server with basic setup
- JWT authentication middleware
- ESLint and Husky for code linting and formatting
- Commit linting with conventional commits

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up your database configurations in `config.js`.
4. Start the server with `npm run dev`.

## Project Structure

This project follows a structured architecture to maintain code organization and separation of concerns. Below is an overview of the main directories and their purposes:

- **Routes**: Contains route definitions for different endpoints of the API.
  - Each route file maps HTTP requests to corresponding controller methods.
- **Controllers**: Contains controller logic for handling incoming requests and sending responses.
  - Controllers interact with services to perform business logic and handle data processing.
- **Services**: Contains service modules that encapsulate business logic and application-specific functionalities.
  - Services handle complex operations, such as data validation, authentication, and authorization.
- **Models**: Contains database models defined using an ORM (Object-Relational Mapping) library.
  - Models represent database tables and define the structure of data entities.

This structured approach helps in maintaining a clear separation of concerns, making the codebase modular, scalable, and easier to maintain. Each directory focuses on a specific aspect of the application, promoting code reusability and enhancing code organization.

## Dependencies

Below are the major dependencies and libraries used in this project, along with their versions:

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWT).
- **eslint**: Linter for JavaScript and JSX.
- **husky**: Git hooks made easy.
