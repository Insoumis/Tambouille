const fs = require('fs');
const firebase = require('firebase');

firebase.initializeApp({
  apiKey: 'AIzaSyCL1QCLlTfJVlfnILETo2HZ5Hv8YEo3Aqg',
  databaseURL: 'https://tambouille-af68c.firebaseio.com',
  projectId: 'tambouille-af68c',
});

const db = firebase.database();

const trimFields = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key] = typeof(obj[key]) === 'string' ? obj[key].trim() : obj[key];
  });
};

db.ref().once('value').then((snap) => {
  const candidates = snap.val();

  Object.entries(candidates).forEach(([id, candidate]) => {

    trimFields(candidate);

    // Special case: Pierre-Yves Bournazel
    if (id === '5db2bcf5-e9a2-4de3-86f9-fb9a3e8c6d3b') {
      candidate.picture = '18-75b.jpg';
    }

    // Special case: Didier Martin
    if (id === '10053e3c-eac6-4fb6-a6ba-fac765da08d0') {
      candidate.picture = '1-21b.jpg';
    }

    // Special case: Buon Tan
    if (id === '6864c90f-f143-48a2-9e2b-4d8073bf8cbd') {
      candidate.picture = '9-75b.jpg';
    }

    // Reorder categories
    if (candidate.category === '7') {
      candidate.category = '6'
    }
    if (candidate.category === '8') {
      candidate.category = '7'
    }

    if (candidate.candidat_group === 'MODEM') {
      candidate.candidat_group = 'MoDem';
    }

    // Remove useless data
    if (candidate.descriptionHTML) candidate.description = undefined;
  });

  fs.writeFileSync('./src/data.json', JSON.stringify(candidates, null, 2));

  process.exit();
});
