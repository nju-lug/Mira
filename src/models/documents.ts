import axios from 'axios';
import { marked } from 'marked';
import { ServerPrefix } from '../configs';

export interface DocItem {
  name: string,
  path: string,
  route: string,
}

export async function fetchDocs() {
  const res = await axios.get(ServerPrefix + 'documentations/index.json');
  return res.data as DocItem[];
}

export async function fetchDoc(item: DocItem) {
  const res = await axios.get(ServerPrefix + `documentations/${item.path}`);
  return marked(res.data as string);
}
