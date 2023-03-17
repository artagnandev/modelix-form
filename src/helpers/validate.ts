import * as Yup from 'yup';

/**
 * Create request for
 * validate edit and create.
 */
export default ({
  error: (err: Error) => {
    if (err instanceof Yup.ValidationError) {
      const messages: Record<string, any> = {};

      err.inner.forEach((validate) => {
        messages[validate.path ?? 0] = validate.message;
      });

      return messages;
    }

    return null;
  },

  request: async <T>(
    data: T | null,
    shape: Record<string, any>,
  ) => Yup.object()
    .shape(shape ?? {})
    .validate(data, {
      abortEarly: false,
    }),
});
