export default async function handler(req, res) {
    // Set CORS headers so your dashboard can access this
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD');
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        // Return the rate data
        return res.status(200).json(data);
    } catch (error) {
        console.error('Fetch Error:', error.message);
        return res.status(500).json({ 
            error: 'Failed to fetch rates', 
            details: error.message 
        });
    }
}