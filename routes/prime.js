const express = require('express');
const router = express.Router();


function isPrime(n) {
    if (n <= 1)
        return false;
    if (n <= 3)
        return true;

    if (n % 2 == 0 || n % 3 == 0)
        return false;

    for (let i = 5; i * i <= n; i = i + 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }

    return true;
}

function prime(number) {
    let j = 0;
    arr = [];
    for (let i = 1; i <= number; i++) {
        if (isPrime(i)) {
            arr[j++] = i;
        }
    }
    return (arr);
}

router.get('/:number', (req, res, next) => {
    const number = req.params.number;
    const resarr = prime(number);
    res.status(200).json({
        "prime": resarr
    });
});

module.exports = router;