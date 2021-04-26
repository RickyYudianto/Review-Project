import {
  generateInitial,
  stringToColor,
} from '../../helpers/avatar-user.helper';

describe('avatar-user.helper.ts', () => {
  describe('generateInitial', () => {
    it('should return first character from each word when space included in param', () => {
      const actual = generateInitial('ricky yudianto');
      expect(actual).toEqual('ry');
    });
    it('should return two character when space not included in param', () => {
      const actual = generateInitial('ricky');
      expect(actual).toEqual('ri');
    });
    it('should return param when param length less than two', () => {
      const actual = generateInitial('r');
      expect(actual).toEqual('r');
    });
  });

  describe('stringToColor', () => {
    it('should return hex color from string', () => {
      const actual = stringToColor('ricky yudianto');
      expect(actual).toEqual('#6fc550');
    });
  });
});
