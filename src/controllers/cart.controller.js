import cart from '../daos/cart.js'

const cartController = {
    find: async (req, res) => {
        return res.json(await cart.find(req.params.id))
    },
    getProductsByCartId: async (req, res) => {
        return res.json(await cart.getProductsByCartId(req.params.id))
    },
    create: async (req, res) => {
        const body = req.body;
        return res.json(await cart.create(body))
    },
    createProductForCart: async (req, res) => {
        const body = req.body;
        return res.json(await cart.createProductForCart(req.params.id, body));
    },
    deleteById: async (req, res) => {
        //elimina un carrito
        return res.json(await cart.deleteById(req.params.id))
    },
    deleteProductOfCart: async (req, res) => {
        //elimina un producto del carrito
        const { id, id_prod } = req.params;
        return res.json(await cart.deleteProductOfCart(id, id_prod))
    },
}

export default cartController;