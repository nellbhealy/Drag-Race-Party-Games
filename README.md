# Paths

All paths begin with `/api/`

## Users

`GET /users` Returns all users

`POST /users` Requires json body of `{ name: string, email: string, private: boolean }`

`GET /users/:id` Returns user with specified id

`DELETE /users/:id` Deletes user with specified id

## Queens

`Get /queens` Returns all queens

`Get /queens/:id` Returns queen with given ID

`POST /queens` Requires JSON body of `{ name: string }`

`PUT /queens/id` Requires JSON body of `{ name: string }`

## Teams

`GET /teams` Returns all team names and IDs

`GET /teams/:teamId` Returns all team member IDs for given team

TODO: `GET /teams/:teamId/drafts` Returns drafts of all given team’s members

`POST /teams` Requires JSON body of `{ name: string }`

`POST /teams/:teamId/:userId` Adds user to team

`PUT /teams/:teamId` Requires JSON body of `{ name: string }`

`DELETE /teams/:teamId` Deletes given team

`DELETE /teams/:teamId/:userId` Deletes given user from team

## Seasons

TODO: `GET /seasons` Returns all seasons

TODO: `GET /seasons/:id` Returns all contestants on season with body `{ number: number, show: string, contestants: array }`

TODO: `GET /seasons/:seasonId/:queenId` Returns given contestant

TODO: `GET /seasons/:seasonId/drafts` Returns all drafts for given season

TODO: `POST /seasons` Requires JSON body of `{ number: number, show: string }`

TODO: `POST /seasons/:seasonId/:queenId` Optional JSON body of `{ placement: number, congeniality: boolean }`

TODO: `PUT /seasons/:seasonId/:queenId` Takes JSON body of `{ placement: number, congeniality: boolean }`
