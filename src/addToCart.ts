import { type IGuitar } from './interfaces/guitar.interface';
import { cart } from './App.vue';

export const addToCart = (guitar: IGuitar[]) => {
  cart.value.push(guitar);
};
