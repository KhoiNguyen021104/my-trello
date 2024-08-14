// import Card from '@mui/material/Card'
// import { useEffect } from 'react'
// import { mockData } from '~/apis/mock-data'
// // import { mapOrder } from '~/utils/sorts'

// function EmptyCard({ getter }) {
//     useEffect(() => {
//         const cardOrderIdsLength = mockData.board.columns[1].cardOrderIds.length
//         mockData.board.columns[1].cardOrderIds[cardOrderIdsLength] = 'card-id-21'
//         console.log( mockData?.board?.columns[1].cardOrderIds);
//     }, [getter])
//   return (
//     <Card
//       sx={{
//         boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
//         borderRadius: '8px',
//         overflow: 'unset',
//         mt: '4px',
//         width: (theme) => theme?.app?.WIDTH_CARD,
//         maxWidth: (theme) => theme?.app?.WIDTH_CARD,
//         minWidth: (theme) => theme?.app?.WIDTH_CARD,
//         // display: getter?'none':'block'
//       }}>
//     </Card>
//   )
// }

// export default EmptyCard
