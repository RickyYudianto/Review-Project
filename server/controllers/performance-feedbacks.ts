import { Op } from 'sequelize';
import PerformanceFeedback from '../models/performance-feedback';
import PerformanceReview from '../models/performance-review';
import User from '../models/user';

export default class PerformanceFeedbackController {

  getEmployeeFeedback = (performanceReviewId: number, identifier: any) => {
    return PerformanceFeedback.findAll({
      where: {
        performanceReviewId,
        ...identifier
      },
      include: [{
        model: User,
        as: 'reviewer',
        attributes: ['id', 'name']
      }]
    }).then(result => result.map(obj => obj.toJSON()));
  }

  parseEmployeeFeedback = async (performanceReviewId: number, user: User) => {
    const performanceFeedbacks = await this.getEmployeeFeedback(performanceReviewId, { userId: user.id });

    return {
      ...user.toJSON(),
      performanceFeedbacks
    }
  }

  getAllEmployeeFeedback = async (req: any, res: any) => {
    const { page, size } = req.query;
    const { performanceReviewId } = req.params;
    const performanceReview = await PerformanceReview.findByPk(performanceReviewId).then(result => result?.toJSON());
    await User.findAndCountAll({
      attributes: ['id', 'name', 'email'],
      limit: size ? parseInt(size) : undefined,
      offset : page && size ? (parseInt(page) - 1) * parseInt(size) : undefined
    }).then(async (result: { rows: any; count: any; }) => {
      const promises: any[] = [];
      result.rows.forEach((user: User) => {
        promises.push(this.parseEmployeeFeedback(performanceReviewId, user));
      });

      Promise.all(promises).then(obj => {
        const data = {
          performanceReview,
          performanceFeedbacks: obj,
          totalData: result.count
        };
        res.json(data);
      });
    })
  }

  getEmployeePerformanceFeedbackByUserId = async (req: any, res: any) => {
    const { performanceReviewId, employeeId } = req.params;
    const feedbacks = await this.getEmployeeFeedback(performanceReviewId, { userId: employeeId });
    res.json(feedbacks);
  }

  getPendingFeedbackList = async (req: any, res: any) => {
    const { page, size } = req.query;
    const { reviewerId } = req.params;
    await PerformanceFeedback.findAndCountAll({
      limit: size ? parseInt(size) : undefined,
      offset : page && size ? (parseInt(page) - 1) * parseInt(size) : undefined,
      include: [
        {
          model: PerformanceReview,
          where: {
            [Op.and]: [
              {
                feedbackStart: {
                  [Op.lte]: new Date(),
                },
                feedbackEnd: {
                  [Op.gte]: new Date(),
                }
              }
            ]
          }
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        }
      ],
      where: {
        reviewerId,
        score: 0,
      }
    }).then(async (result: { rows: any; count: any; }) => {
      const data = {
        pendingFeedbacks: result.rows,
        totalData: result.count
      };
      res.json(data);
    });
  }

  updateFeedback = (req: any, res: any) => {
    const { performanceReviewId, userId, reviewerId, score, feedback } = req.body;
    PerformanceFeedback.update({
      score,
      feedback
    }, {
      where: {
        performanceReviewId,
        userId,
        reviewerId
      }
    }).then(async (result) => {
      res.json(result);
    });
  }
}
