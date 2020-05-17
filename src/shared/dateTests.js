import { isInDateRange } from "./date";

describe("dateTests", () => {
  describe("date overlap", () => {
    it("returns true when there is overlap", () => {
      const start1 = "2020-05-01T09:00:00Z";
      const end1 = "2020-05-01T11:00:00Z";
      const start2 = "2020-05-01T10:00:00Z";
      const end2 = "2020-05-01T11:00:00Z";

      const overlap = isInDateRange(start1, end1, start2, end2);

      expect(overlap).toBeTruthy();
    });

    it("returns false when there is no overlap", () => {
      const start1 = "2020-05-01T09:00:00Z";
      const end1 = "2020-05-01T11:00:00Z";
      const start2 = "2020-05-01T12:00:00Z";
      const end2 = "2020-05-01T13:00:00Z";

      const overlap = isInDateRange(start1, end1, start2, end2);

      expect(overlap).toBeFalsy();
    });
  });
});
