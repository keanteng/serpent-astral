const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
    {
        id: 1,
        customer: 'Kenshin Himura',
        date: new Date('2021-09-01'),
    },
    {
        id: 2,
        customer: 'Sanosuke Sagara',
        date: new Date('2021-09-02'),
    },
    {
        id: 3,
        customer: 'Megumi Takani',
        date: new Date('2021-09-03'),
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