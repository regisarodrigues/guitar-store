<script setup lang="ts">
import type { IGuitar } from '@/interfaces/guitar.interface';
import type { PropType } from 'vue';

defineProps({
  guitar: {
    type: Object as PropType<IGuitar>,
    required: true
  }
});

defineEmits(['add-to-cart']);
</script>

<template>
  <div class="col-md-6 col-lg-4 my-4 row align-items-center">
    <div class="col-4">
      <img
        class="img-fluid"
        :src="`../../src/assets/img/${guitar.image}.jpg`"
        :alt="`Imagem da guitarra ${guitar.name}`"
      />
    </div>
    <div class="col-8">
      <h3 class="text-black fs-4 fw-bold text-uppercase">{{ guitar.name }}</h3>
      <p>
        {{ guitar.description }}
      </p>
      <p class="fw-black text-primary fs-3">${{ guitar.price }}</p>
      <button class="btn btn-dark w-100" type="button" @click="$emit('add-to-cart', guitar)">
        Comprar
      </button>
    </div>
  </div>
</template>
