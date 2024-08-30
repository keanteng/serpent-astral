const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// clear the employee table
async function clear() {
    await prisma.employee.deleteMany();
}

clear()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Clear completed');
        await prisma.$disconnect();
    });