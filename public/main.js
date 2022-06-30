const socket = io()

const createProducto = () => {
    try{
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const thumbnail = document.getElementById('thumbnail').value;

        const product = {title, price, thumbnail};

        socket.emit("nuevoProducto", product)
        console.log(product);
    }
    catch(e){
        console.log(e)
    }
}

socket.on("leerProducto", (allProducto) => {
    if(allProducto.length > 0){
        document.getElementById("tbodyProductos").innerHTML = "";
        document.getElementById("divErrors").innerHTML = "";
        for (let i = 0; i < allProducto.length; i++) {
            let producto = allProducto[i];
            let productoHTML = `
            <tr>
               <td>${producto.title}</td>
               <td>${producto.price}</td>
               <td><img style="width: 50px; height:50px" src=${producto.thumbnail} alt=""></td>
            </tr>
            `
            document.getElementById("tbodyProductos").innerHTML += productoHTML;
        }
    }else{
        document.getElementById("divErrors").innerHTML = "<h1>No hay Productos</h1>";
    }
})


const createMessage = () =>{
    try{
     const mail = document.getElementById('mail').value;
     const mensaje = document.getElementById('mensaje').value;
     let date = new Date().toLocaleDateString();
     let time = new Date().toLocaleTimeString();

     const message = {mail, mensaje, date: date + " " + time};

     socket.emit("nuevoMensaje", message);
     console.log(message)
    }catch(e){
        console.log(e)
    }
    
}

socket.on("leerMessage", (allMessage) => {
    if(allMessage.length > 0){
        document.getElementById("messagesForm").innerHTML = "";
        console.log(mensaje)
        for (let i = 0; i < allMessage.length; i++) {
            let mensaje = allMessage[i];
            let mensajeHTML = `
            <p> 
            <spam style="color:blue">${mensaje.mail}</spam>
            <spam style="color:red">${mensaje.date}</spam> :
            <spam style="color:green">${mensaje.mensaje}</spam>
            </p>`
            document.getElementById("messagesForm").innerHTML += mensajeHTML;
        }
    }else{
        document.getElementById("messagesForm").innerHTML = "<h1>No hay Mensajes</h1>";
    }

})