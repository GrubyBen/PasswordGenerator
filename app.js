const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

function generatePassword(length, options) {
    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        specials: '#$&*()[]{};:,.<>?@!'
    };

    let characters = '';
    if (options.uppercase) characters += charSets.uppercase;
    if (options.lowercase) characters += charSets.lowercase;
    if (options.numbers) characters += charSets.numbers;
    if (options.specials) characters += charSets.specials;

    if (characters.length === 0) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/generate', (req, res) => {
    const length = parseInt(req.body.length);
    const options = {
        uppercase: req.body.uppercase,
        lowercase: req.body.lowercase,
        numbers: req.body.numbers,
        specials: req.body.specials
    };

    const password = generatePassword(length, options);
    res.json({ password: password });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
