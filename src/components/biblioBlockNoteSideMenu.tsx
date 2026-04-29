import {
  DragHandleMenu,
  RemoveBlockItem,
  SideMenu,
  TableColumnHeaderItem,
  TableRowHeaderItem,
  type SideMenuProps,
  useDictionary,
} from '@blocknote/react'

function BiblioDragHandleMenu() {
  const dict = useDictionary()

  return (
    <DragHandleMenu>
      <RemoveBlockItem>{dict.drag_handle.delete_menuitem}</RemoveBlockItem>
      <TableRowHeaderItem>{dict.drag_handle.header_row_menuitem}</TableRowHeaderItem>
      <TableColumnHeaderItem>{dict.drag_handle.header_column_menuitem}</TableColumnHeaderItem>
    </DragHandleMenu>
  )
}

export function BiblioSideMenu(props: SideMenuProps) {
  return <SideMenu {...props} dragHandleMenu={BiblioDragHandleMenu} />
}
