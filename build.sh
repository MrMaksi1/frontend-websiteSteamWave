#!/bin/bash

echo "=> Starting steamwave's frontend build script..."

echo "=> Pulling changes from GitHub... "
git pull origin dev

echo "=> Installing dependencies... "
npm install

echo "=> Building Next.js app... "
npm run build

echo "=> Stopping frontend's screen session..."
screen -S frontend -X quit || true

echo "=> Starting frontend in screen..."
screen -dmS frontend npm start

echo "=> Building complete! Frontend running in screen 'frontend'"
echo "=> Attach to its screen: screen -r frontend"