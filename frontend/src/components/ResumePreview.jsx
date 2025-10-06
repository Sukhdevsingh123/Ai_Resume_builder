
import { useRef } from 'react';
import { FaPhoneAlt, FaTelegramPlane } from 'react-icons/fa';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

const ResumePreview = ({ resumeData }) => {
  // Keep validation for robustness
  if (!resumeData || typeof resumeData !== 'object') {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
        Error: Invalid resume data provided.
      </div>
    );
  }

  const { name, phone, telegram, experience, projects, skills } = resumeData;
  const resumeRef = useRef(null);

  const handleDownload = () => {
    const input = resumeRef.current;
    if (!input) {
      console.error("Resume element could not be found.");
      alert("Error: Resume element not found. Please refresh and try again.");
      return;
    }

    // Validate that the element has content
    if (!input.innerHTML || input.innerHTML.trim() === '') {
      console.error("Resume element is empty");
      alert("Error: Resume content is empty. Please generate a resume first.");
      return;
    }

    console.log("Starting PDF generation...");
    console.log("Resume element found:", {
      width: input.offsetWidth,
      height: input.offsetHeight,
      hasContent: !!input.innerHTML,
      contentLength: input.innerHTML.length
    });

    // Options for html2canvas with better error handling and compatibility
    const options = {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: true, // Enable logging to see any issues
      allowTaint: true, // Allow cross-origin images if any
      width: input.offsetWidth,
      height: input.offsetHeight,
      // Ensure proper rendering
      removeContainer: true,
      foreignObjectRendering: false, // Disable for better compatibility
      letterRendering: true,
      // Better element handling
      ignoreElements: (element) => {
        return element.tagName === 'BUTTON' ||
               element.classList.contains('hover:bg-green-700');
      },
      // Wait for fonts and images to load
      onclone: (clonedDoc) => {
        console.log("Cloning completed");
        // Ensure all styles are applied in the cloned document
        const clonedElement = clonedDoc.body.querySelector('[ref="resumeRef"]') ||
                             clonedDoc.body.querySelector('.bg-white');
        if (clonedElement) {
          console.log("Cloned element found");
        }
      }
    };

    html2canvas(input, options)
      .then((canvas) => {
        console.log("Canvas created successfully:", {
          width: canvas.width,
          height: canvas.height,
          isEmpty: canvas.width === 0 || canvas.height === 0
        });

        // Check if canvas is empty
        if (canvas.width === 0 || canvas.height === 0) {
          throw new Error("Canvas is empty - no content captured");
        }

        try {
          // Convert to PNG with maximum quality
          const imgData = canvas.toDataURL('image/png');
          console.log("Image data created, size:", Math.round(imgData.length / 1024), "KB");

          if (imgData.length < 1000) {
            throw new Error("Image data is too small - likely empty");
          }

          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: false,
            precision: 16,
            floatPrecision: 16
          });

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const imgAspectRatio = imgWidth / imgHeight;
          const pageAspectRatio = pdfWidth / pdfHeight;

          let finalWidth, finalHeight;
          if (imgAspectRatio > pageAspectRatio) {
            finalWidth = pdfWidth;
            finalHeight = pdfWidth / imgAspectRatio;
          } else {
            finalHeight = pdfHeight;
            finalWidth = pdfHeight * imgAspectRatio;
          }

          const xOffset = (pdfWidth - finalWidth) / 2;
          const yOffset = (pdfHeight - finalHeight) / 2;

          console.log("Adding image to PDF...");
          pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight, '', 'FAST');

          const safeName = (name || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase();
          pdf.save(`${safeName}_resume.pdf`);

          console.log("PDF saved successfully!");

        } catch (error) {
          console.error('Error generating PDF:', error);
          alert(`PDF generation failed: ${error.message}`);
        }
      })
      .catch((err) => {
        console.error('Error capturing component with html2canvas:', err);
        alert(`Failed to capture resume: ${err.message}. Check console for details.`);
      });
  };

  const SectionTitle = ({ title }) => (
    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-wider">
      {title}
    </h2>
  );

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Download as PDF
        </button>
      </div>

      <div className="bg-white p-8 max-w-4xl mx-auto print:shadow-none print:rounded-none" ref={resumeRef}>
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">{name}</h1>
          <div className="flex justify-center items-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-base" />
              <span className="text-base font-medium">{phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaTelegramPlane className="text-base" />
              <span className="text-base font-medium">{telegram}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Experience */}
          <div>
            <SectionTitle title="EXPERIENCE" />
            <div className="space-y-4">
              {experience?.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{exp.company}</h3>
                    <p className="text-sm font-semibold text-gray-700">{exp.period}</p>
                  </div>
                  <p className="font-semibold text-base text-gray-800 mb-2">{exp.role}</p>
                  <ul className="space-y-1">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-gray-900 mr-2">•</span>
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <SectionTitle title="PROJECTS" />
            <div className="space-y-3">
              {projects?.map((proj, index) => (
                <div key={index}>
                  <div className="font-bold text-lg text-gray-900 mb-1">{proj.name}</div>
                  <div className="text-gray-700 leading-relaxed">{proj.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <SectionTitle title="SKILLS" />
            <p className="text-gray-800 leading-relaxed">
              {skills?.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreview;

