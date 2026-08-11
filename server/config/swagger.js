import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MediBook API',
      version: '1.0.0',
      description: 'REST API documentation for MediBook — Doctor Appointment Booking System',
    },
    servers: [
      { url: 'https://medibook-gjsp.onrender.com/api', description: 'Production' },
      { url: 'http://localhost:5000/api', description: 'Local development' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;