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
		    "timestamp" timestamp without time zone DEFAULT now()
		)
		WITH (
		    OIDS = FALSE
		);
	ALTER TABLE public.measures OWNER to admin;	
EOSQL