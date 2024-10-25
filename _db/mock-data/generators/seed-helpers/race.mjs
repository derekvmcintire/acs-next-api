import { buildMockRace } from '../results/build-race-results.mjs';

export const createRaces = async (client) => {
  // First get types from picklist
  const firstRaceType = await client.raceType.findFirst();
  const firstResultType = await client.resultType.findFirst();
  const firstNoPlaceCodeType = await client.noPlaceCodeType.findFirst();

  // build 100 mock races with results
  for (let i=0; i < 100; i++) {
    const race = buildMockRace();
    const event = {
        name: race.name,
    }
       const createdEvent = await client.event.create({
        data: event
      })
      
      const createdRace = await client.race.create({
        data: {
          event: {connect: {id: createdEvent.id}},
          raceType: {connect: {id: firstRaceType.id}},
          startDate: race.startDate,
          endDate: null,
          location: race.name
        }
      })
      // get 25 riders and loop through to create results
      const racers = await client.rider.findMany({
        skip: 0,
        take: 25
      })
      racers.forEach( async (racer, index) => {
        // create a result for each racer
        const result = {
          event: {connect: {id: createdRace.eventId}},
          rider: {connect: {id: racer.id}},
          resultType: {connect: {id: firstResultType.id}},
          noPlaceCodeType: {connect: {id: firstNoPlaceCodeType.id}},
          lap: null,
          place: index + 1,
          time: '',
          points: null,
        }
        await client.result.create({
          data: result
        })
      })
  }
}