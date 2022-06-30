const fs = require('fs');

class Producto {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }

    save = async (object) => {
        try{
            let  arrayObject = [];
            
            if(fs.existsSync(this.nombreArchivo)) {
                const allData = await this.getAll();
                const id = allData[allData.length - 1].id + 1;
                object.id = id;
                allData.push(object);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(allData));
                return object.id
            }
            else{
                object.id = 1
                arrayObject.push(object);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrayObject));
                return object.id
            }
        }
        catch(e){
            console.log(`Error al insertar un producto: ${e.message}`)
        }
    }

    getAll = async () => {
        try{
            let data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(data);
        }
        catch(e){
            console.log(`Error al mostrar los producto: ${e.message}`)
            return [];
        }
    }
}


module.exports = Producto;