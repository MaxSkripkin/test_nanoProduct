import { Response, Request } from 'express';
import { CronJob } from 'cron';
import moment from 'moment';
import { logger } from '../utils/logger';
import UserModel from '../model/Users';
import DoctorModel from '../model/Doctors';
import BookedUsers from '../model/BookedUsers';

const MakeAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, doctor_id, slot } = req.body;

    // проверка формата даты и времени в запросе
    const checkTime = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(slot);
    if (!checkTime) {
      throw new Error('Пожалуйста, введите правильную дату или время. Формат даты и времени (yyyy-mm-dd hh:mm)');
    }

    // валидация пользователя
    const user = await UserModel.findById({ _id: user_id });
    if (!user) {
      throw new Error('Пользователь не найден!');
    }

    // валидация доктора
    const doctor = await DoctorModel.findById({ _id: doctor_id });
    if (!doctor) {
      throw new Error('Врач не найден!');
    }

    // проверка доступности даты записи у доктора
    const doctorTime = await DoctorModel.findOne({ _id: doctor.id, slots: new Date(slot) });
    const doctorSlots = doctor.slots.map((i) => moment(i).format('YYYY-MM-DD HH:mm'));
    if (!doctorTime) {
      throw new Error(`Дата не найдена. Доктор: ${doctor.name} имеет эти даты: ${(doctorSlots.length) ? doctorSlots : 'Без даты'} для записи на прием`);
    }

    // создание новой записи
    const registered = await BookedUsers.create({ user_id, doctor_id, slot: new Date(slot) });
    if (!registered) {
      throw new Error('Введите правильные данные!');
    }

    // Оповещения. Вычисление времени оповещений
    const dateNow = new Date();
    const registeredDate = new Date(slot);

    // Оповещение за день до посещения
    if (dateNow.getDate() < registeredDate.getDate()) {
      const date = new Date(slot);
      date.setDate(date.getDate() - 1);
      date.setHours(dateNow.getHours());
      date.setMinutes(dateNow.getMinutes() + 1);

      const job = new CronJob(
        date,
        (() => {
          logger.info(
            `| Здравствуйте ${user.name}! Вы записаны к ${doctor.spec} завтра в ${moment(
              registeredDate
            ).format('YYYY-MM-DD HH:mm')}`
          );
        })
      );
      job.start();
    }

    // оповещение за 2 часа до посещения
    if (dateNow.getHours() <= registeredDate.getHours() - 2 && dateNow.getDate() === registeredDate.getDate()) {
      const date = new Date(slot);
      date.setHours(date.getHours() - 2);

      // создание и запуск задачи по оповещению
      const job = new CronJob(
        date,
        (() => {
          logger.info(
            `| Здравствуйте ${user.name}! Через 2 часа вам к ${doctor.spec}, в ${moment(registeredDate).format(
              'YYYY-MM-DD HH:mm'
            )}`
          );
        })
      );
      job.start();
    }

    // лог успешной записи и отправка ответа клиенту
    logger.info(
      `| Здравствуйте ${user.name}! Вас записали к врачу - ${doctor.spec}, дата приёма ${moment(
        registeredDate
      ).format('YYYY-MM-DD HH:mm')}.`
    );
    res.status(201).json({ message: `Вас записали к врачу: ${doctor.name}.` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default { MakeAppointment };
