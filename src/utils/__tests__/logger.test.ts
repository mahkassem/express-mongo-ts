// ensure APP_DEBUG is set to true
process.env.APP_DEBUG = "true";

import logger from "../logger";

describe("logger", () => {
  it("should log a message", () => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    logger.info("Hello, world!");
    expect(spy).toHaveBeenCalledWith("[INFO] Hello, world!");
    spy.mockRestore();
  });

  it("should log an error", () => {
    const spy = jest.spyOn(console, "error").mockImplementation();
    logger.error("An error occurred");
    expect(spy).toHaveBeenCalledWith("[ERROR] An error occurred");
    spy.mockRestore();
  });

  it("should log an error object", () => {
    const spy = jest.spyOn(console, "error").mockImplementation();
    logger.error(new Error("An error occurred"));
    // expect two calls to console.error
    expect(spy).toHaveBeenCalledTimes(2);
    // expect the first call to log the error message
    expect(spy).toHaveBeenCalledWith("[ERROR] An error occurred");
    // expect the second call to log the error stack trace
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Error: An error occurred"));
    spy.mockRestore();
  });
});