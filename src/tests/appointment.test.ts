import { appointments } from '../data/seedData';
import { BadRequestError, ConflictError } from '../errors/ErrorTypes';
import { checkAppointmentAvailability, createAppointmentService, updateAppointmentService } from '../services/appointmentService';
import { Doctor, Patient } from '../types/appointment';

beforeEach(() => {
  appointments.length = 0;

  appointments.push(
    {
      doctor: { name: 'Dr. Clara Williams' },
      patient: { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' },
      timeSlot: '10:00 - 11:00',
    },
    {
      doctor: { name: 'Dr. Alice Smith' },
      patient: { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' },
      timeSlot: '14:00 - 15:00',
    }
  );
});

describe(checkAppointmentAvailability, () => {
  test('should throw BadRequestError for time slots not one hour long', () => {
    const doctor: Doctor = { name: 'Dr. Test' };
    const patient: Patient = { firstName: 'Test', lastName: 'Patient', email: 'test.patient@example.com' };

    expect(() => {
      checkAppointmentAvailability(doctor, patient, '10:00 - 10:30');
    }).toThrow(BadRequestError);
  });

  test('should throw BadRequestError for invalid time format', () => {
    const doctor: Doctor = { name: 'Dr. Test' };
    const patient: Patient = { firstName: 'Test', lastName: 'Patient', email: 'test.patient@example.com' };

    expect(() => {
      checkAppointmentAvailability(doctor, patient, '10:00 - 11:60');
    }).toThrow(BadRequestError);
  });

  test('should throw BadRequestError for time slots outside working hours', () => {
    const doctor: Doctor = { name: 'Dr. Test' };
    const patient: Patient = { firstName: 'Test', lastName: 'Patient', email: 'test.patient@example.com' };

    expect(() => {
      checkAppointmentAvailability(doctor, patient, '08:00 - 09:00');
    }).toThrow(BadRequestError);
  });

  test('should return false for existing appointment slot', () => {
    const doctor: Doctor = { name: 'Dr. Clara Williams' };
    const patient: Patient = { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' };

    expect(checkAppointmentAvailability(doctor, patient, '10:00 - 11:00')).toBe(false);
  });

  test('should return true for available slot', () => {
    const doctor: Doctor = { name: 'Dr. Test' };
    const patient: Patient = { firstName: 'Test', lastName: 'Patient', email: 'test.patient@example.com' };

    expect(checkAppointmentAvailability(doctor, patient, '11:00 - 12:00')).toBe(true);
  });
});

describe(createAppointmentService, () => {
  beforeEach(() => {
    appointments.length = 0;
  });

  test('should create an appointment successfully', () => {
    const doctor: Doctor = { name: 'Dr. Test' };
    const patient: Patient = { firstName: 'Test', lastName: 'Patient', email: 'test.patient@example.com' };
    const timeSlot = '11:00 - 12:00';

    const result = createAppointmentService({ doctor, patient, timeSlot });

    expect(result).toEqual({ doctor, patient, timeSlot });
    expect(appointments).toContainEqual({ doctor, patient, timeSlot });
  });

  test('should throw ConflictError if time slot conflict even if doctors are diff, patient same', () => {
    const doctor1: Doctor = { name: 'Dr. Clara Williams' };
    const doctor2: Doctor = { name: 'Dr. Hailey Store' };
    const patient: Patient = { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' };
    const timeSlot = '10:00 - 11:00';

    appointments.push({
      doctor: doctor1,
      patient: patient,
      timeSlot: timeSlot
    });

    expect(() => {
      createAppointmentService({ doctor: doctor2, patient, timeSlot });
    }).toThrow(ConflictError);
  });

  test('should throw ConflictError if time slot conflict even if patients are diff, doctor same', () => {
    const doctor: Doctor = { name: 'Dr. Clara Williams' };
    const patient1: Patient = { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' };
    const patient2: Patient = { firstName: 'Jake', lastName: 'Lawrence', email: 'jlaw@example.com' };
    const timeSlot = '10:00 - 11:00';

    appointments.push({
      doctor: doctor,
      patient: patient1,
      timeSlot: timeSlot
    });

    expect(() => {
      createAppointmentService({ doctor, patient: patient2, timeSlot });
    }).toThrow(ConflictError);
  });

  test('should throw BadRequestError for invalid time slot format', () => {
    const doctor: Doctor = { name: 'Dr. Test' };
    const patient: Patient = { firstName: 'Test', lastName: 'Patient', email: 'test.patient@example.com' };
    const timeSlot = '10:00 - 10:30';
    expect(() => {
      createAppointmentService({ doctor, patient, timeSlot });
    }).toThrow(BadRequestError);
  });

  test('should throw BadRequestError for time slot outside working hours', () => {
    const doctor: Doctor = { name: 'Dr. Test' };
    const patient: Patient = { firstName: 'Test', lastName: 'Patient', email: 'test.patient@example.com' };
    const timeSlot = '08:00 - 09:00';
    expect(() => {
      createAppointmentService({ doctor, patient, timeSlot });
    }).toThrow(BadRequestError);
  });
});

describe(updateAppointmentService, () => {
  beforeEach(() => {
    appointments.length = 0;

    appointments.push(
      {
        doctor: { name: 'Dr. Clara Williams' },
        patient: { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' },
        timeSlot: '10:00 - 11:00',
      },
      {
        doctor: { name: 'Dr. Alice Smith' },
        patient: { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' },
        timeSlot: '14:00 - 15:00',
      }
    );
  });

  test('should update an appointment successfully', () => {
    const patientEmail = 'michael.brown@example.com';
    const originalTimeSlot = '14:00 - 15:00';
    const newTimeSlot = '12:00 - 13:00';

    const result = updateAppointmentService({ patientEmail, originalTimeSlot, newTimeSlot });
    const expectedResult = {
      doctor: { name: 'Dr. Alice Smith' },
      patient: { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' },
      timeSlot: '12:00 - 13:00',
    };

    expect(result).toEqual(expectedResult);
    expect(appointments).toContainEqual(expectedResult);
  });

  test('should update an appointment successfully', () => {
    const patientEmail = 'michael.brown@example.com';
    const originalTimeSlot = '14:00 - 15:00';
    const newTimeSlot = '12:00 - 13:00';

    const result = updateAppointmentService({ patientEmail, originalTimeSlot, newTimeSlot });
    const expectedResult = {
      doctor: { name: 'Dr. Alice Smith' },
      patient: { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' },
      timeSlot: '12:00 - 13:00',
    };

    expect(result).toEqual(expectedResult);
    expect(appointments).toContainEqual(expectedResult);
  });

  test('should throw BadRequestError if original appointment does not exist', () => {
    const patientEmail = 'non.existent@example.com';
    const originalTimeSlot = '14:00 - 15:00';
    const newTimeSlot = '12:00 - 13:00';

    expect(() => {
      updateAppointmentService({ patientEmail, originalTimeSlot, newTimeSlot });
    }).toThrow(BadRequestError);
  });

  test('should throw ConflictError if the new time slot is already booked', () => {
    const patientEmail = 'michael.brown@example.com';
    const originalTimeSlot = '10:00 - 11:00';
    const newTimeSlot = '14:00 - 15:00';

    expect(() => {
      updateAppointmentService({ patientEmail, originalTimeSlot, newTimeSlot });
    }).toThrow(ConflictError);
  });

  test('should throw BadRequestError if new time slot is outside working hours', () => {
    const patientEmail = 'michael.brown@example.com';
    const originalTimeSlot = '14:00 - 15:00';
    const newTimeSlot = '07:00 - 08:00';

    expect(() => {
      updateAppointmentService({ patientEmail, originalTimeSlot, newTimeSlot });
    }).toThrow(BadRequestError);
  });

  test('should update the appointment for different patient but same doctor', () => {
    const patientEmail = 'michael.brown@example.com';
    const originalTimeSlot = '14:00 - 15:00';
    const newTimeSlot = '12:00 - 13:00';

    updateAppointmentService({ patientEmail, originalTimeSlot, newTimeSlot });

    const newAppointment = {
      doctor: { name: 'Dr. Alice Smith' },
      patient: { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' },
      timeSlot: '12:00 - 13:00',
    };

    expect(appointments).toContainEqual(newAppointment);
  });
});
