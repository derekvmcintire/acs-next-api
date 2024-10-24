import { NextApiRequest, NextApiResponse } from "next";
import pool from "../db";
import RiderService from "@/app/Services/rider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const riders = await RiderService.getRiders();
      res.status(200).json(riders);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    // Create a new rider
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    try {
      const { rows } = await pool.query(
        "INSERT INTO public.tblRider (name) VALUES ($1) RETURNING *",
        [name],
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Database insert error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
