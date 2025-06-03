import type { MenuOption } from 'naive-ui'
import type { State } from '@/store'
import { RouterLink } from 'vue-router'

export default function fetchDocRoutes(state: State, filter = '') {
  return state.docItems
    .filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    )
    .map(
      item =>
        ({
          key: `/help/${item.name}`,
          label: () => {
            return item.redirect
              ? (
                  <a href={item.redirect}>{item.name}</a>
                )
              : (
                  <RouterLink to={`/help/${item.name}`}>{item.name}</RouterLink>
                )
          },
        } as MenuOption),
    )
}
