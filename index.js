//! lo que quiero 

//? 1. requerir express 
const express = require('express');
// const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const { request, response } = require('express');

//! valores iniciales o por defecto 
dotenv.config();

const app = express(); //? inicialisar server 
const port = process.env.SERVER_PORT; //? sets port 
/* 
nombre,
precio,
descripcion,
categoria,
ID
*/

const dishesList = [
  {
    name: " Pupusas ",
    price: 2.00,
    description: " tortia fill with meat,cheese & beans ",
    type: " not vegan ",
    id: 1,
  },
  {
    name: " burger ",
    price: 4.00,
    description: " bon with lettuce,tomato, steak patty & cheese ",
    type: "not vegan",
    id: 2,
  },

]; //? array para una lista de platillos
var lastId = 2; //? contador de id 

const findById = (id) => {
  //  var id = request.params.identificador;
  //  array.forEach(element => {
  //! no usar porque no se puede detener el proceso
  //  });
  var found = null;
  for (const platillo of dishesList) {
    if (platillo["id"] == id) {
      found = platillo;
      break;
    }
  }
  return found;
};


const findPositionById = (id) => {
  var index = 0;
  var found = null;
  for (const platillo of dishesList) {
    if (platillo["id"] == id) {
      found = index;
      break;
    }
    index++
  }
  if (found != null)
    return found
  return -1;
};



//! proceso o estructura 
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//? health check 
app.get("/status", (req, res) => {
  res.status(200)
    .json({
      "done": "true",
      "api": {
        "name": "express-api-clase",
        "version": "v1",
        "owner": "carlos cordova",
        "dev": "carlos dev"
      },
      "services": {

        "database": "error de conexion"

      }

    });
});

/* //! protocolo HTTP
* que recurso  - PLATILLO
* que metodo - GET
* que datos de entrada requiere? -  N\A
* que debe responder ? lista con todos los dishes del menu
*/

//? GET  ALL PLATILLOS
app.get("/platillos", (request, response) => {
  response.json({
    quantity: dishesList.length,
    items: dishesList
  });
});

/* //! protocolo HTTP
* que recurso  - PLATILLO
* que metodo - GET
* que datos de entrada requiere? -  id (param or path)
* que debe responder ? obtener un platillo por id 
*/

//? GET PLATILLOS:/id
app.get("/platillos/:identificador", (request, response) => {
  var id = request.params.identificador;
  //  array.forEach(element => {
  //! no usar porque no se puede detener el proceso
  //  });
  var found = null;
  for (const platillo of dishesList) {
    if (platillo["id"] == id) {
      found = platillo;
      break;
    }
  }
  response.json({
    done: !(found == null),
    item: found
  });
});


/* //! protocolo HTTP
* que recurso  - PLATILLO
* que metodo - POST
* que datos de entrada requiere? -  /
* que debe responder ? AGREGAR UN PLATILLO 
*/
//? post  /PLATILLOS/ 
app.post('/platillos/', (request, response) => {
  lastId++;
  let info = request.body;
  nuevoPlatillo = {
    name: info.name,
    price: info.price,
    description: info.description,
    type: info.type,
    id: lastId,

  };
  dishesList.push(nuevoPlatillo);
  response.json({
    done: true,
    item: nuevoPlatillo,
  });
});

app.put("/platillos/:id", (req, res) => {
  var platillo = findById(req.params.id);
  if (platillo) {
    platillo["price"] = req.body.price;
  };
  response.json({
    done: !(found == null),
    id: req.params.id,
    data: req.body
  });
});
app.delete("/platillos/:id", (req, res) => {
  var position = findPositionById(req.params.id);
  var deleted = false;
  var positionIndex = dishesList.findIndex(platillo => platillo.id == req.params.id);
  if (position != -1 ){
    dishesList.splice(position,1);
    deleted = true;
  };
  res.json({
    done: deleted,
    id:req.params.id
  })
});

//!consumo
app.listen(port, () => {
  console.log(`runing server on http://localhost:${port}`);
});


//* notas
// request.query //? GET /PLATILLO?CATEGORIA=SNANCK -> QUERY PARAM
// request.params //? GET PLATILLO/2   -> PATH PARAM
// request.body //? post /platillo/ ....... -> data param




