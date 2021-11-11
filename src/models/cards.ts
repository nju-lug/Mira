import axios from 'axios';
import { ServerPrefix } from '../configs';

export interface CardItem {
  title: string,
  url?: string,
  links: {
    title: string,
    url: string,
    icon?: string
  }[]
}

const esci = () => axios.get(ServerPrefix + 'cards/esci.json')
  .then(res => res.data as CardItem);

const friends = () => axios.get(ServerPrefix + 'cards/friends.json')
  .then(res => res.data as CardItem);

export default [
  esci, friends
];
