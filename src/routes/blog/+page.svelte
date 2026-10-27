<script lang="ts">
  import BlogIndex from '$lib/components/pages/BlogIndex.svelte'
  import type { PageServerData } from './$types'
  let { data }: { data: PageServerData } = $props()
</script>
<BlogIndex articles={data.articles} locale="en-US" />
