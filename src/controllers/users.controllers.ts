import { Request, Response } from 'express';
import {
  User,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../models/users.models';

export const getUsersController = async (
  req: Request, res: Response): Promise<void> => {
  const users: User[] = await getUsers();
  res.status(200).json({ users });
};

export const getUserByIdController = async (
  req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id, 10);
  const user: User | null = await getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUserController = async (
  req: Request, res: Response): Promise<void> => {
  const user: User = req.body;
  await createUser(user);
  res.status(201).json({
    message: 'User created',
    user,
  });
};

export const updateUserController = async (
  req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id, 10);
  const userUpdate: User = req.body;
  userUpdate.id = id;
  await updateUser(userUpdate);
  res.status(200).json({
    message: 'User updated',
    user: userUpdate,
  });
};

export const deleteUserController = async (
  req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id, 10);
  await deleteUser(id);
  res.status(200).json({
    message: `User ${id} deleted`,
  });
};
