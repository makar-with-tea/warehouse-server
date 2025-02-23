import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    
    const originalSend = res.send;
  
    res.send = function (body) {
      console.log(`${req.method} ${req.url} ${res.statusCode}`);
      console.log('Response Body:', body);
      return originalSend.apply(this, arguments);
    };
  
    next();
  };