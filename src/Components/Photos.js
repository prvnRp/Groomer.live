import '../App.css';
import React, { useState, useRef } from 'react';

function Logo({ isReadOnly }) {
    const fileInputRef = useRef();
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [previewIndex, setPreviewIndex] = useState(null);

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        const uploadedPhotoPreviews = files.map((file) =>
            URL.createObjectURL(file)
        );
        setUploadedPhotos([...uploadedPhotos, ...uploadedPhotoPreviews]);
    };

    const handleThumbnailClick = (index) => {
        setPreviewPhoto(uploadedPhotos[index]);
        setPreviewIndex(index);
    };

    const handleDeleteClick = (index) => {
        const updatedPhotos = [...uploadedPhotos];
        updatedPhotos.splice(index, 1);
        setUploadedPhotos(updatedPhotos);
    };

    const handleClosePreview = () => {
        setPreviewPhoto(null);
    };

    const handleDeletePhoto = () => {
        const updatedPhotos = [...uploadedPhotos];
        updatedPhotos.splice(previewIndex, 1);
        setUploadedPhotos(updatedPhotos);
        setPreviewPhoto(null);
        setPreviewIndex(null);
    };
    return (
        <div className="form-group">
            <label className="label">
                Photos:
            </label>
            <div className='input'>
                <div className='upload'>
                    Upload files&nbsp;
                    {!isReadOnly ? (
                        <label
                            htmlFor="photo-upload"
                            className="upload-label"
                        >
                            <u>here</u>
                        </label>
                    ) : (
                        <u>here</u>
                    )}
                </div>
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    onClick={(e) => {
                        e.target.value = null;
                    }}
                    style={{ display: 'none' }}
                />
                {/* </div> */}
                <div className='photoContainer'>
                    <div className="uploaded-photos">
                        {uploadedPhotos.map((photo, index) => (
                            <div key={index} className="thumbnail-container">
                                <img
                                    src={photo}
                                    alt={`Uploaded ${index + 1}`}
                                    className="thumbnail"
                                    onClick={() => { handleThumbnailClick(index) }}
                                />
                                {!isReadOnly && <div className="delete-icon" onClick={() => handleDeleteClick(index)}>
                                    <span>&times;</span>
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* </label> */}

            {previewPhoto && (
                <div className="preview-container">
                    <div className="preview-content">
                        <img
                            src={previewPhoto}
                            alt="Preview"
                            className="preview-image"
                        />
                        <div className="preview-actions">
                            {!isReadOnly && <div className="deleteicon" onClick={handleDeletePhoto}>
                                <i class="material-icons">delete</i>
                            </div>}
                            <div className="close-icon" onClick={handleClosePreview}>
                                <span>&times;</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Logo;