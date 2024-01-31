CREATE DATABASE notes_app2;
USE notes_app2;

CREATE TABLE notes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
);

INSERT INFO notes(title, contents)
VALUES
('My first note', 'a note about something')
('My second note', 'a note about something')
