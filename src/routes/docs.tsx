import { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';

import { State } from '@/store';

export default function fetchDocRoutes(state: State, filter = '') {
  return state.docItems
    .filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
    .map(
      item =>
        ({
          key: '/help/' + item.name,
          label: () => {
            return item.redirect ? (
              <a href={item.redirect}>{item.name}</a>
            ) : (
              <RouterLink to={'/help/' + item.name}>{item.name}</RouterLink>
            );
          }
        } as MenuOption)
    );
}
