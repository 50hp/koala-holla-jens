const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req,res) => {
    console.log('request for koalas');
    let queryText = `SELECT * FROM "koala_library"
                     ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
        console.log('sending over rows', result.rows);
    }).catch((err) => {
        console.log('request for koalas failed');
        res.sendStatus(500);
    });
});

// POST
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body
    console.log(newKoala)
    const queryText = `
    INSERT INTO "koala_library" ("name", "age", "gender", "readyToTransfer", "notes")
    VALUES ($1,$2,$3,$4,$5);`

    const values = [newKoala.kName,newKoala.kAge,newKoala.kGender,newKoala.kReadyTrans,newKoala.kNotes];
    pool.query(queryText,values)
    .then(result => {
        res.sendStatus(201)
}).catch(error => {
            console.log('Query text is:', queryText, 'Our Error is:', error)
            res.sendStatus(500)
        })
});

// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log( 'got to put')
    // res.send('WE DID IT')

    let idToUpdate = req.params.id;

    let readyToTransfer = req.body.readyToTransfer

    let queryText = '';

    if (readyToTransfer === 'false' ){
        queryText = `UPDATE "koala_library" 
        SET "readyToTransfer" = true
        WHERE "id" = $1;`
    }else{
        queryText = `UPDATE "koala_library"
                    SET "readyToTransfer" = false
                    WHERE "id"=$1;`
    }

    pool.query(queryText, [idToUpdate])
    .then(result => {
        console.log('koala UPDATED', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making PUT query', error);
        res.sendStatus(500);
    })
})

// DELETE

module.exports = koalaRouter;
