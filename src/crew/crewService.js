import { getCrewFromDb } from "./crewRepository";
import { getDaysOfWeek, isInDateRange } from "../shared/date";
import { getSchedule } from "../schedule/scheduleService";
import logger from "../logger";
const log = logger("crewService");

export const getCrew = (location, departureUtc, returnUtc) => {
  const allCrew = getCrewFromDb();

  const crewByLocation = allCrew.filter((crew) => crew.Base === location);
  const crewByDays = filterByWorkDays(crewByLocation, departureUtc, returnUtc);
  const availableCrew = filterBySchedule(crewByDays, departureUtc, returnUtc);

  log.debug(
    "Crew by location: %d / by workdays: %d / by schedule: %d",
    allCrew.length,
    crewByDays.length,
    availableCrew.length,
  );

  if (availableCrew.length === 0) {
    return null;
  }

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
