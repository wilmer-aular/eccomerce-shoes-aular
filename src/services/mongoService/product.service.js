import CrudMongo from "../../respositories/crudMongo.respository.js";
import productModel from "../../database/modelsMongo/product.model.js";

class Product extends CrudMongo {

    constructor() {
        super(productModel)
    }
    //Luego implementar metodos especificos
}

export default Product;
