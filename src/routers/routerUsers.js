import { Router } from "express";
import controllersUser from "../controllers/controllersUser.js";

const routerUsers = Router();

routerUsers.post('/', controllersUser.createUser);
routerUsers.get('/:id', controllersUser.readUser);
routerUsers.get('/', controllersUser.readAllUsers);
routerUsers.put('/:id', controllersUser.updateUser);
routerUsers.delete('/:id', controllersUser.deleteUser);

export default routerUsers;

