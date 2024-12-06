const crypto = require('crypto');

// Генерация случайной строки длиной 32 байта и преобразование в Base64
const secret = crypto.randomBytes(32).toString('base64');

// Выводим ключ в консоль
console.log('Generated Secret Key:', secret);
