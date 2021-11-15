import { marked } from 'marked';
import { ServerPrefix } from '../configs';
import { json, text } from '../utils/network';

export interface DocItem {
  name: string,
  path: string
}

export async function fetchDocs(): Promise<DocItem[]> {
  return await json(ServerPrefix + 'documentations/index.json');
}

export async function fetchDoc(item: DocItem): Promise<string> {
  return await text(
    ServerPrefix + `documentations/${item.path}`,
    data => marked(data)
  );
}
