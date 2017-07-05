FROM postgres:latest

RUN apt-get update && \
    apt-get install -y cmake pgxnclient g++ m4
RUN pgxn install madlib
#postgresql-plpython-9.6 postgresql-server-dev-9.6
ADD init.sql /docker-entrypoint-initdb.d/
