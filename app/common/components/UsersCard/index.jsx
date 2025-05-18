import react, { useState, useMemo, useReducer } from 'react'
import { Card, Dropdown, Button, message, Tag } from 'antd'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetUsersQuery, useDeleteUserMutation } from '@/app/routes/userApi'
import UsersColumns from '@/utils/getUserTableColumns'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const UsersCard = () => {
  const { data: users, refetch } = useGetUsersQuery({})
  const [deleteUser, { 
    isLoading: deleteLoading, 
    Error: deleteError 
  }] = useDeleteUserMutation()
  const [selectedIds, setSelectedIds] = useState([])
  const paginationModel = { page: 0, pageSize: 10 }

  const handleDeleteUser = async () => {
    try {
      await Promise.all(
        selectedIds.map(id => deleteUser({ _id: id }))
      )
      message.success("Користувач(і) успішно видалені")
      setSelectedIds([])
      refetch()
    } catch (err) {
      console.log(err)
      message.error("Сталася помилка при видаленні")
    }
  }

  const DropMenu = useMemo(() => ({
    items: [
      // {
      //   value: 1,
      //   label: 'Зберегти',
      //   disabled: false,
      //   icon: <EditOutlined/>
      // },
      {
        value: 1,
        label: 'Видалити',
        disabled: selectedIds.length === 0 ? true : false,
        danger: true,
        icon: <DeleteOutlined/>,
        onClick: handleDeleteUser
      },
    ]
  }), [selectedIds])

  const ExtrasMenu = useMemo(() => {
    return (
      <>
        <Dropdown menu={DropMenu}>
          <Button>
            • • •
          </Button>
        </Dropdown>
      </>
    )
  }, [selectedIds])

  return (
    <Card
      hoverable
      title={"Користувачі"}
      extra={ExtrasMenu}
    >
      <DataGrid
        rows={users || []}
        columns={UsersColumns}
        getRowId={(row) => row._id}
        initialState={{ pagination: { paginationModel } }}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedIds(newSelection)
        }}
      />
    </Card>
  )
}

export default UsersCard