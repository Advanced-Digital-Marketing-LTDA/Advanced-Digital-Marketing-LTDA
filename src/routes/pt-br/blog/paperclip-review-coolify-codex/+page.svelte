<script lang="ts">
  import BlogArticlePage from '$lib/components/pages/BlogArticlePage.svelte'
  import type { PageServerData } from './$types'
  let { data }: { data: PageServerData } = $props()
</script>

<BlogArticlePage article={data.article} locale="pt-BR" />
