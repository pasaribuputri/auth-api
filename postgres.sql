create database postgres;

CREATE TYPE jk as enum('laki-laki','perempuan');

create table users(
	id serial primary key,
	full_name text,
	email text,
	password text,
	jenis_kelamin jk
	
);
