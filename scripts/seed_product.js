const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
    {
        id: 1,
        name: "Apple",
        price: 1.99,
    },
    {
        id: 2,
        name: "Banana",
        price: 0.99,
    },
    {
        id: 3,
        name: "Cherry",
        price: 2.99,
    }
]

async function main() {
    for (const product of data) {
      await prisma.product.create({
        data: product,
      });
    }
  }
  
  main()
    .catch(e => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });