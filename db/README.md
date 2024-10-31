# Database Information

### Mock Data for creating resources through postman

#### POST http://localhost:8080/api/latest/rider

```
{
  "firstName": "Mipper",
  "lastName": "Mopperson",
  "dob": "1990-01-01",
  "country": "USA",
  "hometown": "New York, NY",
  "photo": "https://www.procyclingstats.com/images/riders/bp/bf/julian-alaphilippe-2024.jpeg",
  "strava": "87935790234",
  "insta": "portamip",
  "about": "It reaaaallly bothered me."
}
```

#### POST http://localhost:8080/api/latest/race

```
{
      "name": "Boston to Burlington",
      "raceTypeId": 56,
      "startDate": "Fri Apr 12 2024",
      "endDate": null,
      "location": "Boston, MA",
    }
```

#### POST http://localhost:8080/api/latest/result

```
{
      "eventId": 1,
      "riderId": 1,
      "resultTypeId": 56,
      "noPlaceCodeTypeId": 56,
      "lap": 1,
      "place": 4,
      "time": "",
      "points": 1
    }
```
