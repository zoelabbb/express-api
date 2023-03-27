const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3000;


// Import route posts
const postsRouter = require("./routes/posts")

// Import body-parser
/** Lib body-parser = library midleware untuk membaca data yg 
dikirim oleh HTTP POST & disimpan menjadi object JS dan dapat di akses melalui req.body*/
const bodyParser = require("body-parser")

// Import cors
/**
 * Lib CORS = 
 */
const cors = require("cors")


app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api/posts', postsRouter) // URL API

app.listen(port, () => {
    console.log(`Berjalan di port http://localhost:${port}`)
})