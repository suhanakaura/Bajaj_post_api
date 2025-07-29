# /bfhl post API 

This is a simple Express.js server that processes a JSON array input and returns categorized results based on input type (numbers, alphabets, special characters) along with additional computed values.

## 🌐 Hosted URL

**POST Endpoint:**  
`https://bajaj-post-api-1.onrender.com/bfhl`

---

## 📦 Request Format

**Endpoint:** `/bfhl`  
**Method:** `POST`  
**Content-Type:** `application/json`

### Example Request Body

```json
{
  "data": ["a","1", "334", "4", "R", "$"]
}
```

### Example Response Body
```json
{
  "is_success": true,
  "user_id": "suhana_kaura_24042005",
  "email": "suhana2414.be22@chitkara.edu.in",
  "roll_number": "2210992414",
  "odd_numbers": [
    "1"
  ],
  "even_numbers": [
    "334",
    "4"
  ],
  "alphabets": [
    "A",
    "R"
  ],
  "special_characters": [
    "$"
  ],
  "sum": "339",
  "concat_string": "Ra"
}
```