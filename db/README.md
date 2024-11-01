# Database Information

### Mock Data for creating resources through postman

#### POST http://localhost:8080/api/latest/rider

Request Data:

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

Response Data:

```
{
    "id": 1118,
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

Request Data:

```
{
      "name": "Boston to Burlington",
      "raceTypeId": 1,
      "startDate": "Fri Apr 12 2024",
      "endDate": null,
      "location": "Boston, MA",
    }
```

Response Data:

```
{
    "id": 505,
    "eventId": 505,
    "raceTypeId": 1,
    "startDate": "Fri Apr 12 2024",
    "endDate": null,
    "location": "Northfield, MA"
}
```

#### POST http://localhost:8080/api/latest/result

```
{
      "eventId": 1,
      "riderId": 1,
      "resultTypeId": 1,
      "noPlaceCodeTypeId": 1,
      "lap": 1,
      "place": 4,
      "time": "",
      "points": 1
    }
```
