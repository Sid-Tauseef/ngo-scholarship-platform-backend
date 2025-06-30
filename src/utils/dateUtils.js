// Safe date parsing for backend
module.exports.safeDate = (value) => {
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return isNaN(date) ? new Date() : date;
  }
  return new Date();
};