import * as transformer from 'class-transformer';
import {
  fromJsonToArrayOfObject,
  fromJsonToObj,
  toJsonFromObj,
} from '../../helpers/class-transformer.helper';
import User from '../../models/user.model';

describe('class-transformer.helper.ts', () => {
  describe('fromJsonToArrayOfObject', () => {
    it('should call plainToClass from class-transformer dependency', () => {
      const plainToClass = jest.spyOn(transformer, 'plainToClass');
      fromJsonToArrayOfObject(User, []);
      expect(plainToClass).toBeCalled();
    });
  });

  describe('fromJsonToObj', () => {
    it('should call plainToClass from class-transformer dependency', () => {
      const plainToClass = jest.spyOn(transformer, 'plainToClass');
      fromJsonToObj(User, {
        id: 1,
      });
      expect(plainToClass).toBeCalled();
    });
  });

  describe('toJsonFromObj', () => {
    it('should call classToPlain from class-transformer dependency', () => {
      const classToPlain = jest.spyOn(transformer, 'classToPlain');
      toJsonFromObj(new User());
      expect(classToPlain).toBeCalled();
    });
  });
});
