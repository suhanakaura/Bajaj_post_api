const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
 
const user_id = 'suhana_kaura_24042005';           
const email = 'suhana2414.be22@chitkara.edu.in';
const roll_number = '2210992414';

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    console.log(data)
    if (!Array.isArray(data)) {
      throw new Error('Invalid input: "data" must be an array');
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

     data.forEach(rawItem => {
      let item = typeof rawItem === 'string' ? rawItem : String(rawItem);
      const chars = item.split('');

      const isDigit = ch => ch >= '0' && ch <= '9';
      const isAlphabet = ch => {
        const lower = ch.toLowerCase();
        return lower >= 'a' && lower <= 'z';
      };

      if (chars.every(isDigit)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);

      } else if (chars.every(isAlphabet)) {
        alphabets.push(item.toUpperCase());

      } else {
        special_characters.push(item);
      }
    });


    const inputAlphabetItems = data.filter(item => typeof item === 'string' && /^[a-zA-Z]+$/.test(item));
    const revWords = inputAlphabetItems.reverse().map(str => str.split('').reverse().join(''));
    const combined = revWords.join('');
    let concat_string = '';
    for (let i = 0; i < combined.length; i++) {
      concat_string += (i % 2 === 0)
        ? combined[i].toUpperCase()
        : combined[i].toLowerCase();
    }

    res.status(200).json({
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      is_success: false,
      user_id: user_id,
      error: err.message
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});