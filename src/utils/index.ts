import { ERROR_ROUTE } from '../constants';
import { Response } from 'express';

const errorHandlerApi = (e: any) => {
  console.log(e);
  return e;
};

const errorHandlerRender = (res: Response) => (e: any) => {
  console.log(e);
  return res.status(500).redirect(ERROR_ROUTE);
};

export { errorHandlerApi, errorHandlerRender };
