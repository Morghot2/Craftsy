import { Router } from 'express';
import { register, login, logout } from '@/controllers/authentication';
import { getAllUsers } from '@/controllers/users';
import { isAuthenticated } from '@/middleware';
import { getAllCategories } from '@/controllers/categories';
import { getAllServices, addService, getServicesForCategory, getSellerServices } from '@/controllers/services';
import { becomeSellerController } from '@/controllers/users';
import upload from '../middleware/index';
import { uploadPhoto } from '../controllers/users';
import { getUserProfile } from '@/controllers/users';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/become-seller', isAuthenticated, becomeSellerController);
router.get('/users/profile', isAuthenticated, getUserProfile);
router.get('/users', isAuthenticated, getAllUsers);
router.post('/photos/upload', upload.single('photo'), uploadPhoto);

router.get('/categories', getAllCategories);

router.get('/services', getAllServices);
router.get('/services/category/:categoryId', getServicesForCategory);
router.get('/services/seller/:sellerId', isAuthenticated, getSellerServices);
router.post('/services', isAuthenticated, addService);

export default router;
