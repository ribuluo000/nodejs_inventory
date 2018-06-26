'use strict';

import express from 'express'
import MyController from '../controller/MyCustomerController'
const router = express.Router();

router.post('/add', MyController.add);
router.post('/update_detail', MyController.update_detail);
router.post('/detail', MyController.detail);
router.post('/get_list', MyController.get_list);
export default router