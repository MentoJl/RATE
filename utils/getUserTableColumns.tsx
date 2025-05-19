import { GridColDef } from '@mui/x-data-grid'
import { Tag } from 'antd'
import getRoleTagColor from './getRoleTagColor'

const UsersColumns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: `Ім'я`, width: 150 },
  { field: 'email', headerName: 'Пошта', width: 200 },
  { field: 'password', headerName: 'Пароль', width: 190 },
  {
    field: 'role',
    headerName: 'Роль',
    width: 170,
    renderCell: (params) => {

      return (
        <Tag color={getRoleTagColor(params.value)}>
          {params.value}
        </Tag>
      )
    }
  }
]

export default UsersColumns