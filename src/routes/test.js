'use strict';

import express from 'express'
import MyController from '../controller/MyTestController'
const router = express.Router();

router.post('/test1', MyController.test1);
export default router