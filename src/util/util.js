import LosslessJSON from 'lossless-json';

export const majorkey = (array) => {
  const getMax = (a, b) => Math.max(a, b);
  return array.reduce(getMax);
};
export const createId = (array) => {
  if (array.length) {
    const majorId = (majorkey(array.map((i) => i.id))) + 1;
    return majorId;
  }
  return 1;
};

export const setProduct = (i) => {
  const data = {
    ...i,
    id: JSON.parse(i.id),
  }
  if (i.price) data.price = JSON.parse(i.price);
  if (i.stock) data.stock = JSON.parse(i.stock);
  return data;
};

export const fromStringList = (value) => {
  if (!value) return [];
  const valueList = '[' + value + ']';
  return LosslessJSON.parse(valueList).map(setProduct);
};
export const fromListString = (v) => {
  if (v.length) {
    const transformer = LosslessJSON.stringify(v);
    return transformer.substring(1, transformer.length - 1);
  }
  return '';
};

export const routers = {
  views: [
    { metod: 'get', uri: '/new_product' },
    { metod: 'get', uri: '/edit_product/id' },
    { metod: 'get', uri: '/products' }
  ],
  apis: {
    products: [
      { type: 'Obtiene todos los productos o solo uno', metod: 'get', uri: 'api/products/:id?' },
      {
        type: 'Crea un producto',
        metod: 'post',
        uri: 'api/products',
        data: {

          name: "Fila Running",
          price: 250,
          stock: 50,
          photo: "https://http2.mlstatic.com/D_NQ_NP_843886-MLA47557176472_092021-W.jpg",
          description: "Zapatillas Fila Running Mujer Atmosphere Negro-lila-az Cli",
          code: "43l5jlk"
        }
      },
      {
        type: 'Actualiza un producto',
        metod: 'put',
        uri: 'api/products',
        data: {
          price: 250,
          stock: 50,
        }
      },
      { type: 'elimina un producto por id', metod: 'delete', uri: 'api/products/:id' },
    ],
    cart: [
      [
        { type: 'Obtiene todos los carritos o solo uno', metod: 'get', uri: 'api/cart/:id?' },
        {
          type: 'Crea un carrito vacio y devuelve el id',
          metod: 'post',
          uri: 'api/carts',
          //opcional
          data: {
            products: "array con ids de productos [1,2,3,4] (OPCIONAL)"
          }
        },
        {
          type: 'incorpora productos al carrito por id de productos',
          metod: 'post',
          uri: 'api/carts/:id/products',
          data: {
            products: "array con ids de productos [1,2,3,4]"
          }
        },
        { type: 'elimina un carrito por id', metod: 'delete', uri: 'api/carts/:id' },
        { type: 'elimina un producto por id de carrito y de producto', metod: 'delete', uri: 'api/carts/:id/productos/:id_prod' },
      ],
    ]
  }
};
