const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET


// POST
router.post('/', (req, res) => {
    const newKoala = req.body

    const queryText = `
    INSERT INTO "koala_library" ("name", "age", "gender", "readyToTransfer", "notes")
    VALUES ($1,$2,$3,$4,$5);`

    const values = [newKoala.name,newKoala.age,newKoala.gender,newKoala.readyToTransfer,newKoala.notes,];
    pool.query(queryText,values)
    .then(result => {
        
}).catch(error => {
            console.log('Query text is:', queryText, 'Our Error is:', error)
            res.sendStatus(500)
        })
});

// PUT


// DELETE

module.exports = koalaRouter;