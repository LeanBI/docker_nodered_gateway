#### PART FROM NODERED #################################
FROM node:6

# Home directory for Node-RED application source code.
RUN mkdir -p /usr/src/node-red

# User data directory, contains flows, config and nodes.
RUN mkdir /data

WORKDIR /usr/src/node-red

# Add node-red user so we aren't running as root.
RUN useradd --home-dir /usr/src/node-red --no-create-home node-red \
    && chown -R node-red:node-red /data \
    && chown -R node-red:node-red /usr/src/node-red

USER node-red

# package.json contains Node-RED NPM module and node dependencies
COPY package.json /usr/src/node-red/
RUN npm install

# User configuration directory volume
EXPOSE 1880

# Environment variable holding file path for flows configuration
ENV FLOWS=flows.json

############## PART from LEANBI
RUN npm i postgrestor \
  && npm install node-red-contrib-postgres \
  && npm install node-red-contrib-os \
  && npm install thethingbox-node-timestamp \
  && npm install node-red-contrib-opentimestamps \
  && npm install node-red-contrib-moment \
  && npm install node-red-dashboard \
  && npm install node-red-node-sqlite 
  
COPY flows.json /data/flows.json
COPY flows_cred.json /data/flows_cred.json
############## PART from LEANBI

CMD ["npm", "start", "--", "--userDir", "/data"]
#CMD ["/usr/src/node-red/node_modules/.bin/node-red"]
