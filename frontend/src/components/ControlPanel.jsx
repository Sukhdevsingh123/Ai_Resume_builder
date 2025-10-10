import { useState } from 'react';

const ControlPanel = ({ employees, onGenerate, isLoading, onOpenAddModal }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [templateType, setTemplateType] = useState('freelance');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ employeeId: selectedEmployee, jobDescription, templateType });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg sticky top-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-700">Controls</h2>

      <div className="mb-4 sm:mb-6">
        <button
          onClick={onOpenAddModal}
          className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Employee
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
            1. Select Employee
          </label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 sm:py-3 text-base bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md transition-colors duration-200"
            required
          >
            <option value="" disabled>-- Choose an employee --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            2. Select Resume Template
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
              templateType === 'freelance'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}>
              <input
                type="radio"
                name="templateType"
                value="freelance"
                checked={templateType === 'freelance'}
                onChange={(e) => setTemplateType(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  templateType === 'freelance'
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                }`}>
                  {templateType === 'freelance' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium">Freelance</div>
                  <div className="text-xs text-gray-500">Professional & Creative</div>
                </div>
              </div>
            </label>

            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
              templateType === 'techstack'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}>
              <input
                type="radio"
                name="templateType"
                value="techstack"
                checked={templateType === 'techstack'}
                onChange={(e) => setTemplateType(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  templateType === 'techstack'
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                }`}>
                  {templateType === 'techstack' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium">TechStack</div>
                  <div className="text-xs text-gray-500">Technical & Enterprise</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-1">
            3. Paste Job Description
          </label>
          <textarea
            id="job-description"
            rows="8 sm:rows-10"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full text-sm sm:text-base border border-gray-300 rounded-md p-3 transition-colors duration-200 resize-vertical"
            placeholder="Paste the full job description here..."
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[0.98] active:scale-[0.96]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Resume...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Resume
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ControlPanel;