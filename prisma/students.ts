import { majors } from './majors';

const names = [
  'John Doe',
  'Jane Smith',
  'David Johnson',
  'Emily Davis',
  'Michael Anderson',
  'Sarah Wilson',
];

const data = [];

for (let i = 0; i < 15; i++) {
  const randomIndex = Math.floor(Math.random() * majors.length);
  const randomMajor = majors[randomIndex];
  const randomName = names[Math.floor(Math.random() * names.length)];

  data.push({
    name: randomName,
    majorId: randomMajor.id,
  });
}

export const students = data;
