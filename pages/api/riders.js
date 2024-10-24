import pool from './db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { rows } = await pool.query('SELECT * FROM tblRidah');
            res.status(200).json(rows);
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
