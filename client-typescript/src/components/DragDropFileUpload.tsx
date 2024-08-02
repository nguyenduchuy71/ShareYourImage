import { useCallback, useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import { Loading } from './Loading';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { XCircleIcon } from '@heroicons/react/20/solid';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
    <div>
      <div
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
          className='hidden'
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="raised-button-file">
          <div className='flex justify-center items-center flex-col'>
            <CloudArrowUpIcon className='w-16 text-[#ABF600] cursor-pointer hover:opacity-80' />
            <p className='font-bold text-white'>Drag and drop files here or click to select files</p>
          </div>
        </label>
        {loading && (
          <Loading />
        )}
      </div>
      <Dialog open={open}>
        <DialogContent className="w-full h-fit">
          <DialogHeader>
            <DialogTitle className='text-[#212121] font-bold'>Confirm Upload</DialogTitle>
          </DialogHeader>
          <Carousel className="w-full mx-auto">
            <CarouselContent>
              {Array.from(imagePreviews).map((src, index) => (
                <CarouselItem key={index} className="py-2 pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-md border-2 border-[#1d1d] p-2">
                    <img
                      className='w-40 h-40 object-center rounded-md'
                      src={src}
                      alt={`Image Preview ${index + 1}`}
                    />
                    <div
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2">
                      <XCircleIcon className="w-5 cursor-pointer hover:opacity-80" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <DialogFooter>
            <Button onClick={handleUploadFiles}>Upload</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DragDropFileUpload;
