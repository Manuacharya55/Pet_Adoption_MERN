import React, { useState, useCallback, useEffect } from "react";
import { LuUpload, LuX, LuLoader } from "react-icons/lu";
import { handleUpload } from "../../Utils/Appwrite";

const ImageInput = ({ name, setValue, error, defaultValue, className = "full-width", label = "Pet Image" }) => {
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (defaultValue && typeof defaultValue === "string") {
            setPreview(defaultValue);
        } else {
            setPreview(null);
        }
    }, [defaultValue]);

    const handleFile = async (file) => {
        if (file && file.type.startsWith("image/")) {
            setIsUploading(true);
            try {
                const fileUrl = await handleUpload(file);
                if (fileUrl) {
                    setPreview(fileUrl);
                    setValue(name, fileUrl, { shouldValidate: true });
                }
            } catch (error) {
                console.error("Image upload failed:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }, []);

    const handleManualChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const removeImage = (e) => {
        e.stopPropagation();
        setPreview(null);
        setValue(name, null, { shouldValidate: true });
    };

    return (
        <div className={`form-group ${className}`}>
            <label>{label}</label>
            <div
                className={`image-upload-wrapper ${isDragging ? "dragging" : ""} ${error ? "error-border" : ""
                    } ${isUploading ? "uploading" : ""}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => !isUploading && document.getElementById(name).click()}
            >
                {isUploading ? (
                    <div className="image-upload-placeholder">
                        <LuLoader size={40} className="animate-spin" />
                        <span>Uploading to cloud...</span>
                    </div>
                ) : preview ? (
                    <div className="image-preview-container">
                        <img src={preview} alt="Preview" />
                        <button type="button" className="remove-image-btn" onClick={removeImage}>
                            <LuX />
                        </button>
                    </div>
                ) : (
                    <div className="image-upload-placeholder">
                        <LuUpload size={40} />
                        <span>Drag & drop or click to upload</span>
                    </div>
                )}
                <input
                    id={name}
                    type="file"
                    accept="image/*"
                    onChange={handleManualChange}
                    style={{ display: "none" }}
                    disabled={isUploading}
                />
            </div>
            {error && <span className="error-text">{error.message}</span>}
        </div>
    );
};

export default ImageInput;
