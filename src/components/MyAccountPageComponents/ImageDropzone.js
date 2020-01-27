import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import image2base64 from "image-to-base64"

const ImageDropzone = props => 
{
  const onSuccessfullDrop = props.onSuccessfullDrop;

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
       onSuccessfullDrop(file.path);
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style = {{height: props.height}}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default ImageDropzone;