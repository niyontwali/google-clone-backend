const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { config } = require('dotenv');

const options = require('./docs/swaggerDoc');
const { dbCon } = require('./database');
const routes = require('./routes');
const logger = require('../logs/configs');

config();

const startServer = async () => {
  try {
    // initialize app
    const app = express();

    // Enable CORS
    app.use(cors());

    // Set up security-related HTTP headers using the helmet middleware
    app.use(helmet());

    // Parse incoming requests
    app.use(express.json());

    // Swagger UI setup
    const swaggerSpec = swaggerJsDoc(options);
    app.use('/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    // Default route
    app.get('/', (req, res) => {
      res.status(200).send(`
        <h1 style="text-align: center; margin-top: 20vh">Welcome Welcome to the Google Clone Project APIs</h1>
      `);
    });

    // API routes
    app.use('/v1', routes);

    // Not found routes
    app.all('*', (req, res) => {
      logger.error('This route is not found');
      res.status(404).json({
        message: 'This route is not found',
      });
    });

    // Database connection
    await dbCon();

    // Start server
    const port = process.env.PORT || 8080;

    app.listen(port, () => {
      logger.info(`Server listening on port : ${port}`, { showPath: false });
    });
  } catch (error) {
    logger.info(`Error during startup : ${error}`);
    process.exit(1);
  }
};

// Start the server
startServer();
