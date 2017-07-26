FROM ubuntu:16.04

RUN export DEBIAN_FRONTEND=noninteractive && \
	apt-get update && \
	apt-get install -y nano curl wget && \
	cd /tmp && \
	wget --quiet https://beta.tableau.com/linux_files/tableau-server-linux-beta-1.deb
	

RUN echo "echo \"localhost\"" > /bin/ip && chmod 777 /bin/ip
RUN apt-get install -y procps systemd ip && dpkg -i /tmp/tableau-server-linux-beta-1.deb
RUN wget --user tableau104 --password nessie http://beta.tableau.com/linux_files/tableau-postgresql-odbc_9.5.3_amd64_beta.deb && \
	dpkg -i /tmp/tableau-postgresql-odbc_9.5.3_amd64_beta.deb
#