import { marked } from 'marked';
import { ServerPrefix } from '../configs';
import { get } from '../utils/network';

export interface NewsEntry {
  name: string,
  time: number,
  content: string
}

export interface JokeEntry {
  title: string,
  web_url: string
}

export async function fetchJokes() {
  const links: JokeEntry[] =
    await get('https://git.nju.edu.cn/api/v4/projects/2412/issues');
  return links.map(link => ({
    ...link,
    title: link.title.replace(/\d+$/g, '')
  })).slice(0, 6);
}

export async function fetchNewsList(): Promise<NewsEntry[]> {
  return await get(ServerPrefix + 'news/index.json');
}

export async function fetchNews(item: NewsEntry): Promise<string> {
  return await get(
    ServerPrefix + `news/${item.content}`,
    (data: string) => marked(data)
  );
}
