const {Router} = require('express');
const { registerUser } = require('../controllers/user.controller.js');


const userRouter = Router();

userRouter.post('/register', registerUser);

module.exports = userRouter;