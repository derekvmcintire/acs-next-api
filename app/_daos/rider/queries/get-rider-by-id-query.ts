export const getRiderByIdQueryConfig = (id: number) => {
  return {
    where: { id: id },
    include: {
      JoinRiderTeam: {
        include: {
          team: {
            select: {
              id: true,
              name: true,
              year: true,
              url: true,
              description: true,
            },
          },
        },
      },
    },
  };
};
