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

  getUserById = (req: any, res: any) => {
    const { id } = req.params;
    User.findByPk(id,{
      include: UserType,
    }).then((result) => {
      res.json(result);
    });
  }

  createUser = (req: any, res: any) => {
    const { email, name, isActive, userType } = req.body;
    User.create({
      email,
      password: '123456',
      name,
      isActive,
      typeId: userType.id
    }).then((result) => {
      res.json(result);
    });
  }

  updateUser = (req: any, res: any) => {
    const { id, email, name, isActive, userType } = req.body;
    User.update({
      email,
      name,
      isActive,
      typeId: userType.id
    }, {
      where: {
        id
      }
    }).then((result) => {
      res.json(result);
    });
  }

  deleteUser = (req: any, res: any) => {
    const { id } = req.body;
    User.destroy({
      where: {
        id
      }
    }).then((result) => {
      res.json(result);
    });
  }
}

