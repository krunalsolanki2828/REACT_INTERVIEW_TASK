import { Col, Modal, Row, Select, Space, Spin } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/ProductCard'

// css file import
import './product.css'
import { Typography } from 'antd';
import { STRINGS } from '../../components/constants/Strings'
import swal from 'sweetalert'
import { ShoppingCartOutlined } from '@ant-design/icons'
import CartCard from '../../components/cartCard/CartCard';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../../store/cartSlice'
import { fetchProductsData } from '../../controllers/productsSlice'
import { setBrandFilter, setCategoryFilter, setSortFilter } from '../../store/productsSlice'



const Products = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const { carts } = useSelector(state => state.cart);
  const { products, productsLoading, categories, brands, filters } = useSelector(state => state.products);
  const { category, brand, sort } = filters;

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProductsData())
    if (products) {
    }
  }, [])

  const buyNowStock = (product) => {
    if (product.stock < 50) {
      swal("Oops!", "hurry! only a few items left", "error");

    } else {
      swal("Success", "Congratulations!", "success");
    }
  }
  const getFilteredProducts = useCallback(() => {
    const categoryFilters = category ? products.filter((product) => product.category === category) : products;
    const brandFilters = brand ? categoryFilters.filter((product) => product.brand === brand) : categoryFilters;
    const sortFilters = sort ? brandFilters.slice().sort((a, b) => {
      if (sort === 'rating') {
        return a.rating - b.rating;
      } else if (sort === 'price') {
        return a.price - b.price;
      } else if(sort === 'discount') {
        return a.discountPercentage - b.discountPercentage;
      } else {
        return a.id - b.id;
      }
    }) : brandFilters;
    return sortFilters
  }, [brand, category, products, sort]);

  const addTocart = (product) => {
    dispatch(addCart(product))
    swal("Success", "Congratulations Add To Cart!", "success");

  }

  return (
    <>
      {productsLoading ? <Space style={{ height: '100vh', justifyContent: 'center', width: '100%' }} align="center" size="middle">
        <Spin size="large" />
      </Space> :
        <div className='mainContainer'>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginBottom: '30px' }} >
            <Typography style={{ fontSize: '24px', fontWeight: '700' }}>{STRINGS.PRODUCTS}</Typography>
            <Space>
              <Select
                defaultValue="All Categories"
                style={{ width: 300 }}
                value={category}
                options={[
                  { label: "All Categories", value: "" },
                  ...(categories.map(category => {
                    return { label: category, value: category }
                  }))]}
                onChange={(value) => dispatch(setCategoryFilter({ category: value }))}
              />
              <Select
                defaultValue="All Categories"
                style={{ width: 300 }}
                value={brand}
                options={[
                  { label: "All Brands", value: "" },
                  ...(brands.map(category => {
                    return { label: category, value: category }
                  }))]}
                onChange={(value) => dispatch(setBrandFilter({ brand: value }))}
              />
              <Select
                defaultValue="Sort By"
                style={{ width: 300 }}
                value={sort}
                options={[
                  { label: "Sort By", value: "" },
                  { label: "Rating", value: "rating" },
                  { label: "Price", value: "price" },
                  { label: "Discount", value: "discount" },
                ]}
                onChange={(value) => dispatch(setSortFilter({ sort: value }))}
                  />
                  <Button type="primary" shape="circle" onClick={() => setIsOpenCart(true)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                  </Button>
            </Space>

          </Space>
          <Row style={{ width: '100%' }} gutter={[20, 20]}>
            {getFilteredProducts().length > 0 ? getFilteredProducts().map((product, index) => {
              return (
                <Col key={index} span={6}>
                  <ProductCard onCart={addTocart} onStock={buyNowStock} product={product} />
                </Col>
              )
            }) : <Typography style={{ fontSize: '24px', fontWeight: '700' }}>{STRINGS.NO_PRODUCTS}</Typography>}
          </Row>

        </div>
      }
      <Modal width="80%" title="Carts" open={isOpenCart} onOk={() => setIsOpenCart(false)} onCancel={() => setIsOpenCart(false)} >
        <Row gutter={[20, 20]}>
          {carts.map((cart, index) => {
            return (
              <Col key={index} span={24}>
                <CartCard cart={cart} />
              </Col>
            )
          })}
          {carts.length === 0 && <Space style={{ justifyContent: 'center', width: '100%' }}>
            <Typography style={{ fontSize: '24px', fontWeight: '700' }}>{STRINGS.NO_CART_ITEMS}</Typography>
          </Space>}
        </Row>

      </Modal>
    </>

  )
}

export default Products
