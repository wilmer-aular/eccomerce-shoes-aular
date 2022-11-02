import * as dotenv from 'dotenv';
dotenv.config();
import FileService from '../services/fileService/product.service.js';
import KnexService from '../services/knexService/product.service.js';
import FirebaseService from '../services/firebaseService/product.service.js';
import MongoService from '../services/mongoService/product.service.js';
import productModel from '../database/modelsMongo/product.model.js';

export default {
    mongo: new MongoService(productModel),
    firebase: new FirebaseService('products'),
    file: new FileService('products'),
    knex: new KnexService('products'),
}[process.env.TIPO];