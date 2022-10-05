

const verifyAuth = async (req, res, next) => {
    //AQUI VA LA LOGICA DEL LOGIN
    return next();
};


const verifyUser = async (req, res, next) => {
    //AQUI SE VALIDA EL ROL DEL USUARIO PARA SABER SI TIENE PRIVILEGIOS
    const admin = true;
    if (!admin) {
        const { path, methods } = req;
        return res.status(401).json({ error: -1, path, methods, authorization: false });
    }
    return next();
};

module.exports = { verifyUser, verifyAuth };
