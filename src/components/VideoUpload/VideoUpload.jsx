import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const VideoUpload = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [uploadStatus, setUploadStatus] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("video", data.video[0]); // Access the file

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post("http://localhost:5000/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadStatus("Upload successful!");
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Upload Video
        </h2>

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter video title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Video Upload Field */}
        <div className="mb-6">
          <label htmlFor="video" className="block text-gray-600 font-medium mb-2">
            Upload Video
          </label>
          <input
            id="video"
            type="file"
            {...register("video", { required: "Video file is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none border-gray-300"
            accept="video/*"
          />
          {errors.video && <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>

        {/* Upload Status */}
        {uploadStatus && (
          <p className="text-center text-sm mt-4 text-gray-600">
            {uploadStatus}
          </p>
        )}
      </form>
    </div>
  );
};

export default VideoUpload;
