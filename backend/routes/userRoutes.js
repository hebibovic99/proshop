import express from 'express';
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get All Users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users retrieved successfully.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       '500':
 *         description: Internal Server Error. There was a problem with the server.
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The unique identifier for the user.
 *       name:
 *         type: string
 *         description: The name of the user.
 *       email:
 *         type: string
 *         description: The email address of the user.
 *       isAdmin:
 *         type: boolean
 *         description: Indicates whether the user is an administrator.
 */


router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Get User Profile
 *     description: Retrieve the profile of the currently authenticated user.
 *     security:
 *       - jwt_auth: []
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The unique identifier for the user.
 *             name:
 *               type: string
 *               description: The name of the user.
 *             email:
 *               type: string
 *               description: The email address of the user.
 *             isAdmin:
 *               type: boolean
 *               description: Indicates whether the user is an administrator.
 *       '401':
 *         description: Unauthorized. User authentication required.
 *       '404':
 *         description: Not Found. The user profile was not found.
 * securityDefinitions:
 *   jwt_auth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Update User Profile
 *     description: Update the profile of the currently authenticated user.
 *     security:
 *       - jwt_auth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email address of the user.
 *               password:
 *                 type: string
 *                 description: The updated password of the user (if changed).
 *     responses:
 *       '200':
 *         description: User profile updated successfully.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The unique identifier for the user.
 *             name:
 *               type: string
 *               description: The updated name of the user.
 *             email:
 *               type: string
 *               description: The updated email address of the user.
 *             isAdmin:
 *               type: boolean
 *               description: Indicates whether the user is an administrator.
 *       '401':
 *         description: Unauthorized. User authentication required.
 *       '404':
 *         description: Not Found. The user profile was not found.
 * securityDefinitions:
 *   jwt_auth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;
