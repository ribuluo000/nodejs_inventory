'use strict';

import express from 'express'
import YBUserController from '../controller/YBUserController'
const router = express.Router()

router.post('/login', YBUserController.login);
router.post('/register', YBUserController.register);
export default router