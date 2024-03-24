import React, { useState } from 'react';
import axios from 'axios';

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
      <input type="file" onChange={handleFileChange} />
      {originalImage && (
        <div>
          <p>Original Image</p>
          <img style ={{width:"400px",height:"auto"}} src={originalImage} alt="Original Image" />
        </div>
      )}
      {processedImage && (
        <div>
          <p>Processed Image</p>
          <img style ={{width:"400px",height:"auto"}} src={processedImage} alt="Processed Image" />
        </div>
      )}
      { (
        <button onClick={handleUpload}>Detect Objects</button>
      )}
    </div>
  );
};

export default ObjectDetectionApp;
