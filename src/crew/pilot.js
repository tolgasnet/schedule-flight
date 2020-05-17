import { isInDateRange } from "../shared/date";
import logger from "../logger";
const log = logger("pilot");

export class Pilot {
  constructor(pilotData, schedule) {
    this.ID = pilotData.ID;
    this.Name = pilotData.Name;
    this.WorkDays = pilotData.WorkDays;
    this.Base = pilotData.Base;
    this.Schedule = schedule.filter((s) => {
      return s.PilotID === this.ID;
    });
  }

  isAvailable(requestedDays, departureUtc, returnUtc) {
    const worksOnDays = this.worksOnDays(requestedDays);
    const overlappingFlights =
      this.hasOverlappingFlights(departureUtc, returnUtc).length > 0;

    const isAvailable = worksOnDays && !overlappingFlights;

    log.debug(
      "Pilot isAvailable:%s because workDay matches:%s, hasOverlappingFlights:%s",
      isAvailable,
      worksOnDays,
      overlappingFlights,
    );

    return isAvailable;
  }

  inLocation(location) {
    return this.Base === location;
  }

  worksOnDays(requestedDays) {
    return requestedDays.every((requested) =>
      this.WorkDays.includes(requested),
    );
  }

  hasOverlappingFlights(departureUtc, returnUtc) {
    return this.Schedule.filter((schedule) => {
      return (
        schedule.PilotID === this.ID &&
        isInDateRange(
          schedule.DepDateTime,
          schedule.ReturnDateTime,
          departureUtc,
          returnUtc,
        )
      );
    });
  }
}
