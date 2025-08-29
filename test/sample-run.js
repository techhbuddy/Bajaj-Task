import fetch from 'node-fetch';

const URL = process.env.URL || 'http://localhost:3000/bfhl';

async function run() {
  const resp = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: ["b","2","350","9","H","$"] })
  });
  const json = await resp.json();
  console.log(JSON.stringify(json, null, 2));
}

run().catch(console.error);
