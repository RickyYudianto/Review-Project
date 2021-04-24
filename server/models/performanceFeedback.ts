'use strict';
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import PerformanceReview from './performanceReview';
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

  @BelongsTo(() => User)
  public get users(): User {
    return this.getDataValue('users');
  }

  public set users(v: User) {
    this.setDataValue('users', v);
  }

  @BelongsTo(() => User)
  public get reviewers(): User {
    return this.getDataValue('reviewers');
  }

  public set reviewers(v: User) {
    this.setDataValue('reviewers', v);
  }
}
