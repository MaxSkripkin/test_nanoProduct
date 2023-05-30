import { Schema, model } from 'mongoose';
import moment from "moment";
import { IDoctors } from '../interfaces/IDoctors';

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  spec: {
    type: String,
    required: true,
  },
  slots: [
    {
      type: Date,
      required: true,
      validate: {
        validator: function (v: string[]) {
          for (const i of v) {

            // using moment.js for date formatting
            const normalizeDate = moment(i).format('YYYY-MM-DD HH:mm');

            //checking date format and validating against current time
            const checkDate = moment(normalizeDate, 'YYYY-MM-DD HH:mm',true).isValid();

            if (normalizeDate < moment().format('YYYY-MM-DD HH:mm') || !checkDate) {
              return false;
            }
          }
          return true;
        },
        message: 'Вы ввели прошедшую дату или дату в неправильном формате. Формат даты (yyyy-mm-dd hh:mm)'
      }
    }
  ]
});

const DoctorModel = model<IDoctors & Document>('Doctor', doctorSchema);

export default DoctorModel;
