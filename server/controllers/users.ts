import sequelize from '../models';
import User from '../models/user';
import UserType from '../models/userType';

export default class UserController {

  getAllUser = (req: any, res: any) => {
    User.findAndCountAll({ include: UserType }).then((result: { rows: any; count: any; }) => {
      const data = {
        users: result.rows,
        totalData: result.count
      };
      res.json(data);
    });
  }
}

