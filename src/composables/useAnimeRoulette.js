// Import VueUse utilities and Vue reactivity
import { useFetch, useCountdown, useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

// Local storage key used to persist the watchlist
const WATCHLIST_KEY = 'anime-roulette-watchlist'

// Jikan REST API endpoint used to fetch a random anime
const URL = 'https://api.jikan.moe/v4/random/anime'

// Safety limits to prevent too many API requests
const MAX_SAFE_SPIN_ATTEMPTS = 5
const RETRY_SECONDS = 10

// Helper function: filter out anime with R ratings
const isAllowedRating = (rating) => {
  if (!rating) return false
  return !rating.trim().startsWith('R')
}

export function useAnimeRoulette() {

  // Reactive state variables
  const anime = ref(null)      // stores current anime
  const loading = ref(false)   // loading indicator
  const error = ref('')        // error message

  // Countdown timer used when API rate limit occurs
  const { remaining: cooldownLeft, start: startCooldown } = useCountdown(0, {
    interval: 1000,
  })

  // Watchlist stored in browser localStorage
  const watchlist = useLocalStorage(WATCHLIST_KEY, [])

  // Fetch a random anime from the Jikan API
  const spin = async () => {

    // Prevent multiple requests while loading or cooldown
    if (loading.value || cooldownLeft.value > 0) return

    loading.value = true
    error.value = ''

    try {

      // Attempt multiple times in case invalid anime appears
      for (let attempt = 0; attempt < MAX_SAFE_SPIN_ATTEMPTS; attempt++) {

        const request = useFetch(URL, { immediate: false }).get().json()
        await request.execute()

        const response = request.response.value

        // Handle network error
        if (!response) {
          error.value = 'Network error while contacting Jikan. Check your internet and try again.'
          return
        }

        // Handle API rate limiting (HTTP 429)
        if (response.status === 429) {
          startCooldown(RETRY_SECONDS)
          error.value = `Too many requests right now. Please wait ${RETRY_SECONDS} seconds and try again.`
          return
        }

        // Handle other API errors
        if (!response.ok) {

          if (response.status === 504) {
            error.value = 'Jikan took too long to respond. Please try again in a moment.'
            return
          }

          error.value = `Something went wrong while contacting Jikan. Status: ${response.status}.`
          return
        }

        // Handle request-level errors
        if (request.error.value) {
          error.value = 'Network error while contacting Jikan. Check your internet and try again.'
          return
        }

        // Extract anime data from API response
        const candidateAnime = request.data.value?.data || null

        if (!candidateAnime) {
          error.value = 'Jikan returned an empty anime payload. Try spinning again.'
          return
        }

        // Skip anime with restricted ratings
        if (!isAllowedRating(candidateAnime.rating)) {
          continue
        }

        // Save the valid anime
        anime.value = candidateAnime
        return
      }

      error.value = 'Could not find a valid anime right now. Please spin again.'

    } catch {

      // General error handler
      error.value = 'Could not find an anime right now. Please spin again in a moment.'

    } finally {

      // Reset loading state
      loading.value = false
    }
  }

  // Add anime to the watchlist
  const addToWatchlist = (animeToAdd) => {

    if (!animeToAdd?.mal_id) return

    // Prevent duplicates
    const alreadyInWatchlist = watchlist.value.some(
      (watchlistAnime) => watchlistAnime.mal_id === animeToAdd.mal_id,
    )

    if (alreadyInWatchlist) return

    // Store simplified anime object in local storage
    watchlist.value.unshift({
      mal_id: animeToAdd.mal_id,
      title: animeToAdd.title,
      score: animeToAdd.score,
      episodes: animeToAdd.episodes,
      rating: animeToAdd.rating,
      url: animeToAdd.url,
      image:
        animeToAdd.images?.jpg?.large_image_url ||
        animeToAdd.images?.jpg?.image_url ||
        animeToAdd.images?.webp?.large_image_url ||
        animeToAdd.images?.webp?.image_url ||
        '',
    })
  }

  // Remove anime from watchlist
  const removeFromWatchlist = (malId) => {
    watchlist.value = watchlist.value.filter((watchlistAnime) => watchlistAnime.mal_id !== malId)
  }

  // Check if anime is already in watchlist
  const isInWatchlist = (malId) => {
    return watchlist.value.some((watchlistAnime) => watchlistAnime.mal_id === malId)
  }

  // Export state and functions to components
  return {
    anime,
    loading,
    error,
    spin,
    cooldownLeft,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  }
}