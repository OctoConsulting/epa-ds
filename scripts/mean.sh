#!/bin/bash

start_mean() {
    echo "Starting MEAN."
    cd /home/mockathon/mean
    forever start -l forever.log -o out.log -e err.log server.js
}

stop_mean() {
    echo "Stopping MEAN."
    cd /home/mockathon/mean
    forever stop server.js
}

case "$1" in
  start)
    start_mean
    ;;
  stop)
    stop_mean
    ;;
  restart)
    echo "Restarting MEAN."
    stop_mean
    start_mean
    ;;
  *)
    echo "Usage: $0 { start | stop }"
    ;;
esac

exit 0
