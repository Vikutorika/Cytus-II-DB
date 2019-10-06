#!/bin/bash

echo "================================="
echo "  Cytus II DB Migrate Tool V1.0  "
echo "           A.R.C. Tech.          "
echo "================================="

cd web
npm run build
cd ..
cp -r ./web/build/* ./deploy
cd deploy
git add .
git commit -m `date "+[%Y-%m-%d %H:%M] release"`
git push
rm -rf `ls`