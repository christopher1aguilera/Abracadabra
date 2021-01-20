const express = require("express")
const app = express()
const fs = require("fs")
// const usuarios = {"usuarios":["juan", "jocelyn", "astrid", "Maria", "javier", "brian"]}
let usuariosJSON = JSON.parse(fs.readFileSync(__dirname + "/db/usuarios.json", "utf8"));

app.listen(3000, ()=>{
    console.log("servidor levantado")
})

app.use(express.static("assets"))
app.get("/abracadabra", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.get("/abracadabra/usuarios", (req, res)=>{
    res.sendFile(__dirname + "/db/usuarios.json")
})


app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const {usuario} = req.params
    const autorizacion = (usuariosJSON.usuarios).filter(e => e == usuario)
    console.log(autorizacion)
    usuario == autorizacion ? next() : res.sendFile(__dirname + "/assets/who.jpeg")
})
app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.send("Existe nombre")
    });

app.use("/abracadabra/conejo/:n", (req, res, next) => {
    const {n} = req.params
    const aleatorio = parseInt((Math.random()*4)+1)
    console.log(n)
    console.log(aleatorio)
    n == aleatorio ? next() :     res.sendFile(__dirname + "/assets/voldemort.jpg")
    // res.send(`<h1>perdiste</h1><img src="${__dirname}/assets/voldemort.jpg">`)
})
app.get("/abracadabra/conejo/:n", (req, res) => {
    // res.send(`<h1>ganaste</h1><img src="${__dirname}/assets/voldemort.jpg">`)
    res.sendFile(__dirname + "/assets/conejito.jpg")
    });

app.get("*", (req, res) => {
    res.send('<p style="color:red">La dirección que estás consultando no existe </p>');
    });
    