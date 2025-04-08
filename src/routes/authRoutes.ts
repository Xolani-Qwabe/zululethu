import express from 'express';
import { register } from '../controllers/authController';
import { Request, Response } from 'express';

export default (router: express.Router) => {
    router.post('/auth/register', register);
}