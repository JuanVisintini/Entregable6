const createTable = require(`../bd/table_productos`);
class Contenedor {
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
        if(e.code === 'ER_NO_SUCH_TABLE'){
            await createTable.createTableProductos();
            await this.database(this.table).insert(object);
            const id = await this.database(this.table).select('id').max('id');

            return id;
        }else{
            console.log(`Error al insertar el producto: ${e.message}`)

        }
    }
  }

    async getAll() {
        try {
           const objetos = await this.database.from(this.table).select('*');
            return objetos;
        }
        catch (e) {
           return [];
        }
    }

}

module.exports = { 
    Contenedor: Contenedor,
};