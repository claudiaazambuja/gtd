-- Criação das tabelas para um sistema de produtividade baseado em GTD

CREATE TABLE Users (
    IdUser SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash TEXT NOT NULL
);

CREATE TABLE Projects (
    IdProject SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Goal TEXT,
    CreatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Notes (
    IdNote SERIAL PRIMARY KEY,
    Content TEXT NOT NULL,
    ReviewDate DATE,
    Tags TEXT,
    IdUser INTEGER REFERENCES Users(IdUser)
);

CREATE TABLE Tasks (
    IdTask SERIAL PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    DueDate DATE,
    Status VARCHAR(20) CHECK (Status IN ('pending', 'in_progress', 'done')) DEFAULT 'pending',
    Context VARCHAR(50),
    IdProject INTEGER REFERENCES Projects(IdProject),
    IdNote INTEGER REFERENCES Notes(IdNote)
);

CREATE TABLE Inbox (
    IdInboxItem SERIAL PRIMARY KEY,
    Content TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    IdUser INTEGER REFERENCES Users(IdUser)
);