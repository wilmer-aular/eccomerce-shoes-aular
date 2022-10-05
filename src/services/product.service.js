const fs = require('fs');
const moment = require('moment');
const { fromStringList, fromListString, createId } = require('../util/util.js')

const fsAsync = fs.promises;

const error = { error: 'product not found' }
class Product {

    constructor(fileName) {
        this.filName = fileName;
    }

    async find(id) {
        try {
            if (id) {
                const data = await fsAsync.readFile(`./${this.filName}.txt`, 'utf-8');
                const products = fromStringList(data);
                const product = products.find(i => i.id == id);
                if (!product) return { message: `${this.filName}  not found`, status: 404, error: true, id };
                return product;
            }
            const data = await fsAsync.readFile(`./${this.filName}.txt`, 'utf-8');
            return fromStringList(data);
        } catch (error) {
            throw { message: 'Task error', status: 404, error }
        }
    };

    async create(object) {
        const id = createId(await this.find());
        const timestamp = moment(new Date()).format("DD/MM/YYY HH:MM:SS");
        try {
            await fsAsync.appendFile(`./${this.filName}.txt`, `${id == 1 ? '' : ', '}${JSON.stringify({ ...object, id, timestamp })}`);
            return { success: true, id };
        } catch (err) {
            console.error(err);
            throw { message: 'Task error', status: 404, error }
        }
    };

    async update(id, object) {
        try {
            const products = await this.find();
            const product = products.find(i => i.id == id);
            if (!product) return { message: `${this.filName}  not found`, status: 404, error: true, id };
            const updated = Object.assign(product, object);
            await this.deleteById(id);

            await fsAsync.appendFile(`./${this.filName}.txt`, `${products.length == 1 ? '' : ', '}${JSON.stringify({ ...updated, id })}`);
            return { success: true, update: id };
        } catch (error) {
            throw { message: 'Task error', status: 404, error };
        }
    };

    async deleteById(id) {
        try {
            const data = await fsAsync.readFile(`./${this.filName}.txt`, 'utf-8');
            const list = fromStringList(data);
            const verifyExist = list.find(i => i.id == id);

            if (!verifyExist) return { message: `${this.filName}  not found`, status: 404, error: true, id };

            const products = list.filter(i => i.id != id);
            const dataSave = fromListString(products);

            await fsAsync.writeFile(`./${this.filName}.txt`, dataSave);

            return { success: true, id };
        } catch (error) {
            throw { message: 'Task error', status: 404, error }
        }
    };

}

module.exports = Product
