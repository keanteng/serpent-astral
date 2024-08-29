/*
  Warnings:

  - You are about to drop the `Employees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Employees";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "age" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "date_of_birth" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "resident_status" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "hire_date" DATETIME NOT NULL,
    "epf_number" INTEGER NOT NULL,
    "socso_number" INTEGER NOT NULL,
    "bank_account" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
