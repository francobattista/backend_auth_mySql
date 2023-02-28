CREATE DATABASE auth_app_db;

USE auth_app_db;

--USERS TALBE

CREATE TABLE users(
    userId INT not null auto_increment,
    userName VARCHAR(50) not null,
    password VARCHAR(50) not null,
    fullName VARCHAR(100) not null,
    PRIMARY KEY(userId)
);


DESCRIBE users;

-- TABLA DE LINKS

CREATE TABLE links(
    linkId INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    userId INT,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(userId) references users(userId),
    PRIMARY KEY(linkId)
)


