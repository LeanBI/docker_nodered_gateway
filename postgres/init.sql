CREATE EXTENSION madlib CASCADE;
    CREATE USER admin;
	CREATE TABLE public.measures
	(
	    "timestamp" timestamp without time zone,
	    totalmem bigint,
	    freemem bigint,
	    memusage numeric,
	    cpus_0_speed numeric,
	    cpus_0_sys numeric,
	    cpus_1_speed numeric,
	    cpus_1_sys numeric,
	    cpus_1_idle numeric,
	    loadavg_0 numeric,
	    loadavg_1 numeric,
	    loadavg_2 numeric,
	    prediction numeric
	)
	WITH (
	    OIDS = FALSE
	)
	TABLESPACE pg_default;
	

