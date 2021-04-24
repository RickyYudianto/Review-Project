import { Expose } from 'class-transformer';
import 'reflect-metadata';

export default class UserType {
  @Expose() public id: number | null = null;
  @Expose() public name: string = '';
}
