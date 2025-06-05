'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Category from '../CategoryCard'
import { Typography, Row, Col, Space } from 'antd'
import styles from './styles.module.scss'

const Categories = () => {
  const router = useRouter()
  const { Title } = Typography

  const food = ['Фрукти', 'Овочі', 'Напої', 'Солодощі']
  const clothes = ['Жіночий одяг', 'Чоловічий одяг', 'Дитячий одяг']
  const homemade = ['Меблі', 'Декор', 'Побутова техніка']
  const sport = ['Велосипеди', 'Тренажери', 'Спортивний одяг']
  const electronics = ['Смартфони', 'Планшети', 'Навушники', 'Аксесуари']

  const handleSearch = (category) => {
    if (category) {
      const encodedCategory = encodeURIComponent(category)
      router.push(`/catalog?category=${encodedCategory}`)
    } else {
      router.push('/catalog')
    }
  }

  return (
    <>
      <Row className={styles.categoriesRow}>
        <Title italic={true} level={1}>
          Категорії
        </Title>
      </Row>
      <Row className={styles.categoriesRow}>
        <Space size={80}>
          <Category
            title='ЇЖА'
            catalog={food}
            imgSrc='/CategoriesCards/food.jpg'
            onSelect={handleSearch}
          />
          <Category
            title='ОДЯГ'
            catalog={clothes}
            imgSrc='/CategoriesCards/clothes.png'
            onSelect={handleSearch}
          />
          <Category
            title='ДОМАШНІ'
            catalog={homemade}
            imgSrc='/CategoriesCards/homemade.jpg'
            onSelect={handleSearch}
          />
          <Category
            title='СПОРТ'
            catalog={sport}
            imgSrc='/CategoriesCards/sport.jpg'
            onSelect={handleSearch}
          />
          <Category
            title='ЕЛЕКТРОНІКА'
            catalog={electronics}
            imgSrc='/CategoriesCards/electro.jpg'
            onSelect={handleSearch}
          />
        </Space>
      </Row>
    </>
  )
}

export default Categories
