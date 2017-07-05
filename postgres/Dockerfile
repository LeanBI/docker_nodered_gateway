FROM postgres:9.6

RUN apt-get update  \
    && apt-get install -y cmake pgxnclient g++ m4 postgresql-plpython-9.6 postgresql-server-dev-9.6\
    && pgxn install madlib
#
ADD init.sql /docker-entrypoint-initdb.d/
