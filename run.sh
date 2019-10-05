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

unzip -q ./obb/cytus.obb -d ./res/obb
echo "Unziped OBB."

# move unity
mv ./res/apk/assets/bin/Data/* ./res/unity
mv ./res/obb/assets/bin/Data/* ./res/unity
echo "Migrated Unity."

# move obb
mv ./res/obb/assets/AssetBundles/* ./res/bundles

# obb.raw
mv ./res/obb/assets/RawAssets/*        ./res/export/videos
mv ./res/obb/assets/Titles/*           ./res/export/videos/titles
mv ./res/obb/assets/*_song_select.mp4  ./res/export/videos/song_select
mv ./res/obb/assets/*.mp4              ./res/export/videos/extra
echo "Migrated OBB."

# clean source
rm -rf ./res/apk ./res/obb
echo "Finished."