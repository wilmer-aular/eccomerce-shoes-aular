import CrudKnex from "../../respositories/crudKnex.repository.js";
import { createTableProducts } from "../../database/tablesKnex/products.js";

class Product extends CrudKnex {

    constructor(model) {
        //crea la tabla al instanciar la clase.
        createTableProducts();
        super(model)
    }
    //Luego implementar metodos especificos
}

export default Product;
