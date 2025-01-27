import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginState } from './getLoginState';

describe('getLoginState.test', () => {
  test('with value', () => {
    const state:DeepPartial<StateSchema> = {
      loginForm: {
        username: 'admin',
        password: '123',
        isLoading: true,
        error: '',
      },
    };

    expect(getLoginState(state as StateSchema)).toEqual({
      username: 'admin',
      password: '123',
      isLoading: true,
      error: '',
    });
  });

  test('with empty state passed', () => {
    const state:DeepPartial<StateSchema> = {};

    expect(getLoginState(state as StateSchema)).toEqual(undefined);
  });
});
