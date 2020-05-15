import { getCrewFromDb } from "./crewRepository";
import { getDaysOfWeek, isInDateRange } from "../utilities/date";
import { getSchedule } from "../schedule/scheduleService";
import logger from "../logger";
const log = logger("crewService");

export const getCrew = (location, departureUtc, returnUtc) => {
  const crewByLocation = getCrewFromDb(location);
  log.debug("Found %d pilots in location", crewByLocation.length);

  const crewByWorkDays = filterByWorkDays(
    crewByLocation,
    departureUtc,
    returnUtc,
  );

  const availableCrew = filterBySchedule(
    crewByWorkDays,
    departureUtc,
    returnUtc,
  );

  const firstAvailableCrew = availableCrew[0];

  return { ID: firstAvailableCrew.ID, Name: firstAvailableCrew.Name };
};

const filterByWorkDays = (crew, departureUtc, returnUtc) => {
  const requestedDays = getDaysOfWeek(departureUtc, returnUtc);
  return crew.filter((crew) => {
    return requestedDays.every((requested) =>
      crew.WorkDays.includes(requested),
    );
  });
};

const filterBySchedule = (crew, departureUtc, returnUtc) => {
  const allScheduledFlights = getSchedule();
  return crew.filter((eachCrew) => {
    return allScheduledFlights.filter((schedule) => {
      schedule.PilotID === eachCrew.ID &&
        !isInDateRange(
          schedule.depDateTime,
          schedule.returnDateTime,
          departureUtc,
          returnUtc,
        );
    });
  });
};
