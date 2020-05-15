import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("src/schedule/db/scheduleDb.json");
const db = low(adapter);

export const getScheduleFromDb = () => {
  return db.get("Schedule").Schedule;
};
