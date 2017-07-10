initdb.d/init-user-db.sh:

#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE EXTENSION madlib CASCADE;
    CREATE USER admin;
    CREATE USER iot;
    CREATE DATABASE iot;
    GRANT ALL PRIVILEGES ON DATABASE iot TO admin;
    CREATE TABLE public.measures
		(
		    "timestamp" timestamp without time zone DEFAULT now()
		)
		WITH (
		    OIDS = FALSE
		);
	ALTER TABLE public.measures OWNER to admin;	
EOSQL