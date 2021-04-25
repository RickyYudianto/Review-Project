import Assign from '../models/assign';
import PerformanceFeedback from '../models/performance-feedback';
import PerformanceReview from '../models/performance-review';

export default class PerformanceReviewController {

  getAllAssign = () => {
    return Assign.findAll().then(result => result);
  }

  getAllPerformanceReview = (req: any, res: any) => {
    const { page, size } = req.query;
    PerformanceReview.findAndCountAll({
      include: PerformanceFeedback,
      limit: size ? parseInt(size) : undefined,
      offset : page && size ? (parseInt(page) - 1) * parseInt(size) : undefined
    }).then(async (result: { rows: any; count: any; }) => {
      const data = {
        performanceReviews: result.rows,
        totalData: result.count
      };
      res.json(data);
    });
  }

  getPerformanceReviewById = (req: any, res: any) => {
    const { id } = req.params;
    PerformanceReview.findByPk(id,{
      include: PerformanceFeedback,
    }).then(async (result) => {
      res.json(result);
    });
  }

  createPerformanceReview = (req: any, res: any) => {
    const { periodStart, periodEnd, feedbackStart, feedbackEnd } = req.body;
    PerformanceReview.create({
      periodStart,
      periodEnd,
      feedbackStart,
      feedbackEnd
    }).then(async (result) => {
      const assigns = await this.getAllAssign();
      const assignsObj = assigns.map(assign => assign.toJSON());
      const feedbackData = assignsObj.map((obj: any) => {
        return {
          performanceReviewId: result.id,
          userId: obj.userId,
          reviewerId: obj.reviewerId,
          score: 0,
          feedback: null,
        }
      })
      await PerformanceFeedback.bulkCreate(feedbackData);
      res.json(result);
    });
  }

  updatePerformanceReview = (req: any, res: any) => {
    const { id, periodStart, periodEnd, feedbackStart, feedbackEnd } = req.body;
    PerformanceReview.update({
      periodStart,
      periodEnd,
      feedbackStart,
      feedbackEnd
    }, {
      where: {
        id
      }
    }).then(result => {
      res.json(result);
    });
  }

  deletePerformanceReview = (req: any, res: any) => {
    const { id } = req.body;
    PerformanceReview.destroy({
      where: {
        id
      }
    }).then((result) => {
      res.json(result);
    });
  }
}
