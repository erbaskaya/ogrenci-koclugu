import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/data/students.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body;
      let students = [];

      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        students = JSON.parse(fileData);
      }

      students.push(body);
      fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
      res.status(200).json({ message: 'Kayıt başarılı' });
    } catch (err) {
      res.status(500).json({ message: 'Hata oluştu' });
    }
  } else {
    res.status(405).json({ message: 'Sadece POST destekleniyor' });
  }
}
