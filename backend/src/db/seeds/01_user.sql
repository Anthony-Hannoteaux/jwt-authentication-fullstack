BEGIN;

INSERT INTO users ("username", "email", "password") VALUES
    ('userTest1', 'testmail1@mail.com', 'MotDePasse01'),
    ('userTest2', 'testmail2@mail.com', 'MotDePasse02');

COMMIT;