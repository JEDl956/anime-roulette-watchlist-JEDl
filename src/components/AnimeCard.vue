<script setup>
const props = defineProps({
  anime: { type: Object, default: null }, // stores anime data
  loading: { type: Boolean, default: false }, // shows loading state
  error: { type: String, default: '' }, // shows error message
  inwatchlist: { type: Boolean, default: false }, // if anime is saved
})
</script>

<template>
  <!-- Main card container -->
  <section
    class="rounded-3xl border border-slate-700/70 bg-slate-900/40 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur"
  >

    <!-- Loading state -->
    <div v-if="props.loading" class="space-y-4">
      <div class="flex items-center gap-3 text-cyan-300">
        <!-- spinning circle -->
        <div class="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>

        <!-- loading message -->
        <p class="font-semibold tracking-wide">
          Loading anime...
        </p>
      </div>

      <!-- placeholder for image -->
      <div class="h-72 animate-pulse rounded-2xl bg-slate-800"></div>

      <!-- placeholder for text -->
      <div class="grid grid-cols-3 gap-2">
        <div class="h-3 animate-pulse rounded bg-slate-700"></div>
        <div class="h-3 animate-pulse rounded bg-slate-700"></div>
        <div class="h-3 animate-pulse rounded bg-slate-700"></div>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="props.error"
      class="rounded-2xl border border-red-300/50 bg-red-500/10 p-4 text-red-100"
    >
      <h3 class="text-lg font-semibold">Error</h3>

      <!-- show error message -->
      <p class="mt-2 text-sm text-red-100/90">
        {{ props.error }}
      </p>
    </div>

    <!-- First state (before spin) -->
    <div
      v-else-if="!props.anime"
      class="rounded-2xl border border-slate-700/60 bg-slate-950/20 p-8"
    >
      <p class="text-center text-sm text-slate-300">
        Click Spin to get a random anime.
      </p>
    </div>

    <!-- Success state -->
    <div v-else>
      <p class="text-slate-200">
        Anime loaded.
      </p>
    </div>

  </section>
</template>