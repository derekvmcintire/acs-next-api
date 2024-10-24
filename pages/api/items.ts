// pages/api/items.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Sample data
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json(items);
  } else if (req.method === 'POST') {
    const newItem = req.body;
    items.push({ ...newItem, id: items.length + 1 });
    res.status(201).json(newItem);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
