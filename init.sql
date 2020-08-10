CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  private BOOLEAN NOT NULL
);

CREATE TABLE teams (
   ID SERIAL PRIMARY KEY, 
   name VARCHAR(255) NOT NULL
);

CREATE TABLE seasons (
    ID SERIAL PRIMARY KEY,
    num INT NOT NULL,
    series VARCHAR(255) NOT NULL
);

CREATE TABLE queens (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE team_members (
    user_id INT,
    team_id INT,
    FOREIGN KEY(user_id) REFERENCES users(ID),
    FOREIGN KEY(team_id) REFERENCES teams(ID)
);

CREATE TABLE contestants (
    queen_id INT NOT NULL,
    season_id INT NOT NULL,
    placement INT,
    congeniality BOOLEAN,
    FOREIGN KEY(queen_id) REFERENCES queens(ID),
    FOREIGN KEY(season_id) REFERENCES seasons(ID)
);

CREATE TABLE drafts (
    user_id INT NOT NULL,
    season_id INT NOT NULL,
    contestant_id INT NOT NULL,
    placement INT NOT NULL,
    congeniality BOOLEAN
);

INSERT INTO users (name, email, private)
VALUES  ('Nel', 'nel@test.com', FALSE);