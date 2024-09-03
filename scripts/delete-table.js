const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Start deleting table...');
    await prisma.$executeRaw`DROP TABLE IF EXISTS "order";`;
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Table deletion completed');
        await prisma.$disconnect();
    });