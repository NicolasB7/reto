//importacion de mariadb
const pool = require('../config/mariadb.js');

//importacion de helpers
const unixTimestamp = require('../helpers/unix.js');

const save_carrera = async (req, res) => {
    const {nombre, duracion} = req.body;
    
    if (nombre === '' || duracion === null) {
        res.status(500).json({
            'ok': false,
            'mensaje': 'hay un espacio en blanco'
        });
        return;
    }
    if (typeof(nombre) !== "string") {
        res.status(500).json({
            'ok': false,
            'mensaje': 'El nombre debe ser de tipo String'
        });
        return;
    }
    if (typeof(duracion) !== "number") {
        res.status(500).json({
            'ok': false,
            'mensaje': 'La duracion debe ser de tipo Number'
        });
        return;
    }
    
    await pool.getConnection().then( async (conn) => {
        const data = [nombre, duracion];
        
        try{
            const query = await conn.query("INSERT INTO carrera(nombre, duracion) VALUES(?, ?)", data);
            console.log(query);
            
            res.status(201).json({
                'ok': true,
                'mensaje': 'la carrera fue registrado'
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

const save_materia = async (req, res) => {
    const {nombre, grado, ID_Carrera} = req.body;
    
    if (nombre === '' || grado === null || ID_Carrera === null) {
        res.status(500).json({
            'ok': false,
            'mensaje': 'hay un espacio en blanco'
        });
        return;
    }
    if (typeof(nombre) !== "string") {
        res.status(500).json({
            'ok': false,
            'mensaje': 'El nombre debe ser de tipo String'
        });
        return;
    }
    if (typeof(grado) !== "number") {
        res.status(500).json({
            'ok': false,
            'mensaje': 'El grado debe ser de tipo Number'
        });
        return;
    }
    if (typeof(ID_Carrera) !== "number") {
        res.status(500).json({
            'ok': false,
            'mensaje': 'El id de la carrera debe ser de tipo Number'
        });
        return;
    }
    
    await pool.getConnection().then( async (conn) => {
        const data = [nombre, grado, ID_Carrera];
        
        try{
            const b_carrera = await conn.query("SELECT * FROM carrera WHERE ID_Carrera = ?", ID_Carrera);
            const id = b_carrera.find(b_carrera => b_carrera.ID_Carrera === ID_Carrera).ID_Carrera;

            if (id === ID_Carrera) {
                try {
                    const query = await conn.query("INSERT INTO materia(nombre, grado, ID_Carrera) VALUES(?, ?, ?)", data);
                    console.log(query);
                    
                    res.status(201).json({
                        'ok': true,
                        'mensaje': 'la materia fue registrado'
                    })
                    conn.end();
                } catch (error) {
                    res.status(500).json({
                        'ok': false,
                        'mensaje': 'algo salio mal'
                    })
                    conn.end();
                }
            }
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'La carrera no existe'
            })
            conn.end();
        }
    });
}

const save_grupo = async (req, res) => {
    const {ID_Grupo, nombre, grado} = req.body;
    
    if (nombre === '' || grado === null) {
        res.status(500).json({
            'ok': false,
            'mensaje': 'hay un espacio en blanco'
        });
        return;
    }
    if (typeof(nombre) !== "string") {
        res.status(500).json({
            'ok': false,
            'mensaje': 'El nombre debe ser de tipo String'
        });
        return;
    }
    if (typeof(grado) !== "number") {
        res.status(500).json({
            'ok': false,
            'mensaje': 'El grado debe ser de tipo Number'
        });
        return;
    }
    
    await pool.getConnection().then( async (conn) => {
        
        try{
            const id = await conn.query("SELECT * FROM grupo");
            const ids = id.map(id => id.ID_Grupo);
            maxId = Math.max(... ids);
            maxId++;
            const data = [maxId, nombre, grado];
            const query = await conn.query("INSERT INTO grupo(ID_Grupo,Nombre, Grado) VALUES(?, ?, ?)", data);
            console.log(query);
            
            res.status(201).json({
                'ok': true,
                'mensaje': 'El grupo fue registrado'
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

const save_horario = async (req, res) => {
    const {hora, dia, ID_Grupo, ID_Materia} = req.body;
    console.log(hora, dia, ID_Grupo, ID_Materia);
    
    if (hora === null || dia === null || ID_Grupo === null || ID_Materia === null) {
        res.status(500).json({
            'ok': false,
            'mensaje': 'hay un espacio en blanco'
        });
        return;
    }
    /*if (typeof(hora) === "number" || typeof(dia) === "number" || typeof(ID_Grupo) === "number" || typeof(ID_Materia) === "number") {
        res.status(500).json({
            'ok': false,
            'mensaje': 'Algun dato no es de tipo Number'
        });
        return;
    }*/
    
    await pool.getConnection().then( async (conn) => {
        const data = [hora, dia, ID_Grupo, ID_Materia];
        
        try{
            const b_materia = await conn.query("SELECT * FROM materia");
            const b_materia2 = b_materia.map(b_materia => b_materia.ID_Materia); 
            const id_materia = b_materia2.find(x => x === ID_Materia);
            console.log(id_materia);

            const b_grupo = await conn.query("SELECT * FROM grupo");
            const b_grupo2 = b_grupo.map(b_grupo => b_grupo.ID_Grupo);
            const id_grupo = b_grupo2.find(y => y === ID_Grupo);

            if (id_materia === undefined) {
                res.status(500).json({
                    'ok': false,
                    'mensaje': 'La materia no existe'
                })
                conn.end();
                return;
            }
            if (id_grupo === undefined) {
                res.status(500).json({
                    'ok': false,
                    'mensaje': 'El grupo no existe'
                })
                conn.end();
                return;
            }
            console.log('Todo bien');

            const query = await conn.query("INSERT INTO horario(hora, dia, ID_Grupo, ID_Materia) VALUES(?, ?, ?, ?)", data);
            console.log(query);
                
            res.status(201).json({
                'ok': true,
                'mensaje': 'la materia fue registrado'
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
    const {nombre, grado} = req.body;
    await pool.getConnection().then( async (conn) => {
        const data = [nombre, grado];
        try{
            const query = await conn.query("SELECT m.nombre, g.grado, h.hora, h.dia FROM materia m INNER JOIN horario h ON m.ID_Materia = h.ID_Horario INNER JOIN grupo g ON h.ID_Grupo = g.ID_Grupo WHERE g.nombre = ? AND g.grado = ?", data);
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
    const {nombre, id} = req.body;

    /*pool.getConnection().then( async (conn) => {
        try{
            const query = await conn.query("SELECT ID_Carrera FROM carrera");
            const id_b = query.find(query => query.ID_Carrera === Number(id));
            if (id !== id_b) {
                res.status(500).json({
                    'ok': false,
                    'mensaje': 'id no existe'
                })
            }
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });*/

    await pool.getConnection().then( async (conn) => {
        try{

            const data = [nombre, id];
            const query = await conn.query("UPDATE carrera SET nombre = ? WHERE ID_Carrera = ?", data);
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
    save_carrera,
    save_materia,
    save_horario,
    save_grupo,
    get_elements,
    update_element,
    eliminar_elemento
}