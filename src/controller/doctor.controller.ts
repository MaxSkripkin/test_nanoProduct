import { Request, Response } from 'express';
import moment from 'moment';
import DoctorModel from '../model/Doctors';

/**
 * Контроллер для работы с доктором
 */
export default class DoctorController {
  /**
   * Создание доктора
   * @param {Request} req - объект запроса
   * @param {Response} res - объект ответа
   * @returns {void} возвращает пустое значение
   */
  public static async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { slots } = req.body;

      if (!Array.isArray(slots)) {
        throw new Error('Slots should be Array Date!');
      }

      const data = await DoctorModel.create(req.body);

      res.status(201).json({ message: 'Доктор был создан!', id: data._id });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  /**
   * Добавление даты и времени доктору 
   * @param {Request} req - объект запроса
   * @param {Response} res - объект ответа
   * @returns {void} возвращает пустое значение
   */
  public static async addDoctorDateTime(req: Request, res: Response): Promise<void> {
    try {
      const { doctor_id, dateTime } = req.body;

      const doctor = await DoctorModel.findById(doctor_id);
      if (!doctor) {
        throw new Error('Врач не найден!');
      }

      if (!Array.isArray(dateTime)) {
        throw new Error('Slots should be Array Date!');
      }

      const dateArray: Date[] = [];

      for (const date of dateTime) {
        const formatDate = moment(date, 'YYYY-MM-DD HH:mm').toDate();

        if (formatDate < new Date()) {
          throw new Error('Вы ввели прошлую дату. Формат даты (yyyy-mm-dd hh:mm)');
        }

        dateArray.push(formatDate);
      }

      const doctorTime = await DoctorModel.findOne({ _id: doctor_id, slots: { $in: dateArray } });
      if (doctorTime) {
        throw new Error('Some date already exist!');
      }

      doctor.slots.push(...dateArray);
      await doctor.save();

      res.status(200).json({ message: 'Дата была добавлена!' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
