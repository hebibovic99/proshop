import express from 'express';
const router = express.Router();
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct,  createProductReview,
  getTopProducts, } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Retrieve Products
 *     description: Retrieve a list of products with optional pagination and keyword search.
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         description: The page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: keyword
 *         description: Optional keyword to search for products by name.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of products along with pagination information.
 *         schema:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 *             page:
 *               type: integer
 *               description: The current page number.
 *             pages:
 *               type: integer
 *               description: The total number of pages available.
 *       '500':
 *         description: Internal Server Error. There was a problem with the server.
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The unique identifier for the product.
 *       name:
 *         type: string
 *         description: The name of the product.
 *       description:
 *         type: string
 *         description: The description of the product.
 *       price:
 *         type: number
 *         description: The price of the product.
 */
/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new Product
 *     description: Create a new product with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               image:
 *                 type: string
 *                 description: The image URL of the product.
 *               brand:
 *                 type: string
 *                 description: The brand of the product.
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *               countInStock:
 *                 type: integer
 *                 description: The count of the product in stock.
 *               numReviews:
 *                 type: integer
 *                 description: The number of reviews for the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *     responses:
 *       '201':
 *         description: Product created successfully. Returns the created product object.
 *         schema:
 *           $ref: '#/definitions/Product'
 *       '500':
 *         description: Internal Server Error. There was a problem with the server.
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The unique identifier for the product.
 *       name:
 *         type: string
 *         description: The name of the product.
 *       price:
 *         type: number
 *         description: The price of the product.
 *       user:
 *         type: string
 *         description: The user who created the product.
 *       image:
 *         type: string
 *         description: The image URL of the product.
 *       brand:
 *         type: string
 *         description: The brand of the product.
 *       category:
 *         type: string
 *         description: The category of the product.
 *       countInStock:
 *         type: integer
 *         description: The count of the product in stock.
 *       numReviews:
 *         type: integer
 *         description: The number of reviews for the product.
 *       description:
 *         type: string
 *         description: The description of the product.
 */

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
/**
 * @openapi
 * /api/products/top:
 *   get:
 *     summary: Get Top Products
 *     description: Retrieve top-rated products.
 *     responses:
 *       '200':
 *         description: A list of top-rated products.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 *       '500':
 *         description: Internal Server Error. There was a problem with the server.
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The unique identifier for the product.
 *       name:
 *         type: string
 *         description: The name of the product.
 *       description:
 *         type: string
 *         description: The description of the product.
 *       price:
 *         type: number
 *         description: The price of the product.
 *       rating:
 *         type: number
 *         description: The rating of the product.
 *       numReviews:
 *         type: integer
 *         description: The number of reviews for the product.
 *       countInStock:
 *         type: integer
 *         description: The count of the product in stock.
 */

router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)

  .put(protect, admin, checkObjectId, updateProduct);


  delete(protect, admin, checkObjectId, deleteProduct);



export default router;
