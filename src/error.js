/**
 * A class that can return custom Error
 */
class ValidationError extends Error {
/**
 * Add two numbers.
 * @param {string} message Success or fail validation message.
 * @param {string} status Status of validation.
 */
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  ValidationError,
};
