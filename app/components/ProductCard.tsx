import React from 'react'
import AddToCart from './AddToCart'
import styles from './ProductCard.module.css' // styles is an JS object with class names as keys

const ProductCard = () => {
  return (
    <div className={styles.card}>
      <AddToCart />
    </div>
  )
}

export default ProductCard
