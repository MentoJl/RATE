import React from 'react'
import Category from '../CategoryCard'
import { Typography } from 'antd'
import { Col, Row } from 'antd'
import styles from './styles.module.scss'
import { Space } from 'antd'

const Categories = () => {

    const food = ['Fruits', 'Vegetables', 'Drinks', 'Sweets']
    const clothes = ["Women's", "Men's", "Children's"]
    const homemade = ['Furniture', 'Decor', 'Appliances']
    const sport = ['Bicycles', 'Simulators', 'Sportswear']
    const electronics = ['Smartphones', 'Tablets', 'Headphones', 'Accessories']
    const { Title } = Typography

    return (
        <>
            <Row className={styles.categoriesRow}>
                <Title
                    italic={true}
                    style={{ fontStyle: 'italic' }}
                    level={1}
                >
                    Categories
                </Title>
            </Row>
            <Row className={styles.categoriesRow}>
                <Space size={80}>
                    <Category 
                        title='FOOD'
                        catalog={food}
                        imgSrc='/CategoriesCards/food.jpg'
                        
                    />
                    <Category 
                        title='CLOTHES'
                        catalog={clothes}
                        imgSrc='/CategoriesCards/clothes.png'
                    />
                    <Category 
                        title='HOMEMADE'
                        catalog={homemade}
                        imgSrc='/CategoriesCards/homemade.jpg'
                    />
                    <Category 
                        title='SPORT'
                        catalog={sport}
                        imgSrc='/CategoriesCards/sport.jpg'
                    />
                    <Category 
                        title='ELECTRONICS'
                        catalog={electronics}
                        imgSrc='/CategoriesCards/electro.jpg'
                    />
                </Space>
            </Row>
        </>
    );
}

export default Categories