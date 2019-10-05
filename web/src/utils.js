import crypto from 'crypto';

function checkUUID() {
  if (!localStorage.uuid) localStorage.uuid = 'OPCI_0000_00';
  return crypto.createHash('md5').update(localStorage.uuid).digest('hex') === "7e3160ababa68617f3797335800f0b4e";
}

function i18n(trans) {
  if (!localStorage.lang) localStorage.lang = 'zh_CN';
  if (Array.isArray(trans)) switch (localStorage.lang) {
    case "zh_CN":
      return trans[1];
    default:
      return trans[0];
  } else return trans;
}

export {
  i18n,
  checkUUID
}