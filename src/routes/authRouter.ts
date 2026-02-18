import { Router } from 'express';
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'),
    body('email').
        isEmail().withMessage('Email no válido'),
    body('phone').
        isLength({ min: 10 }).withMessage('Télefono no válido'),
    handleInputErrors,
    AuthController.createAccount
)


export default router