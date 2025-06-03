import type { MenuOption } from 'naive-ui'
import type { DownloadContent } from '@/models/downloads'
import type { State } from '@/store'
import {
  AppsOutline,
  ColorPaletteOutline,
  DesktopOutline,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

function toOptions(items: DownloadContent[]) {
  return items.map(
    item =>
      ({
        key: `/download/${item.distro}`,
        label: () => (
          <RouterLink to={`/download/${item.distro}`}>{item.distro}</RouterLink>
        ),
      } as MenuOption),
  )
}

export default function fetchDownloadRoutes(state: State, filter = '') {
  const { t } = useI18n()
  const osText = t('sider.os')
  const appsText = t('sider.apps')
  const fontsText = t('sider.fonts')
  const contents = state.downloadContents.filter(value =>
    value.distro.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  )
  const os = contents.filter(value => value.category === 'os')
  const apps = contents.filter(value => value.category === 'app')
  const fonts = contents.filter(value => value.category === 'font')
  return [
    {
      label: `${osText} ${os.length}`,
      key: 'OS',
      icon: () => (
        <NIcon>
          <DesktopOutline />
        </NIcon>
      ),
      children: toOptions(os),
    },
    {
      label: `${appsText} ${apps.length}`,
      key: 'Apps',
      icon: () => (
        <NIcon>
          <AppsOutline />
        </NIcon>
      ),
      children: toOptions(apps),
    },
    {
      label: `${fontsText} ${fonts.length}`,
      key: 'Fonts',
      icon: () => (
        <NIcon>
          <ColorPaletteOutline />
        </NIcon>
      ),
      children: toOptions(fonts),
    },
  ] as MenuOption[]
}
