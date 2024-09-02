const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
    {
        id: 1,
        customer: 'Kenshin Himura',
    },
    {
        id: 2,
        customer: 'Sanosuke Sagara',
    },
    {
        id: 3,
        customer: 'Megumi Takani',
    },
];

async function main() {
  for (const order of data) {
    await prisma.order.create({
      data: order,
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