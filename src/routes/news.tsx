import { State } from '@/store';
import { convertTimestamp } from '@/utils/time';
import { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';

export default function fetchNewsRoutes(state: State, filter = '') {
  const entries = state.newsEntries.filter(e =>
    e.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );
  return entries.map(
    (item, index) =>
      ({
        key: '/news/' + index,
        label: () => {
          return (
            <RouterLink
              to={'/news/' + index}
              style="display: flex; justify-content: space-between; align-items: center"
            >
              <span>{item.name}</span>
              <span style="font-size: 12px; line-height: 1.0">
                {convertTimestamp(item.time, 'zh')}
              </span>
            </RouterLink>
          );
        }
      } as MenuOption)
  );
}
