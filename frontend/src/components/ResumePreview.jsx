
import { useRef, useEffect } from 'react';
import { FaPhoneAlt, FaTelegramPlane, FaEdit, FaShareAlt } from 'react-icons/fa';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

const ResumePreview = ({ resumeData }) => {
 
  if (!resumeData || typeof resumeData !== 'object') {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
        Error: Invalid resume data provided.
      </div>
    );
  }

  const { name, phone, telegram, experience, projects, skills } = resumeData;
  const resumeRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('share-dropdown');
      const shareButton = event.target.closest('button');

      if (dropdown && !dropdown.contains(event.target) && !shareButton) {
        dropdown.classList.add('hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateResumeText = () => {
    let text = `${name}\n`;
    text += `Phone: ${phone} | Telegram: ${telegram}\n\n`;

    text += `EXPERIENCE\n`;
    text += `═`.repeat(50) + `\n`;
    experience?.forEach(exp => {
      text += `${exp.company}\n`;
      text += `${exp.role}\n`;
      text += `${exp.period}\n`;
      exp.points.forEach(point => {
        text += `• ${point}\n`;
      });
      text += `\n`;
    });

    text += `PROJECTS\n`;
    text += `═`.repeat(50) + `\n`;
    projects?.forEach(proj => {
      text += `${proj.name}\n`;
      text += `${proj.description}\n\n`;
    });

    text += `SKILLS\n`;
    text += `═`.repeat(50) + `\n`;
    text += skills?.join(' • ') + `\n`;

    return text;
  };
  const generateFormattedHTML = () => {
    const resumeHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${name} - Resume</title>
        <style>
          body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .name {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #000;
          }
          .contact {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 20px;
          }
          .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 2px solid #333;
            padding-bottom: 8px;
            margin-bottom: 20px;
            letter-spacing: 2px;
          }
          .experience-item {
            margin-bottom: 25px;
          }
          .company {
            font-size: 16px;
            font-weight: bold;
            color: #000;
          }
          .role {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
          }
          .period {
            font-size: 12px;
            color: #666;
            margin-bottom: 10px;
          }
          .points {
            list-style: none;
            padding-left: 0;
          }
          .point {
            margin-bottom: 8px;
            padding-left: 15px;
            position: relative;
            text-align: justify;
          }
          .point::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #000;
            font-weight: bold;
          }
          .project-item {
            margin-bottom: 20px;
          }
          .project-name {
            font-size: 16px;
            font-weight: bold;
            color: #000;
            margin-bottom: 8px;
          }
          .project-description {
            text-align: justify;
            line-height: 1.5;
          }
          .skills {
            text-align: justify;
            line-height: 1.6;
          }
          @media print {
            body { margin: 0; padding: 15px; }
            .header { margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${name}</div>
          <div class="contact">
            <div class="contact-item">
              <span>📞 ${phone}</span>
            </div>
            <div class="contact-item">
              <span>📱 ${telegram}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Experience</div>
          ${experience?.map(exp => `
            <div class="experience-item">
              <div class="company">${exp.company}</div>
              <div class="role">${exp.role}</div>
              <div class="period">${exp.period}</div>
              <ul class="points">
                ${exp.points.map(point => `<li class="point">${point}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Projects</div>
          ${projects?.map(proj => `
            <div class="project-item">
              <div class="project-name">${proj.name}</div>
              <div class="project-description">${proj.description}</div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills">${skills?.join(' • ')}</div>
        </div>
      </body>
      </html>
    `;

    return resumeHTML;
  };

  const handleEditInGoogleDocs = () => {
    // Generate formatted HTML content that Google Docs can understand
    const resumeHTML = generateFormattedHTML();

    // Prepare the HTML content for Google Docs
    const formattedContent = resumeHTML
      .replace(/<!DOCTYPE html>/g, '')
      .replace(/<html>/g, '')
      .replace(/<head>.*?<\/head>/gs, '')
      .replace(/<\/html>/g, '')
      .replace(/<\/body>/g, '');

    // Copy the formatted content to clipboard
    navigator.clipboard.writeText(formattedContent).then(() => {
      // Open Google Docs
      window.open('https://docs.google.com/document/create', '_blank');
      setTimeout(() => {
        alert('✅ Google Docs opened!\n\n📋 Resume content copied to clipboard\n\n📝 Please paste it (Ctrl+V) in the Google Doc');
      }, 1000);
    }).catch(() => {
      alert('📋 Please copy this content and paste it in Google Docs:\n\n' + formattedContent.substring(0, 500) + '...');
    });
  };

  const handleShare = async (platform) => {
    const resumeText = generateResumeText();

    switch (platform) {
      case 'whatsapp':
        // Direct WhatsApp sharing with formatted text
        const whatsappText = `📄 *My Resume - ${name}*\n\n${resumeText}\n\n_Sent via Resume Builder_`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
        window.open(whatsappUrl, '_blank');
        break;

      case 'gmail':
        // Direct Gmail integration with resume content in body
        const subject = encodeURIComponent(`${name} - Resume`);
        const body = encodeURIComponent(`Dear Hiring Manager,\n\nPlease find my resume below:\n\n${resumeText}\n\nBest regards,\n${name}\n${phone}\n${telegram}\n\n(This resume was generated using Resume Builder)`);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
        break;

      case 'drive':
        // Enhanced Google Drive workflow - download PDF and open Drive with instructions
        const pdfBlob = await generateAndGetPDF();
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Download PDF first
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${(name || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resume.pdf`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Open Google Drive
        const driveWindow = window.open('https://drive.google.com', '_blank');

        // Enhanced instructions with timing
        setTimeout(() => {
          if (driveWindow && !driveWindow.closed) {
            alert('✅ Resume PDF downloaded!\n\n☁️ Google Drive opened in another tab\n\n📤 Quick Upload Steps:\n1. Look for "New" button (left side)\n2. Click "New" → "File upload"\n3. Select the downloaded PDF file\n4. Upload complete! 🎉\n\n💡 File should be in your Downloads folder');
          } else {
            alert('✅ Resume PDF downloaded!\n\n☁️ Please visit: drive.google.com\n\n📤 Upload Steps:\n1. Click "New" → "File upload"\n2. Select the downloaded PDF\n3. Upload complete! 🎉\n\n💡 File should be in your Downloads folder');
          }

          // Clean up
          setTimeout(() => {
            URL.revokeObjectURL(pdfUrl);
          }, 1000);
        }, 1500);
        break;
    }

    // Close dropdown
    document.getElementById('share-dropdown').classList.add('hidden');
  };

  const generateAndGetPDF = () => {
    return new Promise((resolve, reject) => {
      const input = resumeRef.current;
      if (!input) {
        reject(new Error("Resume element not found"));
        return;
      }

      const options = {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        width: input.offsetWidth,
        height: input.offsetHeight,
      };

      html2canvas(input, options)
        .then((canvas) => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
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

          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);

          // Get PDF as blob
          const pdfBlob = pdf.output('blob');
          resolve(pdfBlob);
        })
        .catch(reject);
    });
  };

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
    <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-wider">
      {title}
    </h2>
  );

  return (
    <>
      {/* Responsive button container */}
      <div className="flex flex-col sm:flex-row justify-end mb-4 gap-3">
        <button
          onClick={handleEditInGoogleDocs}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <FaEdit className="w-4 h-4" />
          <span className="hidden sm:inline">Edit in Docs</span>
          <span className="sm:hidden">Docs</span>
        </button>

        <div className="relative">
          <button
            onClick={() => document.getElementById('share-dropdown').classList.toggle('hidden')}
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <FaShareAlt className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
            <span className="sm:hidden">Share</span>
          </button>

          <div id="share-dropdown" className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button
              onClick={() => handleShare('whatsapp')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
            >
              <span className="text-lg">📱</span>
              WhatsApp (Instant)
            </button>
            <button
              onClick={() => handleShare('gmail')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
            >
              <span className="text-lg">📧</span>
              Gmail (Instant)
            </button>
            <button
              onClick={() => handleShare('drive')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
            >
              <span className="text-lg">☁️</span>
              Google Drive (Auto-Download)
            </button>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="bg-green-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l4-4m-4 4l-4-4m8 2h3m-3 4h3m-6-8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">Download as PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>

      {/* Responsive resume container */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 max-w-full mx-auto shadow-lg rounded-lg print:shadow-none print:rounded-none" ref={resumeRef}>
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">{name}</h1>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-sm sm:text-base" />
              <span className="text-sm sm:text-base font-medium">{phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaTelegramPlane className="text-sm sm:text-base" />
              <span className="text-sm sm:text-base font-medium">{telegram}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Experience */}
          <div>
            <SectionTitle title="EXPERIENCE" />
            <div className="space-y-4">
              {experience?.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-0">{exp.company}</h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">{exp.period}</p>
                  </div>
                  <p className="font-semibold text-sm sm:text-base text-gray-800 mb-2">{exp.role}</p>
                  <ul className="space-y-1">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                        <span className="text-gray-900 mr-2 flex-shrink-0">•</span>
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
                  <div className="font-bold text-base sm:text-lg text-gray-900 mb-1">{proj.name}</div>
                  <div className="text-gray-700 leading-relaxed text-sm sm:text-base">{proj.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <SectionTitle title="SKILLS" />
            <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
              {skills?.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreview;

