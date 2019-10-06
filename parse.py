import os
import json
import re

MAX_TIME = 900000000

langs = [(0, "en"), (5, "zh_CN")]
cnames = {
    "cherry001": "Cherry",
    "cherry002": "Crystal PuNK",
    "conner001": "ConneR",
    "ivy001": "Ivy",
    "joe001": "JOE",
    "miku001": "Miku",
    "neko001": "NEKO#ΦωΦ",
    "neko002": "Neko",
    "paff001": "PAFF",
    "paff002": "Aroma",
    "robo001": "ROBO_Head",
    "robo002": "Nora",
    "xenon001": "Xenon",
}

"""
File Utils
"""


def getJson(src):
    with open(src, "rb") as f:
        return json.loads(f.read().decode("utf8"))


def putJson(src, content):
    with open(src, "wb") as f:
        f.write(json.dumps(content, ensure_ascii=False).encode("utf8"))


"""
Content Trim Utils
"""


def trimContent(content):
    content = re.sub(
        r"<size=(\d+)>",
        lambda x: '<font size="%.1f">' % (int(x.group(1)) * 0.1),
        content,
    )
    content = re.sub(
        r"<color=(#?\w+)>", lambda x: '<font color="%s">' % x.group(1), content
    )
    content = content.replace(
        ">>", "<blockquote>").replace("<<", "</blockquote>")
    content = content.replace(
        "</size>", "</font>").replace("</color>", "</font>")
    return content


def getTime(name):
    time = 0
    name = name.replace("?", "0").replace("X", "0")
    r = re.search(r"_(\d{3})_(\d{1,2})_(\d{1,2})(?:_(\d{1,2}))?$", name)
    if r:
        num = r.group(4) if (r.group(4) and r.group(4).isdigit()) else "0"
        time = int(
            "{:0>3d}{:0>2d}{:0>2d}{:0>2d}".format(
                int(r.group(1)), int(r.group(2)), int(r.group(3)), int(num)
            )
        )
    return time if time != 0 else MAX_TIME


def handleiM(iMFile):
    titles = []

    for lang in langs:
        titles.append(iMFile["Titles"][lang[0]])

    return {
        "id": iMFile["Id"],
        "avatar": iMFile["AvatarId"],
        "name": iMFile["CharacterName"],
        "title": titles,
        "likes": iMFile["LikeCount"],
        "replies": len(iMFile["Replies"]),
    }


def handleOS(OSContent):
    rows = OSContent.split("##")
    data = list()

    for row in rows:
        package = row.replace("\r", "").split("\n")
        header = package[0].split("=")

        if header[0] == "":
            continue

        attrs = []
        content = None

        if len(header) > 1:
            attrs = header[1].split(",")

        if len(package) > 1:
            content = trimContent("\n".join(package[1:]))

        data.append({"type": header[0], "attrs": attrs, "content": content})

    return data


"""
Modules
"""


def loadIM():
    imlist = getJson(
        "./res/export/assets/game/common/bundleassets/datasheets/imdata/im_topic_data.txt"
    )
    posts = []

    for i in imlist:
        replies = []

        post = getJson(
            "./res/export/assets/game/common/bundleassets/datasheets/imdata/imposts/%s/posts.txt"
            % i["Id"]
        )

        for reply in post["Replies"]:
            contents = []
            for lang in langs:
                contents.append(trimContent(reply["Contents"][lang[0]]))
            replies.append(
                {
                    "id": reply["Id"],
                    "name": reply["CharacterName"],
                    "avatar": reply["AvatarId"],
                    "contents": contents,
                }
            )

        contents = []
        for lang in langs:
            contents.append(trimContent(post["Contents"][lang[0]]))

        putJson(
            "./res/converted/data/imposts/%s.json" % i["Id"].lower(),
            {
                "id": post["Id"].lower(),
                "name": post["CharacterName"],
                "avatar": post["AvatarId"].lower(),
                "attachments": post["Attachments"],
                "contents": contents,
                "replies": replies,
            },
        )
        posts.append(handleiM(i))

    putJson("./res/converted/data/imlist.json", posts)

    print("Finished iM")


def loadOS():
    times = []
    oslist = []
    res = getJson(
        "./res/export/assets/game/common/bundleassets/datasheets/cutscenedata/cutscene_data.txt"
    )
    for cfile in os.listdir(
        "./res/export/assets/game/common/bundleassets/datasheets/osdata"
    ):
        chara = cfile.split(".")[0]
        cdata = getJson(
            "./res/export/assets/game/common/bundleassets/datasheets/osdata/%s" % cfile
        )
        files = []

        os.mkdir("./res/converted/data/osfiles/%s" % chara)

        for i in cdata:
            # Get Time
            time = getTime(i["Names"][0])
            if (time == MAX_TIME) and (len(files) > 0):
                time = times[len(times) - 1]["time"] + 1

            # Put File
            contents = []
            for lang in langs:
                contents.append(handleOS(i["Contents"][lang[0]]))
            putJson(
                "./res/converted/data/osfiles/%s/%s.json" % (chara, i["Id"]),
                {
                    "id": i["Id"],
                    "name": i["Names"][lang[0]],
                    "res": (
                        res[i["Id"]]["MovieFile"] if i["Id"] in res.keys() else None
                    ),
                    "contents": contents,
                },
            )

            # Add to filelist and timelist
            files.append({"id": i["Id"], "name": i["Names"][0]})
            times.append(
                {"id": i["Id"], "name": i["Names"][0],
                    "folder": chara, "time": time}
            )
        oslist.append({"id": chara, "name": cnames[chara], "files": files})
    times.sort(key=lambda x: (x["time"], x["id"]))
    # Save Lists
    putJson("./res/converted/data/oslist.json", oslist)
    putJson("./res/converted/data/ostime.json", times)
    print("Finished OS")


def loadDB():
    folders = []
    extrafs = [
        (3, "./web/public/extra", "Extra_Pages", "./extra"),
        (4, "./res/export/audios/extra", "Extra_Music", "./audios/extra"),
        (5, "./res/export/videos/extra", "Extra_Video", "./videos/extra"),
        (5, "./res/export/videos/titles", "Extra_TitleVideo", "./videos/titles"),
        (5, "./res/export/videos/song_select",
         "Extra_SongSelect", "./videos/song_select")
    ]
    for chara in getJson(
        "./res/export/assets/game/common/bundleassets/datasheets/gallerydata/folder.txt"
    ):
        files = []
        for dbfile in getJson(
            "./res/export/assets/game/common/bundleassets/datasheets/gallerydata/%s.txt"
            % chara["Id"]
        ):
            # NEKO Event Special
            if dbfile["FileLocation"] == "nekoHacked(chaosGlitch)":
                dbfile["FileLocation"] = "story_004"

            # Add to filelist
            files.append(
                {
                    "name": dbfile["FileLocation"],
                    "title": dbfile["FileName"],
                    "type": dbfile["Format"],
                }
            )
        folders.append({"name": chara["Name"], "files": files})

    # Add extra files
    for extraf in extrafs:
        files = []
        for ef in os.listdir(extraf[1]):
            mname = ef.split(".")[0]
            files.append({"name": mname, "title": mname,
                          "type": extraf[0], "dir": extraf[3]})
        folders.append({"name": extraf[2], "files": files})

    putJson("./res/converted/data/dblist.json", folders)
    print("Finished Database")


def main():
    loadIM()
    loadDB()
    loadOS()
    print("Finished.")


if __name__ == "__main__":
    main()
