import { Request, Response } from 'express';
import {
  User,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../models/users.models';
import { Handler } from '../utils/decorators/handler.decorators';

export default class UserController {
  @Handler
  public static async all(
    req: Request, res: Response
  ): Promise<void> {
    const users: User[] = await getUsers();
    res.status(200).json({ users });
  };

  @Handler
  public static async getById(
    req: Request, res: Response
  ): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const user: User | null = await getUser(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };

  @Handler
  public static async create(
    req: Request, res: Response
  ): Promise<void> {
    const user: User = req.body;
    await createUser(user);
    res.status(201).json({
      message: 'User created',
      user,
    });
  };

  @Handler
  public static async update(
    req: Request, res: Response
  ): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const userUpdate: User = req.body;
    userUpdate.id = id;
    await updateUser(userUpdate);
    res.status(200).json({
      message: 'User updated',
      user: userUpdate,
    });
  };

  @Handler
  public static async delete(
    req: Request, res: Response
  ): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    await deleteUser(id);
    res.status(200).json({
      message: `User ${id} deleted`,
    });
  };
}
