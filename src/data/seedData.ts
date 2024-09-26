import { Appointment } from '../types/appointment';

// export const doctors: Doctor[] = [
//   { 'name': 'Dr. Alice Smith' },
//   { 'name': 'Dr. Bob Johnson' },
//   { 'name': 'Dr. Clara Williams' },
//   { 'name': 'Dr. David Brown' }
// ];

// export const patients: Patient[] = [
//   { 'firstName': 'John', 'lastName': 'Doe', 'email': 'john.doe@example.com' },
//   { 'firstName': 'Jane', 'lastName': 'Smith', 'email': 'jane.smith@example.com' },
//   { 'firstName': 'Emily', 'lastName': 'Jones', 'email': 'emily.jones@example.com' },
//   { 'firstName': 'Michael', 'lastName': 'Brown', 'email': 'michael.brown@example.com' }
// ];

export const appointments: Appointment[] = [
  {
    'doctor': {
      'name': 'Dr. Clara Williams'
    },
    'patient': {
      'firstName': 'Michael',
      'lastName': 'Brown',
      'email': 'michael.brown@example.com'
    },
    'timeSlot': '10:00 - 11:00',
  },
  {
    'doctor': {
      'name': 'Dr. Alice Smith'
    },
    'patient': {
      'firstName': 'Michael',
      'lastName': 'Brown',
      'email': 'michael.brown@example.com'
    },
    'timeSlot': '14:00 - 15:00',
  }
];