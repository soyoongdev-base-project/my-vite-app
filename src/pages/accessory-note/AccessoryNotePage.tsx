import { ColumnsType, ColumnType } from 'antd/es/table'
import { memo } from 'react'
import useTitle from '~/components/hooks/useTitle'
import BaseLayout from '~/components/layout/BaseLayout'
import ProtectedLayout from '~/components/layout/ProtectedLayout'
import EditableStateCell from '~/components/sky-ui/SkyTable/EditableStateCell'
import SkyTable from '~/components/sky-ui/SkyTable/SkyTable'
import SkyTableActionRow from '~/components/sky-ui/SkyTable/SkyTableActionRow'
import SkyTableTypography from '~/components/sky-ui/SkyTable/SkyTableTypography'
import SkyTableWrapperLayout from '~/components/sky-ui/SkyTable/SkyTableWrapperLayout'
import { textValidatorChange, textValidatorDisplay } from '~/utils/helpers'
import ModalAddNewAccessoryNote from './components/ModalAddNewAccessoryNote'
import useAccessoryNoteViewModel from './hooks/useAccessoryNoteViewModel'
import { AccessoryNoteTableDataType } from './type'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const AccessoryNotePage: React.FC<Props> = () => {
  useTitle('Accessory Note - Phung Nguyen')
  const viewModel = useAccessoryNoteViewModel()

  const tableColumns: ColumnsType<AccessoryNoteTableDataType> = [
    {
      title: 'Tên',
      dataIndex: 'title',
      width: '15%',
      render: (_value: any, record: AccessoryNoteTableDataType) => {
        return (
          <EditableStateCell
            isEditing={viewModel.table.isEditing(record.key!)}
            dataIndex='title'
            title='Sewing line title'
            inputType='text'
            required={true}
            defaultValue={record.title}
            value={viewModel.state.newRecord.title}
            onValueChange={(val: string) =>
              viewModel.state.setNewRecord((prev) => {
                return { ...prev, title: textValidatorChange(val) }
              })
            }
          >
            <SkyTableTypography status={record.status}>{textValidatorDisplay(record.title)}</SkyTableTypography>
          </EditableStateCell>
        )
      }
    },
    {
      title: 'Chi tiết',
      dataIndex: 'summary',
      width: '15%',
      render: (_value: any, record: AccessoryNoteTableDataType) => {
        return (
          <EditableStateCell
            isEditing={viewModel.table.isEditing(record.key!)}
            dataIndex='summary'
            title='Summary'
            inputType='text'
            required={true}
            defaultValue={record.summary}
            value={viewModel.state.newRecord.summary}
            onValueChange={(val: string) =>
              viewModel.state.setNewRecord((prev) => {
                return { ...prev, summary: textValidatorChange(val) }
              })
            }
          >
            <SkyTableTypography>{textValidatorDisplay(record.summary)}</SkyTableTypography>
          </EditableStateCell>
        )
      }
    }
  ]

  const actionCol: ColumnType<AccessoryNoteTableDataType> = {
    title: 'Operation',
    width: '0.001%',
    render: (_value: any, record: AccessoryNoteTableDataType) => {
      return (
        <SkyTableActionRow
          record={record}
          editingKey={viewModel.table.editingKey}
          deletingKey={viewModel.table.deletingKey}
          buttonEdit={{
            onClick: () => {
              viewModel.state.setNewRecord({ ...record })
              viewModel.table.handleStartEditing(record.key)
            },
            isShow: !viewModel.state.showDeleted
          }}
          buttonSave={{
            // Save
            onClick: () => viewModel.action.handleUpdate(record),
            isShow: !viewModel.state.showDeleted
          }}
          // Start delete
          buttonDelete={{
            onClick: () => viewModel.table.handleStartDeleting(record.key),
            isShow: !viewModel.state.showDeleted
          }}
          // Start delete forever
          buttonDeleteForever={{
            onClick: () => {},
            isShow: viewModel.state.showDeleted
          }}
          // Start restore
          buttonRestore={{
            onClick: () => viewModel.table.handleStartRestore(record.key),
            isShow: viewModel.state.showDeleted
          }}
          // Delete forever
          onConfirmDeleteForever={() => viewModel.action.handleDeleteForever(record)}
          // Cancel editing
          onConfirmCancelEditing={() => viewModel.table.handleCancelEditing()}
          // Cancel delete
          onConfirmCancelDeleting={() => viewModel.table.handleCancelDeleting()}
          // Delete (update status record => 'deleted')
          onConfirmDelete={() => viewModel.action.handleDelete(record)}
          // Cancel restore
          onConfirmCancelRestore={() => viewModel.table.handleCancelRestore()}
          // Restore
          onConfirmRestore={() => viewModel.action.handleRestore(record)}
          // Show hide action col
        />
      )
    }
  }

  return (
    <ProtectedLayout>
      <BaseLayout title='Danh sách ghi chú phụ liệu'>
        <SkyTableWrapperLayout
          loading={viewModel.table.loading}
          searchProps={{
            onSearch: viewModel.action.handleSearch,
            placeholder: 'Ví dụ: Chưa về'
          }}
          sortProps={{
            onChange: viewModel.action.handleSwitchSortChange
          }}
          deleteProps={{
            onChange: viewModel.action.handleSwitchDeleteChange
          }}
          addNewProps={{
            onClick: () => viewModel.state.setOpenModal(true)
          }}
        >
          <SkyTable
            loading={viewModel.table.loading}
            tableColumns={{
              columns: tableColumns,
              actionColumn: actionCol
            }}
            dataSource={viewModel.table.dataSource}
            pagination={{
              pageSize: viewModel.table.paginator.pageSize,
              current: viewModel.table.paginator.page,
              onChange: viewModel.action.handlePageChange
            }}
          />
        </SkyTableWrapperLayout>
      </BaseLayout>
      {viewModel.state.openModal && (
        <ModalAddNewAccessoryNote
          open={viewModel.state.openModal}
          setOpenModal={viewModel.state.setOpenModal}
          onAddNew={viewModel.action.handleAddNew}
        />
      )}
    </ProtectedLayout>
  )
}

export default memo(AccessoryNotePage)
