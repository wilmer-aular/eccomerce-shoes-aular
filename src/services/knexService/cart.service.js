import Product from './product.service.js';
import CrudKnex from "../../respositories/crudKnex.repository.js";
import { createTableCarts } from "../../database/tablesKnex/carts.js";
import LosslessJSON from 'lossless-json';
import { setProduct } from '../../util/util.js';
class Cart extends CrudKnex {
    constructor(model) {
        //crea la tabla al instanciar la clase.
        createTableCarts();
        super(model)
    }
    async find(id) {
        try {
            const data = await super.find(id);
            if (!data) return { error: true, message: 'Not Found' };
            if (!id) {
                return data.map(i => {

                    const { products } = LosslessJSON.parse(i.products)
                    i.products = products && products.length ? products.map(setProduct) : [];
                    return i;
                })
            }
            const { products } = LosslessJSON.parse(data.products)
            return { ...data, products: products && products.length ? products.map(setProduct) : [] };
        } catch (err) {
            throw err
        }
    }

    async create(data) {
        let products = []
        if (data.products && data.products.length) {
            products = await this.getProducts(data.products)
        }
        data.products = { products };
        return await super.create(data);
    }

    async getProductsByCartId(id) {
        try {
            const [data] = await super.find(id);
            if (data.error) return data;
            const { products } = LosslessJSON.parse(data.products)
            return products.map(setProduct);
        } catch (error) {
            throw { status: 404, error }
        }
    };

    async createProductForCart(id, data) {
        try {
            let products = []
            const cart = await this.find(id);
            if (cart.error) return cart;
            if (cart.products && cart.products.length && data.products) {
                const ids = cart.products.map(i => i.id);
                data.products = data.products.filter(i => !ids.includes(i));
            }

            if (data.products && data.products.length) {
                const newProducts = await this.getProducts(data.products)
                products = [...cart.products, ...newProducts];
            }
            cart.products = { products };
            await super.update(id, cart);
            return { success: true, update: id };
        } catch (error) {
            throw { status: 404, error }
        }
    };

    async deleteProductOfCart(id, idProduct) {
        const cart = await this.find(id);
        if (cart.error) return cart;

        const products = cart.products.filter(i => i.id != idProduct);

        cart.products = { products };
        await super.update(id, cart);

        return { success: true, delete: id };
    }

    async getProducts(ids) {
        const newProduct = new Product('products');
        const products = await newProduct.find();
        return products.filter(i => ids.includes(i.id));
    }
}

export default Cart;
