export const getRiderResultsQueryConfig = (
  year?: number,
  riderId?: number,
) => ({
  where: {
    ...(riderId && { riderId }),
    ...(year && {
      event: {
        Race: {
          some: {
            startDate: {
              contains: `${year}-`,
            },
          },
        },
      },
    }),
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
