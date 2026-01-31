import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3300;

// Serve YAML files as static
app.use(express.static(__dirname));

// Swagger UI for OpenAPI 3.1.1
app.use('/3.1', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: { url: '/openapi-3.1.1-example.yaml' }
}));

// Swagger UI for OpenAPI 3.0
app.use('/3.0', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: { url: '/openapi-3.0-example.yaml' }
}));

// Redirect root to 3.1.1
app.get('/', (req, res) => res.redirect('/3.1'));

app.listen(PORT, () => {
  console.log(`Swagger UI running at http://localhost:${PORT}`);
  console.log(`  - OpenAPI 3.1.1: http://localhost:${PORT}/3.1`);
  console.log(`  - OpenAPI 3.0:   http://localhost:${PORT}/3.0`);
});
