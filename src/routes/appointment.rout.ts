import Router from 'express';
import appointmentController from "../controller/appointment.controller";

export default Router()
  .post('/', appointmentController.MakeAppointment);
