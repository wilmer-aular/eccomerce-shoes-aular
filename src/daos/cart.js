import * as dotenv from 'dotenv';
dotenv.config();
import FileService from '../services/fileService/cart.service.js';
import KnexService from '../services/knexService/cart.service.js';
import FirebaseService from '../services/firebaseService/cart.service.js';
import MongoService from '../services/mongoService/cart.service.js';
import cartModel from '../database/modelsMongo/cart.model.js';

export default {
    mongo: new MongoService(cartModel),
    firebase: new FirebaseService('carts'),
    file: new FileService('carts'),
    knex: new KnexService('carts'),
}[process.env.TIPO];