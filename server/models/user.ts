'use strict';
import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import UserType from './userType';

@Table({
  tableName: 'users',
  underscored: true
})
export default class User extends Model {
  @Column
  get email(): string {
    return this.getDataValue('email');
  }

  set email(value: string) {
    this.setDataValue('email', value);
  }

  @Column
  get password(): string {
    return this.getDataValue('password');
  }

  set password(value: string) {
    this.setDataValue('password', value);
  }

  @Column
  get name(): string {
    return this.getDataValue('name');
  }

  set name(value: string) {
    this.setDataValue('name', value);
  }

  @Column
  get isActive(): boolean {
    return this.getDataValue('isActive');
  }

  set isActive(value: boolean) {
    this.setDataValue('isActive', value);
  }

  @ForeignKey(() => UserType)
  @Column
  get typeId(): number {
    return this.getDataValue('typeId');
  }

  set typeId(value: number) {
    this.setDataValue('typeId', value);
  }

  @BelongsTo(() => UserType)
  public get userType() : UserType {
    return this.getDataValue('userType');
  }
  public set userType(value : UserType) {
    this.setDataValue('userType', value);
  }
}