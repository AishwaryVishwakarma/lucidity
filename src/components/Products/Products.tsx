import React from 'react';
import styles from './styles.module.scss';
import type { Product } from '../../types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useAppDispatch } from '../../redux/store';
import {
  deleteProduct,
  disableProduct,
} from '../../redux/features/inventorySlice';
import EditProduct from './EditProduct/EditProduct';
import { Skeleton, SkeletonConfig } from '@aishwaryv/react-skeleton';

interface ProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  isAdmin: boolean;
  loading: boolean;
}

const skeletonConfig: SkeletonConfig = [
  {
    id: 'parent',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    content: [
      {
        id: 'container1',
        style: {
          width: '100%',
          height: '60px',
          background: 'rgb(154 154 154)',
        },
      },
      {
        id: 'container2',
        style: {
          width: '100%',
          height: '40px',
          background: 'rgb(154 154 154)',
        },
      },
      {
        id: 'container3',
        style: {
          width: '100%',
          height: '40px',
          background: 'rgb(154 154 154)',
        },
      },
      {
        id: 'container4',
        style: {
          width: '100%',
          height: '40px',
          background: 'rgb(154 154 154)',
        },
      },
      {
        id: 'container5',
        style: {
          width: '100%',
          height: '40px',
          background: 'rgb(154 154 154)',
        },
      },
      {
        id: 'container6',
        style: {
          width: '100%',
          height: '40px',
          background: 'rgb(154 154 154)',
        },
      },
    ],
  },
];

const Products: React.FC<ProductsProps> = ({
  products,
  isAdmin,
  loading,
  className,
  ...rest
}) => {
  const dispatch = useAppDispatch();

  // Modal state
  const [modalData, setModalData] = React.useState<{
    product: Product | null;
    isOpen: boolean;
  }>({ product: null, isOpen: false });

  const closeModal = () => setModalData({ ...modalData, isOpen: false });

  return (
    <div className={`${styles.container} ${className}`} {...rest}>
      {loading ? (
        <Skeleton config={skeletonConfig} className={styles.skeleton} />
      ) : (
        <ul className={styles.products} data-column-count={isAdmin ? 7 : 6}>
          <li className={styles.header}>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Value</p>
            {isAdmin && <p>Actions</p>}
          </li>
          {products.map((product) => (
            <li
              key={product.id}
              className={`${styles.product} ${
                product.disabled && styles.disabled
              }`}
            >
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
              <p>{product.value}</p>
              {isAdmin && (
                <div className={styles.actions}>
                  <MdEdit
                    className={styles.edit}
                    onClick={() => setModalData({ product, isOpen: true })}
                  />
                  {product.disabled ? (
                    <FaEyeSlash
                      className={styles.eye}
                      onClick={() => dispatch(disableProduct(product.id))}
                    />
                  ) : (
                    <FaEye
                      className={styles.eye}
                      onClick={() => dispatch(disableProduct(product.id))}
                    />
                  )}
                  <MdDelete
                    className={styles.delete}
                    onClick={() => dispatch(deleteProduct(product.id))}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {modalData.isOpen && modalData.product && (
        <EditProduct product={modalData.product} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Products;
