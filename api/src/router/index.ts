import { Router } from 'express';
import { register, login, logout } from '@/controllers/authentication';
import { getAllUsers } from '@/controllers/users';
import { isAuthenticated } from '@/middleware';
import { getAllCategories } from '@/controllers/categories';
import { getAllServices, addService, getServicesForCategory, getSellerServices } from '@/controllers/services';
import { becomeSeller } from '@/controllers/authentication';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/become-seller', isAuthenticated, becomeSeller);

router.get('/users', isAuthenticated, getAllUsers);

router.get('/categories', getAllCategories);

router.get('/services', getAllServices);
router.get('/services/category/:categoryId', getServicesForCategory);
router.get('/services/seller/:sellerId', isAuthenticated, getSellerServices);
router.post('/services', isAuthenticated, addService);

export default router;
