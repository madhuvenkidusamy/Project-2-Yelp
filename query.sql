drop table if exists yelp_cities;

CREATE TABLE yelp_cities (
	id varchar NOT NULL,
	name varchar NOT NULL,
	review_count integer NOT NULL,
	location varchar NOT NULL,
	category varchar NOT NULL,
	rating decimal NOT NULL,
	price varchar NOT NULL,
	latitude float NOT NULL,
	longitude float NOT NULL,
	is_closed varchar NOT NULL
);

SELECT * from yelp_cities;