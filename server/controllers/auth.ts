import { sign, verify } from 'jsonwebtoken';
import env from '../config/env';
import User from '../models/user';
import UserType from '../models/userType';

export default class AuthController {
  public refreshTokens: string[] = [];

  login = async (req: any, res: any) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email, password
      },
      attributes: { exclude: ['password'] },
      include: UserType
    });

    if (user) {
      const { id } = user;
      const loggedInAt = new Date();
      const accessToken = sign({ id, loggedInAt }, env.accessTokenSecret, { expiresIn: 86400 });
      const refreshToken = sign({ id, loggedInAt }, env.refreshTokenSecret);

      this.refreshTokens.push(refreshToken);

      res.json({
        user,
        accessToken,
        refreshToken
      });
    } else {
      res.status(401).send('Username or password incorrect');
    }
  }

  logout = (req: any, res: any) => {
    const { token } = req.body;
    this.refreshTokens = this.refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
  }

  verifyMe = (req: any, res: any) => {
    User.findByPk(req.userId, { attributes: { exclude: ['password'] }, include: UserType }).then(result => {
      if (!result) return res.status(404).send('User not found');

      res.status(200).send(result);
    }).catch(err => res.status(500).send('There was a problem finding the user'));
  }

  token = (req: any, res: any) => {
    const { token } = req.body;

    if (!token) {
      return res.sendStatus(401);
    }

    if (!this.refreshTokens.includes(token)) {
      return res.sendStatus(403);
    }

    verify(token, env.refreshTokenSecret, (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      const accessToken = sign({ id: decoded.id, loggedInAt: new Date() }, env.accessTokenSecret, { expiresIn: 86400 });

      res.json({
        accessToken
      });
    });
  }
}

