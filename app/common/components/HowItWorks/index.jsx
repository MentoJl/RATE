import React from 'react'
import { Steps, Typography } from 'antd'
import { FormOutlined, SecurityScanOutlined } from '@ant-design/icons'
import { Stepper, Box, Step, StepLabel } from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment';
import styles from './styles.module.scss'

const HowItWorks = () => {
    const description = 'This is a description.'
    const { Title } = Typography
    const publication = [
        {
        title: 'Publish',
        icon: <FormOutlined style={{ fontSize: '30px'}} />,
        description: [
            'Fill out the product card.',
            'Select a category and specify key characteristics.',
        ],
        },
        {
        title: 'Checking',
        icon: <SecurityScanOutlined style={{ fontSize: '30px'}} />,
        description: [
            'The marketplace checks the product for compliance with the rules.',
            'You can run ads and increase visibility.',
        ],
        },
        {
        title: 'Salling',
        icon: <PaymentIcon fontSize='large' />,
        description: [
            'As soon as a buyer places an order, the marketplace notifies you.',
            'Pack the product and send it to the buyer.',
            'After confirmation of delivery, you will receive payment.',
        ],
        },
    ];
    return (
    <div className={styles.componentPos}>
        <Title
            italic={true}
            style={{ fontStyle: 'italic', paddingBottom: '30px', paddingTop: '50px' }}
            level={1}
        >
            Why Us?
        </Title>
        <Title
            italic={true}
            style={{ fontStyle: 'italic', paddingBottom: '20px' }}
            level={2}
        >
            Simply Publication
        </Title>
        <Box>
            <Stepper activeStep={2} orientation="vertical">
                {publication.map((step, index) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={() => step.icon}>
                            <Title level={3}>{step.title}</Title>
                            <Title level={4}>
                                {Array.isArray(step.description) 
                                    ? step.description.map((desc, i) => (
                                        <div key={i}>• {desc}</div>
                                    ))
                                    : step.description}
                            </Title>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
        Simply Byuing
        Coloboration
        Maximum Safety
        <div style={{height: '600px'}}></div>
    </div>
    )
}

export default HowItWorks