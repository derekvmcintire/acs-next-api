import pool from "@/pages/api/db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class RiderDAO {
  static async getRiders() {
    try {
      const { rows } = await pool.query("SELECT * FROM public.tblRider");
      return rows; // Return the rows to be handled by the caller
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query error");
    }
  }

  static async getRidersWithPrisma() {
    try {
      // const riders = await prisma.tblRider.findMany();
      const riders = await prisma.tblRider.findMany();
      return riders;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query error");
    }
  }
}
