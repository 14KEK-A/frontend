<script setup lang="ts"></script>
<template>
  <div class="q-pa-md">
    <q-parallax>
      <template #media>
        <img src="https://images.alphacoders.com/774/thumb-1920-774079.jpg" />
      </template>

      <template #content="scope">
        <div
          class="absolute column items-center"
          :style="{
            top: scope.percentScrolled * 60 + '%',
            left: 0,
            right: 0,
          }"
        >
          <div class="text-h3 text-center" text-color="primary">4PET WebShop</div>
        </div>
      </template>
    </q-parallax>
  </div>
  <q-separator></q-separator>
</template>
<script></script>

<style scoped>
  div {
    color: #26a69a;
    margin: auto;
  }
</style>
