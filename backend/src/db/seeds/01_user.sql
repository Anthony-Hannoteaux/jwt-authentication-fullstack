BEGIN;

INSERT INTO users ("username", "email", "password") VALUES
    ('userTest1', 'testmail1@mail.com', '$2b$10$wpV8QgrjfSrf2GgDtFcN4.7jnuvlpEh99H1bU9gDRiMyeXIebmzl6'),
    ('userTest2', 'testmail2@mail.com', '$2b$10$4X2wjYRGNkBeL/lCZtg4zOdJb.JZfOOVAqk1WZVdBMpGltEQ6o.sC');

COMMIT;