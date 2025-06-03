import React, { useState, useEffect } from 'react'
import { List, Avatar, Typography, Rate, Input, Button, message } from 'antd'
import { 
  useGetCommentQuery,
  useCreateCommentMutation,
} from '@/app/routes/commentsApi'
import { useSession } from 'next-auth/react'

const CommentsTable = ({ productId, setAvarageRate }) => {
  const { data: session } = useSession()
  const { Title } = Typography
  const { data: comments = [], refetch } = useGetCommentQuery({ _id: productId }, { skip: !productId })
  const [text, setText] = useState('')
  const [rate, setRate] = useState(null)
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation()

  useEffect(() => {
    if (comments.length) {
      const total = comments.reduce((sum, item) => sum + item.rate, 0)
      setAvarageRate(total / comments.length)
    } else {
      setAvarageRate(0)
    }
  }, [comments, setAvarageRate])

  const handleCreateComment = async () => {
    if (!text || !rate) {
      message.warning('Будь ласка, введіть комментар і оберіть рейтинг.')
      return
    }

    try {
      await createComment({
        productId,
        text,
        rate,
        userId: session?.user?.id,
      }).unwrap()

      message.success('Відгук збережено!')
      setText('')
      setRate(null)
      refetch()
    } catch (err) {
      console.log(err)
      message.error('Помилка при збережені відгуку.')
    }
  }

  return (
    <div style={{ marginTop: 24 }}>
      <Title level={4}>Відгуки</Title>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        locale={{ emptyText: 'У цього товару поки немає відгуків' }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.userId?.image} />}
              title={<>{item.userId?.name || item.userId?.email} <Rate disabled value={item.rate} /></>}
              description={item.text}
            />
          </List.Item>
        )}
      />

      {session && (
        <div style={{ marginTop: 32 }}>
          <Title level={5}>Залиште свій відгук</Title>
          <Rate value={rate} onChange={setRate} />  
          <Input.TextArea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ваш комментар"
            style={{ marginTop: 8 }}
          />
          <Button
            type="primary"
            onClick={handleCreateComment}
            loading={isCreating}
            style={{ marginTop: 8 }}
          >
            Зберегти
          </Button>
        </div>
      )}
    </div>
  )
}

export default CommentsTable
