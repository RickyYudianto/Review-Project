import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import Reviewer from './reviewer.model';

export default class PerformanceFeedback {
  @Expose()
  @Type(() => Reviewer)
  public reviewer: Reviewer = new Reviewer();
  @Expose() public score: number = 0;
  @Expose() public feedback: string = '';
  @Expose() public updatedAt: Date = new Date();
}
