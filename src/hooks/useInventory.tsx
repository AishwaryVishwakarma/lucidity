import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import axios from 'axios';
import { setProducts } from '../redux/features/inventorySlice';

/**
 * Custom hook that fetches products from an API and provides them to the component.
 * @returns An object containing the fetched products, loading state, and any additional data from the Redux store.
 */
const useInventory = () => {
  const dispatch = useAppDispatch();

  const { products, ...rest } = useAppSelector((state) => state.inventory);

  const [loading, setLoading] = React.useState(products.length === 0);

  React.useEffect(() => {
    if (products.length !== 0) return;

    axios
      .get('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
      .then((res) => {
        dispatch(setProducts(res.data));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [products.length, dispatch]);

  return {
    products,
    loading,
    ...rest,
  };
};

export default useInventory;
