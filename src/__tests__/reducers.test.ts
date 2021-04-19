import { handleSetRoutes } from '../reducers';

test('Test that titleGetters are all functions, regardless of whether title is defined as a string or a function', () => {
  expect(
    Object.values(
      handleSetRoutes(
        {
          params: {},
          route: '',
          matchedRoute: '',
          currentTitle: '',
          routes: {},
          titleGetters: {},
          changeListeners: [],
        },
        {
          '/': 'Home',
          '/login': 'Login',
          '/register': 'Register',
          '/users/<username:string>': ({ username }) =>
            `Profile of ${username}`,
        },
      ).titleGetters,
    ).map((titleGetter) => typeof titleGetter),
  ).toStrictEqual(['function', 'function', 'function', 'function', 'function']);
});

test('Test that titleGetters return the correct title string, regardless of whether title is defined as a string or a function', () => {
  expect(
    Object.entries(
      handleSetRoutes(
        {
          params: {},
          route: '',
          matchedRoute: '',
          currentTitle: '',
          routes: {},
          titleGetters: {},
          changeListeners: [],
        },
        {
          '/': 'Home',
          '/login': 'Login',
          '/register': 'Register',
          '/users/<username:string>': ({ username }) =>
            `Profile of ${username}`,
        },
      ).titleGetters,
    ).map(([matchedRoute, titleGetter]) =>
      titleGetter(
        matchedRoute === '/users/<username:string>' ? { username: 'Bob' } : {},
      ),
    ),
  ).toStrictEqual(['Home', 'Home', 'Login', 'Register', 'Profile of Bob']);
});
