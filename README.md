# Paths

All paths begin with `/api/`

## Users

`GET /users` Returns all users
`POST /users` Requires json body of {name: string, email: string, private: boolean}
`GET /users/:id` Returns user with specified id
`DELETE /users/:id` Deletes user with specified id
