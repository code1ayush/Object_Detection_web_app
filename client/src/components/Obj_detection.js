import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import "../obj_detection.css"

const ObjectDetectionApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Show the selected image as the original image
    const imageUrl = URL.createObjectURL(file);
    setOriginalImage(imageUrl);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('/detect_objects', formData, {
      responseType: 'arraybuffer', 
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
        setProcessedImage(imageUrl);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Navbar/>
      <div className='input'>
      <input className= "input-field" type="file" onChange={handleFileChange} />
      </div>
      <div style={{display:"flex",justifyContent:"center", alignItems:'center'}}>
      { !selectedFile && (
         <div style={{fontSize:"1.5rem",fontWeight:"600",paddingTop:"1rem"}}>
          Please insert the image to Detect
         </div>
      )}
      </div>
      <div className='image-container'>
      {originalImage && (
        <div>
          <p className='original_image' >Original Image</p>
          <img style ={{width:"400px",height:"auto"}} src={originalImage} alt="Original Image" />
        </div>
      )}
      {processedImage && (
        <div style={{paddingLeft:"3rem"}}>
          <p className='processed_image'>Processed Image</p>
          <img style ={{width:"400px",height:"auto"}} src={processedImage} alt="Processed Image" />
        </div>
      )}
      </div >
      <div className='detect-btn'>
      { selectedFile && (
        <button className='btn' onClick={handleUpload}>Detect Objects</button>
      )}
      </div>
    </div>
  );
};

export default ObjectDetectionApp;
