'use strict';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import PerformanceFeedback from './performanceFeedback';
import User from './user';

@Table({
  tableName: 'performance_reviews',
  underscored: true
})
export default class PerformanceReview extends Model {
  @Column
  get periodStart(): Date {
    return this.getDataValue('periodStart');
  }

  set periodStart(value: Date) {
    this.setDataValue('periodStart', value);
  }

  @Column
  get periodEnd(): Date {
    return this.getDataValue('periodEnd');
  }

  set periodEnd(value: Date) {
    this.setDataValue('periodEnd', value);
  }

  @Column
  get feedbackStart(): Date {
    return this.getDataValue('feedbackStart');
  }

  set feedbackStart(value: Date) {
    this.setDataValue('feedbackStart', value);
  }

  @Column
  get feedbackEnd(): Date {
    return this.getDataValue('feedbackEnd');
  }

  set feedbackEnd(value: Date) {
    this.setDataValue('feedbackEnd', value);
  }

  @HasMany(() => PerformanceFeedback)
  public get performanceFeedbacks(): PerformanceFeedback[] {
    return this.getDataValue('performanceFeedbacks');
  }

  public set performanceFeedbacks(v: PerformanceFeedback[]) {
    this.setDataValue('performanceFeedbacks', v);
  }
}
