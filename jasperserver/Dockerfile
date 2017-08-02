FROM tomcat:7
#MAINTAINER John Paul Alcala jp@jpalcala.com

ENV JASPERSERVER_VERSION=6.4.0


RUN apt-get update && apt-get install -y apt-utils nano && rm -rf /var/lib/apt/lists/* && \ 
	curl -SL https://downloads.sourceforge.net/project/jasperserver/JasperServer/JasperReports%20Server%20Community%20Edition%20${JASPERSERVER_VERSION}/TIB_js-jrs-cp_${JASPERSERVER_VERSION}_bin.zip -o /tmp/jasperserver.zip && \
	curl -SL https://jdbc.postgresql.org/download/postgresql-42.1.3.jre7.jar -o $CATALINA_HOME/lib/postgresql-9.4.1208.jre7.jar && \
    unzip /tmp/jasperserver.zip -d /usr/src/ && \
    mv /usr/src/jasperreports-server-cp-$JASPERSERVER_VERSION-bin /usr/src/jasperreports-server && \
    rm -rf /tmp/*


ENV CATALINA_OPTS="-server -Xmx1536m -XX:MaxPermSize=256m -XX:+TieredCompilation -XX:CompileThreshold=1500 -XX:-DontCompileHugeMethods -XX:+UseCodeCacheFlushing -XX:ReservedCodeCacheSize=256m -XX:+UseBiasedLocking -XX:BiasedLockingStartupDelay=0 -XX:NewRatio=3 -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:+DisableExplicitGC -XX:+CMSIncrementalMode -XX:+CMSIncrementalPacing -XX:+CMSParallelRemarkEnabled -XX:+UseCompressedOops -XX:CMSInitiatingOccupancyFraction=30 -XX:+UseCMSInitiatingOccupancyOnly"


# curl -SL http://sourceforge.net/projects/jasperserver/files/JasperServer/JasperReports%20Server%20Community%20Edition%20${JASPERSERVER_VERSION}/TIB_js-jrs-cp_${JASPERSERVER_VERSION}_bin.zip/download -o /tmp/jasperserver.zip && \