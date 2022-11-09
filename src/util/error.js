class BadRequestError extends Error {
  constructor(rawError) {
    const error =
      rawError && typeof rawError === "object"
        ? JSON.stringify(rawError)
        : rawError;
    super(error);

    this.data = { error };
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
