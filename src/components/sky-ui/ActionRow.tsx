import { Button, Flex, Popconfirm as PopConfirm } from 'antd'
import { ButtonType } from 'antd/es/button'
import React, { HTMLAttributes } from 'react'
import { cn } from '~/utils/helpers'

export interface ActionButtonProps<T extends { key: string }> {
  handleClick?: (record: T) => void
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  isShow?: (record: T) => boolean
  title?: string
  disabled?: boolean
  type?: ButtonType
}

export interface ActionProps<T extends { key: string }> {
  isShow?: boolean
  disabled?: boolean
  onAdd?: ActionButtonProps<T>
  onSave?: ActionButtonProps<T>
  onEdit?: ActionButtonProps<T>
  onDelete?: ActionButtonProps<T>
  onDeleteForever?: ActionButtonProps<T>
  onRestore?: ActionButtonProps<T>
  onConfirmDelete?: (record: T) => void
  onConfirmRestore?: (record: T) => void
  onConfirmDeleteForever?: (record: T) => void
  onConfirmCancelEditing?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onCancelAdding?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onConfirmCancelDeleting?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onConfirmCancelRestore?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onConfirmCancelDeleteForever?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
}

export interface ActionRowProps<T extends { key: string }> extends HTMLAttributes<HTMLElement> {
  isEditing?: boolean
  vertical?: boolean
  onAdd?: ActionButtonProps<T>
  onSave: ActionButtonProps<T>
  onEdit: ActionButtonProps<T>
  onDelete?: ActionButtonProps<T>
  onDeleteForever?: ActionButtonProps<T>
  onRestore?: ActionButtonProps<T>
  onConfirmDelete?: (e?: React.MouseEvent<HTMLElement>) => void
  onConfirmRestore?: (e?: React.MouseEvent<HTMLElement>) => void
  onConfirmDeleteForever?: (e?: React.MouseEvent<HTMLElement>) => void
  onConfirmCancelEditing?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onCancelAdding?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onConfirmCancelDeleting?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onConfirmCancelRestore?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onConfirmCancelDeleteForever?: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
}

const ActionRow = <T extends { key: string }>({ ...props }: ActionRowProps<T>) => {
  return (
    <Flex className={props.className}>
      <Flex align='center' justify='space-between'>
        {props.isEditing && props.onSave.isShow ? (
          <Flex className={cn('flex-col lg:flex-row', props.className)} gap={5}>
            <Button type={props.onSave.type ? props.onSave.type : 'primary'} onClick={props.onSave.onClick}>
              Save
            </Button>
            <PopConfirm title={`Sure to cancel?`} placement='topLeft' onConfirm={props.onConfirmCancelEditing}>
              <Button type='dashed'>Cancel</Button>
            </PopConfirm>
          </Flex>
        ) : (
          <Flex gap={10} className={cn('flex-col lg:flex-row', props.className)} justify='center'>
            {props.onAdd?.isShow && (
              <Button
                type={props.onAdd.type ? props.onAdd.type : 'primary'}
                disabled={props.onAdd.disabled}
                onClick={props.onAdd.onClick}
              >
                {props.onAdd.title ?? 'Add'}
              </Button>
            )}
            {props.onEdit.isShow && (
              <Button
                type={props.onEdit.type ? props.onEdit.type : 'primary'}
                disabled={props.onEdit.disabled}
                onClick={props.onEdit.onClick}
              >
                {props.onEdit.title ?? 'Edit'}
              </Button>
            )}
            {props.onDelete?.isShow && (
              <PopConfirm
                title={`Sure to ${props.onDelete.title ? props.onDelete.title : 'delete'}?`}
                onCancel={props.onConfirmCancelDeleting}
                onConfirm={props.onConfirmDelete}
              >
                <Button
                  type={props.onDelete.type ? props.onDelete.type : 'dashed'}
                  disabled={props.onDelete.disabled}
                  onClick={props.onDelete.onClick}
                >
                  {props.onDelete.title ?? 'Delete'}
                </Button>
              </PopConfirm>
            )}
            {props.onRestore?.isShow && (
              <PopConfirm
                title={`Sure to ${props.onRestore.title ? props.onRestore.title : 'restore'}?`}
                onCancel={props.onConfirmCancelRestore}
                onConfirm={props.onConfirmRestore}
              >
                <Button
                  type={props.onRestore.type ? props.onRestore.type : 'primary'}
                  disabled={props.onRestore.disabled}
                  onClick={props.onRestore.onClick}
                >
                  {props.onRestore.title ?? 'Restore'}
                </Button>
              </PopConfirm>
            )}
            {props.onDeleteForever?.isShow && (
              <PopConfirm
                title={`Sure to ${props.onDeleteForever.title ? props.onDeleteForever.title : 'delete forever'}?`}
                onCancel={props.onConfirmCancelDeleteForever}
                onConfirm={props.onConfirmDeleteForever}
              >
                <Button
                  type={props.onDeleteForever.type ? props.onDeleteForever.type : 'dashed'}
                  disabled={props.onDeleteForever.disabled}
                  onClick={props.onDeleteForever.onClick}
                >
                  {props.onDeleteForever.title ?? 'Delete forever'}
                </Button>
              </PopConfirm>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default ActionRow
