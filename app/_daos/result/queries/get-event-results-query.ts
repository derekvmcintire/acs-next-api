export const getEventResultsQueryConfig = (eventId: number) => ({
  where: {
    eventId: eventId,
  },
  include: {
    rider: true,
    event: {
      include: {
        Race: {
          include: {
            raceType: true,
          },
        },
      },
    },
    resultType: true,
    noPlaceCodeType: true,
  },
});
