import { RequestHandler } from 'express';
import Joi from 'joi';
import { BadRequestError } from '../errors/ErrorTypes';

const timeSlotPattern = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]) - (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

const getAppointmentByPatientSchema = Joi.object({
  patientEmail: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Patient email must be a string',
      'string.email': 'Invalid email format for patient email',
      'any.required': 'Patient email is required',
    }),
});
export const getAppointmentByPatientValidator: RequestHandler = (req, _res, next) => {
  const { error } = getAppointmentByPatientSchema.validate(req.query);
  if (error) throw new BadRequestError(error.details[0].message);
  next();
};

const getAppointmentByDoctorSchema = Joi.object({
  doctorName: Joi.string()
    .required()
    .messages({
      'string.base': 'Doctor name must be a string',
      'any.required': 'Doctor name is required',
    }),
});
export const getAppointmentByDoctorValidator: RequestHandler = (req, _res, next) => {
  const { error } = getAppointmentByDoctorSchema.validate(req.query);
  if (error) throw new BadRequestError(error.details[0].message);
  next();
};

export const createAppointmentSchema = Joi.object({
  doctor: Joi.object({
    name: Joi.string()
      .required()
      .messages({
        'string.base': 'Doctor name must be a string',
        'any.required': 'Doctor name is required'
      })
  }).required().messages({
    'any.required': 'Doctor information is required'
  }),

  patient: Joi.object({
    firstName: Joi.string()
      .required()
      .messages({
        'string.base': 'First name must be a string',
        'any.required': 'First name is required'
      }),
    lastName: Joi.string()
      .required()
      .messages({
        'string.base': 'Last name must be a string',
        'any.required': 'Last name is required'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'any.required': 'Patient email is required'
      })
  }).required().messages({
    'any.required': 'Patient information is required'
  }),

  timeSlot: Joi.string()
    .pattern(timeSlotPattern)
    .required()
    .messages({
      'string.base': 'Time slot must be a valid string of format HH:MM',
      'string.pattern.base': 'Time slot must be a valid string of format HH:MM',
      'any.required': 'Time slot is required'
    })
});
export const createAppointmentValidator: RequestHandler = (req, _res, next) => {
  const { error } = createAppointmentSchema.validate(req.body);
  if (error) throw new BadRequestError(error.details[0].message);
  next();
};

export const deleteAppointmentSchema = Joi.object({
  patientEmail: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Patient email is required'
    }),
  timeSlot: Joi.string()
    .pattern(timeSlotPattern)
    .required()
    .messages({
      'string.base': 'Time slot must be a valid string of format HH:MM',
      'string.pattern.base': 'Time slot must be a valid string of format HH:MM',
      'any.required': 'Time slot is required'
    })
});
export const deleteAppointmentValidator: RequestHandler = (req, _res, next) => {
  const { error } = deleteAppointmentSchema.validate(req.query);
  if (error) throw new BadRequestError(error.details[0].message);
  next();
};

export const updateAppointmentSchema = Joi.object({
  patientEmail: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Patient email is required'
    }),
  originalTimeSlot: Joi.string()
    .pattern(timeSlotPattern)
    .required()
    .messages({
      'string.base': 'Original time slot must be a valid string of format HH:MM',
      'string.pattern.base': 'Time slot must be a valid string of format HH:MM',
      'any.required': 'Original time slot is required'
    }),
  newTimeSlot: Joi.string()
    .pattern(timeSlotPattern)
    .required()
    .messages({
      'string.base': 'New time slot must be a valid string of format HH:MM',
      'string.pattern.base': 'Time slot must be a valid string of format HH:MM',
      'any.required': 'New time slot is required'
    })
});
export const updateAppointmentValidator: RequestHandler = (req, _res, next) => {
  const { error } = updateAppointmentSchema.validate(req.query);
  if (error) throw new BadRequestError(error.details[0].message);
  next();
};
