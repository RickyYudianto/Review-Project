'use strict';
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import PerformanceReview from './performance-review';
import User from './user';

@Table({
  tableName: 'performance_feedbacks',
  underscored: true
})
export default class PerformanceFeedback extends Model {
  @PrimaryKey
  @ForeignKey(() => PerformanceReview)
  @Column
  get performanceReviewId(): number {
    return this.getDataValue('performanceReviewId');
  }

  set performanceReviewId(value: number) {
    this.setDataValue('performanceReviewId', value);
  }

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  get userId(): number {
    return this.getDataValue('userId');
  }

  set userId(value: number) {
    this.setDataValue('userId', value);
  }

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  get reviewerId(): number {
    return this.getDataValue('reviewerId');
  }

  set reviewerId(value: number) {
    this.setDataValue('reviewerId', value);
  }

  @Column
  get score(): string {
    return this.getDataValue('score');
  }

  set score(value: string) {
    this.setDataValue('score', value);
  }

  @Column
  get feedback(): string {
    return this.getDataValue('feedback');
  }

  set feedback(value: string) {
    this.setDataValue('feedback', value);
  }

  @BelongsTo(() => PerformanceReview)
  public get performanceReview(): PerformanceReview {
    return this.getDataValue('performanceReview');
  }

  public set performanceReview(value: PerformanceReview) {
    this.setDataValue('performanceReview', value);
  }

  @BelongsTo(() => User, 'userId')
  public get user(): User {
    return this.getDataValue('user');
  }

  public set user(v: User) {
    this.setDataValue('user', v);
  }

  @BelongsTo(() => User, 'reviewerId')
  public get reviewer(): User {
    return this.getDataValue('reviewer');
  }

  public set reviewer(v: User) {
    this.setDataValue('reviewer', v);
  }
}
