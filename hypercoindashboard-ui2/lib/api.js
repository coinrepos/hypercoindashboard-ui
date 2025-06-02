// lib/api.js

export async function fetchWallet(address) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getWallet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address }),
  });

  if (!res.ok) throw new Error('Failed to fetch wallet');
  return res.json();
}

export async function fetchBalance(address) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getBalance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address }),
  });

  if (!res.ok) throw new Error('Failed to fetch balance');
  return res.json();
}
