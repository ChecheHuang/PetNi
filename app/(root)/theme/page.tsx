import { getThemes } from '@/actions/theme'

import ClientThemePage from './_components/ClientThemePage'

async function ThemePage() {
  const themes = await getThemes()

  return <ClientThemePage {...themes} />
}

export default ThemePage
