initdb.d/init-user-db.sh:

#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE EXTENSION madlib CASCADE;
    CREATE USER admin;
    #CREATE USER measures;
    CREATE DATABASE measures;
    GRANT ALL PRIVILEGES ON DATABASE measures TO admin;
    CONNECT measures
	CREATE TABLE public.measures
	(
	    "timestamp" timestamp without time zone,
	    totalmem bigint,
	    freemem bigint,
	    memusage numeric,
	    cpu0_speed numeric,
	    cpu0_sys numeric,
	    cpu1_speed numeric,
	    cpu1_sys numeric,
	    cpu1_idle numeric,
	    loadavg_0 numeric,
	    loadavg_1 numeric,
	    loadavg_2 numeric,
	    prediction numeric
	)
	WITH (
	    OIDS = FALSE
	)
	TABLESPACE pg_default;
	
	ALTER TABLE public.measures
	    OWNER to admin;
EOSQL