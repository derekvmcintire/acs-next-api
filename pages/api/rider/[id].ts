import { NextApiRequest, NextApiResponse } from "next";
import RiderService from "@/app/Services/rider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const params = {
        id: typeof id === "string" ? Number(id) : undefined,
      };
      const rows = await RiderService.getRiders(params);
      if (rows.length === 0) {
        return res.status(404).json({ error: "Rider not found" });
      }
      res.status(200).json(rows[0]);
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
