import { Expose } from 'class-transformer';

export default class Reviewer {
  @Expose() public id: number | null = null;
  @Expose() public name: string = '';
}
