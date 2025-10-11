

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
    if (skills && skills.length > 0) return skills;
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasRustTerms = /\b(rust|tokio|async-std|wasm|webassembly)\b/.test(jobLower);
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(jobLower);

    if (hasRustTerms) {
        return ['Rust', 'Tokio', 'async-std', 'PostgreSQL', 'MySQL', 'Redis', 'RESTful APIs', 'gRPC', 'GraphQL', 'Git', 'CI/CD', 'Docker', 'Kubernetes', 'AWS', 'WebAssembly (WASM)', 'C++', 'Go', 'Python', 'Systems Programming', 'Concurrency'];
    } else if (hasWeb3Terms) {
        return ['Solidity', 'Rust', 'Go', 'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'EVM', 'Ethereum', 'Polygon', 'Solana', 'Hardhat', 'Foundry', 'Docker', 'Git', 'CI/CD', 'AWS', 'ZK-SNARKs', 'JAM Protocol', 'Cross-chain', 'Hyperlane', 'Chainlink CCIP'];
    } else {
        return ['JavaScript', 'TypeScript', 'Python', 'HTML/CSS', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Docker', 'Git', 'AWS', 'CI/CD'];
    }
  };


  // --- HIGH-FIDELITY LATEX-STYLE HTML TEMPLATE (COMPACT VERSION) ---
  const generateHighQualityResumeHTML = (employeeData, jobDescription) => {
    const { name, summary, experience, projects, skills } = employeeData;
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

    const languagesArr = getSkillsArrayForCategory(['rust', 'solidity', 'python', 'javascript', 'go', 'html', 'css', 'typescript', 'c++', 'sql']);
    const frameworksArr = getSkillsArrayForCategory(['tokio', 'async-std', 'react', 'node.js', 'express', 'next.js', 'anchor']);
    const databasesArr = getSkillsArrayForCategory(['postgresql', 'mysql', 'redis', 'mongodb']);
    const blockchainArr = getSkillsArrayForCategory(['ethereum', 'polygon', 'solana', 'evm', 'web3.js', 'ethers.js', 'webassembly', 'zk-snarks', 'jamprotocol', 'cross-chain', 'hyperlane', 'chainlinkccip']);
    const toolsArr = getSkillsArrayForCategory(['git', 'docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'hardhat', 'foundry', 'jenkins']);
    const otherSkillsArr = allSkills.filter(skill => !categorizedSkillsSet.has(skill));

    const languages = languagesArr.join(', ');
    const frameworks = frameworksArr.join(', ');
    const databases = databasesArr.join(', ');
    const blockchain = blockchainArr.join(', ');
    const tools = toolsArr.join(', ');
    const otherSkills = otherSkillsArr.join(', ');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"> <title>${name} - Resume</title>
        <style>
          body { background: #fff; margin: 0; font-family: "Times New Roman", Times, serif; font-size: 10.5pt; line-height: 1.25; color: #000; }
          .page { width: 8.5in; height: 11in; padding: 0.5in 0.75in; box-sizing: border-box; margin: 0 auto; }
          strong { font-weight: bold; }
          .header { text-align: left; margin-bottom: 10pt; }
          .header .name { font-size: 18pt; font-weight: bold; letter-spacing: 1px; }
          .summary-header { display: flex; justify-content: space-between; align-items: flex-end; }
          .summary-header .title { font-size: 12pt; font-weight: bold; }
          .summary-header .rate { font-size: 10.5pt; font-weight: bold; }
          .divider { border-bottom: 0.5pt solid black; margin-top: 1pt; margin-bottom: 3pt; }
          .summary-text { font-size: 10pt; text-align: left; }
          .section-title { font-size: 12pt; font-variant: small-caps; font-weight: bold; letter-spacing: 0.5px; border-bottom: 0.5pt solid black; padding-bottom: 1pt; margin-top: 8pt; margin-bottom: 4pt; }
          .item-list { padding-left: 0; list-style: none; }
          .item-container { margin-bottom: 7pt; }
          .subheading-grid { display: flex; justify-content: space-between; margin-bottom: -2pt; }
          .subheading-grid .company { font-weight: bold; font-size: 10.5pt; }
          .subheading-grid .date { font-size: 10.5pt; }
          .role { font-style: italic; font-size: 10pt; color: #333; margin-bottom: 2pt; }
          ul.details-list { list-style: none; padding-left: 12pt; margin: 0; }
          ul.details-list li { font-size: 10pt; margin-bottom: 1pt; position: relative; padding-left: 10pt; }
          ul.details-list li::before { content: '◦'; position: absolute; left: 0; top: 1px; }
          .project-item { font-size: 10pt; margin-bottom: 2pt; }
          ul.skills-list { list-style-type: none; padding-left: 0; }
          ul.skills-list li { font-size: 10pt; margin-bottom: 1pt; }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header"> <div class="name">${name}</div> </div>
          <div class="summary-header"> <span class="title">Summary</span> <span class="rate">Freelance Rate: $150 / hour</span> </div>
          <div class="divider"></div>
          <p class="summary-text">${processText(dynamicSummary)}</p>
          <div class="section-title">Experience</div>
          <ul class="item-list">
            ${dynamicExperience.map(exp => `<li class="item-container"><div class="subheading-grid"> <span class="company">${exp.company}</span> <span class="date">${exp.period}</span> </div><div class="role">${exp.role}</div><ul class="details-list"> ${exp.points.map(point => `<li>${processText(point)}</li>`).join('')} </ul></li>`).join('')}
          </ul>
          <div class="section-title">Projects</div>
          <ul class="item-list">
            ${dynamicProjects.map(proj => `<li class="project-item"><strong>${proj.name}</strong><br/>${processText(proj.description)}</li>`).join('')}
          </ul>
          <div class="section-title">Skills</div>
          <ul class="skills-list">
            ${languages ? `<li><strong>Languages:</strong> ${languages}</li>` : ''}
            ${frameworks ? `<li><strong>Frameworks & Libraries:</strong> ${frameworks}</li>` : ''}
            ${databases ? `<li><strong>Databases:</strong> ${databases}</li>` : ''}
            ${blockchain ? `<li><strong>Blockchain & WebAssembly:</strong> ${blockchain}</li>` : ''}
            ${tools ? `<li><strong>Tools & DevOps:</strong> ${tools}</li>` : ''}
            ${otherSkills ? `<li><strong>Core Technologies:</strong> ${otherSkills}</li>` : ''}
          </ul>
        </div>
      </body>
      </html>
    `;
  };

  // --- PDF GENERATION & MAIN LOGIC (SINGLE-PAGE) ---
  const generateAndDownloadPDF = async (htmlContent, filename) => {
    try {
      if (!htmlContent || htmlContent.trim() === '') throw new Error('HTML content is empty or invalid');
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      container.style.width = '8.5in';
      container.style.height = '11in';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);
      
      const contentToCapture = container.querySelector('.page');
      const canvas = await html2canvas(contentToCapture, {
        scale: 3,
        useCORS: true,
        width: contentToCapture.offsetWidth,
        height: contentToCapture.offsetHeight
      });

      document.body.removeChild(container);
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'letter' });
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(filename);
      return true;
    } catch (error) {
      console.error('PDF generation failed:', error);
      if (document.body.contains(container)) {
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

      console.log(`Fetched ${allEmployees.length} employees`);

      // Step 2: Filter employees - include all employees who have any resume data
      const filteredEmployees = allEmployees.filter(emp => {
        if (!emp.resumeData) return false;

        // First try to find employees with the specific template type
        const resumeDataForType = emp.resumeData[type];
        if (resumeDataForType) {
          const hasValidData = resumeDataForType.experience ||
                 resumeDataForType.projects ||
                 resumeDataForType.skills ||
                 resumeDataForType.summary;
          if (hasValidData) return true;
        }

        // If no specific template data, check if they have any resume data at all
        const hasAnyResumeData = emp.resumeData.freelance || emp.resumeData.techstack;
        if (hasAnyResumeData) {
          console.log(`Employee ${emp.name} has resume data but not for ${type} template`);
          return true; // Include them, the API will handle template conversion
        }

        return false;
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

      // Step 3: Generate tailored resumes one by one using backend API
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
          // Call backend API to get tailored resume content based on job description
          console.log(`Generating tailored resume for ${employee.name} with job description...`);
          const tailoredResponse = await axios.post('/api/generate-resume', {
            employeeId: employee._id,
            jobDescription: jobDescription,
            templateType: type
          });

          const tailoredResumeData = tailoredResponse.data;
          console.log(`Received tailored resume data for ${employee.name}`);

          // Combine with employee info for template generation
          const combinedData = {
            name: employee.name,
            phone: employee.phone,
            telegram: employee.telegram,
            summary: tailoredResumeData.summary,
            experience: tailoredResumeData.experience,
            projects: tailoredResumeData.projects,
            skills: tailoredResumeData.skills
          };

          // Generate HTML using the tailored data
          const resumeHTML = generateHighQualityResumeHTML(combinedData, jobDescription);
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