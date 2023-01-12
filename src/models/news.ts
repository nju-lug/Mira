import { marked } from 'marked';
import { ServerPrefix } from '@/configs';
import { json, text } from '@/utils/network';

export interface NewsEntry {
  name: string;
  time: number;
  content: string;
  author?: string;
  tags?: string[];
}

export interface JokeEntry {
  title: string;
  web_url: string;
}

export async function fetchJokes(limit?: number) {
  let links: JokeEntry[] = await json(
    'https://git.nju.edu.cn/api/v4/projects/2412/issues'
  );
  if (limit != undefined) {
    links = links.slice(0, limit);
  }
  return links.map(link => ({
    ...link,
    title: link.title.replace(/\d+$/g, '')
  }));
}

export async function fetchNewsList(limit?: number): Promise<NewsEntry[]> {
  let data: NewsEntry[] = await json(ServerPrefix + 'news/index.json');
  data.sort((a, b) => b.time - a.time);
  if (limit != undefined) {
    data = data.slice(0, limit);
  }
  return data;
}

export async function fetchNews(item?: NewsEntry): Promise<string> {
  if (item == undefined) {
    return Promise.resolve('No document available.');
  }
  return await text(ServerPrefix + `news/${item.content}`, data =>
    marked(data)
  );
}
