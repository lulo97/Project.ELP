const swaggerUi = require('swagger-ui-express');
const { extractRoutes, routes } = require('../routes/routes.js');
const pkg = require('../package.json');

function setupDynamicSwagger(app) {
  // Extract all routes dynamically
  const data = extractRoutes(routes);

  // Build OpenAPI-compatible `paths` object
  const paths = {};
  for (const r of data) {
    if (!paths[r.path]) paths[r.path] = {};

    r.methods.forEach((method) => {
      paths[r.path][method] = {
        summary: `Auto-detected ${method.toUpperCase()} ${r.path}`,
        responses: {
          200: { description: 'OK' },
        },
      };
    });
  }

  // Build Swagger (OpenAPI) specification
  const swaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: pkg.name || 'Dynamic API Docs',
      version: pkg.version || '1.0.0',
      description: 'Auto-generated from dynamic routes',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' },
    ],
    paths,
  };

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('✅ Swagger UI available at /api-docs');
}

module.exports = {
  setupDynamicSwagger
};
