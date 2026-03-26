import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.User.createMany({
    data: [
      { name: "Nath", email: "Nath@gmail.com", password: hashedPassword },
      { name: "Brian", email: "Brian@gmail.com", password: hashedPassword },
    ],
    skipDuplicates: true,
  });
  console.log("Seed Success");
}
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
