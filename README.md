# Info

## Naming Conventions
Series are denoted by country (e.g., US, UK).  Additionally, All Stars seasons will be marked with "AS" (e.g., US_AS).

# Paths

All paths begin with `https://rpdr-party-games.herokuapp.com/api/`

## Users

`GET /users` Returns all users

`GET /users/:id` Returns user with specified id

TODO: `GET /users/:userId/drafts/:seasonId/points` Returns points for given draft

`POST /users` Requires JSON body of `{ name: string, email: string, private: boolean }`

`DELETE /users/:id` Deletes user with specified id

## Queens

`Get /queens` Returns all queens

`Get /queens/:id` Returns queen with given ID

`POST /queens` Requires JSON body of `{ name: string }`

`PUT /queens/id` Requires JSON body of `{ name: string }`

## Teams

`GET /teams` Returns all team names and IDs

`GET /teams/:teamId` Returns all team member IDs for given team

`POST /teams` Requires JSON body of `{ name: string }`

`POST /teams/:teamId/:userId` Adds user to team

`PUT /teams/:teamId` Requires JSON body of `{ name: string }`

`DELETE /teams/:teamId` Deletes given team

`DELETE /teams/:teamId/:userId` Deletes given user from team

## Seasons

`GET /seasons` Returns all seasons

`GET /seasons/:id` Returns all contestants on season with body `{ number: number, show: string, contestants: array }`

`GET /seasons/:seasonId/:queenId` Returns given contestant

`POST /seasons` Requires JSON body of `{ number: number, show: string }`

`POST /seasons/:seasonId/:queenId` Optional JSON body of `{ placement: number, congeniality: boolean }`

`PUT /seasons/:seasonId/:queenId` Takes JSON body of `{ placement: number, congeniality: boolean }`

## Predictions

`GET /predictions` Returns all predictions

`GET /predictions/season/:seasonId` Returns all predictions for a given season

`GET /predictions/user/:userId` Returns all predictions for a given user

`GET /predictions/:seasonId/:userId` Returns a given user's draft for a given season

TODO: `GET /predictions/:teamId` Returns predictions of all given team’s members

`POST /predictions/:userId/:seasonId` Requires JSON body of `{ entries: [ { contestantId: number, placement: number, congeniality: boolean }, ... ] }`, e.g. { entries: [ { contestantId: 1, placement: 1, congeniality: false }, ... ] }

`PUT /predictions/:userId/:seasonId` Requires JSON body of `{ contestantId: number, placement: number, congeniality: boolean }`
