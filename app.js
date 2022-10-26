const express = require("express");
const { Client } = require("pg");
const dotenv = require("dotenv");
//creacion del cliente y el get
const app = express();
const client = new Client();
let geoss = [];
let feature;
let geoJ = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordenates: [0.0, 0.0],
  },
  properties: {
    direccion: "",
    id: 0,
  },
};
let gVar = [];
dotenv.config();

// CONECCION A LA BASE DE DATOS

const connectDb = async () => {
  try {
    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "postgres",
      port: 5433,
    });

    await client.connect();
    const res = await client.query("select * from pruebas");
    feature = JSON.stringify(res);
    feature = JSON.parse(feature);
    let array = feature.rows;
    for (let i = 0; i < array.length; i++) {
      geoJ.geometry.coordenates[0] = parseFloat(feature.rows[i].x);
      geoJ.geometry.coordenates[1] = parseFloat(feature.rows[i].y);
      geoJ.properties.direccion = feature.rows[i].direccion;
      geoJ.properties.id = feature.rows[i].id;
      geoss.push(geoJ);
    }
    //console.log(geoJ.geometry.coordenates);
    console.log(geoss[0]);
    gVar.push(res);
    await client.end();
  } catch (error) {
    console.log(error);
  }
};

connectDb().then((result) => {});

//puerto get
const port = 3000;
app.get(
  "/JonYDanielselacomen",
  function (req, res) {
    for (let i = 0; i < 15; i++) {
      /*
      geoJ.properties.direccion = feature.rows[i].direccion;
      geoJ.properties.id = feature.rows[i].id;
      geoss.push(geoJ);*/
    }
  }
  // res.send(gVar)
  // console.log(gVar);
);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
