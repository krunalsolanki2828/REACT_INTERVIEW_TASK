import React from 'react'
import { Row, Col, Typography } from 'antd';
import { Space } from 'antd';
import { STRINGS } from '../constants/Strings';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CartCard = ({ cart }) => {
    return (
        <Row style={{ marginTop: '20px' }}>
            <Col span={6} >
                <img src={cart.thumbnail} height="300px" width="300px" style={{ borderRadius: '10px', objectFit: 'cover' }} />
            </Col>
            <Col span={18}>
                <Space direction='vertical'>
                    <Space>
                        <Typography style={{ fontWeight: '700', fontSize: '20px' }}>{STRINGS.NAME}</Typography>
                        <Text type='secondary'>{cart.title}</Text>
                    </Space>
                    <Space>
                        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>{STRINGS.PRICE}</Typography>
                        <Text type='secondary'>{cart.price}</Text>
                    </Space>
                    <Space>
                        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>{STRINGS.DESCRIPTION}</Typography>
                        <Text type='secondary'>{cart.description}</Text>
                    </Space>
                    <Space>
                        <Typography style={{ fontWeight: "700", fontSize: "18px" }}>{STRINGS.BRAND}</Typography>
                        <Text type='secondary'>{cart.brand}</Text>
                    </Space>
                </Space>



            </Col>
        </Row>
    )
}

export default CartCard
