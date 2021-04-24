import { Expose } from 'class-transformer';

export default class Reviewee {
  @Expose() public id: number | null = null;
  @Expose() public name: string = '';
}
