import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileUpdateError } from './getProfileUpdateError';
import { ValidateProfileError } from '../../types/EditableProfile';

describe('getProfileUpdateError.test', () => {
  const testValue = ValidateProfileError.NO_DATA;

  test('with value', () => {
    const state:DeepPartial<StateSchema> = {
      editableProfileCard: {
        error: ValidateProfileError.NO_DATA,
      },
    };

    expect(getProfileUpdateError(state as StateSchema)).toEqual(testValue);
  });

  test('with empty state passed', () => {
    const state:DeepPartial<StateSchema> = {};

    expect(getProfileUpdateError(state as StateSchema)).toBe('');
  });
});
