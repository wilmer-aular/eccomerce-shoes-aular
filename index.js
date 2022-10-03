const express = require("express");
const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const handlebars = require('express-handlebars');

var path = require("path");
global.appRoot = path.resolve(__dirname);

const app = express();
const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);

app.disable('x-powered-by')
const routerFacade = require("./src/routers/fecade.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.engine("hbs", handlebars.engine({
  extname: "hbs",
  layoutsDir: __dirname + "/views/hbs",
  defaultLayout: "index.hbs"
}))

app.set("view engine", "hbs");

app.use(express.static("views"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("", routerFacade);

httpServer.listen(8080, () => {
  console.info("El servidor está inicializado en el puerto 8080");
});
