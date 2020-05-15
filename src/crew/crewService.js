import { getCrewFromDb } from "./crewRepository";
import { getDaysOfWeek } from "../utilities/date";
import logger from "../logger";
const log = logger("crewService");

export const getCrew = (location, departureUtc, returnUtc) => {
  const crewByLocation = getCrewFromDb(location);
  log.debug("Found %d pilots in location", crewByLocation.length);

  const requestedDays = getDaysOfWeek(departureUtc, returnUtc);

  const availableCrew = filterCrewByDays(
    crewByLocation,
    requestedDays,
  );

  const firstAvailableCrew = availableCrew[0];

  return { ID: firstAvailableCrew.ID, Name: firstAvailableCrew.Name };
};

const filterCrewByDays = (crew, requestedDays) => {
  return crew.filter((crew) => {
    return requestedDays.every((requested) =>
      crew.WorkDays.includes(requested),
    );
  });
};
