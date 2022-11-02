import fs from 'fs';
import moment from 'moment';
import { fromStringList, fromListString, createId } from '../util/util.js';

const fsAsync = fs.promises;

const error = { error: 'record not found' };

class CrudFile {

    constructor(fileName) {
        this.filName = fileName;
    }

    async find(id) {
        try {
            if (id) {
                const data = await fsAsync.readFile(`./${this.filName}.txt`, 'utf-8');
                const list = fromStringList(data);
                const find = list.find(i => i.id == id);
                if (!find) return { message: `${this.filName}  not found`, status: 404, error: true, id };
                return find;
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
            const list = await this.find();
            const value = list.find(i => i.id == id);
            if (!value) return { message: `${this.filName}  not found`, status: 404, error: true, id };
            const updated = Object.assign(value, object);
            await this.deleteById(id);

            await fsAsync.appendFile(`./${this.filName}.txt`, `${list.length == 1 ? '' : ', '}${JSON.stringify({ ...updated, id })}`);
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

            const filtered = list.filter(i => i.id != id);
            const dataSave = fromListString(filtered);

            await fsAsync.writeFile(`./${this.filName}.txt`, dataSave);

            return { success: true, id };
        } catch (error) {
            throw { message: 'Task error', status: 404, error }
        }
    };

}

export default CrudFile;
