import React from 'react'
import { Modal , Box ,Typography} from '@mui/material'

interface Props { 
  open: boolean,
  handleClose: () => void;
  title: string,
  message: string,
}

const AlertModal = ({ open, handleClose , title , message}: Props) => {
  return (
     <>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx= {{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: '#ff3b1f',
        color:'white',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default AlertModal