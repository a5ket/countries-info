# countries-info 

A REST API service that provides information about countries and manages user holiday calendars.

## Features

- Fetch country information including borders, population, and flag URLs
- Manage user holiday calendars with public holidays for specific countries
- Built with TypeScript, Express.js, and Prisma

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Setup

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
npm run migrate
```

4. Build the project:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

The server will start on the port specified in your `.env` file.

## Docker

```bash
# Build the Docker image
docker build -t a5ket/countries .

# Run the container
docker run -p 3000:3000 -e APP_PORT=3000 -e DATABASE_URL="file:./dev.sqlite" a5ket/countries
```

## Linting

For linting:

```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

## API Endpoints

### Countries

#### GET /countries
Get a list of all available countries.

**Response:**
```json
{
  "data": [
    {
      "name": "Country Name",
      "code": "CC"
    }
  ]
}
```

#### GET /countries/:countryCode
Get detailed information about a specific country.

**Parameters:**
- `countryCode` - Two-letter country code (e.g., "US", "GB")

**Response:**
```json
{
  "data": {
    "borders": ["Country1", "Country2"],
    "population": 12345678,
    "flagUrl": "https://example.com/flag.png"
  }
}
```

### Users

#### GET /users/:userId/calendar/holidays
Get holiday calendar events for a specific user.

**Parameters:**
- `userId` - Unique user identifier

**Response:**
```json
{
  "data": [
    {
      "id": "event-id",
      "name": "Holiday Name",
      "date": "2024-01-01",
      "userId": "user-id"
    }
  ]
}
```

#### POST /users/:userId/calendar/holidays
Add public holidays to a user's calendar for a specific country and year.

**Parameters:**
- `userId` - Unique user identifier

**Request Body:**
```json
{
  "countryCode": "US",
  "year": 2024,
  "holidays": ["New Year's Day", "Independence Day"]
}
```

**Response:**
```json
{
  "data": {
    "created": 2,
    "events": [
      {
        "id": "event-id",
        "name": "Holiday Name",
        "date": "2024-01-01",
        "userId": "user-id"
      }
    ]
  }
}
```

## Environment Variables

- `APP_PORT` - Port number for the server (default: 3000)
- `DATABASE_URL` - Database connection string

## Error Responses

All endpoints may return the following error responses:

- `400` - Bad Request
- `404` - Not Found
- `422` - Unprocessable Entity (validation errors)
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}