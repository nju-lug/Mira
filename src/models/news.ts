import axios from 'axios';
import { marked } from 'marked';
import { ServerPrefix } from '../configs';

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
  const res = await axios.get('https://git.nju.edu.cn/api/v4/projects/2412/issues');
  const links = res.data as JokeEntry[];
  return links.map(link => ({
    ...link,
    title: link.title.replace(/\d+$/g, '')
  })).slice(0, 6);
}

export async function fetchNewsList() {
  const res = await axios.get(ServerPrefix + 'news/index.json');
  return res.data as NewsEntry[];
}

export async function fetchNews(item: NewsEntry) {
  const res = await axios.get(ServerPrefix + `news/${item.content}`);
  return marked(res.data as string);
}
