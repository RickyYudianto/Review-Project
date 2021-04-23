'use strict';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import User from './user';

@Table({
  tableName: 'user_types',
  underscored: true
})
export default class UserType extends Model {
  @Column
  get name(): string {
    return this.getDataValue('name');
  }

  set name(value: string) {
    this.setDataValue('name', value);
  }

  @HasMany(() => User)
  public get users() : User[] {
    return this.getDataValue('users');
  }
  public set users(v : User[]) {
    this.setDataValue('users', v);
  }
}
