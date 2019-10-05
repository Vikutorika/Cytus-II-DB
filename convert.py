from PIL import Image
from pydub import AudioSegment

import os, re

'''
Image Section
'''

def do_attachments(kind):
  info = kind.split('_')
  rfolder = './res/export/assets/game/%s/bundleassets/attachments' % kind
  ofolder = './res/converted/images/%sfiles' % info[1]
  for i in os.listdir(rfolder):
    im = Image.open('%s/%s/attachment.png' % (rfolder,i))

    if (im.width == 512 and im.height == 512) or (im.width == 1024 and im.height == 1024):
      im = im.resize((im.width, im.width*9//16))
    elif im.width == 345 and im.height == 512:
      im = im.resize((im.width, im.width))
    elif im.width == 512 and im.height == 435:
      im = im.resize((im.width, im.width*1080//1920))
    else:
      print('%s at %d x %d' % (i, im.width, im.height))
    
    im.convert('RGB').save('%s/%s.jpg' % (ofolder, i))

def do_avatars():
  folders = [
    ('./res/export/assets/game/11_im/bundleassets/avatars', './res/converted/images/imavatars'),
    ('./res/export/assets/game/15_os/bundleassets/osavatars', './res/converted/images/osavatars')
  ]
  for folder in folders:
    for i in os.listdir(folder[0]):
      Image.open('%s/%s'%(folder[0],i)).resize((64,64)).save('%s/%s' % (folder[1], i))

def do_imageviewer():
  folder = './res/export/assets/game/15_os/bundleassets/osimageviewer'
  for i in os.listdir(folder):
    im = Image.open('%s/%s'%(folder,i))
    fn = i.split('_')[0]
    if fn == 'pos2401':
      im = im.resize((im.width, im.height*1080//1920))
    elif fn == 'ros1401':
      im = im.resize((im.width, im.height*4800//7200))
    else:
      print('%s at %d x %d' % (i, im.width, im.height))
    im.convert('RGB').save('./res/converted/images/osspecial/%s.jpg' % i.split('.')[0])

'''
Audio Section
'''

def do_music():
  folders = [
    ('./res/export/assets/game/15_os/bundleassets/osbgms', './res/converted/audios/bgms'),
    ('./res/export/assets/game/15_os/bundleassets/ossounds', './res/converted/audios/sounds'),
    ('./res/export/audios/story', './res/converted/audios/story'),
    ('./res/export/audios/extra', './res/converted/audios/extra')
  ]
  for folder in folders:
    for i in os.listdir(folder[0]):
      AudioSegment.from_wav('%s/%s' % (folder[0], i)).export('%s/%s.mp3' % (folder[1], i.split('.')[0]), bitrate='128k')

'''
Subtitles Section
'''

def srt2vtt(infn, outfn):
  content = open(infn, "r", encoding="utf-8").read()
  content = "WEBVTT\n\n" + content
  content = re.sub(r"(\d{2}:\d{2}:\d{2}),(\d{3})", lambda m: m.group(1) + '.' + m.group(2), content)
  open(outfn, "w", encoding="utf-8").write(content)

def do_srt():
  langs = [('cn', 'zh_CN'), ('en', 'en')]
  for lang in langs:
    folder = './res/export/assets/game/common/bundleassets/srtfiles/%s' % lang[0]
    for i in os.listdir(folder):
      srt2vtt('%s/%s' % (folder, i), './res/converted/data/subtitles/%s.%s.vtt' % (i.split('.')[0], lang[1]))

'''
Main
'''

def main():
  do_avatars()
  do_imageviewer()
  do_attachments('11_im')
  do_attachments('15_os')
  do_music()
  do_srt()

if __name__ == "__main__":
  main()