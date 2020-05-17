import { getCrewFromDb } from "./crewRepository";
import { getScheduleFromDb } from "../schedule/scheduleRepository";
import { getDaysOfWeek } from "../shared/date";
import logger from "../logger";
import { Pilot } from "./pilot";
const log = logger("crewService");

export const getCrew = (location, departureUtc, returnUtc) => {
  const requestedDays = getDaysOfWeek(departureUtc, returnUtc);
  const schedule = getScheduleFromDb();
  const allCrew = getCrewFromDb().map((pilot) => new Pilot(pilot, schedule));

  const availableCrew = allCrew.filter(
    (pilot) =>
      pilot.inLocation(location) &&
      pilot.isAvailable(requestedDays, departureUtc, returnUtc),
  );

  log.debug("Found %d available crew", availableCrew.length);

  if (availableCrew.length === 0) {
    return null;
  }

  const firstAvailableCrew = availableCrew[0];

  return { ID: firstAvailableCrew.ID, Name: firstAvailableCrew.Name };
};
