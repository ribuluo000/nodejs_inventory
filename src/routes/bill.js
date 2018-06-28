'use strict';

import express from 'express'
import MyController from '../controller/MyBillController'
const router = express.Router();

router.post('/add', MyController.add);
router.post('/detail', MyController.detail);
router.post('/get_list', MyController.get_list);
export default router