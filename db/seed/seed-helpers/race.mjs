import { buildMockRace } from '../../generators/results/build-race-results.mjs';
import { NUMBER_OF_RACES, NUMBER_OF_RESULTS, NUMBER_OF_RIDERS } from '../constants.mjs';
import { generateRandomNumber } from '../../generators/helper-functions.mjs';
import { calculatePoints } from './ranking.mjs';

const getRandomPagination = () => {
  const start = generateRandomNumber((NUMBER_OF_RIDERS - NUMBER_OF_RESULTS)) - 1;
  const end = start + NUMBER_OF_RESULTS;
  return {
    skip: start,
    take: end,
  }
}

export const createRaces = async (client) => {
  const firstRaceType = await client.raceType.findFirst();
  const firstResultType = await client.resultType.findFirst();
  const firstNoPlaceCodeType = await client.noPlaceCodeType.findFirst();

  for (let i=0; i < NUMBER_OF_RACES; i++) {
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

      const racers = await client.rider.findMany(getRandomPagination())
      const places = Array.from({ length: racers.length }, (_, i) => i + 1); // add one to account for zero index

      racers.forEach( async (racer) => {
        const randomPlaceIndex = (generateRandomNumber(places.length) - 1); // subtract one to account for zero index
        const randomPlace = places[randomPlaceIndex];
        places.splice(randomPlaceIndex, 1); // start at randomPlaceIndex and remove one value
        const points = calculatePoints(racers.length, randomPlace);
        
        const result = {
          event: {connect: {id: createdRace.eventId}},
          rider: {connect: {id: racer.id}},
          resultType: {connect: {id: firstResultType.id}},
          noPlaceCodeType: {connect: {id: firstNoPlaceCodeType.id}},
          lap: null,
          place: randomPlace,
          time: '',
          points,
        }

        await client.result.create({
          data: result
        })

      })

  }
}