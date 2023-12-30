<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import FooterComponent from './components/FooterComponent.vue';
import GuitarItem from './components/GuitarItem.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import { guitarDB } from './data/guitars';
import { type IGuitar } from './interfaces/guitar.interface';

const guitars = ref<IGuitar[]>([]);
const cart = ref<IGuitar[]>([]);
const guitar = ref<IGuitar>({
  id: 0,
  name: '',
  image: '',
  description: '',
  price: 0,
  quantity: 0
});

watch(
  cart,
  () => {
    saveCartLocalStorage();
  },
  { deep: true }
);

onMounted(() => {
  guitars.value = guitarDB;
  guitar.value = guitarDB[3];

  const cartStorage = localStorage.getItem('cart');
  if (cartStorage) cart.value = JSON.parse(cartStorage);
});

const saveCartLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

const addToCart = (guitar: IGuitar) => {
  const existProduct: number = cart.value.findIndex((product) => product.id === guitar.id);

  if (existProduct >= 0) {
    cart.value[existProduct].quantity!++;
  } else {
    guitar.quantity = 1;
    cart.value.push(guitar);
  }
};

const increaseQuantity = (id: number) => {
  const index = cart.value.findIndex((product) => product.id === id);
  if (cart.value[index].quantity! >= 5) return;

  cart.value[index].quantity!++;
};

const decreaseQuantity = (id: number) => {
  const index = cart.value.findIndex((product) => product.id === id);
  if (cart.value[index].quantity! <= 1) return;

  cart.value[index].quantity!--;
};

const removeProduct = (id: number) => {
  cart.value = cart.value.filter((product) => product.id !== id);
};

const clearCart = () => {
  cart.value = [];
};
</script>

<template>
  <HeaderComponent
    :cart="cart"
    :guitar="guitar"
    @increase-quantity="increaseQuantity"
    @decrease-quantity="decreaseQuantity"
    @add-to-cart="addToCart"
    @remove-product="removeProduct"
    @clear-cart="clearCart"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nossa Coleção</h2>

    <div class="row mt-5">
      <GuitarItem
        v-for="guitar in guitars"
        :key="guitar.id"
        :guitar="guitar"
        @add-to-cart="addToCart"
      />
    </div>
  </main>

  <FooterComponent />
</template>
