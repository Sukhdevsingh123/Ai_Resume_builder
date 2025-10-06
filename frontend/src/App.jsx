import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ResumePreview from './components/ResumePreview';
import AddEmployeeModal from './components/AddEmployeeModal';

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:5001';


export default function App() {
  const [employees, setEmployees] = useState([]);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees. Is the server running?');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleGenerateResume = async ({ employeeId, jobDescription }) => {
    if (!employeeId || !jobDescription) {
        setError('Please select an employee and provide a job description.');
        return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedResume(null);
    try {
      const response = await axios.post('/api/generate-resume', { employeeId, jobDescription });
      setGeneratedResume(response.data);
    } catch (err) {
      setError('Failed to generate resume. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddEmployee = async (formData) => { // Now receives formData
    try {
        // Axios will automatically set the correct headers for FormData
        await axios.post('/api/employees', formData);
        setIsModalOpen(false); // Close modal on success
        fetchEmployees(); // Refresh the employee list
    } catch(err) {
        setError('Failed to process resume. Please check the file and try again.');
        console.error(err);
        // We close the modal even on failure, but the error will be displayed.
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
      <main className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ControlPanel
            employees={employees}
            onGenerate={handleGenerateResume}
            isLoading={isLoading}
            onOpenAddModal={handleOpenModal}
          />
        </div>
        <div className="lg:col-span-2">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">{error}</div>}
            {isLoading && (
                <div className="flex justify-center items-center h-full bg-white rounded-lg shadow-lg p-8">
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
                 <div className="flex justify-center items-center h-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Welcome to the AI Resume Generator</h2>
                        <p className="text-gray-600 mt-2">Select an employee and enter a job description to create a tailored resume.</p>
                    </div>
                </div>
            )}
        </div>
      </main>
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleAddEmployee}
      />
    </div>
  );
}