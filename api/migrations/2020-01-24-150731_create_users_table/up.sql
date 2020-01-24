-- Your SQL goes here
-- up.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
	domain_user_name VARCHAR NOT NULL,
	is_active BOOLEAN,
	deleted BOOLEAN,
    first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	email_address VARCHAR NOT NULL
);

CREATE TABLE roles (
    code VARCHAR(10) NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	enabled BOOLEAN
);

CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	role_code VARCHAR(10) NOT NULL REFERENCES roles(code),
	start_date DATE NOT NULL DEFAULT CURRENT_DATE,
	end_date DATE,
	notes VARCHAR(5000) NOT NULL
);

CREATE TABLE statuses (
	code VARCHAR(10) NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	enabled BOOLEAN,
	color VARCHAR(6) NOT NULL,
	icon VARCHAR(40) NOT NULL
);

CREATE TABLE systems (
	code VARCHAR(10) NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	enabled BOOLEAN	
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
	status_code VARCHAR NOT NULL REFERENCES statuses(code),
	system_code VARCHAR NOT NULL REFERENCES systems(code),
	title VARCHAR NOT NULL,
	description VARCHAR NOT NULL
);

CREATE TABLE ticket_assignments (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	ticket_id INTEGER REFERENCES tickets(id)
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tocket_id INTEGER REFERENCES tickets(id),
	body_text VARCHAR NOT NULL,
	created_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE audits (
	id SERIAL PRIMARY KEY,
	type VARCHAR(1) NOT NULL,
	table_name VARCHAR(80) NOT NULL,
	field_name VARCHAR(80) NOT NULL,
	p_k VARCHAR(10) NOT NULL,
	old_value VARCHAR NOT NULL,
	new_value VARCHAR NOT NULL,
	update_date DATE NOT NULL DEFAULT CURRENT_DATE,
	user_name VARCHAR NOT NULL
);
