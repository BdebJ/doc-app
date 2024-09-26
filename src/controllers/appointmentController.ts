import { RequestHandler } from 'express';
import { createAppointmentService, deleteAppointmentService, getAppointmentService, updateAppointmentService } from '../services/appointmentService';
import { Appointment, CreateAppointmentResponse, DeleteAppointmentQuery, DeleteAppointmentResponse, GetAppointmentByDoctorQuery, GetAppointmentByPatientQuery, GetAppointmentResponse, UpdateAppointmentQuery, UpdateAppointmentResponse } from '../types/appointment';
import { sendSuccessResponse } from '../utils/responseHelper';

export const getAppointmentByPatientController: RequestHandler<unknown, GetAppointmentResponse, unknown, GetAppointmentByPatientQuery> = (req, res) => {
  const { patientEmail } = req.query;
  const filteredAppointments: Appointment[] = getAppointmentService({ patientEmail });
  return sendSuccessResponse(res, 200, 'Appointments fetched successfully', filteredAppointments);
};

export const getAppointmentByDoctorController: RequestHandler<unknown, GetAppointmentResponse, unknown, GetAppointmentByDoctorQuery> = (req, res) => {
  const { doctorName } = req.query;
  const filteredAppointments: Appointment[] = getAppointmentService({ doctorName });
  return sendSuccessResponse(res, 200, 'Appointments fetched successfully', filteredAppointments);
};

export const createAppointmentController: RequestHandler<unknown, CreateAppointmentResponse, Appointment, unknown> = (req, res) => {
  const { doctor, patient, timeSlot } = req.body;
  const appointment: Appointment = createAppointmentService({ doctor, patient, timeSlot });
  return sendSuccessResponse(res, 201, 'Appointment created successfully', appointment);
};

export const deleteAppointmentController: RequestHandler<unknown, DeleteAppointmentResponse, unknown, DeleteAppointmentQuery> = (req, res) => {
  const { patientEmail, timeSlot } = req.query;
  const deletedAppointment: Appointment = deleteAppointmentService({ patientEmail, timeSlot });
  return sendSuccessResponse(res, 200, 'Appointment deleted successfully', deletedAppointment);
};

export const updateAppointmentController: RequestHandler<unknown, UpdateAppointmentResponse, unknown, UpdateAppointmentQuery> = (req, res) => {
  const { patientEmail, originalTimeSlot, newTimeSlot } = req.query;
  const updatedAppointment: Appointment = updateAppointmentService({ patientEmail, originalTimeSlot, newTimeSlot });
  return sendSuccessResponse(res, 200, 'Appointment updated successfully', updatedAppointment);
};
