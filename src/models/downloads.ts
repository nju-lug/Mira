import { ServerPrefix } from '@/configs';
import { json } from '@/utils/network';

export interface DownloadLink {
  name: string;
  url: string;
}

export interface DownloadContent {
  distro: string;
  category: 'os' | 'app' | 'font';
  urls: DownloadLink[];
}

export async function fetchDownloads(): Promise<DownloadContent[]> {
  return await json(ServerPrefix + 'iso.json');
}
