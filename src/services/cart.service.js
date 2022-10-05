const Product = require('./product.service');
const fs = require('fs');
const { setProduct, fromListString, createId } = require('../util/util.js')

const fsAsync = fs.promises;

const error = { error: 'product not found' }
class Cart extends Product {
    products = new Product('products');
    constructor(fileName) {
        super(fileName);
        this.filName = fileName;
    }

    async find(id) {
        try {
            const data = await super.find(id);
            if (data.error) return data;
            if (!id) {
                return data.map(i => {
                    i.products = i.products ? i.products?.map(setProduct) : [];
                    return i;
                })
            }
            return { ...data, products: data.products ? data.products?.map(setProduct) : [] };
        } catch (err) {
            throw err
        }
    }

    async getProductsByCartId(id) {
        try {
            const data = await super.find(id);
            if (data.error) return data;
            return data.products.map(setProduct);
        } catch (error) {
            throw { status: 404, error }
        }
    };
    async create(data) {
        if (data.products && data.products.length) {
            data.products = await this.getProducts(data.products);
        }
        return await super.create(data);
    }
    async createProductForCart(id, data) {
        try {
            const carts = await this.find();
            if (carts.error) return data;
            const cart = carts.find(i => i.id == id);

            if (cart.products && cart.products.length && data.products) {
                const ids = cart.products.map(i => i.id);
                data.products = data.products.filter(i => !ids.includes(i));
            }

            if (data.products && data.products.length) {
                const newProducts = await this.getProducts(data.products)
                cart.products = [...cart.products, ...newProducts];
                await super.deleteById(id);
                await fsAsync.appendFile(`./${this.filName}.txt`, `${carts.length == 1 ? '' : ', '}${JSON.stringify(cart)}`);
            }

            return { success: true, update: id };
        } catch (error) {
            throw { status: 404, error }
        }
    };

    async deleteProductOfCart(id, idProduct) {
        const carts = await this.find();

        if (carts.error) return data;
        const cart = carts.find(i => i.id == id);
        cart.products = cart.products.filter(i => i.id != idProduct);

        await super.deleteById(id);
        await fsAsync.appendFile(`./${this.filName}.txt`, `${carts.length == 1 ? '' : ', '}${JSON.stringify(cart)}`);

        return { success: true, delete: id };
    }
    async getProducts(ids) {
        const products = await this.products.find();
        return products.filter(i => ids.includes(i.id));
    }
}

module.exports = Cart
