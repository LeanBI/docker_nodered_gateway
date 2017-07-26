#!/bin/bash
set -e

setup_jasperserver() {
    DB_TYPE=${DB_TYPE:-postgresql}
    DB_HOST=${DB_HOST:-localhost}
    DB_USER=${DB_USER:-postgres}
    DB_PASSWORD=${DB_PASSWORD:-postgres}
    DB_NAME=${DB_NAME:-jasperserver}

    pushd /usr/src/jasperreports-server/buildomatic
    cp sample_conf/${DB_TYPE}_master.properties default_master.properties
    sed -i -e "s|^appServerDir.*$|appServerDir = $CATALINA_HOME|g; s|^dbHost.*$|dbHost=$DB_HOST|g; s|^dbUsername.*$|dbUsername=$DB_USER|g; s|^dbPassword.*$|dbPassword=$DB_PASSWORD|g; s|^# js\.dbName=.*|js.dbName=$DB_NAME|g" default_master.properties

    for i in $@; do
        ./js-ant $i
    done

    popd
}

run_jasperserver() {
    if [ ! -d "$CATALINA_HOME/webapps/jasperserver" ]; then
        setup_jasperserver deploy-webapp-ce
    fi

    sed -i -e "s|^org.owasp.csrfguard.TokenName.*$|org.owasp.csrfguard.TokenName=JASPER-CSRF-TOKEN|g;" $CATALINA_HOME/webapps/jasperserver/WEB-INF/esapi/Owasp.CsrfGuard.properties

    exec catalina.sh run
}

seed_database() {
    setup_jasperserver create-js-db init-js-db-ce import-minimal-ce
}

case "$1" in
    run)
        shift 1
        run_jasperserver "$@"
        ;;
    seed)
        seed_database
        ;;
    *)
        exec "$@"
esac