#!/bin/bash

cd /var/app/current/

. ~/.nvm/nvm.sh;

nvm install 14 --lts;

node index.js &

disown %1
