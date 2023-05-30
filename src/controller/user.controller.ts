import { Request, Response } from 'express';
import UserModel from '../model/Users';

/**
 * Контроллер для работы с пользователями
 */
class UserController {
  /**
   * Создание пользователя
   * @param {Request} req - объект запроса
   * @param {Response} res - объект ответа
   * @returns {void} возвращает пустое значение
   */
  public static async createUser(req: Request, res: Response): Promise<void> {
    const { phone, name } = req.body;

    try {
      const regExp = /^\+7([ .-]?)[0-9]{3}\2[0-9]{3}\2[0-9]{2}\2[0-9]{2}$/;
      if (!regExp.test(phone)) {
        throw new Error('Пожалуйста, введите правильный номер телефона!');
      }

      const user = await UserModel.findOne({ phone });
      if (user) throw new Error('Пользователь уже существует!');

      await UserModel.create({ name, phone });

      res.status(201).json({ message: 'Пользователь был создан!' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default UserController;
