const fs = require('fs');
const path = require('path');

// Папка, в якій знаходяться ваші папки з файлами
const mainDir = '/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/';
const saveData = '/Users/andrijkozevnikov/Desktop/chart/src/components/DataLoader/data_tag';

// Проходиться по кожній папці в директорії
fs.readdir(mainDir, (err, folders) => {
  if (err) {
    console.error(err);
    return;
  }

  folders.forEach(folder => {
    const folderPath = path.join(mainDir, folder);

    // Переконуємося, що це дійсно папка
    if (fs.statSync(folderPath).isDirectory()) {
      const data = [];

      // Проходиться по кожному файлу в папці
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }

        files.forEach((file) => {
          if (file.startsWith('new_')) {
            const filePath = path.join(folderPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');
            const value = parseInt(lines[lines.length - 1], 10);

            // Витягуємо номер ітерації з назви файлу
            const iterationNumber = file.split('_')[1].split('.')[0];

            data.push({ iteration: `Iteration ${iterationNumber}`, value });
          }
        });

        // Сортування даних по ітераціях
        data.sort((a, b) => {
          const iterationNumberA = parseInt(a.iteration.split(' ')[1], 10);
          const iterationNumberB = parseInt(b.iteration.split(' ')[1], 10);

          return iterationNumberA - iterationNumberB;
        });

        // Зберігає дані в JSON-файлі з назвою папки
        const jsonPath = path.join(saveData, `${folder}.json`);
        fs.writeFileSync(jsonPath, JSON.stringify(data));
        console.log(`Data for ${folder} saved to ${jsonPath}`);
      });
    }
  });
});
