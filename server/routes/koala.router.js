const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req,res) => {
    console.log('request for koalas');
    let queryText = `SELECT * FROM "koala_library";`;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
        console.log('sending over rows');
    }).catch((err) => {
        console.log('request for koalas failed');
        res.sendStatus(500);
    });
});

// POST


// PUT


// DELETE

module.exports = koalaRouter;
