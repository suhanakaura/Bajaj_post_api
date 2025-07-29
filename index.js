const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();


app.use(cors());
app.use(bodyParser.json({ limit: '10kb' }));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const user_id = 'suhana_kaura_24042005';
const email = 'suhana2370.be22@chitkara.edu.in';
const roll_number = '2210992414';

const validateInput = (req, res, next) => {
  const { data } = req.body;
  
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      is_success: false,
      user_id,
      error: 'Invalid request body: Must be a JSON object'
    });
  }

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id,
      error: 'Invalid input: "data" must be an array'
    });
  }

  if (data.length === 0) {
    return res.status(400).json({
      is_success: false,
      user_id,
      error: 'Invalid input: "data" array cannot be empty'
    });
  }

  next();
};

app.post('/bfhl', validateInput, (req, res) => {
  try {
    const { data } = req.body;
    
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    
    const isDigit = char => char >= '0' && char <= '9';
    const isAlphabet = char => {
      const lower = char.toLowerCase();
      return lower >= 'a' && lower <= 'z';
    };

    
    data.forEach(item => {
      const strItem = String(item);
      
     
      let isNumber = true;
      for (let char of strItem) {
        if (!isDigit(char)) {
          isNumber = false;
          break;
        }
      }
      if (isNumber && strItem.length > 0) {
        const num = parseInt(strItem, 10);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(strItem);
      }
      
      else {
        let isAlpha = true;
        for (let char of strItem) {
          if (!isAlphabet(char)) {
            isAlpha = false;
            break;
          }
        }
        if (isAlpha && strItem.length > 0) {
          alphabets.push(strItem.toUpperCase());
        }
        else {
          special_characters.push(strItem);
        }
      }
    });
    const alphaStrings = data.filter(item => {
      const str = String(item);
      return str.length > 0 && str.split('').every(isAlphabet);
    });
    const reversed = alphaStrings.reverse().map(str => 
      String(str).split('').reverse().join('')
    );
    const combined = reversed.join('');
    let concat_string = '';
    for (let i = 0; i < combined.length; i++) {
      concat_string += i % 2 === 0 ? 
        combined[i].toUpperCase() : 
        combined[i].toLowerCase();
    }


    res.set({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Powered-By': 'Express'
    });

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).json({
      is_success: false,
      user_id,
      error: 'Internal server error'
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    user_id,
    error: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({
    is_success: false,
    user_id,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});