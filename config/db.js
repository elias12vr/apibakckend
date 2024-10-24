const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/TiendadeMangas';

mongoose.connect(MONGO_URI)
.then(()=> {
    console.log('Conexion exitosa a MongoDB');
})
.catch((error)=>{
    console.error('Error al conectar con MongoDb:', error);
})