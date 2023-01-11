import { marked } from 'marked';
import { ServerPrefix } from '@/configs';
import { json, text } from '@/utils/network';

export interface NewsEntry {
  name: string;
  time: number;
  content: string;
}

export interface JokeEntry {
  title: string;
  web_url: string;
}

export async function fetchJokes() {
  const links: JokeEntry[] = await json(
    'https://git.nju.edu.cn/api/v4/projects/2412/issues'
  );
  return links
    .map(link => ({
      ...link,
      title: link.title.replace(/\d+$/g, '')
    }))
    .slice(0, 6);
}

export async function fetchNewsList(): Promise<NewsEntry[]> {
  return await json(ServerPrefix + 'news/index.json');
}

export async function fetchNews(item: NewsEntry): Promise<string> {
  return await text(ServerPrefix + `news/${item.content}`, data =>
    marked(data)
  );
}
