FROM nodered/node-red-docker
RUN npm i postgrestor \
  && npm install node-red-contrib-postgres \
  && npm install node-red-contrib-os \
  && npm install thethingbox-node-timestamp \
  && npm install node-red-contrib-opentimestamps \
  && npm install node-red-contrib-moment \
  && npm install node-red-dashboard \
  && npm install node-red-node-sqlite \
  
COPY flows.json /Data/flows.json
COPY flows_cred.json /Data/flows_cred.json
