import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Get all riders
        try {
            const { rows } = await pool.query('SELECT * FROM public.tblRider');
            res.status(200).json(rows);
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        // Create a new rider
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        try {
            const { rows } = await pool.query('INSERT INTO public.tblRider (name) VALUES ($1) RETURNING *', [name]);
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error('Database insert error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
