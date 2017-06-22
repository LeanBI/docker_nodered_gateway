CREATE EXTENSION madlib CASCADE;

CREATE DATABASE iot
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
    
CREATE TABLE public.measures
(
    "timestamp" timestamp without time zone DEFAULT now()
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.measures
    OWNER to postgres;
