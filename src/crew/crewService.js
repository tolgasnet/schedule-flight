import { getCrewFromDb } from "./crewRepository";
import { getDaysOfWeek, isInDateRange } from "../shared/date";
import { getSchedule } from "../schedule/scheduleService";
import logger from "../logger";
const log = logger("crewService");

export const getCrew = (location, departureUtc, returnUtc) => {
  const crewByLocation = getCrewFromDb(location);

  const crewByWorkDays = filterByWorkDays(
    crewByLocation,
    departureUtc,
    returnUtc,
  );

  const crewBySchedule = filterBySchedule(
    crewByWorkDays,
    departureUtc,
    returnUtc,
  );

  log.debug(
    "Pilots filtered by location: %d / by workdays: %d / by schedule: %d",
    crewByLocation.length,
    crewByWorkDays.length,
    crewBySchedule.length,
  );

  if (crewBySchedule.length === 0) {
    return null;
  }

  const firstAvailableCrew = crewBySchedule[0];

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
