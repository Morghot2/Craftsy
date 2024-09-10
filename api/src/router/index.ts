import { Router } from 'express';
import { register } from '@/controllers/authentication';

const router = Router();

router.post('/auth/register', register) => {
    console.log('register');
    };
export default router;