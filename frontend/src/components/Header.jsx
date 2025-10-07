const Header = () => {
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                AI Resume Builder
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Tailor resumes instantly with the power of AI
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };

  export default Header;