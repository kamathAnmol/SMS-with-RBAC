export default class Logs {
  // Constants for ANSI color codes
  private static readonly RESET = "\x1b[0m";
  private static readonly RED_BG = "\x1b[41m";
  private static readonly BLUE_BG = "\x1b[44m";
  private static readonly YELLOW_BG = "\x1b[43m";

  // Log level enum to control logging output
  static LogLevel = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    ALL: 5,
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

  /**
   * Standard log output
   */
  static log(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.DEBUG) {
      console.log(...messages);
    }
  }

  /**
   * Error log with red background
   */
  static error(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.ERROR) {
      console.error(Logs.RED_BG, ...messages, Logs.RESET);
    }
  }

  /**
   * Warning log with yellow background
   */
  static warn(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.WARN) {
      console.warn(Logs.YELLOW_BG, ...messages, Logs.RESET);
    }
  }

  /**
   * Info log with blue background
   */
  static info(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.INFO) {
      console.info(Logs.BLUE_BG, ...messages, Logs.RESET);
    }
  }

  /**
   * Debug log for detailed debugging information
   */
  static debug(...messages: any[]): void {
    if (Logs.currentLogLevel >= Logs.LogLevel.DEBUG) {
      console.debug(...messages);
    }
  }
}
