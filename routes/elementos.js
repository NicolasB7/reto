const express = require("express");
const router = express.Router();

const { save_carrera, save_materia, save_grupo, save_horario, get_elements, update_element, eliminar_elemento } = require('../controller/elementos-controller.js')

router.get('/grupo', get_elements);

router.post('/carrera', save_carrera);

router.post('/materia', save_materia);

router.post('/grupo', save_grupo);

router.post('/horario', save_horario);

router.put('/carrera', update_element);

router.delete('/', eliminar_elemento)


module.exports = router