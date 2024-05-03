import React from 'react';
import styles from './styles.module.scss';
import Widgets from './components/Widgets/Widgets';
import { MdCurrencyExchange } from 'react-icons/md';
import { TbShoppingCartOff, TbShoppingCart, TbApps } from 'react-icons/tb';
import Products from './components/Products/Products';
import useInventory from './hooks/useInventory';

function App() {
  const { products, totalItems, loading, totalValue, outOfStock, category } =
    useInventory();

  const [isAdmin, setIsAdmin] = React.useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.switch}>
        <p>admin</p>
        <label htmlFor='admin' className={styles.control}>
          {''}
          <input
            id='admin'
            type='checkbox'
            onChange={() => setIsAdmin((prev) => !prev)}
            checked={!isAdmin}
          />
        </label>
        <p>user</p>
      </div>
      <h1>Inventory Stats</h1>
      <Widgets
        config={[
          {
            heading: 'Total Items',
            value: totalItems,
            icon: <TbShoppingCart />,
          },
          {
            heading: 'Total Value',
            value: totalValue,
            icon: <MdCurrencyExchange />,
          },
          {
            heading: 'Out of Stock',
            value: outOfStock,
            icon: <TbShoppingCartOff />,
          },
          {
            heading: 'Category',
            value: Object.keys(category).length,
            icon: <TbApps />,
          },
        ]}
      />
      <Products products={products} isAdmin={isAdmin} loading={loading} />
    </div>
  );
}

export default App;
