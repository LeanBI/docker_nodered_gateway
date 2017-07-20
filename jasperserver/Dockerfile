FROM tomcat:7

ENV \
  JS_Xmx=512m \
  JS_MaxPermSize=256m \
  JS_CATALINA_OPTS="-XX:+UseBiasedLocking -XX:BiasedLockingStartupDelay=0 -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:+DisableExplicitGC -XX:+CMSIncrementalMode -XX:+CMSIncrementalPacing -XX:+CMSParallelRemarkEnabled -XX:+UseCompressedOops -XX:+UseCMSInitiatingOccupancyOnly" \
  JS_DB_HOST=db \
  JS_DB_PORT=3306 \
  JS_DB_USER=jasper \
  JS_DB_PASSWORD=my_password \
  JASPERSERVER_HOME=/jasperserver \
  JASPERSERVER_BUILD=/jasperserver/buildomatic
  
  # JS_DB_TYPE=mysql \
  # JS_VERSION=6.3.0 \

COPY entrypoint.sh /

RUN \
  apt-get update && \
  apt-get install -y nano netcat unzip && \  
  curl -SL https://sourceforge.net/projects/jasperserver/files/latest/JasperServer -o /tmp/jasperserver.zip && \
  unzip /tmp/jasperserver.zip -d $JASPERSERVER_HOME && \  
  mv -v $JASPERSERVER_HOME/jasperreports-server-cp-${JS_VERSION}-bin/* $JASPERSERVER_HOME && \
  chmod +x /entrypoint.sh && \ 
  rm -rf $JASPERSERVER_HOME/jasperreports-server-cp-${JS_VERSION}-bin && \
  rm -rf /tmp/* && \
  rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/entrypoint.sh"]

CMD ["run"]
