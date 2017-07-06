CREATE SCHEMA `wunderbaren` ;
CREATE TABLE `wunderbaren`.`item` (
  `name` VARCHAR(126) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `amount` INT NULL,
  `price` INT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));

CREATE TABLE `wunderbaren`.`client` (
  `client_id` VARCHAR(32) NOT NULL,
  `client_secret` VARCHAR(64) NOT NULL,
  `client_name` VARCHAR(64) NOT NULL,
  `jwt_key` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE INDEX `client_name_UNIQUE` (`client_name` ASC),
  UNIQUE INDEX `client_id_UNIQUE` (`client_id` ASC));

CREATE TABLE `wunderbaren`.`client_url` (
  `client_id` VARCHAR(32) NOT NULL,
  `url` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`client_id`, `url`),
  CONSTRAINT `client`
    FOREIGN KEY (`client_id`)
    REFERENCES `wunderbaren`.`client` (`client_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `wunderbaren`.`user` (
  `username` VARCHAR(64) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

CREATE TABLE `wunderbaren`.`message` (
  `id` INT,
  `sender` VARCHAR(64) NOT NULL,
  `message` VARCHAR(2048) NOT NULL,
  `read` INT,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `wunderbaren`.`transaction` (
  `id` INT,
  `user` VARCHAR(64) NOT NULL,
  `amount` INT,
  `reason` VARCHAR(128) NOT NULL,
  `date` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `wunderbaren`.`roles` (
  `username` VARCHAR(64) NOT NULL,
  `role` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

CREATE TABLE `wunderbaren`.`authentication_token` (
  `auth_token` VARCHAR(64) NOT NULL,
  `access_token` VARCHAR(64) NOT NULL,
  `refresh_token` VARCHAR(64) NOT NULL,
  `client_id` VARCHAR(32) NOT NULL,
  `username` VARCHAR(256) NOT NULL,
  `expiration_date` DATETIME NOT NULL,
  PRIMARY KEY (`auth_token`, `access_token`),
  UNIQUE INDEX `auth_token_UNIQUE` (`auth_token` ASC));

CREATE TABLE `wunderbaren`.`nonce` (
  `token` VARCHAR(32) NOT NULL,
  `expiration_date` DATETIME NOT NULL,
  PRIMARY KEY (`token`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC));