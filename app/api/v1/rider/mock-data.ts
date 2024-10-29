import { RiderRow } from "@/app/_types/rider/types";

export const mockGetRiderByIdResponse = {
  id: 17,
  currentTeam: "Human dsm-firmenich",
  name: {
    first: "Velozin",
    last: "Dashspoke",
  },
  teams: [
    {
      year: 2024,
      name: "Human dsm-firmenich",
      id: 1,
      url: "",
      description: "",
    },
  ],
  socials: {
    strava: "917822",
    insta: "es",
  },
  categories: [
    {
      discipline: "road",
      category: 1,
    },
  ],
  hometown: {
    country: "Spain",
    city: "Akola",
  },
  dob: "Thu Jan 11 1990",
  photo:
    "https://www.procyclingstats.com/images/riders/bp/fb/anouska-koster-2024.png",
  wins: 43,
};

export const mockFindUniqueQueryResponse: RiderRow = {
  id: 17,
  firstName: "Velozin",
  lastName: "Dashspoke",
  dob: "Thu Jan 11 1990",
  country: "Spain",
  hometown: "Akola",
  photo:
    "https://www.procyclingstats.com/images/riders/bp/fb/anouska-koster-2024.png",
  strava: "917822",
  insta: "es",
  about:
    "They think I'm just some dumb hick. They said that to me, at a dinner!",
};

export const mockGetAllRidersResponse = [
  {
    id: 1,
    currentTeam: "Human dsm-firmenich",
    name: {
      first: "Floortje",
      last: "Madeleine",
    },
    teams: [
      {
        year: 2024,
        name: "Human dsm-firmenich",
        id: 10,
        url: "",
        description:
          "Human dsm-firmenich is a racing community. We help each other keep things dialed on and off the bike to realize one another's  athletic goals.",
      },
    ],
    socials: {
      strava: "3879155",
      insta: "cvgfzbyntpto",
    },
    categories: [
      {
        discipline: "road",
        category: 1,
      },
    ],
    hometown: {
      country: "Switzerland",
      city: "Girona",
    },
    dob: "Mon Jan 02 1995",
    photo:
      "https://www.procyclingstats.com/images/riders/bp/dc/tadej-pogacar-2024-n2.jpeg",
    wins: 43,
  },
  {
    id: 2,
    currentTeam: "Cycling Emirates",
    name: {
      first: "Giovanni",
      last: "Lanbda",
    },
    teams: [
      {
        year: 2024,
        name: "Cycling Emirates",
        id: 5,
        url: "",
        description:
          "Cycling Emirates is a racing community. We help each other keep things dialed on and off the bike to realize one another's  athletic goals.",
      },
    ],
    socials: {
      strava: "7179940",
      insta: "ebmpkjpi",
    },
    categories: [
      {
        discipline: "road",
        category: 1,
      },
    ],
    hometown: {
      country: "Niger",
      city: "Al Malaqi",
    },
    dob: "Thu Aug 11 1988",
    photo:
      "https://www.procyclingstats.com/images/riders/bp/ea/jonas-vingegaard-rasmussen-2024.jpeg",
    wins: 43,
  },
  {
    id: 3,
    currentTeam: "AG2R Red Bull",
    name: {
      first: "Matteo",
      last: "Pedalon",
    },
    teams: [
      {
        year: 2024,
        name: "AG2R Red Bull",
        id: 7,
        url: "",
        description:
          "AG2R Red Bull is a racing community. We help each other keep things dialed on and off the bike to realize one another's  athletic goals.",
      },
    ],
    socials: {
      strava: "5748092",
      insta: "bsxe",
    },
    categories: [
      {
        discipline: "road",
        category: 1,
      },
    ],
    hometown: {
      country: "Philippines",
      city: "Nagpur",
    },
    dob: "Tue Sep 08 1987",
    photo:
      "https://www.procyclingstats.com/images/riders/bp/ea/jonas-vingegaard-rasmussen-2024.jpeg",
    wins: 43,
  },
  {
    id: 4,
    currentTeam: "Euskaltel Jayco",
    name: {
      first: "Gustav",
      last: "Kraak",
    },
    teams: [
      {
        year: 2024,
        name: "Euskaltel Jayco",
        id: 8,
        url: "",
        description:
          "Euskaltel Jayco is a racing community. We help each other keep things dialed on and off the bike to realize one another's  athletic goals.",
      },
    ],
    socials: {
      strava: "1928559",
      insta: "rqvxnyamzvkcrhg",
    },
    categories: [
      {
        discipline: "road",
        category: 1,
      },
    ],
    hometown: {
      country: "Wales",
      city: "Shahdol",
    },
    dob: "Mon Jun 02 1997",
    photo:
      "https://www.procyclingstats.com/images/riders/bp/fb/kasper-asgreen-2024.jpeg",
    wins: 43,
  },
];
