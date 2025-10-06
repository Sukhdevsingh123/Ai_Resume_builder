import { useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';

const AddEmployeeModal = ({ isOpen, onClose, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError('');
    } else {
      setSelectedFile(null);
      setError('Please select a PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', selectedFile); // 'resume' must match the backend field name

    await onSuccess(formData); // Let the App component handle the API call
    
    // Reset state after attempting upload
    setIsUploading(false);
    setSelectedFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add Employee via Resume</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="resume-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 border-2 border-dashed border-gray-300 h-32 flex flex-col justify-center items-center"
            >
              <FaFileUpload className="text-4xl text-gray-400" />
              <span className="mt-2 block text-sm text-gray-900">
                {selectedFile ? selectedFile.name : 'Click to upload a PDF'}
              </span>
              <input id="resume-upload" name="resume-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" disabled={isUploading}>
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300" disabled={!selectedFile || isUploading}>
              {isUploading ? 'Processing...' : 'Upload & Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddEmployeeModal;