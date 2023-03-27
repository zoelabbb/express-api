let mysql = require('mysql'); // Import lib mysql terlebih dahulu


// Membuat koneksi ke database
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest_db_apijs',
})

// Membuat kondisi, tersambung oleh DB / tidak.
connection.connect( function(error){
    if (!!error) {
        console.log(error); // Jika error, maka akan muncul error
    } else {
        console.log('Connected to Database ⚡️'); // Jika tersambung maka muncul ini
        console.log('Happy testing ✨'); // Jika tersambung maka muncul ini
    }
})

module.exports = connection; // Agar dapat memanggil module ini ke dalam file lain