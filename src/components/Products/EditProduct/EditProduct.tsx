import React from 'react';
import styles from './styles.module.scss';
import { Product } from '../../../types';
import { useAppDispatch } from '../../../redux/store';
import { MdOutlineClose } from 'react-icons/md';
import { updateProduct } from '../../../redux/features/inventorySlice';

interface EditProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  closeModal: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({
  product,
  closeModal,
  className,
  ...rest
}) => {
  const dispatch = useAppDispatch();

  // Set the initial product data
  const [productData, setProductData] = React.useState<Product>({
    ...product,
    price: product.price.slice(1) || '0',
    value: product.value.slice(1) || '0',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productData.category === '' || productData.price === '') return;

    dispatch(
      updateProduct({
        ...productData,
        price: `$${productData.price}`,
        value: isNaN(parseInt(productData.value)) // Check if value is a number
          ? '$0'
          : `$${productData.value}`,
      })
    );

    closeModal();
  };

  return (
    <div className={`${styles.modal} ${className}`} {...rest}>
      <div className={styles.container}>
        <button className={styles.close} onClick={closeModal}>
          <MdOutlineClose />
        </button>
        <div className={styles.title}>Edit Product</div>
        <p className={styles.name}>{product.name}</p>
        <form id='edit-product' onSubmit={onSubmit}>
          <div>
            <label htmlFor='category'>Category</label>
            <input
              type='text'
              name='category'
              id='category'
              value={productData.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
              placeholder='Category'
              required
            />
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <input
              type='text'
              name='price'
              id='price'
              value={productData.price}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  price: e.target.value,
                  value: String(
                    (parseInt(e.target.value) || 0) *
                      (productData.quantity || 0)
                  ),
                })
              }
              placeholder='Price'
              required
            />
          </div>
          <div>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='text'
              name='quantity'
              id='quantity'
              value={productData.quantity}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  quantity: parseInt(e.target.value) || 0,
                  value: String(
                    (parseInt(productData.price) || 0) *
                      (parseInt(e.target.value) || 0)
                  ),
                })
              }
              placeholder='Quantity'
              required
            />
          </div>
          <div>
            <label htmlFor='value'>Value</label>
            <input
              type='text'
              name='value'
              id='value'
              value={productData.value || '0'}
              onChange={() => {}} // Disable editing
              placeholder='Value'
              required
              style={{
                pointerEvents: 'none',
              }}
            />
          </div>
        </form>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={closeModal}>
            Cancel
          </button>
          <button form='edit-product' type='submit' className={styles.save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
