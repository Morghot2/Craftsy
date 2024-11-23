import { Router } from 'express';
import { register, login, logout } from '@/controllers/authentication'; // Import logout
import { getAllUsers } from '@/controllers/users';
import { isAuthenticated } from '@/middleware';
import { getAllCategories } from '@/controllers/categories';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

router.get('/users', isAuthenticated, getAllUsers);

router.get('/categories', getAllCategories);

export default router;
