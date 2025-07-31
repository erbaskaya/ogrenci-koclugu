import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/data/students.json');

export default function handler(req, res) {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    const students = JSON.parse(data);
    res.status(200).json(students);
  } else {
    res.status(200).json([]);
  }
}
