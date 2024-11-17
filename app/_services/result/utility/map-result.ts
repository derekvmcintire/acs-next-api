import { mockCategory } from "@/app/_constants/mock-data/result/mock-values";
import { IResult, TransformedRace } from "@/app/_types/result/types";

export const flattenResult = (result: IResult): TransformedRace => {
  const { eventId } = result;

  if (!eventId) {
    throw new Error("Can not count results without eventId");
  }

  const race =
    result?.event?.Race && result?.event?.Race[0]
      ? result?.event?.Race[0]
      : null;

  return {
    id: race?.id,
    name: result?.event?.name || "",
    place: result?.place || undefined,
    time: result?.time || "",
    points: result?.points || 0,
    noPlaceCode:
      result?.place && result?.place > 0 ? "NA" : result?.noPlaceCodeType?.name,
    lap: result?.lap || undefined,
    resultType: result?.resultType?.name || "",
    eventId: result?.event?.id || 0,
    category: mockCategory,
    type: race && race?.raceType?.name ? race.raceType.name : "",
    startDate: race ? race.startDate : "",
    endDate: race && race?.endDate ? race?.endDate : null,
    location: race && race?.location ? race?.location : null,
  };
};
