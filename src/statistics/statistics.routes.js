import { Router } from 'express';
import { getNationalList, getPresidential } from './statistics.controller.js';

const api = Router();

api.get('/get', getPresidential);
api.get('/getGreenBallot', getNationalList);
api.get('/getWhiteBallot', getPresidential)

export default api;