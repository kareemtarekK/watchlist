export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formatedErrors = result.error.format();
      const errors = Object.values(formatedErrors)
        .flat()
        .map((err) => err._errors)
        .filter(Boolean)
        .flat()
        .join(", ");
      return res.status(400).json({
        message: errors,
      });
    }
    next();
  };
};
