// import the json file
const data = require('./data/employees.json');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');
    for (const employee of data) {
        // Parse the date_of_birth field
        employee.date_of_birth = new Date(employee.date_of_birth);
        employee.hire_date = new Date(employee.hire_date);
    
        await prisma.employee.create({
          data: employee,
        });
      }
    }

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Seeding completed');
        await prisma.$disconnect();
    });