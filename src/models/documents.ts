import { marked } from 'marked';
import { ServerPrefix } from '../configs';
import { get } from '../utils/network';

export interface DocItem {
  name: string,
  path: string,
  route: string
}

export async function fetchDocs(): Promise<DocItem[]> {
  return await get(ServerPrefix + 'documentations/index.json');
}

export async function fetchDoc(item: DocItem): Promise<string> {
  return await get(
    ServerPrefix + `documentations/${item.path}`,
    (data: string) => marked(data)
  );
}
