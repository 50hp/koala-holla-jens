CREATE TABLE "koala_library" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" VARCHAR(1) NOT NULL,
    "readyToTransfer" BOOLEAN,
    "notes" VARCHAR (80)
);

INSERT INTO "koala_library" ("name", "age", "gender", "readyToTransfer", "notes") 
VALUES ('Scotty', 4, 'M', true, 'Born in Guatemala'),
('Jean', 5, 'F', true, 'Allergic to lots of lava'),
('Ororo', 7, 'F', false, 'loves listening to Paula Abdul'),
('Logan', 15, 'M', false, 'Loves the sauna'),
('Charlie', 9, 'M', true, 'Favorite band is Nirvana'),
('Betsy', 4, 'F', true, 'Has a pet iguana');