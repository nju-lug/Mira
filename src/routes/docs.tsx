import { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';

import { State } from '../store';

export default function fetchDocRoutes(state: State, filter = '') {
  return state.docItems
    .filter(item => item.name.includes(filter))
    .map(item => ({
      key: '/help/' + item.name,
      label: () => <RouterLink to={'/help/' + item.name}>{item.name}</RouterLink>
    } as MenuOption));
}
