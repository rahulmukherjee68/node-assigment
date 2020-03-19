const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');



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
    try {
        const number = req.params.number;
        const resarr = prime(number);
        if(resarr.length==0)
        {
            res.status(200).json({
                "prime": "No prime numbers are there!"
            }); 
        }
        res.status(200).json({
            "prime": resarr
        });

    }
    catch (err) {

        res.status(422).json({ message: err });

    }
});

module.exports = router;