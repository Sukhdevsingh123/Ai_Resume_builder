import { useState } from 'react';

const ControlPanel = ({ employees, onGenerate, isLoading, onOpenAddModal }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ employeeId: selectedEmployee, jobDescription });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Controls</h2>

      <div className="mb-6">
        <button
          onClick={onOpenAddModal}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add New Employee
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
            1. Select Employee
          </label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
          <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-1">
            2. Paste Job Description
          </label>
          <textarea
            id="job-description"
            rows="10"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            placeholder="Paste the full job description here..."
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Resume'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ControlPanel;