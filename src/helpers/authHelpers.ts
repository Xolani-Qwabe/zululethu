import crypto from 'crypto';

const secret = process.env.SECRET || 'default_secret_key'; 

export const generateRandomString = (): string => {
    return crypto.randomBytes(128).toString('base64');
}

export const generateSalt = (): string => {
    return crypto.randomBytes(16).toString('hex');
}

export const hashPassword = (password: string, salt: string): string => {
    return crypto.createHmac('sha256', [password, salt].join('/')).update(secret).digest('hex');
}

