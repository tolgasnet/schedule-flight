import { getCrewFromDb } from "./crewRepository";
import logger from "../logger";
const log = logger("crewService");

export const getCrew = (location) => {
  const allCrewByLocation = getCrewFromDb(location);
  log.debug("Got result from repo: %o", allCrewByLocation);

  const firstAvailableCrew = allCrewByLocation.Crew[0];

  return { ID: firstAvailableCrew.ID, Name: firstAvailableCrew.Name };
};
