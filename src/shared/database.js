import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const dbPath = "db/flight.json";

export const getCollection = (name) => {
  const db = low(new FileSync(dbPath));
  return db.get(name).value();
};
