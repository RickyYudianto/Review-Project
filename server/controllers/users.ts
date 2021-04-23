import sequelize from '../models';
import User from '../models/user';
import UserType from '../models/userType';

export default class UserController {

  getAllUser = (req: any, res: any) => {
    sequelize.model(User).findAndCountAll({ include: sequelize.model(UserType)}).then((result: { rows: any; count: any; }) => {
      const data = {
        users : result.rows,
        totalData : result.count
      };
      res.json(data);
    });
  }
}
