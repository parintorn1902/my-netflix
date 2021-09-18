class NumberHelper {
  /**
   *
   * @param {Number} min
   * @param {Number} max
   * @returns {Number}
   */
  static random(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
export default NumberHelper;
