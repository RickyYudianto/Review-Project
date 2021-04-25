import { sign, verify } from 'jsonwebtoken';
import omit from 'lodash/omit';
import env from '../config/env';
import User from '../models/user';
import UserType from '../models/userType';

export default class AuthController {
  login = async (req: any, res: any) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email
      },
      include: UserType
    });

    if (user && user.isActive && user.validPassword(password)) {
      const { id } = user;
      const loggedInAt = new Date();
      const accessToken = sign({ id, loggedInAt }, env.accessTokenSecret, { expiresIn: 604800 });

      const omittedUser = omit(user.toJSON(), ['password']);

      res.json({
        user: omittedUser,
        accessToken,
      });
    } else {
      res.status(401).send('Incorrect email address or password');
    }
  }

  verifyMe = (req: any, res: any) => {
    User.findByPk(req.userId, { attributes: { exclude: ['password'] }, include: UserType }).then(result => {
      if (!result) return res.status(404).send('User not found');

      res.status(200).send(result);
    }).catch(err => res.status(500).send('There was a problem finding the user'));
  }
}

