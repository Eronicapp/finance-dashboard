import axios from "axios";
// console.log("axios", axios);

export default async function handler(req, res) {
    try {
        // Using native fetch instead of axios
        const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD');
        
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rates', details: error.message });
    }
}
