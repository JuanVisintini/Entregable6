const createTable = require(`../bd/table_message`);

class ContenedorChat {
    constructor(database, table) {
        this.database = database;
        this.table = table;
    }

   async insertObject(object) {
    try {
        await this.database(this.table).insert(object);
        const id = await this.database(this.table).select('id').max('id');

        return id;
    }
    catch (e) {
        if(e.code === 'SQLITE_ERROR'){
            await createTable.createTableMensaje();
            await this.database(this.table).insert(object);
            const id = await this.database(this.table).select('id').max('id');

            return id;
        }else{
            console.log(`Error al insertar el mensaje: ${e.message}`)

        }
    }
  }

    async getAll() {
        try {
           const objetos = await this.database.from(this.table).select('*');
           console.log(objetos, 'objetos')
            return objetos;
        }
        catch (e) {
             return [];
        }
    }

}

module.exports = { 
    ContenedorChat: ContenedorChat,
};