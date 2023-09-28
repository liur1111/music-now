# MusicNow

## Users

1. GET /session: get the signed in user
2. GET /api/users: get all users except self
3. GET /api/users?username=USERNAME: get user by username
4. POST /api/users/session: sign in user
5. DELETE /api/users/session: sign out user
6. POST /api/users: create user account
7. PATCH /api/users: update a user profile

## Songs

1. GET /api/song: get all songs
2. GET /api/song?songTitle=songTitle&songArtist=songArtist: get song by title and artist
3. GET /api/song?trackId=number: get song by Spotify tracking number
4. GET /api/song/search?q=query: get song info from spotify API
5. POST /api/song: create a new song
6. DELETE /api/song/:trackId: delete a song

## Prompt

1. GET /api/prompt: get all prompts
2. GET /api/prompt?date=date: get prompt by date
3. POST /api/prompt?promptText&date&username: create a new prompt
4. DELETE /api/prompt?date=date: delete a prompt by date

## Profile

1. GET /api/profile/: get all profiles
2. GET /api/profile?username=USERNAME: get the profile of a specific user
3. POST /api/profile/:username?: create a new user profile
4. DELETE /api/profile/:username?: delete a profile

## Mixtapes

1. GET /api/mixtape/:username: get all mixtapes by a user
2. GET /api/mixtape/:username?date=date: get mixtape by a user on a given date
3. GET /api/mixtape/:username?date=date&feed=true: get all mixtapes for a users’ feed
4. POST /api/mixtape/:username?: create a new mixtape
5. DELETE /api/mixtape/:username?date=date: delete a mixtape

## Likes

1. GET /api/likes/:id: get likes for a given mixtape
2. POST /api/likes/:id: like a mixtape
3. PATCH /api/likes/: update an items’ likes
4. DELETE /api/likes/: delete a like

## Friend

1. GET /api/friend/potentialFriends/:username: get all potential friends (no existing request or friendship)
2. GET /api/friend/:username: get all friends for a user
3. GET /api/friend/:username?confirmed=false: get all friend requests for a user
4. POST /api/friend/:username?user=username: send a new friend request
5. PATCH /api/friend/:username?user=user&confirmed=confirmed: respond to a friend request
6. DELETE /api/friend/:username?user=username: delete a friend