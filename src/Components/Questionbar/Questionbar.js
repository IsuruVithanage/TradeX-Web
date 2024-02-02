import React from 'react'
import DataTable from 'react-data-table-component'


function Questionbar() {
    const columns=[
      {
      Topic : 'Topic',
      selector : row=>row.name
      },
      {
        views : 'Views',
        selector : row=>row.views
      },
      {
        likes : 'Likes',
        selector : row=>row.likes
      },
      {
        replies : 'Replies',
        selector : row=>row.replies
      }
    ];

    const data=[
      {
        id:1,
        title:" Understanding Cryptocurrency Wallet Security",
        views:12,
        likes:5,
        replies:3
      },
      {
        id:2,
        title:" Understanding Cryptocurrency Wallet Security",
        views:12,
        likes:5,
        replies:3
      },
      {
        id:3,
        title:" Understanding Cryptocurrency Wallet Security",
        views:12,
        likes:5,
        replies:3
      },
    ]

  return (
    <div className='question'>
        <DataTable>
          columns={columns}
          data={data}
        </DataTable>
    </div>
  )
}

export default Questionbar
