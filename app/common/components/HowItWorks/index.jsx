import React from 'react'
import { Typography } from 'antd'
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import { FormOutlined, SecurityScanOutlined, SafetyCertificateOutlined, TeamOutlined, SmileOutlined } from '@ant-design/icons'
import PaymentIcon from '@mui/icons-material/Payment'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import GroupsIcon from '@mui/icons-material/Groups'

const { Title, Paragraph } = Typography

const HowItWorks = () => {
  const titleStyle = {
    fontStyle: 'italic',
    paddingBottom: 30,
    paddingTop: 50,
    textAlign: 'center',
  }

  const stepContainerStyle = {
    maxWidth: 900,
    margin: '0 auto',
  }

  const publication = [
    {
      title: 'Публікація',
      icon: <FormOutlined style={{ fontSize: '30px' }} />,
      description: [
        'Заповніть картку товару.',
        'Оберіть категорію та вкажіть основні характеристики.',
      ],
    },
    {
      title: 'Перевірка',
      icon: <SecurityScanOutlined style={{ fontSize: '30px' }} />,
      description: [
        'Маркетплейс перевіряє товар на відповідність правилам.',
        'Можна запускати рекламу для збільшення видимості.',
      ],
    },
    {
      title: 'Продаж',
      icon: <PaymentIcon fontSize="large" />,
      description: [
        'Покупець оформлює замовлення — ви отримуєте сповіщення.',
        'Упакуйте та надішліть товар.',
        'Після підтвердження доставки ви отримуєте оплату.',
      ],
    },
  ]

  const buying = [
    {
      title: 'Пошук товару',
      icon: <ShoppingCartIcon fontSize="large" />,
      description: ['Переглядайте категорії або шукайте за ключовими словами.', 'Перевіряйте рейтинг і інформацію про продавця.'],
    },
    {
      title: 'Оформлення замовлення',
      icon: <PaymentIcon fontSize="large" />,
      description: ['Додайте до кошика та оплачуйте безпечно.', 'Відстежуйте доставку у своєму профілі.'],
    },
    {
      title: 'Отримання та оцінка',
      icon: <SmileOutlined style={{ fontSize: '30px' }} />,
      description: ['Підтвердіть доставку.', 'Залиште відгук та оцініть продавця.'],
    },
  ]

  const collaboration = [
    {
      title: 'Станьте партнером',
      icon: <GroupsIcon fontSize="large" />,
      description: ['Зареєструйте компанію та підтвердьте особу.', 'Отримайте доступ до інструментів для співпраці.'],
    },
    {
      title: 'Розвивайтесь разом',
      icon: <TeamOutlined style={{ fontSize: '30px' }} />,
      description: ['Співпрацюйте з продавцями та інфлюенсерами.', 'Беріть участь у спільних акціях.'],
    },
  ]

  const safety = [
    {
      title: 'Безпечні транзакції',
      icon: <SafetyCertificateOutlined style={{ fontSize: '30px' }} />,
      description: ['Усі платежі зашифровані.', 'Ми утримуємо кошти до підтвердження доставки.'],
    },
    {
      title: 'Довіра та підтримка',
      icon: <SecurityScanOutlined style={{ fontSize: '30px' }} />,
      description: ['Підтримка доступна 24/7.', 'Розв’язання спорів і захист від шахрайства.'],
    },
  ]

  const renderSection = (title, steps) => (
    <div style={stepContainerStyle}>
      <Title level={2} style={titleStyle}>{title}</Title>
      <Box>
        <Stepper activeStep={-1} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel icon={step.icon}>
                <div style={{ marginBottom: 10 }}>
                  <Title level={3}>{step.title}</Title>
                  {step.description.map((desc, i) => (
                    <Paragraph key={i} style={{ margin: 0 }}>
                      • {desc}
                    </Paragraph>
                  ))}
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  )

  return (
    <div>
      <Title level={1} style={{ ...titleStyle, paddingTop: 70 }}>
        Чому саме ми?
      </Title>
      {renderSection('Проста публікація', publication)}
      {renderSection('Просте придбання', buying)}
      {renderSection('Співпраця', collaboration)}
      {renderSection('Максимальна безпека', safety)}
    </div>
  )
}

export default HowItWorks
