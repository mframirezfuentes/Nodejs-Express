const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')

const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler}= require('./middlewares/errorHandler')


const app = express()
const port = 3000

app.use(express.json());

const whitelist =['http://localhost/8080', 'https://myapp.com']
const options ={
  origin: (origin, callback)=>{
    if(whitelist.includes(origin)|| !origin){
      callback(null, true)
    }else{
      callback(new Error('no permitido') )
    }

  }
}
app.use(cors(options))

app.get("/", (req, res) => {
  res.send('Hola mi server en express')
})

app.get("/nueva-ruta", (req, res) => {
  res.send('Hola nueva ruta')
})

routerApi(app)

//Middlewares
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, () => {
  console.log("Escuchando el puerto" + port);
})

