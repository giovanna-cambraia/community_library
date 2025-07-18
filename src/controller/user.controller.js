import userServices from "../service/user.services.js";

async function createUserController(req, res) {
    const newUser = req.body;

    try {
        const user = await userServices.createUserService(newUser);
        return res.status(201).send({user});
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

async function findAllUserController(req, res) {
    console.log('GET /users foi chamada')
    try {
        const users = await userServices.findAllUserService();
        res.send({ users });
    } catch (e) {
        return res.status(404).send(e.message);
    }
}

async function findAllUserByIdController(req, res) {
    const { id } = req.params;

    try {
        const user = await userServices.findUserByIdService(id);
        res.send({ user });
    } catch (e) {
        return res.status(400).send(e.message)
    }
}

async function updateUserController(req, res) {
    const { id } = req.params;
    const newUser = req.body;

    try {
        const user = await userServices.updateUserService(newUser, id);
        res.send({ user });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function deleteUserController(req, res) {
    const { id } = req.params;

    try {
        const message = await userServices.deleteUserService(id);
        res.send({ message });
    } catch (e) {
        res.status(400).send(e.message)
    }
}

export default {
    createUserController,
    findAllUserController,
    findAllUserByIdController,
    updateUserController,
    deleteUserController
};