const alfonMapping = {
  "מספר אישי": "personalNumber",
  "שם פרטי": "firstName",
  "שם משפחה": "lastName",
  "תעודת זהות": "personalId",
  "דרגה מחושבת": "rank",
  "סוג שירות": "serviceType",
  מסגרת: "frame",
  "יחידת רישום": "registerUnit",
  אוגדה: "center",
  חטיבה: "hativa",
  פיקוד: "pikods",
  "עיסוק מיועד": "occupation",
  "סוג איוש": "manningType",
  "קוד פלוגה": "plugaCode",
};

const haiganMapping = {
  "מספר אישי": "personalNumber",
  "תעודת זהות": "personalId",
  //להמיר לסוג Date
  "תאריך ושעת ק'": "dailDate",
  "סטטוס ראשי": "mainStatus",
  "סטטוס משני": "subStatus",
};

const ityazvootMapping = {
  "מספר אישי": "personalNumber",
  "תעודת זהות": "personalId",
  //להמיר לסוג Date
  התייצבות: "presetDate",
  "תנאי שירות": "welfare",
  אסמכתא: "centerRef",
  "קוד סביבה": "envCode",
};

exports.alfonMapping = alfonMapping;
exports.ityazvootMapping = ityazvootMapping;
exports.haiganMapping = haiganMapping;
