import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const CustomFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#ffffff",
        padding: "48px 64px",
        borderTop: "1px solid #e0e0e0",
        marginTop: "auto",
        borderRadius: "16px 16px 0 0",
      }}
    >
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12} md={6}>
          <img
            src="/Logo/HeaderLogo1-preview.png"
            alt="Логотип"
            style={{ 
              marginBottom: 12,
              width: '100px',
              height: '100px'
            }}
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Категорії</Title>
          <Space direction="vertical">
            <Link href="#">Їжа</Link>
            <Link href="#">Одяг</Link>
            <Link href="#">Ручні роботи</Link>
            <Link href="#">Спорт</Link>
            <Link href="#">Електроніка</Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Компанія</Title>
          <Space direction="vertical">
            <Link href="#">Про нас</Link>
            <Link href="#">Контакти</Link>
            <Link href="#">Кар'єра</Link>
            <Link href="#">Блог</Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Ми в соцмережах</Title>
          <Space size="middle">
            <img
              src="https://picsum.photos/32"
              alt="соц1"
              style={{ borderRadius: "50%" }}
            />
            <img
              src="https://picsum.photos/32?2"
              alt="соц2"
              style={{ borderRadius: "50%" }}
            />
            <img
              src="https://picsum.photos/32?3"
              alt="соц3"
              style={{ borderRadius: "50%" }}
            />
          </Space>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: 32 }}>
        <Text type="secondary">© {new Date().getFullYear()} RATE Inc.</Text>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
