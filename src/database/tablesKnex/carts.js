import knex from 'knex';
import { config } from '../../../config.js';

const Knex = knex(config.knex.development);

export const createTableCarts = async () => {
    try {
        await Knex.schema.createTableIfNotExists('carts', table => {
            table.increments('id');
            table.json('products');
            table.date('timestamp');
        });
    } catch (err) {
        console.error(err)
    } finally {
        Knex.destroy()
    }
};
