import { Router } from 'express';
import UserController from '../controllers/users.controllers';
import {
  validateUser
} from '../utils/validators/users.validators';

// New Router instance
const router = Router();
const controller = UserController;

// Users routes
router.get('/', controller.all);
router.get('/:id', controller.getById);
router.post(
  '/', // path
  validateUser, // middleware
  controller.create // controller
);
router.put(
  '/:id', // path
  validateUser, // middleware
  controller.update // controller
);
router.delete('/:id', controller.delete);

export default router;
