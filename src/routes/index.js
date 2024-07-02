import { Router } from "express";



const router = Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'REDCA - Inicio'});
});

router.get('/about', (req, res) => {
    res.render('about', {title: "REDCA - Sobre nosotros"});
});

router.get('/contact', (req, res) => {
    res.render('contact', {title: "REDCA - Contáctanos"});
});

router.get('/verificar_usuario', (req, res) => {
    res.render('verificar_usuario', {title: "REDCA - Gestion de usuario"});
});

router.get('/usuario_no_encontrado', (req, res) => {
    res.render('usuario_no_encontrado', {title: "REDCA - Gestion de usuario"});
});

router.get('/usuario_encontrado', (req, res) => {
    res.render('usuario_encontrado', {title: "REDCA - Gestion de usuario"});
});

router.get('/buscar_usuario', (req, res) => {
    res.render('buscar_usuario', {title: "REDCA - Gestion de usuario"});
});

router.get('/cambio_clave', (req, res) => {
    res.render('cambio_clave', {title: "REDCA - Gestion de usuario"});
});

router.get('/sesion_iniciada', (req, res) => {
    res.render('sesion_iniciada', {title: "REDCA - Sesión de Administrador"});
});

router.get('/clave_incorrecta', (req, res) => {
    res.render('clave_incorrecta', {title: "REDCA - Validación"});
});

router.get('/registro_exitoso', (req, res) => {
    res.render('registro_exitoso', {title: "REDCA - Registro"});
});

router.get('/usuclave_incorrecta', (req, res) => {
    res.render('usuclave_incorrecta', {title: "REDCA - Validación"});
});

router.get('/te_jodiste', (req, res) => {
    res.render('te_jodiste', {title: "REDCA - Te jodiste"});
});

export default router;