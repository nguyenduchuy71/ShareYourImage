import React from 'react'
import { Box, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ImagePreview = ({ imagePreviews, handleRemoveImage }) => {
    return (
        imagePreviews.map((src, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <div className="relative flex justify-center rounded-lg border-2 border-gray-400 p-2">
                    <Box
                        component="img"
                        src={src}
                        alt={`Image Preview ${index + 1}`}
                        sx={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <IconButton
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                        }}
                    >
                        <DeleteIcon className='hover:opacity-70' />
                    </IconButton>
                </div>
            </Grid>
        ))
    )
}

export default React.memo(ImagePreview)
