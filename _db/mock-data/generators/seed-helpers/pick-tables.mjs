export const createCategories = async (client) => {
  for (let i=0; i < 5; i++) {
    const category = {
      disicpline: 'Road',
      name: `${i + 1}`,
      description: 'A Road Category'
    }
       await client.category.create({
        data: category
      })
  }
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
