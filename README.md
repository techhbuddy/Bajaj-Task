# VIT BFHL API (Node.js + Express)

Build and host a REST API (POST /bfhl) that:
- Returns status (`is_success`),
- `user_id` in the format `{full_name_ddmmyyyy}` (lowercase full_name),
- `email`, `roll_number`,
- `odd_numbers`, `even_numbers`, `alphabets` (uppercase), `special_characters`,
- `sum` of numbers (as a string),
- `concat_string`: concatenation of ALL alphabetical characters present in input (from all tokens), reversed and in alternating caps (starting Upper).

## 1) Run locally

### Prereqs
- Node.js 18+ installed

### Setup
```bash
npm install
# Optional: set your identity
export FULL_NAME="harshit_maroo"
export DOB_DDMMYYYY="01012005"
export EMAIL="your_email@example.com"
export ROLL_NUMBER="VIT1234"
npm start
```

### Test with curl
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["a","1","334","4","R","$"]}'
```

Expected (example values):
```json
{
  "is_success": true,
  "user_id": "harshit_maroo_01012005",
  "email": "your_email@example.com",
  "roll_number": "VIT1234",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## 2) Deploy on Render (easy)

1. Push this folder to a **public GitHub repo**.
2. Go to [https://render.com](https://render.com) → New → Web Service.
3. Connect your GitHub and pick the repo.
4. **Build command**: `npm install`
5. **Start command**: `npm start`
6. Add Environment Variables:
   - `FULL_NAME` = your_full_name_in_lowercase_with_underscore (e.g., `harshit_maroo`)
   - `DOB_DDMMYYYY` = your DOB in `ddmmyyyy` (e.g., `01012005`)
   - `EMAIL` = your email
   - `ROLL_NUMBER` = your roll number
7. Deploy. Your service URL will look like `https://your-app.onrender.com`.
8. **Submit the endpoint**: `https://your-app.onrender.com/bfhl`

## 3) Deploy on Railway (alt)

1. Push to GitHub.
2. Go to [https://railway.app](https://railway.app) → New Project → Deploy from GitHub.
3. Add same env vars as above.
4. Deploy and use the given domain + `/bfhl`.

## 4) API Contract

- **Method**: POST
- **Route**: `/bfhl`
- **Status Code (success)**: 200

**Request Body**
```json
{
  "data": ["a","1","334","4","R","$"]
}
```

**Response Body**
```json
{
  "is_success": true,
  "user_id": "your_full_name_ddmmyyyy",
  "email": "your_email@example.com",
  "roll_number": "your_roll_no",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### Notes & Rules
- Numbers in the response must be **strings**.
- `alphabets` contains only tokens that are **pure letters**, uppercased.
- `special_characters` contains everything that is **not purely numeric or alphabetic**.
- `concat_string` takes **all letters from every input token**, reverses them, then applies alternating caps: Upper, lower, Upper, ...
- We accept negative integers (like `"-5"`). If present, they count towards sum and odd/even based on value.
- For invalid payloads (e.g., `data` missing/not array), we still return **HTTP 200** with `"is_success": false`.

## 5) Example B & C quick checks

**Example B**
```bash
curl -X POST $URL/bfhl -H "Content-Type: application/json" -d '{"data":["2","a","y","4","&","-","*","5","92","b"]}'
```
Returns (identity omitted for brevity):
```json
{
  "is_success": true,
  "odd_numbers": ["5"],
  "even_numbers": ["2","4","92"],
  "alphabets": ["A","Y","B"],
  "special_characters": ["&","-","*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

**Example C**
```bash
curl -X POST $URL/bfhl -H "Content-Type: application/json" -d '{"data":["A","ABcD","DOE"]}'
```
Returns:
```json
{
  "is_success": true,
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A","ABCD","DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}
```

## 6) Common Gotchas
- Ensure `Content-Type: application/json` in requests.
- Keep `FULL_NAME` **lowercase**; the API forces it, but follow the spec.
- If deploying on Render/Railway, expose port via `PORT` env var (we already respect it).

## 7) License
MIT
