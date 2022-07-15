import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export function encrypt(password: string) {
    return cryptr.encrypt(password);
}

export function decrypt(password: string) {
    const decryptedPassword = cryptr.decrypt(password);
    return decryptedPassword;
}

export function encryptPassword(password: string) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(password, SALT);
    return passwordHash;
}

export function verifyPassword(passwordLogin: string, passwordUser: string) {
    if (!bcrypt.compareSync(passwordLogin, passwordUser)) {
        throw {
            status: 401,
            message: `Wrong password`,
        };
    }
}
