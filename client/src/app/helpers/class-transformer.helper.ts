import { classToPlain, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export const fromJsonToArrayOfObject = <T, V>(
  classType: ClassType<T>,
  json: V[],
): T[] => {
  return plainToClass(classType, json, { excludeExtraneousValues: true });
};

export const fromJsonToObj = <T, V>(classType: ClassType<T>, json: V): T => {
  return plainToClass(classType, json, {
    excludeExtraneousValues: true,
    strategy: 'excludeAll',
  });
};

export const toJsonFromObj = obj => {
  return classToPlain(obj);
};
