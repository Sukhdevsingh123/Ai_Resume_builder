
import { useState } from 'react';
import axios from 'axios';

export const useBulkResumeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, currentEmployee: '', status: 'idle' });
  const [isCancelled, setIsCancelled] = useState(false);

  // Process text with markdown and bold keywords
  const processText = (text) => {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  // --- DYNAMIC CONTENT GENERATION FUNCTIONS (Unchanged) ---

  // Generate dynamic professional summary based on job description
  const generateDynamicSummary = (jobDescription) => {
    if (!jobDescription) return 'Experienced software developer with expertise in modern web technologies and agile development practices.';

    const jobLower = jobDescription.toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart\.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
    const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);

    if (hasWeb3Terms) {
      return 'Smart Contract Engineer with 5+ years of experience building **DeFi protocols, lending markets, and DEX smart contracts**. Skilled in writing gas-optimized and secure Solidity code, maintaining production-grade systems with protocols managing **$500M+ TVL**, and driving features end-to-end from architecture to deployment. Proficient in **Solidity, Foundry, fuzzing (Echidna), and formal verification (Certora)**. Experienced across EVM chains, Layer-2s, and interoperability protocols.';
    } else if (hasPythonTerms) {
      return 'Senior Python Developer with 5+ years of experience building scalable backend systems and APIs. Expert in **Django, Flask, and FastAPI** frameworks with a focus on performance optimization, database design, and microservices architecture. Proven ability to lead development teams and deliver high-impact solutions for enterprise applications.';
    } else if (hasReactTerms) {
      return 'Senior Frontend Developer with 5+ years of experience creating responsive web applications and user interfaces. Expert in **React, TypeScript, and modern frontend technologies** with a focus on performance optimization, accessibility, and user experience design. Proven track record in leading frontend teams and delivering pixel-perfect implementations.';
    } else {
      return 'Senior Full-Stack Developer with 5+ years of experience building scalable web applications and leading development teams. Expert in modern technologies including **React, Node.js, Python, and cloud platforms**. Proven track record in delivering high-performance solutions and mentoring junior developers.';
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
          '**DeFi Protocol Development**: Designed and implemented Solidity contracts for lending and trading protocols with a focus on gas efficiency and security.',
          '**Testing and Security**: Built comprehensive Foundry test suites with forks, fuzz testing using Echidna, and internal audits.',
          '**Protocol Upgrades**: Delivered end-to-end features, including upgradeable modules and on-chain configuration for lending markets.',
        ]
      }];
    } else if (hasPythonTerms) {
      return [{
        company: 'Tech Innovation Corp',
        role: 'Senior Python Developer',
        period: 'Mar 2021 – Present',
        points: [
          '**Microservices Architecture**: Led development of microservices architecture serving **1M+ daily active users** with 99.9% uptime.',
          '**API Development**: Designed and implemented RESTful APIs using FastAPI and Django with comprehensive documentation.',
          '**Performance Optimization**: Optimized database queries and implemented caching strategies improving response times by 60%.',
        ]
      }];
    } else {
      return [{
        company: 'Enterprise Solutions Inc',
        role: 'Senior Full-Stack Developer',
        period: 'Jun 2020 – Present',
        points: [
          '**Enterprise Web Applications**: Led development of enterprise web applications using **React, Node.js, and Python**.',
          '**Scalable Backend Systems**: Architected scalable backend systems handling **500K+ concurrent users**.',
          '**CI/CD Implementation**: Implemented automated testing and CI/CD pipelines reducing bugs by 80%.',
        ]
      }];
    }
  };

  // Generate dynamic projects based on job description
  const generateDynamicProjects = (jobDescription) => {
    // This function remains the same as your provided code
    if (!jobDescription) return [];
    const jobLower = jobDescription.toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart\.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    if (hasWeb3Terms) {
      return [
        { name: 'Decentralized Lending Protocol', description: 'Developed lending pools, liquidation mechanics, and interest rate models in Solidity with Foundry-based testing.' },
        { name: 'DEX Smart Contracts', description: 'Implemented AMM contracts supporting token swaps, liquidity provisioning, and fee distribution with gas-optimized design.' }
      ];
    } else {
      return [
        { name: 'Microsoft Office 365 Integration Platform', description: 'Led development of enterprise integration platform connecting Office 365 services with third-party applications. Built scalable Node.js backend with React frontend, handling 10M+ API calls daily with 99.95% uptime.' },
        { name: 'AWS Infrastructure Automation Suite', description: 'Developed comprehensive infrastructure as code platform using Terraform, AWS CDK, and Python automation. Implemented blue-green deployments, auto-scaling policies, and cost optimization algorithms reducing infrastructure costs by 40%.' }
      ];
    }
  };

  // Generate dynamic skills
  const generateDynamicSkills = (jobDescription) => {
    // This function remains the same as your provided code
    if (!jobDescription) return ['JavaScript', 'React', 'Node.js', 'Python', 'Docker', 'AWS'];
    const jobLower = jobDescription.toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart\.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    if (hasWeb3Terms) {
      return ['Solidity', 'Rust', 'Python', 'JavaScript', 'Go', 'DeFi protocols', 'Lending', 'DEXes', 'Governance', 'Upgradeability', 'Foundry', 'Echidna', 'Certora', 'gas optimization', 'audits', 'Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Solana', 'Cross-chain bridges', 'Hardhat', 'OpenZeppelin', 'Slither', 'Docker', 'Git', 'CI/CD', 'AWS'];
    } else {
      return ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'CI/CD', 'REST APIs', 'GraphQL'];
    }
  };

  // --- NEW HTML GENERATION FUNCTION ---
  // This function is completely replaced to match the LaTeX template.
  const generateHighQualityResumeHTML = (employeeData, jobDescription) => {
    const { name } = employeeData;

    const dynamicSummary = generateDynamicSummary(jobDescription);
    const dynamicExperience = generateDynamicExperience(jobDescription);
    const dynamicProjects = generateDynamicProjects(jobDescription);
    const allSkills = generateDynamicSkills(jobDescription);

    // Helper to filter skills for categories based on the LaTeX structure
    const getSkillsForCategory = (keywords) => {
        return allSkills.filter(skill => keywords.some(kw => skill.toLowerCase().includes(kw))).join(', ');
    };

    const languages = getSkillsForCategory(['solidity', 'rust', 'python', 'javascript', 'go']);
    const smartContracts = getSkillsForCategory(['defi', 'lending', 'dex', 'governance', 'upgradeability']);
    const testingSecurity = getSkillsForCategory(['foundry', 'echidna', 'certora', 'gas', 'audit', 'slither', 'openzeppelin']);
    const blockchain = getSkillsForCategory(['ethereum', 'polygon', 'arbitrum', 'optimism', 'solana', 'cross-chain']);
    const tools = getSkillsForCategory(['hardhat', 'docker', 'git', 'ci/cd', 'aws']);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${name} - Resume</title>
        <style>
          /* A4 Size and Margins */
          body {
            background: #fff;
            margin: 0;
            font-family: 'Times New Roman', Times, serif; /* LaTeX default serif font */
            font-size: 11pt;
            line-height: 1.3;
            color: #000;
          }
          .page {
            width: 8.5in;
            height: 11in;
            padding: 1in;
            padding-top: 0.5in;
            padding-bottom: 1in;
            box-sizing: border-box;
            margin: 0 auto;
          }
          /* General Elements */
          h1, h2, h3, p, ul, li {
            margin: 0;
            padding: 0;
          }
          strong {
            font-weight: bold;
          }
          /* Header */
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            font-size: 24pt;
            font-weight: bold;
            letter-spacing: 1px;
          }
          /* Summary Section */
          .summary-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: -1px;
          }
          .summary-header .title {
            font-size: 14pt;
            font-weight: bold;
          }
          .summary-header .rate {
            font-size: 11pt;
            font-weight: bold;
          }
          .divider {
            border-bottom: 0.5pt solid black;
            margin-top: 2pt;
            margin-bottom: 5pt;
          }
          .summary-text {
            font-size: 10.5pt;
          }
          /* Section Title Formatting */
          .section-title {
            font-size: 14pt;
            font-variant: small-caps;
            font-weight: bold;
            letter-spacing: 0.5px;
            border-bottom: 0.5pt solid black;
            padding-bottom: 1px;
            margin-top: 12px;
            margin-bottom: 8px;
          }
          /* Experience & Project Items */
          .item-container {
            margin-bottom: 8px;
          }
          .subheading {
            display: flex;
            justify-content: space-between;
            font-size: 11pt;
          }
          .subheading .company {
            font-weight: bold;
          }
          .subheading .date {
            font-weight: normal;
          }
          .subheading .role {
            font-style: italic;
            font-size: 10.5pt;
          }
          ul.details-list {
            list-style: none;
            padding-left: 15px;
            margin-top: 2px;
          }
          ul.details-list li {
            font-size: 10.5pt;
            margin-bottom: 2px;
            text-indent: -10px;
          }
          /* Project Items */
          .project-item {
            font-size: 10.5pt;
            margin-bottom: 4px;
            padding-left: 15px;
            text-indent: -10px;
          }
          .project-item strong {
            margin-right: 5px;
          }
          /* Skills List */
          ul.skills-list {
            list-style: none;
            padding-left: 15px;
          }
          ul.skills-list li {
            font-size: 10.5pt;
            margin-bottom: 2px;
          }
          ul.skills-list li strong {
            margin-right: 5px;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <h1>${name}</h1>
          </div>

          <div class="summary-header">
            <span class="title">Summary</span>
            <span class="rate">Freelance Rate: $150 / hour</span>
          </div>
          <div class="divider"></div>
          <p class="summary-text">${processText(dynamicSummary)}</p>

          <div class="section-title">Experience</div>
          ${dynamicExperience.map(exp => `
            <div class="item-container">
              <div class="subheading">
                <span class="company">${exp.company}</span>
                <span class="date">${exp.period}</span>
              </div>
              <div class="subheading">
                <span class="role">${exp.role}</span>
              </div>
              <ul class="details-list">
                ${exp.points.map(point => `<li>◦ ${processText(point)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}

          <div class="section-title">Projects</div>
          ${dynamicProjects.map(proj => `
            <div class="project-item">
              <strong>${proj.name}:</strong> ${processText(proj.description)}
            </div>
          `).join('')}

          <div class="section-title">Skills</div>
          <ul class="skills-list">
            <li><strong>Languages:</strong> ${languages}</li>
            <li><strong>Smart Contracts:</strong> ${smartContracts}</li>
            <li><strong>Testing & Security:</strong> ${testingSecurity}</li>
            <li><strong>Blockchain:</strong> ${blockchain}</li>
            <li><strong>Tools:</strong> ${tools}</li>
          </ul>

        </div>
      </body>
      </html>
    `;
  };

  // Generate and download PDF using optimized approach with better error handling
  const generateAndDownloadPDF = async (htmlContent, filename) => {
    try {
      if (!htmlContent || htmlContent.trim() === '') {
        throw new Error('HTML content is empty or invalid');
      }
      const html2canvas = (await import('html2canvas-pro')).default;
      const jsPDF = (await import('jspdf')).default;

      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      // Use fixed dimensions matching the page for consistent rendering
      container.style.width = '8.5in';
      container.style.height = '11in';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';

      document.body.appendChild(container);
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for render

      const canvas = await html2canvas(container.querySelector('.page'), {
        scale: 2, // High resolution
        useCORS: true,
        allowTaint: true,
        width: container.querySelector('.page').offsetWidth,
        height: container.querySelector('.page').offsetHeight,
      });

      document.body.removeChild(container); // Clean up

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter' // Use 'letter' paper size (8.5x11 inches)
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 8.5, 11);
      pdf.save(filename);
      return true;

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
      const employeesResponse = await axios.get('/api/employees');
      const allEmployees = employeesResponse.data;

      const filteredEmployees = allEmployees.filter(emp => {
        if (!emp.resumeData) return false;
        const resumeDataForType = emp.resumeData[type];
        return resumeDataForType?.experience?.length > 0;
      });

      if (filteredEmployees.length === 0) {
        throw new Error(`No employees found with valid ${type} resume data.`);
      }

      setProgress({
        current: 0,
        total: filteredEmployees.length,
        currentEmployee: '',
        status: 'generating'
      });

      for (let i = 0; i < filteredEmployees.length; i++) {
        if (isCancelled) break;

        const employee = filteredEmployees[i];
        const employeeName = employee.name.replace(/[^a-zA-Z0-9]/g, '_');

        setProgress(prev => ({
          ...prev,
          current: i + 1,
          currentEmployee: employee.name,
        }));

        try {
          // Note: The `resumeType` argument is now ignored as we use one template
          const resumeHTML = generateHighQualityResumeHTML(employee, jobDescription);
          const filename = `${employeeName}_resume.pdf`;
          await generateAndDownloadPDF(resumeHTML, filename);

          if (i < filteredEmployees.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        } catch (error) {
          console.error(`Failed to generate resume for ${employee.name}:`, error);
          continue;
        }
      }

      setProgress(prev => ({ ...prev, current: filteredEmployees.length, status: 'completed' }));
    } catch (error) {
      console.error('Bulk resume generation failed:', error);
      setProgress(prev => ({ ...prev, status: 'error' }));
    } finally {
      setIsGenerating(false);
      setIsCancelled(false);
      setTimeout(() => setProgress(prev => ({ ...prev, status: 'idle' })), 2000);
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