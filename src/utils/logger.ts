import dotenv from 'dotenv';

// Initialize configuration
dotenv.config();

const debug = process.env.APP_DEBUG == 'true';

// Logger class
class Logger {
  // Log info message
  info(message: string) {
    if (debug) {
      console.log(`[INFO] ${message}`);
    }
  }

  // Log error message
  error(error: string | unknown) {
    if (debug) {
      // convert error to string
      // stringify error;
      const type = typeof error == 'string' ? 'string' : 'object';
      switch (type) {
        case 'string':
          console.error(`[ERROR] ${error}`);
          break;
        case 'object':
          // log error message
          console.error(`[ERROR] ${(error as { message: string })?.message}`);
          // log error stack trace
          console.error(`[ERROR] ${(error as { stack: string })?.stack}`);
          break;
      }
    }
  }
}

// Export logger instance
export default new Logger();