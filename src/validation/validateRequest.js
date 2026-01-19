export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    const formatedErrors = result.error.format();
    if (!result.success)
      return res.status(400).json({
        message: formatedErrors,
      });
    next();
  };
};
