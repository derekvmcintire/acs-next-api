import ResultService from "@/api/services/result";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { riderId } = req.query;

  if (req.method === "GET") {
    try {
      const rows = await ResultService.getResultsForRider(Number(riderId));
      if (rows.length === 0) {
        return res.status(404).json({ error: "Rider not found" });
      }
      res.status(200).json(rows);
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    // TODO
  } else if (req.method === "DELETE") {
    // TODO
  }
}
