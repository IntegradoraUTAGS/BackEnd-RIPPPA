process.env.PORT = process.env.PORT || 3000;
//Entorno de desarrollo 
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Coneccion a base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://root:ripppa123@cluster0-y1g0q.mongodb.net/RIPPPA';
} else {
    urlDB = 'mongodb+srv://root:ripppa123@cluster0-y1g0q.mongodb.net/RIPPPA';
}
process.env.URLDB = urlDB;
//FIRMA DE JASON WEB TOKEN
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//TIEMPO EN EL QUE EXPIRA EL TOKEN
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';