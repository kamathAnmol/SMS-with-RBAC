# SMS-with-RBAC

A Node.js project implementing a Student Management System (SMS) with Role-Based Access Control (RBAC).

## Features

- User authentication and authorization
- Role and permission management
- Modular service structure
- RESTful API endpoints

## Project Structure

```
src/
  config/           # Database and configuration files
  controllers/      # Route controllers
  models/           # Sequelize models
  routes/           # API route definitions
  services/         # Business logic and services
  utilities/        # Utility/helper functions
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- A running database (e.g., PostgreSQL, MySQL)

### Installation

```bash
npm install
```

### Configuration

Edit the database configuration in `src/config/database.ts` as needed for your environment.

### Running the Application

```bash
npm start
```

### Development

```bash
npm run dev
```

## API Endpoints

- User, Role, Permission, and Module management under `/api/v1/`

## License

MIT
