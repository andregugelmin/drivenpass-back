import { faker } from '@faker-js/faker';

import { prisma } from '../../src/config/database.js';

function createWifiInfo() {
    return {
        title: faker.internet.domainWord(),
        name: faker.internet.userName(),
        password: faker.internet.password(),
    };
}

async function createWifi(wifiInfo, userId) {
    const savedWifi = await prisma.wifi.create({
        data: { ...wifiInfo, userId },
    });

    return savedWifi;
}

const wifiFactory = {
    createWifiInfo,
    createWifi,
};

export default wifiFactory;
