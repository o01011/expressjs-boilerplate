# Task Management API

This is a RESTful API for managing tasks. It provides endpoints to create, read, update, and delete tasks. The project uses Node.js, Express, Prisma, and TypeScript.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Task Filtering**: List tasks with filters for status, priority, and due date.
- **Validation**: Input validation using Zod schemas.
- **Error Handling**: Custom error handling middleware.
- **Logging**: Request logging middleware.

## Prerequisites

- Node.js (v14 or higher)
- npm
- Docker (optional)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-api.git
cd task-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env` and fill in the necessary values.

```bash
cp .env.example .env
```

### 4. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### 5. Run Migrations

To set up the database schema, run the following command:

```bash
npx prisma migrate dev --name init
```

### 6. Seed the Database (Optional)

You can seed the database with sample data using:

```bash
npm run seed
```

## API Endpoints

- **Create a Task**: `POST /api/tasks`
- **List Tasks**: `GET /api/tasks`
- **Get a Task by ID**: `GET /api/tasks/:id`
- **Update a Task**: `PUT /api/tasks/:id`
- **Delete a Task**: `DELETE /api/tasks/:id`

## Docker

To run the application using Docker, follow these steps:

### 1. Build the Docker Image

```bash
docker build -t task-management-api .
```

### 2. Run the Docker Container

```bash
docker run -p 3000:3000 task-management-api
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to your fork and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
