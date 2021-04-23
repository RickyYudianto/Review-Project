import { verify } from 'jsonwebtoken';
import env from '../config/env';

export const verifyToken = (req: any, res: any, next: any) => {
  let token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided' });

  verify(token, env.accessTokenSecret, (err: any, decoded: any) => {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });

    req.userId = decoded.id;
    req.loggedInAt = decoded.loggedInAt;
    next();
  });
}