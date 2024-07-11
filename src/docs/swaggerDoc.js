const dotenv = require('dotenv');

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Google Search Clone Backend',
      version: '1.0.0',
      description: 'Backend service integrating with Google Search API.',
    },
    servers: [
      {
        url: `${process.env.BASE_URL}`,
      },
    ],
    components: {
      securitySchemes: {},
    },
  },
  schemes: ['http', 'https'],
  apis: ['./src/docs/*.yaml'],
};

module.exports = options;
