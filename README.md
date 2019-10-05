# Cytus II DB

Knowledge database maintained by A.R.C.

Donate [here](https://afdian.net/@dtsdao).

## Requirements

- Linux/Windows PC
- Bash
- FFMpeg
- Python 3 with `pydub` and `Pillow`
- [AssetStudio](https://github.com/Perfare/AssetStudio)

## Build

1. Clone this project with `git`.
2. Put your `.obb` file into `./obb` and rename to `cytus.obb`
3. Put your `.apk` file into `./apk` and rename to `cytus.apk`
4. Execute `./run.sh`
5. Use AssetStudio to export files as below. (Maybe need a long time)
6. Execute `python convert.py` and `python parse.py`
7. Execute `./migrate.sh`
8. Go into `./web` and run `npm i && npm run build`
9. Release your build version.

## Export Instruction

1. Enable `Options > Display all assets`
2. Enable `Options > Display asset original name`
3. Enable `Options > Do not group`
4. Enable `Options > Export options > Convert Texture2D(PNG)`
3. Filter `AudioClip`, `TextAsset`, `Sprite`
5. Use `Export > Filtered assets`
6. Load folder `./res/bundles` and export to `./res/export`
7. Restart AssetStudio
8. Load folder `./res/unity`
9. Export `Sprite` : `{character}_s` to `./res/export/images/characters`
10. Export `AudioClip` : `story_*` to `./res/export/audios/glitch`
11. (Optional) Export `AudioClip` : `title*`, `{character}_*`(Bigger ones for full version) to `./res/export/audios/extra`

## Announcement

**None of the repo, the tool, nor the repo owner is affiliated with, or sponsored or authorized by, Rayark Inc. or its affiliates.**