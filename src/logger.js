import log4js from "log4js";

const logger = (namespace) => {
  const logger = log4js.getLogger(namespace);
  logger.level = "debug";
  return logger;
};

export default logger;
