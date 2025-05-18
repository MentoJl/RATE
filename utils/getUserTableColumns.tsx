import { GridColDef } from '@mui/x-data-grid'
import { Tag, Dropdown, MenuProps } from 'antd'
import getRoleLabel from './getRoleLabel'
import getRoleTagColor from './getRoleTagColor'

const DropMenu = (currentRole: string): MenuProps => ({
  selectedKeys: [currentRole],
  items: [
    {
      key: 'User',
      label: 'Користувач',
    },
    {
      key: 'DomainAdmin',
      label: 'Продавець',
    },
  ],
});


const UsersColumns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: `Ім'я`, width: 150 },
  { field: 'email', headerName: 'Пошта', width: 200 },
  { field: 'password', headerName: 'Пароль', width: 190 },
  { field: 'role', 
    headerName: 'Роль', 
    width: 170,
    renderCell: (params) => {
      return params?.value !== 'GlobalAdmin' ? (
        <Dropdown menu={DropMenu(params.value)}>
          <Tag color={getRoleTagColor(params.value)} style={{ cursor: 'pointer' }}>
            {params.value}
          </Tag>
        </Dropdown>
      ) : (
        <Tag color={getRoleTagColor(params.value)}>
          {params.value}
        </Tag>
      )
    }
  }
] 

export default UsersColumns