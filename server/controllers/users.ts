import sequelize from '../models';
import User from '../models/user';
import UserType from '../models/userType';

export default class UserController {

  getAllUser = (req: any, res: any) => {
    const { page, size } = req.query;
    User.findAndCountAll({
      include: UserType,
      limit: size ? parseInt(size) : undefined,
      offset : page && size ? (parseInt(page) - 1) * parseInt(size) : undefined
    }).then((result: { rows: any; count: any; }) => {
      const data = {
        users: result.rows,
        totalData: result.count
      };
      res.json(data);
    });
  }
}

