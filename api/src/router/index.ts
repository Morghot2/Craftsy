import { Router } from 'express';
import { register, login, logout } from '@/controllers/authentication';
import { getAllServices, addService, getServicesByUser } from '@/controllers/services';
import { getAllCategories } from '@/controllers/categories';
import { getUserProfile, becomeSellerController, uploadPhoto } from '@/controllers/users';
import { isAuthenticated, isSeller } from '@/middleware';
import upload from '@/middleware';

const router = Router();

// Authentication Routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

// User Profile Routes
router.get('/users/profile', isAuthenticated, getUserProfile);
router.post('/users/become-seller', isAuthenticated, becomeSellerController);
router.post('/users/upload-photo', isAuthenticated, upload.single('photo'), uploadPhoto);

// Categories Routes
router.get('/categories', getAllCategories);

// Services Routes
router.get('/services', getAllServices);
router.get('/services/user/:userId', isAuthenticated, getServicesByUser);
router.post('/services', isAuthenticated, isSeller, upload.single('photo'), addService);

export default router;
