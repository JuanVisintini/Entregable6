const express = require('express')
const { engine } = require("express-handlebars");
const path = require("path");

const app = express()

const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(expressServer)

const Producto = require("./model/Producto")
const contenedorMessage = new Producto("message.json");
const contenedorProducto = new Producto("productos.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main-layout.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
  }))

app.set("view engine", "hbs");
app.set("views", "./views");

app.get('', (req, res) => {
    res.redirect("/api/productos")
})

app.get("/api/productos", (req, res) => {
    res.render("form")
}) 


io.on('connection', async (socket) => {
    console.log(`se conecto el usuario: ${socket.id}`)
    socket.emit('leerMessage', await contenedorMessage.getAll())
    socket.emit('leerProducto', await contenedorProducto.getAll()) 

    socket.on('nuevoProducto', async (productoInfo) => {
        const idProducto = await contenedorProducto.save(productoInfo)
        if(idProducto){
            io.sockets.emit('leerProdcuto', await contenedorProducto.getAll());
        }
    })

    socket.on('nuevoMensaje', async (messageInfo) => {
        const idMensaje = await contenedorMessage.save(messageInfo)
        if(idMensaje){
            io.sockets.emit('leerMessage', await contenedorMessage.getAll())
        }
        
    })
})

