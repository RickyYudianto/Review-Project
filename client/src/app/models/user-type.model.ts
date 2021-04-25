import { Expose } from 'class-transformer';
import 'reflect-metadata';

export default class UserType {
  @Expose() public id: number | null = 2;
  @Expose() public name: string = 'employee';
}
