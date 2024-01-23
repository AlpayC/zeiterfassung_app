#!/bin/bash
cd /frontend
/usr/local/bin/npm install
cd ./frontend
/usr/local/bin/npm run build
cd ..

cd ./backend
/usr/local/bin/npm/npm install
