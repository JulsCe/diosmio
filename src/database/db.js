import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'juls',
    password: 'juls',
    database: 'redca'
});

connection.connect((error) => {
    if(error) {
        console.log('hay un error' + error);
        return error;
    }
        console.log('Connected a la base de datos');
});

export default connection;