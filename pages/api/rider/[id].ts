import { NextApiRequest, NextApiResponse } from "next";
import pool from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Get a single rider by ID
    try {
      const { rows } = await pool.query(
        "SELECT * FROM tblRider WHERE id = $1",
        [id],
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: "Rider not found" });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    // Update a rider
    const {
      firstName,
      lastName,
      dob,
      country,
      hometown,
      photo,
      strava,
      insta,
      about,
    } = req.body;
    try {
      const { rows } = await pool.query(
        "UPDATE tblRider SET firstName = $1, lastName = $2, dob = $3, country = $4, hometown = $5, photo = $6, strava = $7, insta = $8, about = $9 WHERE id = $10 RETURNING *",
        [
          firstName,
          lastName,
          dob,
          country,
          hometown,
          photo,
          strava,
          insta,
          about,
          id,
        ],
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: "Rider not found" });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Database update error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    // Delete a rider
    try {
      const { rowCount } = await pool.query(
        "DELETE FROM tblRider WHERE id = $1",
        [id],
      );
      if (rowCount === 0) {
        return res.status(404).json({ error: "Rider not found" });
      }
      res.status(204).end(); // No content
    } catch (error) {
      console.error("Database delete error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
