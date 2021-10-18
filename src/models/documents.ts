import axios from 'axios';

export interface DocItem {
  name: string,
  path: string,
  route: string,
}

export const fetchDocs = () => axios.get('/configs/documentations/index.json').then(
  res => res.data as DocItem[]
);
