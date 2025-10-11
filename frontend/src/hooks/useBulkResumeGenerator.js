import { useState } from 'react';
import axios from 'axios';

export const useBulkResumeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, currentEmployee: '', status: 'idle' });
  const [isCancelled, setIsCancelled] = useState(false);

  // Process text with markdown and bold keywords (from ResumePreview)
  const processText = (text) => {
    if (!text) return '';

    // First handle existing markdown bold syntax
    let processedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return processedText;
  };

  // Generate dynamic professional summary based on job description
  const generateDynamicSummary = (jobDescription) => {
    if (!jobDescription) return 'Experienced software developer with expertise in modern web technologies and agile development practices.';

    const jobLower = jobDescription.toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart\.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
    const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);

    if (hasWeb3Terms) {
      return 'Senior Smart Contract Engineer with 5+ years of experience architecting and deploying DeFi protocols managing $500M+ TVL. Expert in gas-optimized Solidity development, comprehensive security audits, and production-grade smart contract systems. Proven track record in leading cross-functional teams to deliver complex blockchain solutions across multiple EVM chains and Layer-2 networks.';
    } else if (hasPythonTerms) {
      return 'Senior Python Developer with 5+ years of experience building scalable backend systems and APIs. Expert in Django, Flask, and FastAPI frameworks with a focus on performance optimization, database design, and microservices architecture. Proven ability to lead development teams and deliver high-impact solutions for enterprise applications.';
    } else if (hasReactTerms) {
      return 'Senior Frontend Developer with 5+ years of experience creating responsive web applications and user interfaces. Expert in React, TypeScript, and modern frontend technologies with a focus on performance optimization, accessibility, and user experience design. Proven track record in leading frontend teams and delivering pixel-perfect implementations.';
    } else {
      return 'Senior Full-Stack Developer with 5+ years of experience building scalable web applications and leading development teams. Expert in modern technologies including React, Node.js, Python, and cloud platforms. Proven track record in delivering high-performance solutions and mentoring junior developers.';
    }
  };

  // Generate dynamic experience content
  const generateDynamicExperience = (jobDescription) => {
    if (!jobDescription) return [];

    const jobLower = jobDescription.toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart\.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);

    if (hasWeb3Terms) {
      return [{
        company: 'Leading DeFi Protocol',
        role: 'Senior Smart Contract Engineer',
        period: 'Jan 2022 – Present',
        points: [
          'Architected and deployed smart contracts for DeFi lending protocol managing $200M+ TVL across multiple blockchains',
          'Led security audits and implemented gas optimizations reducing transaction costs by 40%',
          'Built comprehensive test suites using Foundry and Hardhat with 95%+ test coverage',
          'Mentored junior developers and established best practices for smart contract development',
          'Collaborated with cross-functional teams to integrate frontend applications with blockchain infrastructure'
        ]
      }];
    } else if (hasPythonTerms) {
      return [{
        company: 'Tech Innovation Corp',
        role: 'Senior Python Developer',
        period: 'Mar 2021 – Present',
        points: [
          'Led development of microservices architecture serving 1M+ daily active users with 99.9% uptime',
          'Designed and implemented RESTful APIs using FastAPI and Django with comprehensive documentation',
          'Optimized database queries and implemented caching strategies improving response times by 60%',
          'Built CI/CD pipelines and automated testing frameworks reducing deployment time by 75%',
          'Mentored team of 5 developers and conducted code reviews ensuring high code quality standards'
        ]
      }];
    } else {
      return [{
        company: 'Enterprise Solutions Inc',
        role: 'Senior Full-Stack Developer',
        period: 'Jun 2020 – Present',
        points: [
          'Led development of enterprise web applications using React, Node.js, and Python',
          'Architected scalable backend systems handling 500K+ concurrent users',
          'Implemented automated testing and CI/CD pipelines reducing bugs by 80%',
          'Collaborated with product teams to deliver features from conception to production',
          'Mentored junior developers and established coding standards across the organization'
        ]
      }];
    }
  };

  // Generate dynamic projects based on job description
  const generateDynamicProjects = (jobDescription) => {
    if (!jobDescription) return [];

    const jobLower = jobDescription.toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart\.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
    const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);

    if (hasWeb3Terms) {
      return [
        {
          name: 'Uniswap V3 Liquidity Protocol',
          description: 'Led development of concentrated liquidity mechanisms and oracle integrations for a major DEX fork. Implemented advanced features including multi-tier fee structures, position management, and cross-chain liquidity bridging. Achieved 40% improvement in capital efficiency and reduced impermanent loss by 60% compared to V2.'
        },
        {
          name: 'Compound Finance V3',
          description: 'Architected the smart contract upgrade for a leading DeFi lending protocol, implementing collateral factors, liquidation incentives, and risk parameters. Built comprehensive testing framework with 95%+ coverage and integrated Chainlink price feeds for real-time asset valuation.'
        }
      ];
    } else if (hasPythonTerms) {
      return [
        {
          name: 'Scalable Python Backend',
          description: 'Developed a scalable Python application that serves as a backend for various client-facing services. The application utilizes RESTful APIs to interact with frontend technology and integrates third-party services for enhanced functionality. Performance optimization and thorough testing were key focuses of the project.'
        },
        {
          name: 'E-Commerce API Platform',
          description: 'Designed and implemented a RESTful API for an e-commerce platform using Python and Flask. This project included user authentication, product management, and order processing, ensuring efficient data handling and integration with external payment gateways while maintaining high security.'
        }
      ];
    } else if (hasReactTerms) {
      return [
        {
          name: 'Shopify E-commerce Platform',
          description: 'Led frontend development for a high-traffic e-commerce platform serving 500K+ daily users. Built responsive React application with TypeScript, Redux, and GraphQL integration. Implemented real-time inventory updates, payment processing, and advanced search functionality with 99.9% uptime.'
        },
        {
          name: 'Figma Design Collaboration Tool',
          description: 'Developed real-time collaborative design platform with WebSocket connections and operational transforms. Built vector graphics engine, multi-user editing, and version control system. Achieved sub-100ms sync latency and 99.99% data consistency across global users.'
        }
      ];
    } else {
      return [
        {
          name: 'Microsoft Office 365 Integration Platform',
          description: 'Led development of enterprise integration platform connecting Office 365 services with third-party applications. Built scalable Node.js backend with React frontend, handling 10M+ API calls daily with 99.95% uptime and comprehensive error handling.'
        },
        {
          name: 'AWS Infrastructure Automation Suite',
          description: 'Developed comprehensive infrastructure as code platform using Terraform, AWS CDK, and Python automation. Implemented blue-green deployments, auto-scaling policies, and cost optimization algorithms reducing infrastructure costs by 40%.'
        }
      ];
    }
  };

  // Generate dynamic skills
  const generateDynamicSkills = (jobDescription) => {
    if (!jobDescription) return ['JavaScript', 'React', 'Node.js', 'Python', 'Docker', 'AWS'];

    const jobLower = jobDescription.toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart\.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
    const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);

    if (hasWeb3Terms) {
      return ['Solidity', 'Web3.js', 'Ethers.js', 'EVM', 'Ethereum', 'Rust', 'Go', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Docker', 'AWS'];
    } else if (hasPythonTerms) {
      return ['Python', 'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'JavaScript', 'React', 'Git', 'CI/CD'];
    } else if (hasReactTerms) {
      return ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Redux', 'GraphQL', 'Webpack', 'Jest', 'Cypress', 'Figma', 'Git', 'Agile'];
    } else {
      return ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'CI/CD'];
    }
  };

  // Generate high-quality resume HTML using ResumePreview.jsx template
  const generateHighQualityResumeHTML = (employeeData, resumeType, jobDescription) => {
    const { name, phone, telegram, experience, projects, skills } = employeeData;

    const dynamicSummary = generateDynamicSummary(jobDescription);
    const dynamicExperience = generateDynamicExperience(jobDescription);
    const dynamicProjects = generateDynamicProjects(jobDescription);
    const dynamicSkills = generateDynamicSkills(jobDescription);

    if (resumeType === 'freelance') {
      // FREELANCE TEMPLATE - Georgia font, freelance rate, consultant styling
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${name} - Resume</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: Georgia, 'Times New Roman', serif;
              font-size: 11pt;
              line-height: 1.3;
              color: #000;
              background-color: #ffffff;
              padding: 1in;
              max-width: 700px;
              margin: 0 auto;
            }

            .header {
              text-align: center;
              margin-bottom: 20px;
            }

            .name {
              font-size: 1.8rem;
              font-weight: 700;
              margin-bottom: 15px;
            }

            .summary-section {
              margin-bottom: 20px;
            }

            .summary-header {
              display: table;
              width: 100%;
              margin-bottom: 3px;
            }

            .summary-title {
              font-size: 1.1rem;
              font-weight: 600;
              text-transform: uppercase;
              display: table-cell;
            }

            .freelance-rate {
              font-size: 1.1rem;
              font-weight: 600;
              text-transform: uppercase;
              display: table-cell;
              text-align: right;
            }

            .summary-divider {
              height: 1px;
              background-color: #000;
              margin: 6px 0 12px 0;
            }

            .summary-text {
              font-size: 0.9rem;
              line-height: 1.3;
              text-align: left;
            }

            .section {
              margin-bottom: 20px;
            }

            .section-title {
              font-size: 1.1rem;
              font-weight: 600;
              text-transform: uppercase;
              margin: 10px 0 6px 0;
              padding-bottom: 2px;
              border-bottom: 1px solid #000;
            }

            .experience-item {
              margin-bottom: 15px;
            }

            .experience-header {
              display: table;
              width: 100%;
              margin-bottom: 2px;
            }

            .company {
              font-weight: bold;
              display: table-cell;
            }

            .date-range {
              display: table-cell;
              text-align: right;
            }

            .role {
              font-style: italic;
              font-size: 0.85rem;
              margin-bottom: 5px;
            }

            .experience-list {
              list-style-type: circle;
              padding-left: 20px;
              margin: 0;
            }

            .experience-item {
              font-size: 0.9rem;
              line-height: 1.3;
              margin-bottom: 2px;
            }

            .projects-list {
              list-style-type: circle;
              padding-left: 20px;
              margin: 0;
            }

            .project-item {
              font-size: 0.9rem;
              line-height: 1.3;
              margin-bottom: 2px;
            }

            .skills-list {
              list-style-type: none;
              padding-left: 0;
              margin: 0;
            }

            .skill-item {
              font-size: 0.9rem;
              line-height: 1.3;
              margin-bottom: 2px;
            }

            .skill-category {
              font-weight: bold;
            }

            @media print {
              body {
                padding: 0.5in;
                max-width: none;
              }
            }
          </style>
        </head>
        <body>
          <!-- Header -->
          <div class="header">
            <div class="name">${name}</div>
          </div>

          <!-- Summary -->
          <div class="summary-section">
            <div class="summary-header">
              <div class="summary-title">Summary</div>
              <div class="freelance-rate">Freelance Rate: $150 / hour</div>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-text">
              ${processText(dynamicSummary)}
            </div>
          </div>

          <!-- Experience -->
          <div class="section">
            <div class="section-title">Experience</div>
            ${dynamicExperience.map(exp => `
              <div class="experience-item">
                <div class="experience-header">
                  <div class="company">${exp.company}</div>
                  <div class="date-range">${exp.period}</div>
                </div>
                <div class="role">${exp.role}</div>
                <ul class="experience-list">
                  ${exp.points.map(point => `<li class="experience-item">${processText(point)}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <!-- Projects -->
          <div class="section">
            <div class="section-title">Projects</div>
            <ul class="projects-list">
              ${dynamicProjects.map(proj => `<li class="project-item">${proj.name} - ${processText(proj.description)}</li>`).join('')}
            </ul>
          </div>

          <!-- Skills -->
          <div class="section">
            <div class="section-title">Skills</div>
            <ul class="skills-list">
              <li class="skill-item"><span class="skill-category">Languages:</span>
                ${(() => {
                  const languageSkills = dynamicSkills.filter(skill =>
                    ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Solidity', 'SQL', 'HTML', 'CSS', 'HTML/CSS'].includes(skill)
                  );
                  return languageSkills.length > 0 ? languageSkills.join(' , ') : 'JavaScript , TypeScript , Python , SQL , HTML , CSS';
                })()}
              </li>
              <li class="skill-item"><span class="skill-category">Frameworks & Libraries:</span>
                ${(() => {
                  const frameworkSkills = dynamicSkills.filter(skill =>
                    ['React', 'Node.js', 'Express', 'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry', 'Django', 'Flask', 'FastAPI', 'REST APIs'].includes(skill)
                  );
                  return frameworkSkills.length > 0 ? frameworkSkills.join(' , ') : 'React , Node.js , Express';
                })()}
              </li>
              ${(() => {
                const blockchainSkills = dynamicSkills.filter(skill =>
                  ['Solidity', 'Rust', 'EVM', 'Ethereum', 'Polygon', 'BSC', 'Solana', 'ZKsync Era', 'ZK-SNARKs', 'Layer-1/Layer-2', 'Cross-chain', 'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry'].includes(skill)
                );
                return blockchainSkills.length > 0 ? `
                  <li class="skill-item"><span class="skill-category">Blockchain:</span> ${blockchainSkills.join(' , ')}</li>
                ` : '';
              })()}
              <li class="skill-item"><span class="skill-category">Tools & DevOps:</span>
                ${(() => {
                  const devOpsSkills = dynamicSkills.filter(skill =>
                    ['Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'Jenkins', 'AWS', 'CI/CD', 'VS Code', 'Postman', 'Unit Testing', 'Pytest'].includes(skill)
                  );
                  return devOpsSkills.length > 0 ? devOpsSkills.join(' , ') : 'Docker , Git , AWS , CI/CD';
                })()}
              </li>
            </ul>
          </div>
        </body>
        </html>
      `;
    } else {
      // TECHSTACK TEMPLATE - Times New Roman, formal corporate styling
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${name} - Resume</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: 'Times New Roman', serif;
              font-size: 11pt;
              line-height: 1.4;
              color: #000;
              background-color: #ffffff;
              padding: 0.75in;
              max-width: 700px;
              margin: 0 auto;
            }

            .header {
              text-align: center;
              margin-bottom: 25px;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }

            .name {
              font-size: 2rem;
              font-weight: bold;
              margin-bottom: 8px;
              letter-spacing: 0.5px;
            }

            .contact-info {
              font-size: 0.9rem;
              color: #666;
              margin-bottom: 15px;
            }

            .summary-section {
              margin-bottom: 25px;
            }

            .summary-title {
              font-size: 1.2rem;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 8px;
              letter-spacing: 1px;
            }

            .summary-text {
              font-size: 0.95rem;
              line-height: 1.5;
              text-align: justify;
            }

            .section {
              margin-bottom: 25px;
            }

            .section-title {
              font-size: 1.2rem;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 12px;
              padding-bottom: 3px;
              border-bottom: 1px solid #333;
              letter-spacing: 1px;
            }

            .experience-item {
              margin-bottom: 20px;
            }

            .experience-header {
              display: table;
              width: 100%;
              margin-bottom: 4px;
            }

            .company {
              font-weight: bold;
              font-size: 1.05rem;
              display: table-cell;
            }

            .date-range {
              display: table-cell;
              text-align: right;
              font-style: italic;
            }

            .role {
              font-weight: bold;
              font-size: 1rem;
              margin-bottom: 8px;
              color: #333;
            }

            .experience-list {
              list-style-type: disc;
              padding-left: 20px;
              margin: 0;
            }

            .experience-item {
              font-size: 0.9rem;
              line-height: 1.4;
              margin-bottom: 3px;
            }

            .projects-list {
              list-style-type: disc;
              padding-left: 20px;
              margin: 0;
            }

            .project-item {
              font-size: 0.9rem;
              line-height: 1.4;
              margin-bottom: 8px;
            }

            .project-name {
              font-weight: bold;
            }

            .skills-list {
              list-style-type: none;
              padding-left: 0;
              margin: 0;
            }

            .skill-item {
              font-size: 0.9rem;
              line-height: 1.4;
              margin-bottom: 3px;
            }

            .skills-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 10px;
              margin-top: 5px;
            }

            .skill-category {
              font-weight: bold;
              margin-top: 8px;
            }

            @media print {
              body {
                padding: 0.5in;
                max-width: none;
              }
            }
          </style>
        </head>
        <body>
          <!-- Header -->
          <div class="header">
            <div class="name">${name}</div>
            <div class="contact-info">${phone} | ${telegram}</div>
          </div>

          <!-- Professional Summary -->
          <div class="summary-section">
            <div class="summary-title">Professional Summary</div>
            <div class="summary-text">
              ${processText(dynamicSummary)}
            </div>
          </div>

          <!-- Professional Experience -->
          <div class="section">
            <div class="section-title">Professional Experience</div>
            ${dynamicExperience.map(exp => `
              <div class="experience-item">
                <div class="experience-header">
                  <div class="company">${exp.company}</div>
                  <div class="date-range">${exp.period}</div>
                </div>
                <div class="role">${exp.role}</div>
                <ul class="experience-list">
                  ${exp.points.map(point => `<li class="experience-item">${processText(point)}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <!-- Key Projects -->
          <div class="section">
            <div class="section-title">Key Projects</div>
            <ul class="projects-list">
              ${dynamicProjects.map(proj => `
                <li class="project-item">
                  <span class="project-name">${proj.name}</span><br/>
                  ${processText(proj.description)}
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Technical Skills -->
          <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="skills-grid">
              ${dynamicSkills.map(skill => `<div class="skill-item">${skill}</div>`).join('')}
            </div>
          </div>
        </body>
        </html>
      `;
    }
  };

  // Generate and download PDF using optimized approach with better error handling
  const generateAndDownloadPDF = async (htmlContent, filename) => {
    try {
      // Validate HTML content before processing
      if (!htmlContent || htmlContent.trim() === '') {
        throw new Error('HTML content is empty or invalid');
      }

      console.log('Starting PDF generation for:', filename);
      console.log('HTML content length:', htmlContent.length);

      // Import html2canvas and jsPDF dynamically
      const html2canvas = (await import('html2canvas-pro')).default;
      const jsPDF = (await import('jspdf')).default;

      // Create a temporary container for the HTML content
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '700px';
      container.style.backgroundColor = '#ffffff';

      // Ensure all styles are applied
      const style = document.createElement('style');
      style.textContent = container.querySelector('style')?.textContent || '';
      container.appendChild(style);

      document.body.appendChild(container);

      // Wait a bit for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Validate that the container has content
      if (!container.innerHTML || container.innerHTML.trim() === '') {
        document.body.removeChild(container);
        throw new Error('Container element is empty after HTML injection');
      }

      console.log('Container created with dimensions:', {
        width: container.offsetWidth,
        height: container.offsetHeight,
        hasContent: !!container.innerHTML,
        contentLength: container.innerHTML.length
      });

      // Options for html2canvas with better error handling and compatibility
      const options = {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: true, // Enable logging to see any issues
        allowTaint: true, // Allow cross-origin images if any
        width: container.offsetWidth || 700,
        height: container.offsetHeight || 900,
        // Ensure proper rendering
        removeContainer: true,
        foreignObjectRendering: false, // Disable for better compatibility
        letterRendering: true,
        // Better element handling
        ignoreElements: (element) => {
          return element.tagName === 'BUTTON' ||
                 element.classList?.contains('hover:bg-green-700') ||
                 element.classList?.contains('focus:ring-2');
        },
        // Wait for fonts and images to load
        onclone: (clonedDoc) => {
          console.log('Cloning completed');
          // Ensure all styles are applied in the cloned document
          const clonedElement = clonedDoc.body.querySelector('.bg-white') ||
                               clonedDoc.body.querySelector('[style*="background-color"]');
          if (clonedElement) {
            console.log('Cloned element found');
          }
        }
      };

      const canvas = await html2canvas(container, options);

      console.log('Canvas created successfully:', {
        width: canvas.width,
        height: canvas.height,
        isEmpty: canvas.width === 0 || canvas.height === 0
      });

      // Check if canvas is empty
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas is empty - no content captured');
      }

      // Validate canvas has actual content
      const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      const hasContent = imageData.data.some(pixel => pixel !== 255); // Check if not all white

      if (!hasContent) {
        throw new Error('Canvas appears to be blank - no visible content');
      }

      try {
        // Convert to PNG with maximum quality
        const imgData = canvas.toDataURL('image/png');
        console.log('Image data created, size:', Math.round(imgData.length / 1024), 'KB');

        if (imgData.length < 1000) {
          throw new Error('Image data is too small - likely empty');
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

        console.log('Adding image to PDF...');
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight, '', 'FAST');

        // Clean up
        document.body.removeChild(container);

        // Save PDF
        pdf.save(filename);

        console.log('PDF saved successfully!');
        return true;

      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError);
        throw new Error(`PDF generation failed: ${pdfError.message}`);
      }

    } catch (error) {
      console.error('PDF generation failed:', error);
      throw error;
    }
  };

  // Main function to generate all resumes
  const generateAllResumes = async (type, jobDescription = '') => {
    if (isGenerating) return;

    setIsGenerating(true);
    setIsCancelled(false);
    setProgress({ current: 0, total: 0, currentEmployee: '', status: 'fetching' });

    try {
      // Step 1: Fetch all employees
      const employeesResponse = await axios.get('/api/employees');
      const allEmployees = employeesResponse.data;

      console.log(`Fetched ${allEmployees.length} employees`);

      // Step 2: Filter employees by resume type
      const filteredEmployees = allEmployees.filter(emp => {
        if (!emp.resumeData) return false;

        const resumeDataForType = emp.resumeData[type];
        if (!resumeDataForType) return false;

        // Check if the resume data has actual content
        const hasValidData = resumeDataForType.experience &&
               Array.isArray(resumeDataForType.experience) &&
               resumeDataForType.experience.length > 0;

        return hasValidData;
      });

      console.log(`Found ${filteredEmployees.length} employees with ${type} data`);

      if (filteredEmployees.length === 0) {
        throw new Error(`No employees found with ${type} resume data. Please make sure employees have uploaded ${type} resume files.`);
      }

      setProgress({
        current: 0,
        total: filteredEmployees.length,
        currentEmployee: '',
        status: 'generating'
      });

      // Step 3: Generate resumes one by one
      for (let i = 0; i < filteredEmployees.length; i++) {
        if (isCancelled) break;

        const employee = filteredEmployees[i];
        const employeeName = employee.name.replace(/[^a-zA-Z0-9]/g, '_');

        setProgress({
          current: i + 1,
          total: filteredEmployees.length,
          currentEmployee: employee.name,
          status: 'generating'
        });

        try {
          // Generate resume HTML
          const resumeHTML = generateHighQualityResumeHTML(employee, type, jobDescription);
          const filename = `${employeeName}_${type}_resume.pdf`;

          // Generate and download PDF
          await generateAndDownloadPDF(resumeHTML, filename);

          // Small delay between downloads to prevent browser issues
          if (i < filteredEmployees.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }

        } catch (error) {
          console.error(`Failed to generate resume for ${employee.name}:`, error);
          // Continue with next employee even if one fails
          continue;
        }
      }

      setProgress({
        current: filteredEmployees.length,
        total: filteredEmployees.length,
        currentEmployee: '',
        status: 'completed'
      });

    } catch (error) {
      console.error('Bulk resume generation failed:', error);
      setProgress(prev => ({ ...prev, status: 'error' }));
      throw error;
    } finally {
      setIsGenerating(false);
      setIsCancelled(false);

      // Reset status after a delay
      setTimeout(() => {
        setProgress(prev => ({ ...prev, status: 'idle' }));
      }, 2000);
    }
  };

  const cancelGeneration = () => {
    setIsCancelled(true);
  };

  return {
    generateAllResumes,
    isGenerating,
    progress,
    cancelGeneration,
    isCancelled
  };
};
