import { NextApiRequest, NextApiResponse } from "next";
import RiderService from "@/api/services/rider";
import { IGetRidersParams } from "@/api/types/rider/types";
import pool from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const { team, country, name, ids } = req.query;

      const params: IGetRidersParams = {
        teamName: typeof team === "string" ? team : undefined,
        country: typeof country === "string" ? country : undefined,
        name: typeof name === "string" ? name : undefined,
        ids: typeof ids === "string" ? ids.split(",").map(Number) : undefined,
      };

      const riders = await RiderService.getRiders(params);

      res.status(200).json(riders);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
  } else if (req.method === "POST") {
    // Create a new rider TODO
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
