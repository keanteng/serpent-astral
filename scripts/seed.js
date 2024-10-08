const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
  { id: 1, name: "John Doe", age: 28, email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", age: 34, email: "jane.smith@example.com" },
  { id: 3, name: "Alice Johnson", age: 25, email: "alice.johnson@example.com" },
  { id: 4, name: "Bob Brown", age: 45, email: "bob.brown@example.com" },
  { id: 5, name: "Charlie Davis", age: 30, email: "charlie.davis@example.com" },
  { id: 6, name: "Diana Evans", age: 22, email: "diana.evans@example.com" },
  { id: 7, name: "Evan Harris", age: 29, email: "evan.harris@example.com" },
  { id: 8, name: "Fiona Green", age: 33, email: "fiona.green@example.com" },
  { id: 9, name: "George Hill", age: 40, email: "george.hill@example.com" },
  { id: 10, name: "Hannah King", age: 27, email: "hannah.king@example.com" },
  { id: 11, name: "Ian Lewis", age: 31, email: "ian.lewis@example.com" },
  { id: 12, name: "Jack Martin", age: 36, email: "jack.martin@example.com" },
  { id: 13, name: "Karen Nelson", age: 24, email: "karen.nelson@example.com" },
  { id: 14, name: "Larry Parker", age: 38, email: "larry.parker@example.com" },
  { id: 15, name: "Mona Quinn", age: 26, email: "mona.quinn@example.com" },
  { id: 16, name: "Nina Roberts", age: 32, email: "nina.roberts@example.com" },
  { id: 17, name: "Oscar Scott", age: 41, email: "oscar.scott@example.com" },
  { id: 18, name: "Paula Turner", age: 23, email: "paula.turner@example.com" },
  { id: 19, name: "Quincy White", age: 35, email: "quincy.white@example.com" },
  { id: 20, name: "Rachel Young", age: 28, email: "rachel.young@example.com" },
];

async function main() {
  for (const user of data) {
    await prisma.user.create({
      data: user,
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