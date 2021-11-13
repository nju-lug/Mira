import { ServerPrefix } from '../configs';
import { get } from '../utils/network';

export interface DownloadLink {
  name: string,
  url: string,
}

export interface DownloadContent {
  distro: string,
  category: 'os' | 'app' | 'font',
  urls: DownloadLink[]
}

export async function fetchDownloads(): Promise<DownloadContent[]> {
  return await get(ServerPrefix + 'iso.json');
}
