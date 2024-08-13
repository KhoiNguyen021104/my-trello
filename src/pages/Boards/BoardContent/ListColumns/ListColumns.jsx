import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
function ListColumns({ columns }) {

  return (
    <SortableContext
      items={columns.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}>
        {columns?.map(column => {
          return (
            <Column
              key={column._id}
              column={column}
            />
          )
        })}
        {/* Add new column */}
        <Box
          sx={{
            minWidth: (theme) => theme.app.WIDTH_COLUMN,
            maxWidth: (theme) => theme.app.WIDTH_COLUMN,
            bgcolor: '#ffffff3d',
            mt: 1,
            mx: 2.2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) =>
              `calc(${theme.app.BOARD_CONTENT_HEIGHT} - ${theme.spacing(5)})`
          }}>
          <Button
            sx={{
              width: '100%',
              height: '100%',
              py: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontWeight: 'bold'
            }}
            startIcon={<AddOutlinedIcon />}>
            Add another list
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
