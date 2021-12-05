import { MenuOption, NIcon } from 'naive-ui';
import {
  DesktopOutline,
  AppsOutline,
  ColorPaletteOutline
} from '@vicons/ionicons5';
import { RouterLink } from 'vue-router';

import { State } from '../store';
import { DownloadContent } from '../models/downloads';

function toOptions(items: DownloadContent[]) {
  return items.map(item => ({
    key: `/download/${item.distro}`,
    label: () => <RouterLink to={`/download/${item.distro}`}>
      {item.distro}
    </RouterLink>,
  }) as MenuOption);
}

export default function fetchDownloadRoutes(state: State, filter = '') {
  const contents = state.downloadContents
    .filter(value => value.distro.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  const os = contents.filter(value => value.category == 'os');
  const apps = contents.filter(value => value.category == 'app');
  const fonts = contents.filter(value => value.category == 'font');
  return [
    {
      label: `OS ${apps.length}`,
      key: 'OS',
      icon: () => <NIcon><DesktopOutline /></NIcon>,
      children: toOptions(os)
    },
    {
      label: `Apps ${apps.length}`,
      key: 'Apps',
      icon: () => <NIcon><AppsOutline /></NIcon>,
      children: toOptions(apps)
    },
    {
      label: `Fonts ${fonts.length}`,
      key: 'Fonts',
      icon: () => <NIcon><ColorPaletteOutline /></NIcon>,
      children: toOptions(fonts)
    }
  ] as MenuOption[];
}
