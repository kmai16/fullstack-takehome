import { memo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useQuery } from '@apollo/client/react'
import { GetUsersDocument, GetPostsDocument, type GetUsersQuery, type GetPostsQuery } from '../../__generated__/graphql'
import { useState } from 'react'

import { TableFilters } from './TableFilters'

const columnHelper = createColumnHelper<GetUsersQuery['users'][0] & {posts: number}>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('posts', {
    header: 'Posts',
    cell: info => info.getValue(),
  }),
]

const TableContent = memo(() => {
  const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number>(-1);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number>(-1);

  console.log('hoveredRowIndex, hoveredColumnIndex', hoveredRowIndex, hoveredColumnIndex);

  const { data: usersData, loading: loadingUsers, error: errorUsers } = useQuery(GetUsersDocument, {
    variables: {
      filters: {},
    },
  })

    const { data: postsData, loading: loadingPosts, error: errorPosts } = useQuery(GetPostsDocument, {
    variables: {
      filters: {},
    },
  })
  
  const userData: GetUsersQuery['users'] = usersData?.users ?? []
  const postData: GetPostsQuery['posts'] = postsData?.posts ?? []

  const data = userData.map(user => ({
    ...user,
    posts: postData.filter(post => post.userId === user.id).length,
  }))

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  if (loadingUsers) return <div className="p-4">Loading users...</div>
  if (errorUsers) return <div className="p-4 text-red-500">Error: {errorUsers.message}</div>
  
  if (loadingPosts) return <div className="p-4">Loading posts...</div>
  if (errorPosts) return <div className="p-4 text-red-500">Error: {errorPosts.message}</div>

  return (
    <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}
                onMouseEnter={() => setHoveredRowIndex(row.index)}
                onMouseLeave={() => setHoveredRowIndex(-1)}>
            
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id}               
                onMouseEnter={() => setHoveredColumnIndex(index)}
                onMouseLeave={() => setHoveredColumnIndex(-1)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
    </table>
  )
})

export const Table = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="p-2">
      <TableFilters searchValue={searchValue} setSearchValue={setSearchValue} />
      <TableContent />
    </div>
  )
}
