import { type PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import type { Product } from '../../types';

export interface InventoryState {
  products: Product[];
  totalItems: number;
  totalValue: number;
  outOfStock: number;
  category: Record<string, number>; // Example: { 'Electronics': 3, 'Clothing': 2 }
}

const initialState = {
  products: [],
  totalItems: 0,
  totalValue: 0,
  outOfStock: 0,
  category: {},
} as InventoryState;

export const inventory = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Setting the products and other details
    setProducts: (state, action: PayloadAction<Product[]>) => {
      let totalItems = 0,
        totalValue = 0;
      const category: Record<string, number> = {};

      // Calculate total items, total value and category count
      state.products = action.payload.map((product) => {
        const { quantity, value, category: productCategry } = product ?? {};

        totalItems += quantity;
        totalValue += parseInt(value.slice(1), 10) || 0; // Price will be in this format: $1190, remove the dollar sign
        category[productCategry] = (category[productCategry] || 0) + 1;

        return {
          ...product,
          id: nanoid(),
          disabled: false,
        };
      });

      state.totalItems = totalItems;
      state.totalValue = totalValue;
      state.category = category;
    },

    // Disabling a product
    disableProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload) {
          const newDisabled = !product.disabled;
          const newCategoryCount =
            (state.category[product.category] || 0) + (newDisabled ? -1 : 1);

          // Update the total items, out of stock and category count
          state.totalItems += newDisabled
            ? -product.quantity
            : product.quantity;
          state.outOfStock += newDisabled ? 1 : -1;

          // If the category count is 0, delete the category
          if (newCategoryCount <= 0) {
            delete state.category[product.category];
          } else {
            state.category[product.category] = newCategoryCount;
          }

          state.totalValue += newDisabled
            ? -parseInt(product.value.slice(1), 10) || 0
            : parseInt(product.value.slice(1), 10) || 0;

          return {
            ...product,
            disabled: !product.disabled,
          };
        }
        return product;
      });
    },

    // Deleting a product
    deleteProduct: (state, action: PayloadAction<string>) => {
      const deletedProduct = state.products.find(
        (product) => product.id === action.payload
      );

      if (deletedProduct) {
        // Update the total items, out of stock and category count
        state.totalItems -= deletedProduct.quantity;
        state.totalValue -= parseInt(deletedProduct.value.slice(1), 10) || 0;
        state.outOfStock -= deletedProduct.disabled ? 1 : 0;
        state.category[deletedProduct.category] -= 1;

        if (state.category[deletedProduct.category] === 0) {
          delete state.category[deletedProduct.category];
        }

        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    },

    // Adding a new product
    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;

      // Find the product index
      const productIndex = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );

      if (productIndex !== -1) {
        const oldProduct = state.products[productIndex];

        // Calculate the difference in quantity and value
        const quantityDiff = updatedProduct.quantity - oldProduct.quantity;
        const valueDiff =
          parseInt(updatedProduct.value.slice(1), 10) ||
          0 - parseInt(oldProduct.value.slice(1), 10) ||
          0;

        // Update the total items, total value and category count
        state.totalItems += quantityDiff;
        state.totalValue += valueDiff;
        state.category[oldProduct.category] -= 1; // Decrement the old category count
        state.category[updatedProduct.category] =
          (state.category[updatedProduct.category] || 0) + 1; // Increment the new category count (if it doesn't exist, set it to 1)

        state.products[productIndex] = {
          ...updatedProduct,
        };
      }
    },
  },
});

export const { setProducts, disableProduct, deleteProduct, updateProduct } =
  inventory.actions;

export default inventory.reducer;
