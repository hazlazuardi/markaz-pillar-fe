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

export default function Dropzone({ setFile, accept, fileSize }) {
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
    var message = ""

    if (accept == "image/*") {

      if (fileRejections[0].errors[0].code == "file-too-large") {
        message = "File is larger than 1 MB"
      } else {
        message = "File must be an Image"
      }

    } else {

      if (fileRejections[0].errors[0].code == "file-too-large") {
        message = "File is larger than 10 MB"
      } else {
        message = "File must be a PDF"
      }

    }


    dispatch({
      type: dispatchTypes.SNACKBAR_CUSTOM,
      payload: {
        severity: 'error',
        message: message
      }
    })
  }, [accept, dispatch]);


  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: accept, onDropAccepted, onDropRejected, maxSize: fileSize, noClick: false });

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
    </div>
  );
}

