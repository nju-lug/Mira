import axios from 'axios';
import { ServerPrefix } from '../configs';

export interface DownloadLink {
  name: string,
  url: string,
}

export interface DownloadContent {
  distro: string,
  category: 'os' | 'app' | 'font',
  urls: DownloadLink[]
}

export async function fetchDownloads() {
  const res = await axios.get(ServerPrefix + 'iso.json');
  return res.data as DownloadContent[];
}
