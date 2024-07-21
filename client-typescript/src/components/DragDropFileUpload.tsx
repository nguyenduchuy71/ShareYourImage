import React, { useCallback, useState, useMemo } from 'react';
import { Box, Paper, Typography, IconButton, Grid, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

function DragDropFileUpload({ setFiles }) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files);
    }
  }, []);

  const handleFileChange = (files) => {
    setLoading(true);
    const previews = [];
    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setLoading(false);
          setImagePreviews(previews);
          setFilesToUpload(Array.from(files));
          setOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = useCallback((event) => {
    const files = event.target.files;
    if (files && files[0]) {
      handleFileChange(files);
    }
  }, []);

  const handleConfirmUpload = () => {
    setFiles(filesToUpload)
    setImagePreviews([]);
    setFilesToUpload([]);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFiles = filesToUpload.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setFilesToUpload(newFiles);
    if (newFiles.length === 0) {
      handleClose();
    }
  };

  const previews = useMemo(() => (
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
  ), [imagePreviews]);

  return (
    <Box>
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#eee' : '#fafafa',
          position: 'relative',
        }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="raised-button-file">
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <CloudUploadIcon style={{ fontSize: 60 }} />
            </IconButton>
            <Typography>Drag and drop files here or click to select files</Typography>
          </Box>
        </label>
        {loading && (
          <CircularProgress
            size={30}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Confirm Upload</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {previews}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmUpload} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
}

export default DragDropFileUpload;
