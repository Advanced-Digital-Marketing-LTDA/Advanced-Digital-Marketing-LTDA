<script lang="ts">
  import MotionProvider from '../components/chrome/MotionProvider.svelte'
  import HomePage from '../components/pages/HomePage.svelte'
  import type { Locale } from '../locale'

  let { locale }: { locale: Locale } = $props()
</script>

<MotionProvider>
  <HomePage {locale} />
</MotionProvider>
