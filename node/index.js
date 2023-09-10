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

const createTale = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(256),  primary key(id) )`;
connection.query(createTale);

const query = `INSERT IGNORE INTO people(name) VALUES('Vinicius')`;
connection.query(query);
connection.end();

app.get('/', async (req,res) =>{
   
    async function runAsync (res) {
        await new Promise(function(resolve, reject) {
        let con = mysql.createConnection(config);
        con.query( `SELECT name FROM people`, (err, result, fields) => {

            let body = '<h1>Full Cycle!!</h1>';
            body += '<h3>Lista de pessoas</h3>';
            body += '<ul>';

            if (err) {
                 body += `<span style='color: red'> Falha na conexão com o BD. </span>`;
                 body += "</ul>"
                 throw err;
            }

            result.forEach(people => {
                body += '<li>';
                body += people.name;
                body += '</li>';
            });

            
            body += '</ul>';

            res.send( body );

            });


            con.end();
        });
    }

    runAsync(res);
})

app.listen(port,() =>{
    console.log('Rodando na porta: ' + port)
})