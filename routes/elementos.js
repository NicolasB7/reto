const express = require("express");
const router = express.Router();

const { save_element, get_elements, update_element, eliminar_elemento } = require('../controller/elementos-controller.js')

router.get('/', get_elements);

router.post('/', save_element);

router.put('/', update_element);

router.delete('/', eliminar_elemento)


module.exports = router