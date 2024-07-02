import express from 'express';
import session from 'express-session';
import expressHandlebars from 'express-handlebars';
import expressmyconnection from 'express-myconnection';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

import bcryptjs from 'bcryptjs';
import indexRoutes from './routes/index.js';
import connection from './database/db.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

const bcrypt = bcryptjs;

const conexion = connection;

dotenv.config((__dirname + './database/db.js'));
dotenv.config({path: '/env/.env'});

app.use('resources', express.static('public'));
app.use('resources', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: 'true'}));

app.use(session({
    secret: 'secret',
    resave: 'true',
    saveUninitialized: 'true',
}));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(indexRoutes);
app.use(express.static(join(__dirname, 'public')));



app.post('/verify', async (req, res) => {

    const datos = req.body;
    const usuario = datos.usuario;

    conexion.query('SELECT * FROM admins WHERE usuario = ?', [usuario], async (error, results) => {
        if (results.length>0) {
            res.redirect('/usuario_encontrado');
        }else{
            if (error) {
                console.log(error);
            }else{
                res.redirect('/usuario_no_encontrado');
            }
        }
    });

});







app.post('/login', async (req, res) => {

    const datos = req.body;
    const iniciousuario = datos.usuario;
    const inicioclave = datos.clave;
    let claveinicio = await bcrypt.hash(inicioclave, 8);

    if (iniciousuario && inicioclave) {
        conexion.query('SELECT * FROM admins WHERE usuario = ?', [iniciousuario], async (error, results) => {
            if (results.length == 0 || !(await bcrypt.compare(claveinicio, results[0].clave))){
                res.redirect('/usuclave_incorrecta');
            }else{
                res.redirect('/sesion_iniciada');
            }
        });
    }
});



app.post('/register', async (req, res) => {

    const datos = req.body;
    const nombre = datos.nombre;
    const cedula = datos.cedula;
    const correo = datos.correo;
    let clave = datos.clave;
    let confirmarclave = datos.confirmarclave;
    let nuevaclave;

    if (clave === confirmarclave) {
        nuevaclave = await bcrypt.hash(clave, 8);
    }else{
        res.redirect('/clave_incorrecta');
    }

    const presegura = datos.presegura;
    const resegura = datos.resegura;

    conexion.query('SELECT * FROM admins WHERE usuario = ?',[correo], async(error, results) => {
        if (results>0) {
            console.log('YA EXISTE ESE USUARIO');
        }else{
            conexion.query('INSERT INTO admins SET ?', {nombre:nombre, cedula:cedula, usuario:correo, clave:nuevaclave, pregunta_id:presegura, respuesta:resegura}, async(error, results) => {
                if(error) {
                    console.log(error);
                }else{
                    res.render('/registro_exitoso');
                }
            });
        }
    });
});

app.listen(3000, (req, res) => {
    console.log("servidor running in", 3000);
});