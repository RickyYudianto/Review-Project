import Assign from '../models/assign';
import User from '../models/user';
import UserType from '../models/userType';

export default class UserController {

  getReviewersByUserId = (userId: number) => {
    return Assign.findAll({
      where: {
        userId
      },
      include: [{
        model: User,
        as: 'reviewers',
        attributes: ['id', 'name']
      }],
    }).then((result) => {
      return result.map(obj => obj.reviewers.toJSON());
    });
  }

  getRevieweesById = (reviewerId: number) => {
    return Assign.findAll({
      where: {
        reviewerId
      },
      include: [{
        model: User,
        as: 'users',
        attributes: ['id', 'name']
      }],
    }).then((result) => {
      return result.map(obj => obj.users.toJSON());
    });
  }

  getReviewersReviewees = async (user: any) => {
    const reviewers = await this.getReviewersByUserId(user.id);
    const reviewees = await this.getRevieweesById(user.id);
    let userObj;

    try {
      userObj = user.toJSON();
    } catch (e) {
      userObj = user;
    }

    return {
      ...userObj,
      reviewers,
      reviewees,
    }
  }

  getAllUser = (req: any, res: any) => {
    const { page, size } = req.query;
    User.findAndCountAll({
      include: UserType,
      limit: size ? parseInt(size) : undefined,
      offset : page && size ? (parseInt(page) - 1) * parseInt(size) : undefined
    }).then(async (result: { rows: any; count: any; }) => {
      const promises: any[] = [];

      result.rows.forEach((user: any) => {
        promises.push(this.getReviewersReviewees(user));
      })

      const users = await Promise.all(promises).then(result => {
        return result;
      });
      const data = {
        users,
        totalData: result.count
      };
      res.json(data);
    });
  }

  getUserById = (req: any, res: any) => {
    const { id } = req.params;
    User.findByPk(id,{
      include: UserType,
    }).then(async (result) => {
      const user = await this.getReviewersReviewees(result).then(obj => obj);
      res.json(user);
    });
  }

  createUser = (req: any, res: any) => {
    const { email, name, isActive, userType, reviewers, reviewees } = req.body;
    User.create({
      email,
      password: '123456',
      name,
      isActive,
      typeId: userType.id
    }).then(async (result) => {
      await this.createAssign(result.id, reviewers, reviewees);
      const user = await this.getReviewersReviewees(result).then(obj => obj);
      res.json(user);
    });
  }

  updateUser = (req: any, res: any) => {
    const { id, email, name, isActive, userType, reviewers, reviewees } = req.body;
    User.update({
      email,
      name,
      isActive,
      typeId: userType.id
    }, {
      where: {
        id
      }
    }).then(async (result) => {
      await this.createAssign(id, reviewers, reviewees);
      const user = await this.getReviewersReviewees(req.body).then(obj => obj);
      res.json(user);
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

  createAssign = async (userId: number, reviewers: any[], reviewees: any[]) => {
    await Assign.destroy({
      where: {
        userId
      }
    });
    await Assign.destroy({
      where: {
        reviewerId: userId
      }
    });
    const assign = [
      ...reviewers.map(reviewer => {
        return {
          userId,
          reviewerId: reviewer.id
        }
      }),
      ...reviewees.map(reviewee => {
        return {
          userId: reviewee.id,
          reviewerId: userId
        }
      })
    ]
    return Assign.bulkCreate(assign).then(result => result);
  }
}
