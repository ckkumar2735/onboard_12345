import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../Styles/Bank_Details.css';


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

const Bank_Details = () => {
  const [formData, setFormData] = useState({
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    kycDocumentType: '',
    kycImage1: null,
    kycImage2: null,
    kycImage3: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleKYCImage1Change = (file) => {
    setFormData((prevFormData) => ({ ...prevFormData, kycImage1: file }));
  };

  const handleKYCImage2Change = (file) => {
    setFormData((prevFormData) => ({ ...prevFormData, kycImage2: file }));
  };

  const handleKYCImage3Change = (file) => {
    setFormData((prevFormData) => ({ ...prevFormData, kycImage3: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Account Name"
              name="accountName"
              value={formData.accountName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Branch Name"
              name="branchName"
              value={formData.branchName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>KYC Document Type</InputLabel>
              <Select name="kycDocumentType"  label="kyc Document Type" value={formData.kycDocumentType} onChange={handleInputChange}>
                <MenuItem value="">Select Document Type</MenuItem>
                <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                <MenuItem value="PAN Card">PAN Card</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <label>Upload Cancelled Cheque/Bank Passbook first page/ Bank Statement with bank details Image *
            </label>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <FileUploadBox label="KYC Image 3" onFileChange={handleKYCImage3Change} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <label>Upload KYC Document Aadhar Card(<span className='label_kyc'>FrontSide</span>), Driving License, Passport in JPG/JPEG/PNG 
            </label>
          </Grid>
          {formData.kycDocumentType === 'Aadhar Card' && (
            <Grid item xs={12} sm={6}>
              <FileUploadBox label="KYC Image 1" onFileChange={handleKYCImage1Change} />
            </Grid>
            
          )}

          {formData.kycDocumentType === 'Aadhar Card' && (
            <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <label>
            Upload KYC Document Aadhar Card(<span className='label_kyc'>BackSide </span>) </label>
          </Grid>
          )}
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <FileUploadBox label="KYC Image 2" onFileChange={handleKYCImage2Change} />
          </Grid>
         
          
        </Grid>
      </form>
    </Container>
  );
};

export default Bank_Details;
