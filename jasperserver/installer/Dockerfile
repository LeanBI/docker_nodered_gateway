FROM debian
ENV JASPERSERVER_VERSION=6.4.0 

RUN apt-get update && \
	apt-get install -y nano postgresql-client-9.6 curl  
RUN cd /tmp && \
	curl -SL  https://kent.dl.sourceforge.net/project/jasperserver/JasperServer/JasperReports%20Server%20Community%20Edition%20${JASPERSERVER_VERSION}/TIB_js-jrs-cp_${JASPERSERVER_VERSION}_linux_x86_64.run -o /tmp/jasperinstaller.run
	
	
	EXPOSE 8080