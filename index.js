//Configuracion del servidor
const express = require('express');

const port = 8000;
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

//Hablitar body-parser y express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Cors permite  que un cliente se conecte a otro serividor
const cors=require('cors');
//Importando rutas
const routes=require('./routes');    

//configurando base de datos
const mongoDB='mongodb://localhost/CRM'
mongoose.Promise=mongoose.Promise;
//conect base de datos
mongoose.connect(mongoDB,{
    useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex: true
});

app.use(cors());
//Usando rutas del sevidor
app.use('/',routes());

//Puerto
app.listen(port, () => console.log(`Example app listening on port8000!`));