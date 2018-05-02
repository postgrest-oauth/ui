#!/bin/sh
set -e
set -x

PATH_JS=/usr/share/nginx/html/static/js/main.*

sed -i "s#__REACT_APP_OAUTH_URL_PLACEHOLDER__#${POSTGREST_OAUTH_API_URI}#g" $PATH_JS

nginx -g 'daemon off;'
