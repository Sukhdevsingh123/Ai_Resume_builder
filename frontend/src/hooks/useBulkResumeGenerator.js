import { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export const useBulkResumeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, currentEmployee: '', status: 'idle' });
  const [isCancelled, setIsCancelled] = useState(false);

  // Process text with markdown and bold keywords
  const processText = (text) => {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  // --- ADVANCED DYNAMIC CONTENT GENERATION (with Rust support and expanded content) ---

  const generateDynamicSummary = (summary, jobDescription) => {
    if (summary) return summary;
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasRustTerms = /\b(rust|tokio|async-std|wasm|webassembly|systems programming)\b/.test(jobLower);
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(jobLower);
    const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
    const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);

    if (hasRustTerms) {
      return 'Highly skilled **Rust Developer** with **2+ years** of hands-on experience **developing** high-performance, **reliable**, and **secure** systems. **Expertise** in systems programming concepts including memory safety, concurrency, and lifetimes. **Skilled** in **designing**, **implementing**, and maintaining backend services and performance-critical components using async frameworks like **Tokio**.';
    } else if (hasWeb3Terms) {
      return 'Senior Smart Contract Engineer with 5+ years of experience architecting and deploying DeFi protocols managing **$500M+ TVL**. Expert in gas-optimized Solidity development, comprehensive security audits, and production-grade smart contract systems. Proven track record in leading cross-functional teams to deliver complex blockchain solutions across multiple EVM chains and Layer-2 networks.';
    } else if (hasPythonTerms) {
      return 'Senior Python Developer with 5+ years of experience building scalable backend systems and APIs. Expert in **Django, Flask, and FastAPI** frameworks with a focus on performance optimization, database design, and microservices architecture. Proven ability to lead development teams and deliver high-impact solutions for enterprise applications.';
    } else if (hasReactTerms) {
      return 'Senior Frontend Developer with 5+ years of experience creating responsive web applications and user interfaces. Expert in **React, TypeScript, and modern frontend technologies** with a focus on performance optimization, accessibility, and user experience design. Proven track record in leading frontend teams and delivering pixel-perfect implementations.';
    } else {
      return 'Senior Full-Stack Developer with 5+ years of experience building scalable web applications and leading development teams. Expert in modern technologies including **React, Node.js, Python, and cloud platforms**. Proven track record in delivering high-performance solutions and mentoring junior developers.';
    }
  };

  const generateDynamicExperience = (experience, jobDescription) => {
    if (experience && experience.length > 0) return experience;
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasRustTerms = /\b(rust|tokio|async-std|wasm|webassembly)\b/.test(jobLower);
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(jobLower);

    if (hasRustTerms) {
      return [
        { company: 'Systems Performance Inc.', role: 'Rust Developer', period: 'Oct 2023 – Present', points: [
          '**Designed** and **developed** high-performance backend systems and APIs using **Rust** and **Tokio** for production-grade applications.',
          '**Wrote** efficient, modular, and **secure** code, leveraging Rust’s memory safety and concurrency features to ensure system **reliability**.',
          '**Implemented** comprehensive unit and integration tests, participating in rigorous code reviews to maintain high code quality.',
          '**Optimized** existing applications for speed and memory usage, and contributed to system architecture discussions.'
        ]},
        { company: 'Open Source Contributor', role: 'Systems Programmer', period: 'Jan 2022 – Sep 2023', points: [
          'Contributed to open-source Rust projects, focusing on performance-critical components and systems software.',
          'Collaborated with a distributed team to troubleshoot complex issues in production environments using advanced debugging skills.',
          'Gained deep familiarity with the Rust ecosystem, including modern tools, libraries, and best practices.'
        ]}
      ];
    } else if (hasWeb3Terms) {
      return [
        { company: 'Freelance', role: 'Smart Contract Engineer', period: 'Jan 2024 – Present', points: [
            '**Core Blockchain Development:** Built a Layer-1 validator node in Python from scratch, implementing block reading and production using JAM grey paper consensus.',
            '**Validator Lifecycle:** Developed secure validator node infrastructure for block proposal, validation, and finalization.',
            '**ZK Financial Applications:** Built financial dApps leveraging ZK-SNARKS/ZKsync for transaction privacy and security.'
        ]},
        { company: 'TechSteck Solutions LLP', role: 'Blockchain Developer', period: 'Oct 2022 – Dec 2024', points: [
            '**Protocol Development:** Developed EVM-compatible blockchain modules (networking, consensus, execution).',
            '**Smart Contracts:** Built and audited Solidity DeFi protocols with gas optimization and upgradeability.',
            '**Cross-Chain Integrations:** Implemented interoperability solutions across Ethereum, Polygon, and Solana using bridges and ZK technologies.'
        ]}
      ];
    } else {
      return [{
        company: 'Enterprise Solutions Inc',
        role: 'Senior Full-Stack Developer',
        period: 'Jun 2020 – Present',
        points: [
          'Led development of enterprise web applications using **React, Node.js, and Python**, serving over 100,000 users.',
          'Architected and maintained scalable backend systems handling **500K+** concurrent users with 99.9% uptime.',
          'Implemented automated testing and CI/CD pipelines, reducing production bugs by **80%** and improving deployment frequency.',
          'Collaborated with product teams to translate business requirements into technical solutions from conception to production.'
        ]
      }];
    }
  };

  const generateDynamicProjects = (projects, jobDescription) => {
    if (projects && projects.length > 0) return projects;
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasRustTerms = /\b(rust|tokio|async-std|wasm|webassembly)\b/.test(jobLower);
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(jobLower);

    if (hasRustTerms) {
        return [
            { name: 'High-Performance API Service', description: 'Built a backend service in **Rust** using the **Tokio** framework to handle thousands of concurrent requests with low latency. Implemented RESTful endpoints and integrated with a **PostgreSQL** database for persistent storage.' },
            { name: 'WebAssembly (WASM) Module', description: 'Developed a performance-critical data processing library in **Rust** and compiled it to **WebAssembly (WASM)** for use in a browser environment, achieving near-native execution speed for complex calculations.' },
            { name: 'Distributed Key-Value Store', description: 'Created a simple distributed key-value store using gRPC for communication between nodes, demonstrating an understanding of distributed systems architecture in Rust.'}
        ];
    } else if (hasWeb3Terms) {
      return [
        { name: 'Layer-1 Blockchain (JAM Protocol)', description: 'Implemented validator selection, consensus, and networking in Python based on the JAM grey paper, building a functional validator node from scratch.' },
        { name: 'Zero-Knowledge Financial Apps', description: 'Built ZK-powered dApps for confidential transactions and secure on-chain finance using ZK-SNARKS and the ZKsync Era toolchain.' },
        { name: 'Cross-Chain Bridge', description: 'Developed a multi-chain bridge using Hyperlane, Chainlink CCIP, and Wormhole for seamless asset and data interoperability between EVM and non-EVM chains.' }
      ];
    } else {
      return [
        { name: 'Microsoft Office 365 Integration Platform', description: 'Led development of an enterprise integration platform connecting Office 365 services with third-party applications. Built a scalable Node.js backend with a React frontend.' },
        { name: 'AWS Infrastructure Automation Suite', description: 'Developed a comprehensive infrastructure-as-code platform using Terraform, AWS CDK, and Python automation. Implemented blue-green deployments and auto-scaling policies.' }
      ];
    }
  };

  const generateDynamicSkills = (skills, jobDescription) => {
    // Baseline/default skills to include in all generated resumes
    const baselineSkills = [
      'JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML/CSS',
      'React', 'Node.js', 'Express', 'MongoDB', 'MERN Stack',
      'Docker', 'Git', 'GitHub Actions', 'Jenkins', 'AWS', 'CI/CD',
      'EVM', 'Ethereum', 'Polygon', 'BSC', 'Hyperlane', 'Chainlink', 'Wormhole'
    ];

    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasRustTerms = /\b(rust|tokio|async-std|wasm|webassembly)\b/.test(jobLower);
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(jobLower);

    let generated = [];
    if (hasRustTerms) {
      generated = ['Rust', 'Tokio', 'async-std', 'PostgreSQL', 'MySQL', 'Redis', 'RESTful APIs', 'gRPC', 'GraphQL', 'C++', 'Go', 'Systems Programming', 'Concurrency'];
    } else if (hasWeb3Terms) {
      generated = ['Solidity', 'Rust', 'Go', 'Hardhat', 'Foundry', 'ZK-SNARKs', 'JAM Protocol', 'Cross-chain'];
    } else {
      generated = ['JavaScript', 'TypeScript', 'Python', 'HTML/CSS', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Docker', 'Git', 'AWS', 'CI/CD'];
    }

    // Merge provided skills, generated skills based on job description, and baseline defaults
    const merged = new Set([...(skills || []), ...generated, ...baselineSkills]);

    return Array.from(merged);
  };

  // --- HTML TEMPLATE FUNCTION ---
  const generateHighQualityResumeHTML = (employeeData, jobDescription) => {
    const { name, phone, telegram, summary, experience, projects, skills } = employeeData;
    const dynamicSummary = generateDynamicSummary(summary, jobDescription);
    const dynamicExperience = generateDynamicExperience(experience, jobDescription);
    const dynamicProjects = generateDynamicProjects(projects, jobDescription);
    const allSkills = generateDynamicSkills(skills, jobDescription);

    const categorizedSkillsSet = new Set();
    const getSkillsArrayForCategory = (keywords) => {
        const categorySkills = allSkills.filter(skill => !categorizedSkillsSet.has(skill) && keywords.some(kw => skill.toLowerCase().replace(/[-. /]/g, '').includes(kw.replace(/[-. /]/g, ''))));
        categorySkills.forEach(skill => categorizedSkillsSet.add(skill));
        return categorySkills;
    };

    const languagesArr = getSkillsArrayForCategory(['rust', 'solidity', 'python', 'javascript', 'js', 'go', 'html', 'css', 'typescript', 'ts', 'c++', 'sql', 'node.js']);
    const frameworksArr = getSkillsArrayForCategory(['tokio', 'async-std', 'react', 'express', 'next', 'next.js', 'django', 'flask', 'fastapi', 'mern', 'mongodb', 'mongoose']);
    const toolsArr = getSkillsArrayForCategory(['git', 'github', 'githubactions', 'docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'cicd', 'jenkins', 'terraform']);
    const blockchainArr = getSkillsArrayForCategory(['ethereum', 'polygon', 'solana', 'evm', 'web3', 'web3.js', 'ethers', 'ethers.js', 'ipfs', 'filecoin', 'decentralized', 'zk', 'zk-snarks', 'zksnarks', 'smartcontracts', 'smart.contract', 'jamprotocol', 'cross-chain', 'hyperlane', 'chainlink', 'bsc', 'wormhole', 'blockchain', 'hardhat', 'foundry']);
    
    const languages = languagesArr.join(', ');
    const frameworks = frameworksArr.join(', ');
    const tools = toolsArr.join(', ');
    const blockchain = blockchainArr.join(', ');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${name} - Resume</title>
        <style>
          /* --- KEY CHANGES FOR A4 FIT --- */
          html { font-size: 14px; } /* Reduced base font size */
          body { background-color: #ffffff; margin: 0; font-family: Georgia, serif; color: #2c3e50; }
          .page-container { 
            width: 210mm; /* A4 Width */
            min-height: 297mm; /* A4 Height */
            padding: 0.4in; /* Reduced padding */
            box-sizing: border-box; 
            margin: 0 auto; 
          }
          strong { font-weight: bold; }
          .header { text-align: left; padding-bottom: 0.2rem; }
          .name { font-size: 1.4rem; font-weight: bold; color: #1a202c; margin-bottom: 0.2rem; line-height: 1.2; padding-top: 10px; }
          .contact-info { display: flex; font-size: 0.85rem; color: #4a5568; }
          .contact-item { margin-right: 2rem; }
          .section { margin-bottom: 0.8rem; } /* Reduced section spacing */
          .section-title { font-size: 0.85rem; font-weight: bold; color: #1a202c; border-bottom: 1px solid #1a202c; padding-bottom: 0.4rem; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
          .summary-text { color: #2d3748; line-height: 1.5; font-size: 0.95rem; font-style: italic; } /* Tighter line height */
          .experience-item { margin-bottom: 0.8rem; } /* Reduced item spacing */
          .experience-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.2rem; }
          .company-name { font-weight: bold; font-size: 0.95rem; color: #1a202c; }
          .date { font-size: 0.8rem; font-weight: 600; color: #4a5568; }
          .role { font-weight: 600; font-size: 0.85rem; color: #2d3748; margin-bottom: 0.4rem; }
          .details-list { list-style: none; padding-left: 0; margin-top: 0; }
          .details-list li { display: flex; align-items: flex-start; color: #2d3748; line-height: 1.5; font-size: 0.9rem; margin-bottom: 0.2rem; } /* Tighter line height and spacing */
          .bullet { color: #1a202c; margin-right: 0.5rem; flex-shrink: 0; }
          .project-item { margin-bottom: 0.6rem; } /* Reduced item spacing */
          .project-name { font-weight: bold; font-size: 0.95rem; color: #1a202c; margin-bottom: 0.2rem; }
          .project-desc { color: #2d3748; line-height: 1.5; font-size: 0.9rem; } /* Tighter line height */
          .skills-category { margin-bottom: 0.4rem; font-size: 0.9rem;}
          .skills-title { font-weight: bold; color: #1a202c; }
          .skills-list { color: #2d3748; }
        </style>
      </head>
      <body>
        <div class="page-container">
          <div class="header">
            <h1 class="name">${name}</h1>
            <div class="contact-info">
              ${phone ? `<div class="contact-item">Phone: ${phone}</div>` : ''}
              ${telegram ? `<div class="contact-item">Telegram: ${telegram}</div>` : ''}
            </div>
          </div>
          <div class="section">
            <h2 class="section-title">Summary</h2>
            <div class="summary-text">${processText(dynamicSummary)}</div>
          </div>
          <div class="section">
            <h2 class="section-title">Experience</h2>
            ${dynamicExperience.map(exp => `
              <div class="experience-item">
                <div class="experience-header">
                  <h3 class="company-name">${exp.company}</h3>
                  <p class="date">${exp.period}</p>
                </div>
                <p class="role">${exp.role}</p>
                <ul class="details-list">
                  ${exp.points.map(point => `
                    <li>
                      <span class="bullet">•</span>
                      <span>${processText(point)}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h2 class="section-title">Projects</h2>
            ${dynamicProjects.map(proj => `
              <div class="project-item">
                <div class="project-name">${proj.name}</div>
                <div class="project-desc">${processText(proj.description)}</div>
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h2 class="section-title">Skills</h2>
            ${languages ? `<div class="skills-category"><span class="skills-title">Languages:</span> <span class="skills-list">${languages}</span></div>` : ''}
            ${frameworks ? `<div class="skills-category"><span class="skills-title">Frameworks & Libraries:</span> <span class="skills-list">${frameworks}</span></div>` : ''}
            ${blockchain ? `<div class="skills-category"><span class="skills-title">Blockchain:</span> <span class="skills-list">${blockchain}</span></div>` : ''}
            ${tools ? `<div class="skills-category"><span class="skills-title">Tools & DevOps:</span> <span class="skills-list">${tools}</span></div>` : ''}
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // --- PDF GENERATION & MAIN LOGIC (UPDATED FOR SINGLE PAGE A4 FIT) ---
  const generateAndDownloadPDF = async (htmlContent, filename) => {
    try {
      if (!htmlContent || htmlContent.trim() === '') throw new Error('HTML content is empty or invalid');
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      // Use A4 dimensions for rendering container
      container.style.width = '210mm';
      container.style.height = 'auto'; // Let content determine height initially
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      const contentToCapture = container.querySelector('.page-container');

      const canvas = await html2canvas(contentToCapture, {
        scale: 2, // High resolution rendering
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // --- KEY CHANGE HERE ---
      // Set PDF format to 'a4'
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'a4', compress: true });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const canvasAspectRatio = canvasWidth / canvasHeight;
      const pageAspectRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;

      // Logic to scale the image to fit the page while maintaining aspect ratio
      if (canvasAspectRatio > pageAspectRatio) {
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / canvasAspectRatio;
      } else {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * canvasAspectRatio;
      }

      // Center the scaled image on the PDF page
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      // Add the image, ensuring it's on a single page
      pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
      
      pdf.save(filename);
      return true;
    } catch (error) {
      console.error('PDF generation failed:', error);
      const container = document.querySelector('.page-container');
      if (container && document.body.contains(container)) {
          document.body.removeChild(container);
      }
      throw error;
    }
  };

  const generateAllResumes = async (type, jobDescription = '') => {
    if (isGenerating) return;
    setIsGenerating(true);
    setIsCancelled(false);
    setProgress({ current: 0, total: 0, currentEmployee: '', status: 'fetching' });

    try {
      // Step 1: Fetch all employees
      const employeesResponse = await axios.get('/api/employees');
      const allEmployees = employeesResponse.data;

      // Step 2: Filter employees
      const filteredEmployees = allEmployees.filter(emp => {
        if (!emp.resumeData) return false;
        const resumeDataForType = emp.resumeData[type];
        if (resumeDataForType) {
          return resumeDataForType.experience || resumeDataForType.projects || resumeDataForType.skills || resumeDataForType.summary;
        }
        const hasAnyResumeData = emp.resumeData.freelance || emp.resumeData.techstack;
        if (hasAnyResumeData) {
          return true;
        }
        return false;
      });

      if (filteredEmployees.length === 0) {
        throw new Error(`No employees found with resume data for the "${type}" template.`);
      }

      setProgress({
        current: 0,
        total: filteredEmployees.length,
        currentEmployee: '',
        status: 'generating'
      });

      // Step 3: Generate tailored resumes one by one
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
          const tailoredResponse = await axios.post('/api/generate-resume', {
            employeeId: employee._id,
            jobDescription: jobDescription,
            templateType: type
          });

          const tailoredResumeData = tailoredResponse.data;

          const combinedData = {
            name: employee.name,
            phone: employee.phone,
            telegram: employee.telegram,
            summary: tailoredResumeData.summary,
            experience: tailoredResumeData.experience,
            projects: tailoredResumeData.projects,
            skills: tailoredResumeData.skills
          };

          const resumeHTML = generateHighQualityResumeHTML(combinedData, jobDescription);
          const filename = `${employeeName}_${type}_resume.pdf`;

          await generateAndDownloadPDF(resumeHTML, filename);

          if (i < filteredEmployees.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }

        } catch (error) {
          console.error(`Failed to generate resume for ${employee.name}:`, error);
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