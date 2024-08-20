--CREATE DATABASE perntodo;
--commented out for pipe use in heroku postgres terminal
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
    );