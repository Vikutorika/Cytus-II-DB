#!/bin/bash

echo "================================="
echo "  Cytus II DB Migrate Tool V1.0  "
echo "           A.R.C. Tech.          "
echo "================================="

# clean web build
rm -rf ./res/*

# mkdir

mkdir ./res/unity
mkdir ./res/bundles

mkdir ./res/export
mkdir ./res/export/audios
mkdir ./res/export/images
mkdir ./res/export/videos
mkdir ./res/export/videos/extra
mkdir ./res/export/videos/titles
mkdir ./res/export/videos/song_select

echo "Cleaned cache."

# unzip files
unzip -q ./apk/cytus.apk -d ./res/apk
echo "Unziped APK."

# version check
if [ ! -d "./res/apk/assets/bin/" ];then
  echo "Longyuan Version is no longer supported!"
  exit
fi

# move unity
mv ./res/apk/assets/bin/Data/* ./res/unity
echo "Migrated Unity."

# move bundles
mv ./res/apk/assets/AssetBundles/* ./res/bundles

# raw assets
mv ./res/apk/assets/RawAssets/*        ./res/export/videos
mv ./res/apk/assets/Titles/*           ./res/export/videos/titles
mv ./res/apk/assets/*_song_select.mp4  ./res/export/videos/song_select
mv ./res/apk/assets/*.mp4              ./res/export/videos/extra
echo "Migrated Raw Assets."

# clean source
rm -rf ./res/apk
echo "Finished."