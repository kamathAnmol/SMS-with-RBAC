export default class Logs {
  // Constants for ANSI color codes
  private static readonly RESET = "\x1b[0m";
  private static readonly RED = "\x1b[31m";
  private static readonly BLUE = "\x1b[34m";
  private static readonly YELLOW = "\x1b[33m";
  private static readonly GREEN = "\x1b[32m";
  private static readonly MAGENTA = "\x1b[35m"; // Purple/magenta for DB logs

  // Log level enum to control logging output
  static LogLevel = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    ALL: 5,
    DB: 10, // Special level for database logs, not included in ALL
  };

  // Current log level - read from NODE_ENV or default to ALL
  static currentLogLevel = (() => {
    const envLogLevel = process.env.LOG_LEVEL?.toUpperCase();
    if (envLogLevel) {
      const levelKey = Object.keys(Logs.LogLevel).find(
        (key) => key === envLogLevel
      );
      if (levelKey) {
        return Logs.LogLevel[levelKey as keyof typeof Logs.LogLevel];
      }
    }
    return Logs.LogLevel.ALL;
  })();

  // Database logging flag - separate from main log level hierarchy
  static enableDbLogging = (() => {
    const dbLogging = process.env.DB_LOGGING?.toLowerCase();
    return dbLogging === "true" || dbLogging === "1" || dbLogging === "yes";
  })();

  /**
   * Standard log output
   */
  static log(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.DEBUG) {
      console.log(`[${new Date().toISOString()}]`, ...messages);
    }
  }

  /**
   * Error log with red text
   */
  static error(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.ERROR) {
      console.error(
        Logs.RED,
        `[${new Date().toISOString()}]`,
        ...messages,
        Logs.RESET
      );
    }
  }

  /**
   * Warning log with yellow text
   */
  static warn(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.WARN) {
      console.warn(
        Logs.YELLOW,
        `[${new Date().toISOString()}]`,
        ...messages,
        Logs.RESET
      );
    }
  }

  /**
   * Info log with blue text
   */
  static info(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.INFO) {
      console.info(
        Logs.BLUE,
        `[${new Date().toISOString()}]`,
        ...messages,
        Logs.RESET
      );
    }
  }

  /**
   * Debug log with green text for detailed debugging information
   */
  static debug(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.DEBUG) {
      console.debug(
        Logs.GREEN,
        `[${new Date().toISOString()}]`,
        ...messages,
        Logs.RESET
      );
    }
  }

  /**
   * Database log with magenta text - not controlled by the standard log level
   * Needs to be explicitly enabled via DB_LOGGING environment variable
   */
  static db(...messages: any[]): void {
    if (Logs.enableDbLogging) {
      console.log(
        Logs.MAGENTA,
        `[${new Date().toISOString()}]`,
        ...messages,
        Logs.RESET
      );
    }
  }
}
