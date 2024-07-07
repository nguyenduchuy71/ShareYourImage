import { useRef } from 'react';
import PropTypes from 'prop-types';

const DropFileInput = ({ onFileChange }) => {
  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {
    const newFile: [] = e.target.files;
    if (newFile.length > 0) {
      onFileChange(newFile);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="drop-file-input"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="drop-file-input__label">
        <p>Drag & Drop your files here</p>
      </div>
      <input type="file" value="" multiple onChange={onFileDrop} />
    </div>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
