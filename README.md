# Cytus II DB

Knowledge database maintained by A.R.C.

Donate [here](https://afdian.net/@dtsdao).

## Requirements

- Linux/Windows PC
- Bash
- FFmpeg
- Python 3 with `pydub` and `Pillow`
- [AssetStudio](https://github.com/Perfare/AssetStudio)

## Build

1. Clone this project with `git`.
2. Put your `.obb` file into `./obb` and rename to `cytus.obb`
3. Put your `.apk` file into `./apk` and rename to `cytus.apk`
4. Execute `./run.sh`
5. Use AssetStudio to export files as below. (Maybe need a long time)
6. Execute `./migrate.sh`
7. Go into `./web` and run `npm i && npm run build`
8. Release your build version.

## 编译 - 龙渊版

1. 用 `git` 克隆本项目
2. 将游戏的 `apk` 文件拷贝到 `./apk` 中并重命名为 `cytus.apk`
3. 运行 `./longyuan.sh`
4. 按照下方说明使用 AssetStudio 将所需文件导出（可能会花点时间）
5. 运行 `./migrate.sh`
6. 进入 `./web` 执行 `npm i && npm run build`
7. 发布你编译的版本

## Export Instruction

1. Load folder `./res/bundles`
2. Enable `Options > Display all assets`
3. Enable `Options > Display asset original name`
4. Enable `Options > Do not group`
5. Enable `Options > Export options > Convert Texture2D(PNG)`
6. Filter `AudioClip`, `TextAsset`, `Sprite`
7. `Export > Filtered assets` to `./res/export`
8. Restart AssetStudio
9.  Load folder `./res/unity`
10. Export `Sprite` : `{character}_s` to `./res/export/images/characters`
11. Export `AudioClip` : `story_*` to `./res/export/audios/story`
12. (Optional) Export `AudioClip` : `title*`, `{character}_*` (Larger ones are full-versions) to `./res/export/audios/extra`

## Deploy

1. Clone your remote git repo to `./deploy`
2. Execute `./deploy.sh`
3. Refresh your pages

## Announcement

**None of the repo, the tool, nor the repo owner is affiliated with, or sponsored or authorized by, Rayark Inc. or its affiliates.**