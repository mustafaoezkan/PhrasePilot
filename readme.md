# PhrasePilot

## Introduction

PhrasePilot is a language-learning application that helps users expand their vocabulary in an interactive way.

## Tech Stack

### Node.js

- **nodemon** (Automatically restarts the server during development to streamline the testing process.)
- **bcryptjs** (Enhances security by providing password hashing functionality.)
- **body-parser** (Facilitates parsing of incoming request bodies for ease of data extraction.)
- **compression** (Middleware to enable gzip compression for HTTP responses.)
- **cors** (Handles Cross-Origin Resource Sharing to allow secure data transfer between the client and server.)
- **dotenv** (Loads environment variables from a .env file to keep sensitive information secure.)
- **express** (Provides a minimal and flexible framework for building robust web applications.)
- **express-validator** (Simplifies data validation and sanitization for user input.)
- **helmet** (Enhances application security by setting various HTTP headers.)
- **jsonwebtoken** (Generates and verifies JSON Web Tokens for user authentication.)
- **morgan** (HTTP request logger middleware for Node.js.)
- **nodemailer** (Allows the sending of emails, supporting various transport methods for email notifications in the application.)
- **pg** (Non-blocking PostgreSQL client for Node.js.)
- **sequelize** (A promise-based Node.js ORM for PostgreSQL, MySQL, SQLite, and MSSQL.)

### React

### React Native

### PostgreSQL

## Installation

To get started with PhrasePilot, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables (if applicable).
4. Set up your PostgreSQL database.

## Configuration

PhrasePilot requires the following environment variables:

- `POSTGRE_DB_NAME`: The name of your PostgreSQL database.
- `POSTGRE_HOST_IP`: The IP address of your PostgreSQL host.
- `POSTGRE_PORT`: The port number for connecting to PostgreSQL.
- `POSTGRE_USERNAME`: The username for authenticating with PostgreSQL.
- `POSTGRE_PASSWORD`: The password for authenticating with PostgreSQL.
- `PORT`: The port on which the server will run.
- `JWT_SECRET`: The secret key used for JSON Web Token (JWT) generation and verification.

## Usage

To run the application locally, use the following commands:

```bash
npm start
```
## Features
- Personalized word suggestions
- User authentication

## License
This project is licensed under the ISC License.

Contact
For support or inquiries, contact us at info@mustafaozkan.dev.
