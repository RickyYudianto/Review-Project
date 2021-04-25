import { Expose } from 'class-transformer';
import endOfDay from 'date-fns/endOfDay';
import endOfMonth from 'date-fns/endOfMonth';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import 'reflect-metadata';

export default class PerformanceReview {
  @Expose() public id: number | null = null;
  @Expose() public periodStart: Date = startOfDay(startOfMonth(new Date()));
  @Expose() public periodEnd: Date = endOfDay(endOfMonth(new Date()));
  @Expose() public feedbackStart: Date = startOfDay(new Date());
  @Expose() public feedbackEnd: Date = endOfDay(new Date());
}
