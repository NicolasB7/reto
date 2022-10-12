const express = require('express');
const app = express();
require('dotenv').config();



app.listen(process.env.NODE_PORT, () => {
    console.log("servidor corriendo en puerto: "+process.env.NODE_PORT);
});

//middleware para trabajar con json
app.use(express.json());


//ruta elementos
app.use('/v1/elemento', require('./routes/elementos'));