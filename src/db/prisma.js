import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const DBconnect = async () => {
  try {
    await prisma.$connect();
    console.log("connected to postgresql database ✅");
  } catch (err) {
    console.log(`error in connect to database ${err.message}`);
    process.exit(1);
  }
};

const DBdisconnect = async () => {
  await prisma.$disconnect();
  console.log("disconnected to database");
};

export { DBconnect, DBdisconnect, prisma };
