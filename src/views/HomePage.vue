<script setup>
import { ref } from 'vue'
import AnimeCard from '@/components/AnimeCard.vue'

const loading = ref(false)
const error = ref('')

const spin = () => {
  // demo behavior: toggle loading then toggle error
  loading.value = true
  error.value = ''

  setTimeout(() => {
    loading.value = false
    // comment this out later when you connect the API
    // error.value = 'Something went wrong'
  }, 900)
}
</script>

<template>
  <main
    class="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#334155,transparent_40%),radial-gradient(circle_at_85%_0%,#0f766e,transparent_28%),linear-gradient(160deg,#020617,#0f172a,#111827)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-5xl">
      <header class="mb-8">
        <p class="text-xs font-semibold tracking-[0.3em] text-cyan-300/90 uppercase">
          Project #4
        </p>

        <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">
          Anime Roulette Machine
        </h1>

        <p class="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
          Spin the reel, request a random anime from Jikan with VueUse useFetch,
          and learn how REST APIs signal rate limiting with HTTP 429.
        </p>
      </header>

      <!-- Roulette card -->
      <section
        class="rounded-3xl border border-slate-700/70 bg-slate-900/40 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-xl font-bold text-white">Roulette</h2>
            <p class="text-sm text-slate-300">
              Pull the lever for your next random anime recommendation.
            </p>
          </div>

          <button
            type="button"
            @click="spin"
            class="rounded-full border border-cyan-300/70 bg-cyan-400/20 px-6 py-3 text-base font-black tracking-wide text-cyan-100 hover:bg-cyan-400/30 transition"
          >
            Spin
          </button>
        </div>
      </section>

      <!-- Big result card (full width under roulette) -->
      <div class="mt-6">
        <AnimeCard :loading="loading" :error="error" />
      </div>
    </div>
  </main>
</template>