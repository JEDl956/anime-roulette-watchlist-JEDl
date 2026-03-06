<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['remove'])
</script>

<template>
  <aside
    class="rounded-3xl border border-slate-700/70 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-sm"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-black text-white">Watchlist</h2>

      <span class="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-200">
        {{ props.items.length }}
      </span>
    </div>

    <div
      v-if="!props.items.length"
      class="mt-5 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4 text-slate-300"
    >
      No picks saved yet. Spin and add an anime to build your watchlist.
    </div>

    <ul v-else class="mt-5 space-y-4">
      <li
        v-for="item in props.items"
        :key="item.mal_id"
        class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4"
      >
        <div class="flex gap-3">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="h-24 w-16 rounded-lg object-cover"
            loading="lazy"
          />

          <div class="min-w-0 flex-1">
            <h3 class="line-clamp-2 text-sm font-bold text-white">
              {{ item.title }}
            </h3>

            <p class="mt-1 text-xs text-slate-300">
              Score:
              <span class="font-semibold text-amber-300">{{ item.score ?? 'N/A' }}</span>
            </p>

            <p class="text-xs text-slate-300">
              Episodes:
              <span class="font-semibold text-cyan-300">{{ item.episodes ?? 'Unknown' }}</span>
            </p>

            <p class="text-xs text-slate-300">
              Rating:
              <span class="font-semibold text-pink-300">{{ item.rating || 'Unknown' }}</span>
            </p>

            <div class="mt-3 flex flex-wrap gap-2">
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/40"
              >
                Open
              </a>

              <button
                type="button"
                class="rounded-full border border-red-300/40 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-100 transition hover:bg-red-500/20"
                @click="emit('remove', item.mal_id)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>