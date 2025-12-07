<script setup>
import { Motion } from "@motionone/vue"
</script>
<template>

  <div class="relative overflow-hidden">
    <RouterLink to="/books">
      <!-- Background image with fade-in -->
      <Motion tag="div" :initial="{ opacity: 0, scale: 1.05 }" :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 1.2, ease: 'easeOut' }" class="hero min-h-screen bg-cover bg-center"
        :style="{ backgroundImage: 'url(/background.jpg)' }">

        <div class="hero-overlay bg-black/40"></div>

        <!-- Content -->
        <Motion tag="div" class="hero-content text-neutral-content text-center" :initial="{ opacity: 0, y: 40 }"
          :animate="{ opacity: 1, y: 0 }" :transition="{ delay: 0.3, duration: 1 }">
          <div class="max-w-md space-y-6">
            <h1 class="text-5xl font-extrabold drop-shadow-lg text-white">
              LibraCTU <br />
              <span class="text-blue-300">Tủ sách của tôi</span>
            </h1>

            <Motion tag="p" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.6, duration: 0.8 }" class="text-xl text-gray-100">
              Nơi tri thức bắt đầu.
            </Motion>

            <Motion tag="div" :whileHover="{ scale: 1.1 }" :whileTap="{ scale: 0.95 }"
              :transition="{ type: 'spring', stiffness: 300 }">
              <RouterLink to="/books"
                class="btn btn-primary rounded-lg ring-2 ring-transparent hover:ring-blue-300 transition-all duration-300">
                Bắt đầu ngay
              </RouterLink>
            </Motion>
          </div>
        </Motion>
      </Motion>
    </RouterLink>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 10;
}
</style>
