import supertest from 'supertest';

import app from '../src/app.js';
import { prisma } from '../src/config/database.js';
import userFactory from './factories/userFactory.js';

import dotenv from 'dotenv';
import wifiFactory from './factories/wifiFactory.js';
dotenv.config();

console.log('estou rodando no ', process.env.DATABASE_URL);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE wifis`;
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'andre@gmail.com'`;
});

describe('User tests suite', () => {
    it('given email and password, create user', async () => {
        const login = userFactory.createLogin();
        const response = await supertest(app).post(`/signup`).send(login);
        expect(response.status).toBe(201);

        const user = await prisma.user.findFirst({
            where: { email: login.email },
        });

        expect(user.email).toBe(login.email);
    });

    it('given an invalid input, returns 422', async () => {
        const login = userFactory.createLogin();
        delete login.password;

        const response = await supertest(app).post(`/signup`).send(login);
        expect(response.status).toBe(422);
    });

    it('given valid email and password, receive token', async () => {
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);

        const response = await supertest(app).post(`/login`).send({
            email: user.email,
            password: user.plainPassword,
        });
        const token = response.body.token;
        expect(token).not.toBeNull();
    });

    it('given invalid password, receive 401', async () => {
        const login = userFactory.createLogin();
        const user = userFactory.createUser(login);

        const response = await supertest(app)
            .post(`/login`)
            .send({ ...login, password: 'outropassword' });
        expect(response.status).toBe(401);
    });

    it('given email and password already in use, fail to create user', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        const response = await supertest(app).post(`/signup`).send(login);
        expect(response.statusCode).toBe(409);
    });
});

describe('Wifis test suite', () => {
    it('create a wifi', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        let response = await supertest(app).post(`/login`).send(login);
        const token = response.body.token;

        const wifi = {
            title: 'Casa',
            name: 'Wifi de casa',
            password: '0123456789',
        };

        response = await supertest(app)
            .post('/wifi')
            .send(wifi)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);

        const savedWifi = await prisma.wifi.findFirst({
            where: { title: wifi.title },
        });
        expect(response.statusCode).toBe(201);
    });

    it('get a wifi', async () => {
        const login = userFactory.createLogin();
        const user = await userFactory.createUser(login);

        let response = await supertest(app).post(`/login`).send(login);
        const token = response.body.token;

        const wifiInfo = wifiFactory.createWifiInfo();
        const wifi = await wifiFactory.createWifi(wifiInfo, user.id);

        response = await supertest(app)
            .get(`/wifi/${wifi.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });

    it('get a wifi with a invalid token', async () => {
        const login = userFactory.createLogin();
        const user = await userFactory.createUser(login);
        const token = 'invalidtoken';

        const wifiInfo = wifiFactory.createWifiInfo();
        const wifi = await wifiFactory.createWifi(wifiInfo, user.id);

        let response = await supertest(app)
            .get(`/wifi/${wifi.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
