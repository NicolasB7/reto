//importacion de mariadb
const pool = require('../config/mariadb.js');

//importacion de helpers
const unixTimestamp = require('../helpers/unix.js');

const save_element = async (req, res) => {
    const {nombre} = req.body;
    console.log(nombre);
    
    await pool.getConnection().then( async (conn) => {
        const data = [nombre, unixTimestamp(), unixTimestamp() + 600];
        try{
            const query = await conn.query("INSERT INTO elemento(nombre, fecha_registro, fecha_vencimiento) VALUES(?, ?, ?)", data);
            console.log(query);
            
            
            res.status(201).json({
                'ok': true,
                'mensaje': 'el elemento fue registrado'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}

const get_elements = async (req, res) => {
    await pool.getConnection().then( async (conn) => {
        try{
            const query = await conn.query("SELECT * FROM elemento WHERE fecha_vencimiento > ?", [unixTimestamp()]);
            res.status(200).json(query);
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}

const update_element = async (req, res) => {
    await pool.getConnection().then( async (conn) => {
        try{
            const data = [req.body.nombre, unixTimestamp() + 600, req.body.nombre_anterior];
            const query = await conn.query("UPDATE elemento SET nombre = ?, fecha_vencimiento = ? WHERE nombre = ?", data);
            res.status(201).json({
                'ok': true,
                'mensaje': 'el elemento fue actualizado'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}

const eliminar_elemento = async (req, res) => {
    await pool.getConnection().then( async (conn) => {
        try{
            const query = await conn.query("DELETE FROM elemento WHERE nombre = ?", [req.body.nombre]);
            res.status(200).json({
                'ok': true,
                'mensaje': 'el elemento fue eliminado'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}

module.exports = {
    save_element,
    get_elements,
    update_element,
    eliminar_elemento
}