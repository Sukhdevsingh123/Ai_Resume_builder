import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ResumePreview from './components/ResumePreview';
import AddEmployeeModal from './components/AddEmployeeModal';
import Toast from './components/Toast';

// Set the base URL for all axios requests
// axios.defaults.baseURL = 'https://ai-resume-builder-2-w0b4.onrender.com';


 axios.defaults.baseURL="http://localhost:5001";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
      showToast(`Loaded ${response.data.length} employees successfully!`, 'success');
    } catch (err) {
      setError('Failed to fetch employees. Is the server running?');
      showToast('Failed to load employees', 'error');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleGenerateResume = async ({ employeeId, jobDescription, templateType }) => {
    if (!employeeId || !jobDescription || !templateType) {
        setError('Please select an employee, template type, and provide a job description.');
        showToast('Please select an employee, template type, and provide a job description', 'error');
        return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedResume(null);

    showToast('Generating your tailored resume...', 'info');

    try {
      const response = await axios.post('/api/generate-resume', { employeeId, jobDescription, templateType });
      setGeneratedResume(response.data);
      showToast('Resume generated successfully! 🎉', 'success');
    } catch (err) {
      setError('Failed to generate resume. Please try again.');
      showToast('Failed to generate resume', 'error');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmployee = async (formData) => {
    try {
        // Don't set Content-Type header - let axios set it automatically with boundary for FormData
        await axios.post('/api/employees', formData);
        setIsModalOpen(false);
        fetchEmployees();
        showToast('Employee added successfully!', 'success');
    } catch(err) {
        setError('Failed to process resume. Please check the file and try again.');
        showToast('Failed to add employee', 'error');
        console.error(err);
        setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Control Panel - Full width on mobile, 1/3 on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <ControlPanel
              employees={employees}
              onGenerate={handleGenerateResume}
              isLoading={isLoading}
              onOpenAddModal={handleOpenModal}
            />
          </div>

          {/* Resume Preview - Full width on mobile, 2/3 on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-lg p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-700">Generating Your Tailored Resume...</p>
                  <p className="text-gray-500 mt-2">The AI is working its magic. Please wait a moment.</p>
                </div>
              </div>
            )}

            {generatedResume && !isLoading && (
              <ResumePreview resumeData={generatedResume} />
            )}

            {!generatedResume && !isLoading && (
              <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to the AI Resume Generator</h2>
                  <p className="text-gray-600">Select an employee and enter a job description to create a tailored resume.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleAddEmployee}
      />

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}