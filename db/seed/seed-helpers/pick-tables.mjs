export const GF_AGE_GROUPS = [
  { start: 1, end: 13, text: 'Under 14' },
  { start: 14, end: 16, text: '14-16' },
  { start: 17, end: 18, text: '17-18' },
  { start: 19, end: 24, text: '19-24' },
  { start: 25, end: 29, text: '25-29' },
  { start: 30, end: 34, text: '30-34' },
  { start: 35, end: 39, text: '35-39' },
  { start: 40, end: 44, text: '40-44' },
  { start: 45, end: 49, text: '45-49' },
  { start: 50, end: 54, text: '50-54' },
  { start: 55, end: 59, text: '55-59' },
  { start: 60, end: 64, text: '60-64' },
  { start: 64, end: 69, text: '65-69' },
  { start: 70, end: 74, text: '70-74' },
  { start: 75, end: 999, text: '75 and Over' },
  { start: 1, end: 22, text: 'Under 23'},
  { start: 1, end: 17, text: 'Juniors'},
  { start: 1, end: 999, text: 'Open'},
  { start: 30, end: 999, text: '30+'},
  { start: 35, end: 999, text: '35+'},
  { start: 40, end: 999, text: '40+'},
  { start: 45, end: 999, text: '45+'},
  { start: 50, end: 999, text: '50+'},
  { start: 55, end: 999, text: '55+'},
  { start: 60, end: 999, text: '60+'},
  { start: 70, end: 999, text: '70+'},
  { start: 80, end: 999, text: '80+'},
  { start: 1, end: 999, text: 'Pro'},
  { start: 1, end: 999, text: 'Cat 1'},
  { start: 1, end: 999, text: 'Pro'},
  { start: 1, end: 999, text: 'Cat 2'},
  { start: 1, end: 999, text: 'Cat 3'},
  { start: 1, end: 999, text: 'Cat 4'},
  { start: 1, end: 999, text: 'Novice'},
];

export const GF_CATEGORIES = GF_AGE_GROUPS.reduce((cats, ag) => {
  const mGroup = {...ag, gender: "Men"};
  const fGroup = {...ag, gender: "Women"};
  const nbGroup = {...ag, gender: "Non Binary"};
  return [...cats, mGroup, fGroup, nbGroup];
}, [])

export const createCategories = async (client) => {

  GF_CATEGORIES.forEach(async (gfCat)  => {
    const { gender, text, start, end } = gfCat;
    const category = {
      disicpline: 'Gran Fondo',
      name: `${gender} ${text}`,
      description: `Gran Fondo age group from ${start} to ${end} for ${gender}`
    }
    await client.category.create({
            data: category
          })
  })
}

export const createRaceTypes = async (client) => {
  const raceType = {
    name: `Road`,
    description: 'Road Race Type',
  }
  await client.raceType.create({
    data: raceType
  })
}

export const createResultTypes = async (client) => {
  const resultType = {
    name: `default`,
    description: 'Default Result Type',
  }
  await client.resultType.create({
    data: resultType
  })
}

export const createNoPlaceCodeTypes = async (client) => {
  const noPlaceCodeType = {
    name: `NA`,
    description: 'Participant Placed',
  }
  await client.noPlaceCodeType.create({
    data: noPlaceCodeType
  })
}
