import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const { TextArea } = Input

const categories = [
  'Іжа',
  'Одяг',
  'Домашні',
  'Спорт',
  'Електроніка',
]

export default function ProductModal({
  visible,
  onCancel,
  onSave,
  product = {},
}) {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    form.setFieldsValue({
      title: product?.title || '',
      price: product?.price || 0,
      description: product?.description || '',
      category: product?.category || [],
      tags: product?.tags || [],
    })

    setFileList(
      (product?.images || [product?.image])
        .filter(Boolean)
        .map((url, idx) => ({
          uid: `-1-${idx}`,
          name: `image${idx + 1}.jpg`,
          status: 'done',
          url,
        }))
    )
  }, [product, form])

  const handleOk = () => {
    form.validateFields().then(values => {
      const updatedProduct = {
        ...values,
        images: fileList.map(f => f.url || (f.originFileObj ? URL.createObjectURL(f.originFileObj) : null)),
      }
      onSave(updatedProduct)
    }).catch(info => {
      console.log('Validate Failed:', info)
      message.error('Будь ласка, заповніть усі обовʼязкові поля.')
    })
  }

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleRemove = (file) => {
    setFileList(current => current.filter(f => f.uid !== file.uid))
  }

  return (
    <Modal
      title="Редагувати товар"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Зберегти"
      cancelText="Скасувати"
      width={700}
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Назва товару" name="title" rules={[{ required: true, message: 'Введіть назву товару' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Ціна" name="price" rules={[{ required: true, message: 'Введіть ціну' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Категорія" name="category" rules={[{ required: true, message: 'Оберіть категорію' }]}>
          <Select options={categories.map(cat => ({ label: cat, value: cat }))} />
        </Form.Item>

        <Form.Item label="Теги" name="tags" rules={[{ required: true, message: 'Оберіть теги' }]}>
          <Select mode="tags" style={{ width: '100%' }} placeholder="Додайте теги" />
        </Form.Item>

        <Form.Item label="Опис" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Фотографії">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            beforeUpload={() => false}
            preview={false}
            multiple
          >
            {fileList.length >= 5 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Додати фото</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
