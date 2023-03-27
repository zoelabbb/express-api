const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

// Import database
const connection = require('../config/database');

/** 
 * Index Posts 
 * METHOD: GET
 */
router.get('/', (req, res) => {
    //query DB
    connection.query('SELECT * FROM posts ORDER BY id desc', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts 👇',
                data: rows
            })
        }
    });
});

/**
 * Store Post
 * METHOD: POST
 */
router.post('/store', [

    //validation
    body('title').notEmpty(),
    body('content').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // insert query
    connection.query('INSERT INTO posts SET ?', formData, (err, rows) => {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error 🤔',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully 👍🏻',
                data: rows[0]
            })
        }
    })

});

/**
 * Get by ID
 * METHOD: GET
 */
router.get('/(:id)', (req, res) => {

    let id = req.params.id;

    connection.query(`SELECT * FROM posts WHERE id = ${id}`, (err, rows) => {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error 🤔',
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found 😩',
            })
        }
        // if post found
        else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post 👇',
                data: rows[0]
            })
        }
    })
})

/**
 * Update data
 * METHOD: PATCH
 */
router.patch('/update/:id', [

    //validation
    body('title').notEmpty(),
    body('content').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id post
    let id = req.params.id;

    //data post
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // update query
    connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully 😍!'
            })
        }
    })

});


/**
 * Delete data
 * METHOD: DELETE
 */
router.delete('/delete/(:id)', function(req, res) {

    let id = req.params.id;
     
    connection.query(`DELETE FROM posts WHERE id = ${id}`, function(err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully 😬!',
            })
        }
    })
});

module.exports = router;