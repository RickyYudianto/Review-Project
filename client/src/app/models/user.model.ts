import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import UserType from './user-type.model';

export default class User {
  @Expose() public id: number | null = null;
  @Expose() public email: string = '';
  @Expose() public name: string = '';
  @Expose() public isActive: boolean = true;
  @Expose()
  @Type(() => UserType)
  public userType: UserType = new UserType();
}
