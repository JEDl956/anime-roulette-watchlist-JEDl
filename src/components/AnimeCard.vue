<script setup>
const props = defineProps({
  anime: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  inwatchlist: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section
    class="rounded-3xl border border-slate-700/70 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-sm"
  >
    <!-- Loading State -->
    <div v-if="props.loading" class="space-y-4">
      <div class="flex items-center gap-3 text-cyan-300">
        <div
          class="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"
        ></div>
        <p class="font-semibold tracking-wide">
          Shuffling anime reels...
        </p>
      </div>

      <!-- Skeleton Loading Bars -->
      <div class="grid grid-cols-3 gap-2">
        <div class="h-3 animate-pulse rounded bg-slate-700"></div>
        <div class="h-3 animate-pulse rounded bg-slate-700"></div>
        <div class="h-3 animate-pulse rounded bg-slate-700"></div>
      </div>
      <div class="h-72 animate-pulse rounded-2xl bg-slate-800"></div>
    </div>

    <!-- Loaded State -->
    <div v-else>
      Done
    </div>

  </section>
</template>