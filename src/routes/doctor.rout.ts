import { Router } from 'express';
import DoctorController from '../controller/doctor.controller';

const doctorRouter = Router();

doctorRouter.post('/', DoctorController.createDoctor);
doctorRouter.put('/add-date', DoctorController.addDoctorDateTime);

export default doctorRouter;
