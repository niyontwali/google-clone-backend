# Google Search API Backend

This backend service integrates seamlessly with the Google Search API, leveraging Google's robust search infrastructure to provide accurate and current search results.

To optimize performance, I've implemented a caching mechanism that stores accessed search results in our local database upon initial retrieval. This approach significantly enhances response times for subsequent queries by minimizing reliance on external API calls.

In the event of API usage limits being exceeded (Google Search API allows only 100 requests per day), users will receive timely notifications. However, previously accessed search results will remain accessible from our local database, ensuring uninterrupted service and user convenience. This proactive strategy aims to mitigate temporary limitations and maintain seamless functionality.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Model](#database-model)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [License](#license)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/niyontwali/google-search-api-backend.git
   cd google-search-api-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Configuration

1. **Set up environment variables**:

   Before running the backend, ensure you have a `.env` file configured with the necessary environment variables. You
   can create this file by executing the following command in your terminal:

   ```sh
   cp .env.example .env
   ```

   This command duplicates the `.env.example` file and sets up your `.env` file with placeholders. Make sure to replace
   these placeholders with your actual environment-specific values.

   Here is an example of how your `.env.example` file should look:

   ```env
   # Environment
   NODE_ENV=development
   HOST_NAME=127.0.0.1

   # Database Configuration
   PORT=8080
   DB_HOST=
   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   DB_PORT=

   # Google API Configuration
   GOOGLE_BASE_URL=
   GOOGLE_API_KEY=
   GOOGLE_CX=
   ```

   Replace each variable (`PORT`, `DB_HOST`, etc.) with your specific configuration values. Ensure you fill in the
   `GOOGLE_BASE_URL`, `GOOGLE_API_KEY`, and `GOOGLE_CX` variables with the appropriate values from your Google API
   credentials.

2. **Run Migrations**:

   ```bash
   npm run migrate
   ```

## Running the Application

Start the server in development:

```bash
npm run dev
```

The server will start on the port specified in the `.env` file, defaulting to `8080` or you can as well change it to
another port in your `.env`.

## API Endpoints

### Search

**Endpoint**: `/search`

**Method**: `GET`

**Query Parameters**:

- `q` (required): The search query string.

**Response**:

- **200 OK**: Returns search results.
- **400 Bad Request**: If the query parameter `q` is missing.
- **403 Forbidden**: If the Google API request limit is exceeded.
- **500 Internal Server Error**: For other errors.

**Example**:

```http
GET http://localhost:8080/search?q=John%20Niyontwali
```

**Response**:

```json
{
  "ok": true,
  "data": [
     {
            "id": "47a55ac7-b400-4069-8d0b-6895814425ca",
            "searchQuery": "John Niyontwali",
            "displayLink": "njohn.netlify.app",
            "title": "John - Personal Portfolio",
            "snippet": "JohnNiyontwali · Address :Kigali - Rwanda · Phone :+250 786 266 073 · Email :nijohn0001@gmail.com · github and gitlab usernames:niyontwali and nijohn ...",
            "image": null,
            "createdAt": "2024-07-11T12:56:23.000Z",
            "updatedAt": "2024-07-11T12:56:23.000Z"
        },
    ...
  ]
}
```

## Database Model

The `Search` model is used to store search results with the following fields:

- `id`: UUID, primary key
- `searchQuery`: STRING, the search query
- `displayLink`: STRING, the link to the result
- `title`: STRING, the title of the result
- `snippet`: STRING, the snippet of the result
- `image`: TEXT, the URL of the image (if available)

## Error Handling

- **Google API Limit Exceeded**: Returns a `403` status code with a message indicating that the request limit has been
  exceeded.
- **General Errors**: Logs the error and returns a `500` status code with a generic error message.

## Logging

The application uses a logger to record errors and other important information. Logs are configured in
`logs/configs.js`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
