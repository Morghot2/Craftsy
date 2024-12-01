import express from 'express';
import { Router } from 'express';
import { register, login, logout } from '@/controllers/authentication';
import { getAllServices, addService, getServicesByUser, getServicesForCategory, getServiceById, deleteService } from '@/controllers/services';
import { getAllCategories } from '@/controllers/categories';
import { getUserProfile, becomeSellerController, uploadPhoto } from '@/controllers/users';
import { createCheckoutSession, handleWebhook } from '../controllers/payment';
import { getPurchasesForUser } from '@/controllers/purchases';
import { isAuthenticated, isSeller } from '@/middleware';
import upload from '@/middleware';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

router.get('/users/profile', isAuthenticated, getUserProfile);
router.post('/users/become-seller', isAuthenticated, becomeSellerController);
router.post('/users/upload-photo', isAuthenticated, upload.single('photo'), uploadPhoto);

router.get('/categories', getAllCategories);

router.get('/services', getAllServices);
router.get('/services/user/:userId', isAuthenticated, getServicesByUser);
router.post('/services', isAuthenticated, isSeller, upload.single('photo'), addService);
router.get('/services/category/:categoryId', getServicesForCategory);
router.get('/services/:serviceId', getServiceById);
router.delete('/services/:id', isAuthenticated, deleteService);

router.post('/payments/checkout', isAuthenticated, createCheckoutSession);
router.post('/payments/webhook', express.raw({ type: 'application/json' }), handleWebhook);

router.get('/users/purchases', isAuthenticated, getPurchasesForUser);

export default router;
