import fetch from 'node-fetch';

const API = 'https://api.minepi.com/v2'; // Testnet/Mainnet decided by Pi dashboard; here we pass sandbox flag in metadata

export async function createPayment(req, res){
  try {
    const { amount, memo, metadata } = req.body;
    const r = await fetch(`${API}/payments`, {
      method:'POST',
      headers:{ 'Authorization':`Key ${process.env.PI_API_KEY}`, 'Content-Type':'application/json' },
      body: JSON.stringify({ amount, memo, metadata: { ...metadata, sandbox: process.env.PI_USE_SANDBOX === 'true' } })
    });
    const data = await r.json();
    res.json({ ok:true, data });
  } catch(e){
    res.status(500).json({ ok:false, error:e.message });
  }
}

export async function paymentStatus(req, res){
  try {
    const { id } = req.params;
    const r = await fetch(`${API}/payments/${id}`, { headers:{ 'Authorization':`Key ${process.env.PI_API_KEY}` }});
    res.json({ ok:true, data: await r.json() });
  } catch(e){ res.status(500).json({ ok:false, error:e.message }); }
}
