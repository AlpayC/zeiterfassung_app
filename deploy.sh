#!/bin/bash
cd /frontend
npm install
cd ./frontend
npm run build
cd ..

cd ./backend
npm install
