import { Typography } from '@mui/material';
import React, { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppContext } from '../../context/AppContext';
import { dispatchTypes } from '../../context/AppReducer';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function Dropzone({ setFile }) {
  const { dispatch } = useAppContext();

  const onDropAccepted = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setFile(acceptedFiles[0]);
    };
    reader.readAsDataURL(acceptedFiles[0]);

    return acceptedFiles[0];

  }, [setFile]);

  const onDropRejected = useCallback((fileRejections) => {
    dispatch({
      type: dispatchTypes.SNACKBAR_CUSTOM,
      payload: {
          severity: 'error',
          message: "File is larger than 1 MB"
      }
  })
  }, [dispatch]);


  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: 'image/*', onDropAccepted, onDropRejected, maxSize: 1048576 });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <div
        {...getRootProps({ style })}
        data-cy='dropzone'
      >
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      <Typography variant="body1" color="initial">{ }</Typography>
    </div>
  );
}

