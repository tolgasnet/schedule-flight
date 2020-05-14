import app from "./app";
import logger from "./logger";
const log = logger("server");

const port = 3000;

app.listen(port, () => log.debug(`Api started on port ${port}`));
