'use strict';

import express from 'express'
import MyUserController from '../controller/MyUserController'
const router = express.Router()

router.post('/login', MyUserController.login);
router.post('/register', MyUserController.register);
export default router