const express = require('express')
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTale = `CREATE TABLE people(id int not null auto_increment, name varchar(256),  primary key(id) )`;
connection.query(createTale);

const query = `INSERT INTO people(name) VALUES('Vinicius')`;
connection.query(query);
connection.end();

app.get('/', (req,res) =>{

    let body = '<h1>Full Cycle!!</h1>';
    body += '<h3>Lista de pessoas</h3>';
    body += '<ul>';

    let con = mysql.createConnection(config);

    con.query( `SELECT name FROM people`, (err, result, fields) => {
                if (err) throw err;

                result.forEach(people => {
                    body += '<li>';
                    body += people.name;
                    body += '</li>';
                });
            });
    
    con.end();

    body += '</ul>';

    res.send( body );
})

app.listen(port,() =>{
    console.log('Rodando na porta: ' + port)
})