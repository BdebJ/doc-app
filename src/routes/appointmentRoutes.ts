import { Router } from 'express';
import {
  createAppointmentController,
  deleteAppointmentController,
  getAppointmentByDoctorController,
  getAppointmentByPatientController,
  updateAppointmentController
} from '../controllers/appointmentController';
import {
  createAppointmentValidator,
  deleteAppointmentValidator,
  getAppointmentByDoctorValidator,
  getAppointmentByPatientValidator,
  updateAppointmentValidator
} from '../validators/appointmentValidators';

const router: Router = Router();

// Show appointmnets by patient
router.get('/patient', getAppointmentByPatientValidator, getAppointmentByPatientController);

// Show appointmnets by doctor
router.get('/doctor', getAppointmentByDoctorValidator, getAppointmentByDoctorController);

// Book appointment
router.post('/', createAppointmentValidator, createAppointmentController);

// Delete appointment
router.delete('/', deleteAppointmentValidator, deleteAppointmentController);

// Update appointment time
router.patch('/', updateAppointmentValidator, updateAppointmentController);

export default router;
