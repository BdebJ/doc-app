import { appointments } from "../data/seedData";
import { BadRequestError, ConflictError } from "../errors/ErrorTypes";
import {
  Appointment,
  CreateAppointmentServiceFn,
  DeleteAppointmentQuery,
  DeleteAppointmentServiceFn,
  Doctor,
  GetAppointmentByDoctorQuery,
  GetAppointmentByPatientQuery,
  GetAppointmentServiceFn,
  Patient,
  UpdateAppointmentQuery,
  UpdateAppointmentServiceFn
} from "../types/appointment";

export const getAppointmentService: GetAppointmentServiceFn = (filterAppointmentQuery: Partial<GetAppointmentByDoctorQuery & GetAppointmentByPatientQuery>) => {
  const { patientEmail, doctorName } = filterAppointmentQuery;
  let filteredAppointments: Appointment[] = [];
  if (patientEmail) {
    filteredAppointments = appointments.filter((e) => e.patient.email === patientEmail);
  } else if (doctorName) {
    filteredAppointments = appointments.filter((e) => e.doctor.name === doctorName);
  }
  return filteredAppointments;
};

export const createAppointmentService: CreateAppointmentServiceFn = (appointmentData: Appointment) => {
  const { doctor, patient, timeSlot } = appointmentData;
  if (!checkAppointmentAvailability(doctor, patient, timeSlot)) {
    throw new ConflictError("Time slot not available");
  }
  const newAppointment = { doctor, patient, timeSlot };
  appointments.push(newAppointment);
  return newAppointment;
};

export const deleteAppointmentService: DeleteAppointmentServiceFn = (deleteAppointmentQuery: DeleteAppointmentQuery) => {
  const { patientEmail, timeSlot } = deleteAppointmentQuery;
  const appointmentIndex = appointments.findIndex(appointment =>
    appointment.patient.email === patientEmail && appointment.timeSlot === timeSlot
  );
  if (appointmentIndex === -1) {
    throw new BadRequestError('Appointment does not exist');
  }
  const [deletedAppointment] = appointments.splice(appointmentIndex, 1);
  return deletedAppointment;
};

export const updateAppointmentService: UpdateAppointmentServiceFn = (updateAppointmentQuery: UpdateAppointmentQuery) => {
  const { patientEmail, originalTimeSlot, newTimeSlot } = updateAppointmentQuery;
  const appointmentIndex = appointments.findIndex(appointment =>
    appointment.patient.email === patientEmail && appointment.timeSlot === originalTimeSlot
  );
  if (appointmentIndex === -1) {
    throw new BadRequestError('Appointment does not exist');
  }

  const { doctor, patient } = appointments[appointmentIndex];
  if (!checkAppointmentAvailability(doctor, patient, newTimeSlot)) {
    throw new ConflictError("Time slot not available");
  }

  appointments[appointmentIndex].timeSlot = newTimeSlot;
  return appointments[appointmentIndex];
};

export const checkAppointmentAvailability = (doctor: Doctor, patient: Patient, timeSlot: string) => {
  const [startTime, endTime] = timeSlot.split(' - ');
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  if (endHour - startHour !== 1 || startMinute !== 0 || endMinute !== 0) {
    throw new BadRequestError("Time slot must be one hour long.");
  }
  if (startHour < 9 || startHour > 15) {
    throw new BadRequestError("Time slot must be between 09:00 and 15:00.");
  }

  const existingAppointmentCheck = appointments.some((e) => {
    return (e.doctor.name === doctor.name || e.patient.email === patient.email) && e.timeSlot.startsWith(startTime);
  });

  if (existingAppointmentCheck) {
    return false;
  }
  return true;
};
