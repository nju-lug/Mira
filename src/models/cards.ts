import { ServerPrefix } from '@/configs';
import { json } from '@/utils/network';

export interface CardLink {
  title: string;
  url: string;
  icon?: string;
}

export interface CardItem {
  title: string;
  url?: string;
  links: CardLink[];
}

async function getESciCard(): Promise<CardItem> {
  return await json(ServerPrefix + 'cards/esci.json');
}

async function getFriendsCard(): Promise<CardItem> {
  return await json(ServerPrefix + 'cards/friends.json');
}

export default [getESciCard, getFriendsCard];
