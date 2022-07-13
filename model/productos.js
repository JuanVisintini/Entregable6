const database = require('../bd/bd');


const createProductoTable = async () => {
    try {
        await database.schema.dropTableIfExists('product')

        await database.schema.createTable('products', productsTable => {
            productsTable.increments('id').primary()
            productsTable.string('title', 50).notNulleable
            productsTable.integer('price').notNulleable
            productsTable.string('thumbnail', 50).notNulleable
        })
    } catch (e) {
        console.log(e);
    }
}

const insertProductos = async () => {
    try {

    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    createProductoTable,

}