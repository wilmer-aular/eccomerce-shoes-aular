import express from 'express';
import { Server as HTTPServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import "./src/database/mongoConnection.js";;
import handlebars from 'express-handlebars';
import morgan from "morgan";
import { routers } from "./src/util/util.js";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);

app.disable('x-powered-by')
import routerFacade from "./src/routers/fecade.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.engine("hbs", handlebars.engine({
  extname: ".hbs",
  defaultLayout: "index"
}))

app.set("view engine", "ejs");
app.set("view engine", "pug");
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

app.use(function (req, res) {
  res.status(404).json(routers);
});


httpServer.listen(8080, () => {
  console.info("El servidor está inicializado en el puerto 8080");
});
