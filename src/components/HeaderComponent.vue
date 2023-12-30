<script setup lang="ts">
import type { IGuitar } from '@/interfaces/guitar.interface';
import { computed, type PropType } from 'vue';

const props = defineProps({
  cart: {
    type: Array as PropType<IGuitar[]>,
    required: true
  },
  guitar: {
    type: Object as PropType<IGuitar>,
    required: true
  }
});

defineEmits([
  'increase-quantity',
  'decrease-quantity',
  'add-to-cart',
  'remove-product',
  'clear-cart'
]);

const totalPay = computed(() => {
  return props.cart.reduce((total, product) => total + product.quantity! * product.price, 0);
});
</script>

<template>
  <header class="py-5 header">
    <div class="container-xl">
      <div class="row justify-content-center justify-content-md-between">
        <div class="col-8 col-md-3">
          <a href="index.html">
            <img class="img-fluid" src="../assets/img/logo.svg" alt="imagen logo" />
          </a>
        </div>
        <nav class="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
          <div class="carrito">
            <img class="img-fluid" src="../assets/img/carrito.png" alt="imagen carrito" />

            <div id="carrito" class="bg-white p-3">
              <p class="text-center m-0" v-if="cart.length === 0">O carrinho está vazio!</p>

              <div v-else>
                <table class="w-100 table">
                  <thead>
                    <tr>
                      <th>Imagem</th>
                      <th>Nome</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in cart" :key="product.id">
                      <td>
                        <img
                          class="img-fluid"
                          :src="`../../src/assets/img/${product.image}.jpg`"
                          :alt="`Imagem da guitarra ${product.name}`"
                        />
                      </td>
                      <td>{{ product.name }}</td>
                      <td class="fw-bold">${{ product.price }}</td>
                      <td class="flex align-items-start gap-4">
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="$emit('decrease-quantity', product.id)"
                        >
                          -
                        </button>
                        {{ product.quantity }}
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="$emit('increase-quantity', product.id)"
                        >
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger"
                          type="button"
                          @click="$emit('remove-product', product.id)"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p class="text-end">
                  Total à pagar: <span class="fw-bold">${{ totalPay }}</span>
                </p>
                <button class="btn btn-dark w-100 mt-3 p-2" @click="$emit('clear-cart')">
                  Limpar Carrinho
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!--.row-->

      <div class="row mt-5">
        <div class="col-md-6 text-center text-md-start pt-5">
          <h1 class="display-2 fw-bold">Modelo {{ guitar.name }}</h1>
          <p class="mt-5 fs-5 text-white">
            {{ guitar.description }}
          </p>
          <p class="text-primary fs-1 fw-black">${{ guitar.price }}</p>
          <button
            type="button"
            class="btn fs-4 bg-primary text-white py-2 px-5"
            @click="$emit('add-to-cart', guitar)"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>

    <img class="header-guitarra" src="../assets/img/header_guitarra.png" alt="imagen header" />
  </header>
</template>
