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
	
CREATE OR REPLACE VIEW public.ml_source AS
 SELECT measures."timestamp",
    measures.totalmem::double precision AS totalmem,
    measures.freemem::double precision AS freemem,
    measures.memusage::double precision AS memusage,
    measures.cpus_0_speed::double precision AS cpus_0_speed,
    measures.cpus_0_sys::double precision AS cpus_0_sys,
    measures.cpus_1_speed::double precision AS cpus_1_speed,
    measures.cpus_1_sys::double precision AS cpus_1_sys,
    measures.cpus_1_idle::double precision AS cpus_1_idle,
    measures.loadavg_0::double precision AS loadavg_0,
    measures.loadavg_1::double precision AS loadavg_1,
    measures.loadavg_2::double precision AS loadavg_2,
    measures.prediction::double precision AS prediction
   FROM measures;

ALTER TABLE public.ml_source
    OWNER TO iot;
