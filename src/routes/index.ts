import { Router } from 'express';
import appointmentRoutes from './appointmentRoutes';

const routes: Router = Router();

routes.use('/appointment', appointmentRoutes);

export default routes;
