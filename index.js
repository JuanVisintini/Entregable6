const express = require('express')
const { engine } = require("express-handlebars");
const path = require("path");

const app = express()

const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(expressServer)




app.use(express.json());
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


const {  Contenedor  } = require('./model/productos')
const { ContenedorChat } = require('./model/chat')

const chatbd = require('./bd/bd').databaseConnection;
const productoBaseDato = require('./bd/bd').databaseConectionMysql;

const productodb = new Contenedor(productoBaseDato, 'producto')
const chatBd = new ContenedorChat(chatbd, 'mensajes')


io.on('connection', async (socket) => {
    console.log(`se conecto el usuario: ${socket.id}`)
    let productos = await productodb.getAll()
    let mensajes = await chatBd.getAll()

    socket.emit('leerProducto', productos)
    socket.emit('leerMensaje', mensajes)

    socket.on('nuevoProducto', async (productoInfo) => {
      await productodb.insertObject(productoInfo);
      productos = await productodb.getAll()

      io.emit('leerProducto', productos)
    })

    socket.on('nuevoMensaje', async (messageInfo) => {
        await chatBd.insertObject(messageInfo);
        mensajes = await chatBd.getAll()

        io.emit('leerMensaje', mensajes)
    })
})

