'use strict';
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import User from './user';

@Table({
  tableName: 'assigns',
  underscored: true
})
export default class Assign extends Model {
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

  @BelongsTo(() => User, 'userId')
  public get users(): User {
    return this.getDataValue('users');
  }

  public set users(v: User) {
    this.setDataValue('users', v);
  }

  @BelongsTo(() => User, 'reviewerId')
  public get reviewers(): User {
    return this.getDataValue('reviewers');
  }

  public set reviewers(v: User) {
    this.setDataValue('reviewers', v);
  }
}
