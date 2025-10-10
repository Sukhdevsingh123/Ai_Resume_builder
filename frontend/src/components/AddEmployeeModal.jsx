import { useState } from 'react';
import { FaFileUpload, FaTimes } from 'react-icons/fa';

const AddEmployeeModal = ({ isOpen, onClose, onSuccess }) => {
  const [freelanceFile, setFreelanceFile] = useState(null);
  const [techstackFile, setTechstackFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFreelanceFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFreelanceFile(file);
      setError('');
    } else {
      setFreelanceFile(null);
      setError('Please select a PDF file for Freelance resume.');
    }
  };

  const handleTechstackFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setTechstackFile(file);
      setError('');
    } else {
      setTechstackFile(null);
      setError('Please select a PDF file for TechStack resume.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!freelanceFile && !techstackFile) {
      setError('At least one resume file must be selected.');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    if (freelanceFile) {
      formData.append('freelanceFile', freelanceFile);
      console.log('Added freelance file:', freelanceFile.name, 'Size:', freelanceFile.size);
    }
    if (techstackFile) {
      formData.append('techstackFile', techstackFile);
      console.log('Added techstack file:', techstackFile.name, 'Size:', techstackFile.size);
    }

    console.log('FormData entries:', Array.from(formData.entries()));

    await onSuccess(formData);

    setIsUploading(false);
    setFreelanceFile(null);
    setTechstackFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold">Add Employee via Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            disabled={isUploading}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Freelance Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Freelance Resume (Optional)
            </label>
            <label
              htmlFor="freelance-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 border-2 border-dashed border-gray-300 h-32 sm:h-40 flex flex-col justify-center items-center transition-colors duration-200"
            >
              <div className="text-center">
                <FaFileUpload className="text-3xl sm:text-4xl text-gray-400 mx-auto mb-2" />
                <span className="block text-sm text-gray-900">
                  {freelanceFile ? freelanceFile.name : 'Click to upload Freelance PDF'}
                </span>
                <span className="block text-xs text-gray-500 mt-1">
                  PDF files only
                </span>
              </div>
              <input
                id="freelance-upload"
                name="freelance-upload"
                type="file"
                className="sr-only"
                accept=".pdf"
                onChange={handleFreelanceFileChange}
              />
            </label>
          </div>

          {/* TechStack Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TechStack Resume (Optional)
            </label>
            <label
              htmlFor="techstack-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 border-2 border-dashed border-gray-300 h-32 sm:h-40 flex flex-col justify-center items-center transition-colors duration-200"
            >
              <div className="text-center">
                <FaFileUpload className="text-3xl sm:text-4xl text-gray-400 mx-auto mb-2" />
                <span className="block text-sm text-gray-900">
                  {techstackFile ? techstackFile.name : 'Click to upload TechStack PDF'}
                </span>
                <span className="block text-xs text-gray-500 mt-1">
                  PDF files only
                </span>
              </div>
              <input
                id="techstack-upload"
                name="techstack-upload"
                type="file"
                className="sr-only"
                accept=".pdf"
                onChange={handleTechstackFileChange}
              />
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors duration-200"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              disabled={(!freelanceFile && !techstackFile) || isUploading}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload & Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
