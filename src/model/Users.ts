import { Schema, model } from 'mongoose';
import { IUsers } from '../interfaces/IUsers';
import { errorLogger } from '../utils/error';

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+7([ .-]?)[0-9]{3}\2[0-9]{3}\2[0-9]{2}\2[0-9]{2}/, 'Введён правильный номер телефона!'],
  },
  name: {
    type: String,
    required: true,
  },
});

const UserModel = model<IUsers & Document>('User', userSchema);

UserModel.createIndexes().catch((err: { message: unknown; }) => errorLogger.error(err.message));

export default UserModel;
