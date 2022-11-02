import knex from 'knex';
import { config } from '../../../config.js';

const Knex = knex(config.knex.development);

export const createTableProducts = async () => {
    try {
        await Knex.schema.createTableIfNotExists('products', table => {
            table.increments('id');
            table.string('name');
            table.string('code');
            table.string('description');
            table.integer('price');
            table.integer('stock');
            table.string('photo');
            table.date('timestamp');
        });
    } catch (err) {
        console.error(err)
    } finally {
        Knex.destroy()
    }
};