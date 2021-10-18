import axios from 'axios';

const serverPrefix = 'configs/';

export interface CardItem {
  title: string,
  url?: string,
  links: {
    title: string, 
    url: string, 
    icon?: string
  }[]
}

const esci = () => axios.get(serverPrefix + 'cards/esci.json')
  .then(res => res.data as CardItem);

const friends = () => axios.get(serverPrefix + 'cards/friends.json')
  .then(res => res.data as CardItem);

export default [
  esci, friends
];
