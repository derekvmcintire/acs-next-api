import pool from "@/pages/api/db";

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

  // You can add more methods for other operations like getRiderById, createRider, updateRider, etc.
}
