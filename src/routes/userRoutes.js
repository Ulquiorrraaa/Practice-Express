import express from 'express';
import * as userController from '../controllers/userController.js';
import {protect} from '../middlewares/authMIddleware.js';


const router = express.Router();

router.post('/login', userController.login); 
router.post('/register', userController.createUser);
router.get('/logout', userController.logout);

router.get('/:id',protect, userController.getUser);
router.get('/',protect, userController.getUsers); 
router.post('/',protect, userController.createUser);
router.put('/:id',protect, userController.updateUser);
router.delete('/:id',protect, userController.deleteUser);

export default router;
