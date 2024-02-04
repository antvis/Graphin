export const makeCssTheme = (jsTheme: object) =>
  Object.entries(jsTheme).reduce(
    (cssTheme, [key, value]) => ({
      ...cssTheme,
      [`--${key}`]: value,
    }),
    {},
  );
