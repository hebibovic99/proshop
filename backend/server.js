import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const port = process.env.PORT || 5000;
const swaggerJsDocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Northwind',
      version: '1.0.0',
      description: 'A simple REST API for providing basic CRUD-access to the employees in a Northwind database.'
    }
  },
  apis: ['./backend/routes/*.js', './src/express-error.js']
};
const apiSpec = swaggerJsDoc(swaggerJsDocOptions);
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) =>
  res.send("Api is running")
);

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(apiSpec));

const __dirname = path.resolve();
app.use('/uploads', express.static('/var/data/uploads'));

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
  

app.listen(port, () => console.log(`Server is running on port ${port}`));

//netstat -ano | findstr :5000 taskkill /F /PID 



