class ThreadHelper {

  /**
   * 
   * @param {Number} duration 
   */
  static async sleep(duration = 1000) {
    await new Promise(resolve => setTimeout(() => resolve(), duration));
  }
}

export default ThreadHelper;