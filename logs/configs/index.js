const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json, printf } = format;
const path = require('path');

// Constants for format options
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// Get the project root path
const PROJECT_ROOT = path.resolve(__dirname, '../');

const customFormat = printf(({ level, message, timestamp, stack, ...info }) => {
  let callerInfo = '';
  if (info.showPath && info.caller) {
    callerInfo = ` [${path.relative(PROJECT_ROOT, info.caller.filename)}:${info.caller.line}] -`;
  }
  let logMessage = `${timestamp} [${level.toUpperCase()}]${callerInfo} ${message}`;
  if (stack) {
    logMessage += `\n${stack}`;
  }
  return logMessage;
});

// Function to enhance logger with caller info and default showPath to true
const enhanceLogger = logger => {
  return {
    error: (message, meta = {}) => {
      const fullMeta = {
        ...meta,
        caller: extractCallerInfo(),
        showPath: meta.hasOwnProperty('showPath') ? meta.showPath : true,
      };
      logger.error(message, fullMeta);
    },
    warn: (message, meta = {}) => {
      const fullMeta = {
        ...meta,
        caller: extractCallerInfo(),
        showPath: meta.hasOwnProperty('showPath') ? meta.showPath : true,
      };
      logger.warn(message, fullMeta);
    },
    info: (message, meta = {}) => {
      const fullMeta = {
        ...meta,
        caller: extractCallerInfo(),
        showPath: meta.hasOwnProperty('showPath') ? meta.showPath : true,
      };
      logger.info(message, fullMeta);
    },
    debug: (message, meta = {}) => {
      const fullMeta = {
        ...meta,
        caller: extractCallerInfo(),
        showPath: meta.hasOwnProperty('showPath') ? meta.showPath : true,
      };
      logger.debug(message, fullMeta);
    },
  };
};

// Function to extract caller information
const extractCallerInfo = () => {
  const prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack;
  Error.prepareStackTrace = prepareStackTrace;
  if (stack && stack.length >= 3) {
    return {
      filename: stack[2].getFileName(),
      line: stack[2].getLineNumber(),
    };
  }
  return null;
};

// Create a base logger
const baseLogger = createLogger({
  format: combine(
    timestamp({ format: TIMESTAMP_FORMAT }),
    errors({ stack: true }),
    json()
  ),
  transports: [
    new transports.Console({
      format: combine(customFormat),
    }),
    new transports.File({
      filename: 'logs/system.log',
      format: combine(customFormat),
    }),
  ],
});

// Enhance the base logger with caller info and default showPath to true
const logger = enhanceLogger(baseLogger);

module.exports = logger;
