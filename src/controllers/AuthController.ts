import type { Request, Response } from 'express'
import User from "../models/User";
import { hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {

        const { email, password } = req.body
        console.log(email, password);

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            const error = new Error('Email ya registrado')
            return res.status(409).json({ error: error.message })
        }

        try {
            req.body.roleId = 2
            const user = await User.create(req.body);
            user.password = await hashPassword(password);
            const token = generateToken();
            user.token = token;

            await user.save();

            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            })

            res.status(201).json('Cuenta Creada Correctamente')
        } catch (error) {
            // console.log(error);
            res.status(500).json({ error: 'Hubo un error' })

        }

    }
}