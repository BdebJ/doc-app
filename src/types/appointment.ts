import { SuccessResponse } from './common';
export type Doctor = {
  name: string;
};
export type Patient = {
  firstName: string;
  lastName: string;
  email: string;
};
export type Appointment = {
  doctor: Doctor;
  patient: Patient;
  timeSlot: string;
};
export type GetAppointmentByPatientQuery = { patientEmail: string; };
export type GetAppointmentByDoctorQuery = { doctorName: string; };
export type GetAppointmentServiceFn = (filterAppointmentQuery: GetAppointmentByPatientQuery | GetAppointmentByDoctorQuery) => Appointment[];
export type GetAppointmentResponse = SuccessResponse<Appointment[]>;
export type CreateAppointmentResponse = SuccessResponse<Appointment>;
export type CreateAppointmentServiceFn = (appointmentData: Appointment) => Appointment;
export type DeleteAppointmentQuery = { patientEmail: string; timeSlot: string; };
export type DeleteAppointmentServiceFn = (deleteAppointmentQuery: DeleteAppointmentQuery) => Appointment;
export type DeleteAppointmentResponse = SuccessResponse<Appointment>;
export type UpdateAppointmentQuery = { patientEmail: string; originalTimeSlot: string; newTimeSlot: string; };
export type UpdateAppointmentServiceFn = (updateAppointmentQuery: UpdateAppointmentQuery) => Appointment;
export type UpdateAppointmentResponse = SuccessResponse<Appointment>;



