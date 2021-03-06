-- for help
-- killing nginx and restarting again
sudo fuser -k 443/tcp

-- list database

-- create database
create database [database name]

-- list all databases
\list

-- connect to db 
\connect [dbname] or \c [dbname]




-- list all tables
\d  -- this lists all the tables
\d [table name] -- shows details about the table
\l -- lists all the databases created
\du -- gives the list of users present
\conninfo -- gives the info about the database and the user that is connected to currently

-- where to modify the auth behaviour
cd /etc/postgresql/12/main 
sudo vi pg_hba.conf


-- creating and altering tables
CREATE TABLE products(
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale boolean
);


ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;

CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >=1 and price_range <= 5)
);

INSERT INTO restaurants (name, location, price_range)
VALUES
('kfc','mission chariyali',3),
('Dominos','mission chariyali',3),
('wood-box','main town',3);


-- review table commands

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating>=1 and rating<=5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) 
VALUES
(33,'carl','restaurant was awesome', 5);