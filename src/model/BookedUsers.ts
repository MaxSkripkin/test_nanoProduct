import { Schema, Types, model } from 'mongoose';
import { errorLogger } from '../utils/error';
import { IBookedUsers } from '../interfaces/IBookedUsers';

const bookedUserSchema = new Schema({
  user_id: {
    required: true,
    ref: 'User',
    type: Types.ObjectId,
  },
  doctor_id: {
    required: true,
    ref: 'Doctor',
    type: Types.ObjectId,
  },
  slot: {
    match: [
      /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Пожалуйста, введите правильную дату или время. Формат даты и времени - (yyyy-mm-dd hh:mm)',
    ],
    required: true,
    type: Date,
  },
});

const BookedUser = model<IBookedUsers & Document>('BookedUser', bookedUserSchema);

BookedUser.createIndexes().catch((err: { message: unknown }) =>
  errorLogger.error(err.message)
);

export default BookedUser;
