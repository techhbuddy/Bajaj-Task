


const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


const FULL_NAME = (process.env.FULL_NAME || 'harshit maroo').toLowerCase();
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || '09102004';
const EMAIL = process.env.EMAIL || 'hm1240009@gmail.com';
const ROLL_NUMBER = process.env.ROLL_NUMBER || '22BIT0320';


app.use(express.static(path.join(__dirname, '..', 'public')));


app.use(express.json());


app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
    
        if (!data || !Array.isArray(data)) {
            return res.status(200).json({
                is_success: false,
                user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
                email: EMAIL,
                roll_number: ROLL_NUMBER,
                error: "Invalid input: 'data' field must be a non-empty array."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let concat_alphabets = '';

        data.forEach(item => {
            const trimmedItem = String(item).trim();

            if (!trimmedItem) {
                return; // Skip empty strings
            }

        
            if (/^-?\d+$/.test(trimmedItem)) {
                const num = parseInt(trimmedItem, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(trimmedItem);
                } else {
                    odd_numbers.push(trimmedItem);
                }
            }
     
            else if (/^[A-Za-z]+$/.test(trimmedItem)) {
                alphabets.push(trimmedItem.toUpperCase());
                concat_alphabets += trimmedItem;
            }
            // All other characters are special characters
            else {
                special_characters.push(trimmedItem);
                
                
                const chars = trimmedItem.match(/[A-Za-z]/g);
                if(chars) {
                    concat_alphabets += chars.join('');
                }
            }
        });

        let final_concat_string = '';
        const reversed_alphabets = concat_alphabets.split('').reverse();
        reversed_alphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                final_concat_string += char.toUpperCase();
            } else {
                final_concat_string += char.toLowerCase();
            }
        });

        const response = {
            is_success: true,
            user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum), // Sum must be a string
            concat_string: final_concat_string
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(200).json({
            is_success: false,
            user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            error: error.message
        });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

