import { Button, Card, Rate, Space, Typography } from "antd";
import React from "react";
import { STRINGS } from "../constants/Strings";

const { Text } = Typography;

const ProductCard = ({ product, onStock,onCart }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt="example"
          src={product.thumbnail}
          height="300px"
          width="100%"
          style={{ objectFit: "cover" }}
        />
      }
      style={{ width: "100%", height: "100%" }}
    >
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
          {STRINGS.NAME}
        </Typography>
        <Text type="secondary">{product.title}</Text>
      </Space>

      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
          {STRINGS.PRICE}
        </Typography>
        <Text type="success">${product.price}</Text>
      </Space>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
          {STRINGS.DISCOUNT}
        </Typography>
        <Text type="success">{product.discountPercentage}%</Text>
      </Space>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
          {STRINGS.CATEGORY}
        </Typography>
        <Text type="secondary">{product.category}</Text>
      </Space>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
          {STRINGS.BRAND}
        </Typography>
        <Text type="secondary">{product.brand}</Text>
      </Space>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
          {STRINGS.STOCK}
        </Typography>
        <Text type="secondary">{product.stock}</Text>
      </Space>

      <Space
        align="start"
        style={{ marginTop: "20px" }}
        direction="vertical"
        size={0}
      >
        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
          {STRINGS.DESCRIPTION}
        </Typography>
        <Text type="secondary">{product.description}</Text>
      </Space>
      <Space style={{ justifyContent: "end", width: "100%" }}>
        <Rate allowHalf defaultValue={product.rating} />
      </Space>
      <Space
        align="center"
        style={{
          marginTop: "30px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button onClick={() => onCart(product)} type="dashed">
          {STRINGS.ADD_TO_CART}
        </Button>
        <Button onClick={() => onStock(product)} type="primary">
          {STRINGS.BUY}
        </Button>
      </Space>
    </Card>
  );
};

export default ProductCard;
