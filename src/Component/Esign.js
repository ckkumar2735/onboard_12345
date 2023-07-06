import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputLabel, MenuItem, Select,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const FileUploadBox = ({ label, onFileChange }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileError, setFileError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (file && allowedFileTypes.includes(file.type) && file.size <= 5242880) {
      setFileError('');
      onFileChange(file);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Set the preview URL for image files
    } else {
      setFileError('Invalid file format or size exceeds 5MB');
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragActive ? 'rgb(33, 150, 243)' : 'rgb(0, 0, 0, 0.12)'}`,
        borderRadius: '4px',
        padding: '16px',
        textAlign: 'center',
        backgroundColor: '#F5F5F5',
      }}
    >
      <input
        type="file"
        accept="image/jpeg, image/png, application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id={`file-upload-${label}`}
      />
      <label htmlFor={`file-upload-${label}`}>
        <CloudUploadIcon style={{ fontSize: '48px', color: 'rgba(0, 0, 0, 0.54)' }} />
        <p>{isDragActive ? 'Drop the file here' : `Drag and drop or browse files to upload

[Max: 5MB]

(jpg/jpeg/png/ only )`}</p>
        <p style={{ color: 'red' }}>{fileError}</p>
      </label>
      {previewUrl && (
        <div style={{ marginTop: '16px' }}>
          {selectedFile.type.startsWith('image') ? (
            <img src={previewUrl} alt="Preview" style={{ width: '100%', maxWidth: '300px' }} />
          ) : (
            <p>Uploaded File: {selectedFile.name}</p>
          )}
          <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
};

const Esign = () => {
  const [formData, setFormData] = useState({
    declarationForm: '',
    invoicingEmail: '',
    signatureType: '',
    mou: '',
    gstDeclaration: '',
    bankDocument: '',
    signatureImage: null,
    kycImage4: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setFormData({ ...formData, signatureImage: file });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleKYCImage4Change = (file) => {
    setFormData((prevFormData) => ({ ...prevFormData, kycImage4: file }));
  };
  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
         

        <Grid item xs={12} sm={12} md={6} justifyContent="center">
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Declaration Form</InputLabel>
                <Select
                  label="Declaration Form"
                  name="declarationForm"
                  value={formData.declarationForm}
              onChange={handleInputChange}
                >
                  <MenuItem value="MOU">MOU</MenuItem>
                  <MenuItem value="GST">GST</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} justifyContent="center">
            <TextField
              label="Invoicing Email"
              name="invoicingEmail"
              value={formData.invoicingEmail}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
         

          <Grid item xs={12} sm={12} md={6} justifyContent="center">
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Your Signature Type</InputLabel>
                <Select
                  label="Your Signature Type"
                  name="signatureType"
                  value={formData.signatureType}
              onChange={handleInputChange}
                >
                  <MenuItem value="Image">Image</MenuItem>
                  <MenuItem value="Document">Document</MenuItem>
                </Select>
              </FormControl>
            </Grid>

         
            <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <TextField
              label="Read the MOU"
              name="mou"
              value={formData.mou}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <TextField
              label="Read the GST Declaration"
              name="gstDeclaration"
              value={formData.gstDeclaration}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <TextField
              label="Read the Bank Document"
              name="bankDocument"
              value={formData.bankDocument}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
         
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <label> Upload image your Signature 
            </label>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <FileUploadBox label="KYC Image 4" onFileChange={handleKYCImage4Change} />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Esign;
