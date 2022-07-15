const database = require('./bd');

const createTableMensaje = async () => {
    try{
        await database.databaseConnection.schema.createTable('mensajes', table => {
            table.increments('id').primary();
            table.string('mail', 100).notNullable();
            table.string('mensaje', 200).notNullable();    
            table.string('date', 200).notNullable();
    });
    
        console.log('Tabla Mensajes creada');
    }catch(e){
        console.log(e.message);
    }

}

module.exports = {
    createTableMensaje
}