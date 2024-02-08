import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
/**
 * @openapi
 * /api/config/paypal:
 *   get:
 *     summary: Retrieve PayPal configuration information.
 *     description: |
 *       This endpoint allows users to retrieve configuration information related to PayPal.
 *     responses:
 *       '200':
 *         description: Successful operation. Returns PayPal configuration data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to the resource.
 *       '404':
 *         description: Not Found. The requested resource is not found.
 *       '500':
 *         description: Internal Server Error. There was a problem with the server.
 */
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);



export default router;