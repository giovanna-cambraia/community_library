import { Router } from "express";
import userController from "../controller/user.controller.js";
import { 
  validate, 
  validateUserId } from "../middlewares/validation.middlewares.js";
import { userSchema } from "../schema/user.schema.js";
import authMiddlware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/users",
  validate(userSchema),
  userController.createUserController
);

router.post(
  "/users/login",
  userController.userLoginController
)

router.use(authMiddlware)
router.get(
  "/users",
  userController.findAllUserController
);

router.get(
  "/users/:id", 
  validateUserId,
  userController.findUserByIdController 
);

router.put(
  "/users/:id", 
  validate(userSchema), 
  validateUserId,
  userController.updateUserController
);

router.delete(
  "/users/:id", 
  userController.deleteUserController
);

export default router;
