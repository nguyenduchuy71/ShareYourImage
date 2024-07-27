import { useCallback, useState } from 'react';
import { Box, Paper, Typography, IconButton, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImagePreview from './ImagePreview';
import { Loading } from './Loading';

function DragDropFileUpload({ uploadCollectionEpic }) {
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

  const handleUploadFiles = () => {
    uploadCollectionEpic(filesToUpload);
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

  return (
    <Box>
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #212121' : '2px dashed #ABF600',
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#ABF600' : '#212121',
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
            <IconButton className="hover:opacity-90" aria-label="upload picture" component="span">
              <CloudUploadIcon style={{ fontSize: 60, color: '#ABF600' }} />
            </IconButton>
            <Typography className='font-bold text-white'>Drag and drop files here or click to select files</Typography>
          </Box>
        </label>
        {loading && (
          <Loading />
        )}
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className='text-[#212121] font-bold'>Confirm Upload</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <ImagePreview imagePreviews={imagePreviews} handleRemoveImage={handleRemoveImage} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleUploadFiles} color="primary">Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DragDropFileUpload;
