import CrudFirebase from "../../respositories/crudFirebase.repository.js";

class Product extends CrudFirebase {

    constructor(model) {
        super(model)
    }
    async find(id) {
        try {
            return await super.find(id);
        } catch (err) {
            throw err
        }
    }

    async create(data) {
        if (data.products && data.products.length) {
            data.products = await this.getProducts(data.products)
        }
        return await super.create(data);
    }

    async getProductsByCartId(id) {
        try {
            const data = await super.find(id);
            if (data.error) return data;
            return data.products;
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

        cart.products = cart.products.filter(i => i.id != idProduct);

        await super.update(id, cart);
        return { success: true, delete: id };
    }

    async getProducts(ids) {
        const newProduct = new CrudMongo(productModel);
        const products = await newProduct.find();
        return products.filter(i => ids.includes(i._id));
    }
}

export default Product;
