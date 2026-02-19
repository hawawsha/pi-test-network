export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { paymentId, txid } = body;
        const API_KEY = "dspq2qhhpfv90nazmoerphcdvji9iwdllscf3hjrknpnpby4uxeczp48c5doqkhn"; 

        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ txid })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
