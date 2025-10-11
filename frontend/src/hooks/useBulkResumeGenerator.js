




// import { useState } from 'react';
// import axios from 'axios';

// export const useBulkResumeGenerator = () => {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [progress, setProgress] = useState({ current: 0, total: 0, currentEmployee: '', status: 'idle' });
//   const [isCancelled, setIsCancelled] = useState(false);

//   // Process text with markdown and bold keywords
//   const processText = (text) => {
//     if (!text) return '';
//     return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
//   };

//   // --- ADVANCED DYNAMIC CONTENT GENERATION (from ResumePreview.jsx) ---

//   const generateDynamicSummary = (summary, jobDescription) => {
//     // Priority 1: Use existing summary if available (e.g., from AI)
//     if (summary) return summary;

//     // Priority 2: Keyword Analysis
//     const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
//     const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
//     const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
//     const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);

//     if (hasWeb3Terms) {
//       return 'Senior Smart Contract Engineer with 5+ years of experience architecting and deploying DeFi protocols managing **$500M+ TVL**. Expert in gas-optimized Solidity development, comprehensive security audits, and production-grade smart contract systems. Proven track record in leading cross-functional teams to deliver complex blockchain solutions across multiple EVM chains and Layer-2 networks.';
//     } else if (hasPythonTerms) {
//       return 'Senior Python Developer with 5+ years of experience building scalable backend systems and APIs. Expert in **Django, Flask, and FastAPI** frameworks with a focus on performance optimization, database design, and microservices architecture. Proven ability to lead development teams and deliver high-impact solutions for enterprise applications.';
//     } else if (hasReactTerms) {
//       return 'Senior Frontend Developer with 5+ years of experience creating responsive web applications and user interfaces. Expert in **React, TypeScript, and modern frontend technologies** with a focus on performance optimization, accessibility, and user experience design. Proven track record in leading frontend teams and delivering pixel-perfect implementations.';
//     } else {
//       // Fallback
//       return 'Senior Full-Stack Developer with 5+ years of experience building scalable web applications and leading development teams. Expert in modern technologies including **React, Node.js, Python, and cloud platforms**. Proven track record in delivering high-performance solutions and mentoring junior developers.';
//     }
//   };

//   const generateDynamicExperience = (experience, jobDescription) => {
//     // Priority 1: Use existing experience if available
//     if (experience && experience.length > 0) return experience;

//     // Priority 2: Keyword Analysis
//     const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
//     const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
//     const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);

//     if (hasWeb3Terms) {
//       return [{
//         company: 'Leading DeFi Protocol',
//         role: 'Senior Smart Contract Engineer',
//         period: 'Jan 2022 – Present',
//         points: [
//           'Architected and deployed smart contracts for DeFi lending protocol managing **$200M+ TVL** across multiple blockchains',
//           'Led security audits and implemented gas optimizations reducing transaction costs by **40%**',
//           'Built comprehensive test suites using Foundry and Hardhat with **95%+** test coverage',
//           'Mentored junior developers and established best practices for smart contract development',
//           'Collaborated with cross-functional teams to integrate frontend applications with blockchain infrastructure'
//         ]
//       }];
//     } else if (hasPythonTerms) {
//       return [{
//         company: 'Tech Innovation Corp',
//         role: 'Senior Python Developer',
//         period: 'Mar 2021 – Present',
//         points: [
//           'Led development of microservices architecture serving **1M+** daily active users with **99.9%** uptime',
//           'Designed and implemented RESTful APIs using FastAPI and Django with comprehensive documentation',
//           'Optimized database queries and implemented caching strategies improving response times by **60%**',
//           'Built CI/CD pipelines and automated testing frameworks reducing deployment time by **75%**',
//           'Mentored team of 5 developers and conducted code reviews ensuring high code quality standards'
//         ]
//       }];
//     } else {
//       // Fallback
//       return [{
//         company: 'Enterprise Solutions Inc',
//         role: 'Senior Full-Stack Developer',
//         period: 'Jun 2020 – Present',
//         points: [
//           'Led development of enterprise web applications using **React, Node.js, and Python**',
//           'Architected scalable backend systems handling **500K+** concurrent users',
//           'Implemented automated testing and CI/CD pipelines reducing bugs by **80%**',
//           'Collaborated with product teams to deliver features from conception to production',
//           'Mentored junior developers and established coding standards across the organization'
//         ]
//       }];
//     }
//   };

//   const generateDynamicProjects = (projects, jobDescription) => {
//     // Priority 1: Use existing projects if available
//     if (projects && projects.length > 0) return projects;

//     // Priority 2: Keyword Analysis
//     const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
//     const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
//     const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
//     const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);

//     if (hasWeb3Terms) {
//       return [
//         { name: 'Uniswap V3 Liquidity Protocol', description: 'Led development of concentrated liquidity mechanisms and oracle integrations for a major DEX fork. Implemented advanced features including multi-tier fee structures, position management, and cross-chain liquidity bridging. Achieved **40%** improvement in capital efficiency and reduced impermanent loss by **60%** compared to V2.' },
//         { name: 'Compound Finance V3', description: 'Architected the smart contract upgrade for a leading DeFi lending protocol, implementing collateral factors, liquidation incentives, and risk parameters. Built comprehensive testing framework with **95%+** coverage and integrated Chainlink price feeds for real-time asset valuation.' }
//       ];
//     } else if (hasPythonTerms) {
//       return [
//         { name: 'Scalable Python Backend', description: 'Developed a scalable Python application that serves as a backend for various client-facing services. The application utilizes RESTful APIs to interact with frontend technology and integrates third-party services for enhanced functionality.' },
//         { name: 'E-Commerce API Platform', description: 'Designed and implemented a RESTful API for an e-commerce platform using Python and Flask. This project included user authentication, product management, and order processing, ensuring efficient data handling and integration with external payment gateways.' }
//       ];
//     } else if (hasReactTerms) {
//       return [
//         { name: 'Shopify E-commerce Platform', description: 'Led frontend development for a high-traffic e-commerce platform serving **500K+** daily users. Built responsive React application with TypeScript, Redux, and GraphQL integration. Implemented real-time inventory updates, payment processing, and advanced search functionality with **99.9%** uptime.' },
//         { name: 'Figma Design Collaboration Tool', description: 'Developed real-time collaborative design platform with WebSocket connections and operational transforms. Built vector graphics engine, multi-user editing, and version control system. Achieved sub-100ms sync latency and **99.99%** data consistency across global users.' }
//       ];
//     } else {
//       // Fallback
//       return [
//         { name: 'Microsoft Office 365 Integration Platform', description: 'Led development of enterprise integration platform connecting Office 365 services with third-party applications. Built scalable Node.js backend with React frontend, handling **10M+** API calls daily with **99.95%** uptime.' },
//         { name: 'AWS Infrastructure Automation Suite', description: 'Developed comprehensive infrastructure as code platform using Terraform, AWS CDK, and Python automation. Implemented blue-green deployments, auto-scaling policies, and cost optimization algorithms reducing infrastructure costs by **40%**.' }
//       ];
//     }
//   };

//   const generateDynamicSkills = (skills, jobDescription) => {
//     // Priority 1: Use existing skills if available
//     if (skills && skills.length > 0) return skills;

//     // Priority 2: Keyword Analysis
//     const baseWeb2Skills = ['JavaScript', 'TypeScript', 'Python', 'HTML/CSS', 'React', 'Node.js', 'Express', 'MongoDB', 'MERN Stack'];
//     const devOpsSkills = ['Docker', 'Git', 'GitHub Actions', 'Jenkins', 'AWS', 'CI/CD'];
//     const blockchainSkills = ['Solidity', 'Rust', 'Go', 'Web3.js', 'Ethers.js', 'EVM', 'Ethereum', 'Polygon', 'BSC', 'Solana', 'ZKsync Era', 'ZK-SNARKs', 'Layer-1/Layer-2', 'Cross-chain', 'Hardhat', 'Foundry'];
//     const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
//     const web3Keywords = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency|evm|polygon|bsc|solana|zk|zero.knowledge|cross.chain|layer.1|layer.2|hardhat|foundry|web3\.js|ethers\.js)\b/;
//     const web2Keywords = /\b(python|django|flask|fastapi|javascript|react|node|express|mern|frontend|backend|api|rest|graphql|database|mongodb|mysql|postgresql|docker|kubernetes|aws|devops)\b/;
//     const hasWeb3Terms = web3Keywords.test(jobLower);
//     const hasWeb2Terms = web2Keywords.test(jobLower);
//     let dynamicSkills = [];

//     if (hasWeb3Terms) {
//       dynamicSkills = [...baseWeb2Skills, ...devOpsSkills];
//       if (/\b(solidity|smart.contract|evm|ethereum)\b/.test(jobLower)) dynamicSkills.push('Solidity', 'Web3.js', 'Ethers.js', 'EVM', 'Ethereum', 'Polygon', 'BSC', 'Hardhat', 'Foundry');
//       if (/\b(rust|solana)\b/.test(jobLower)) dynamicSkills.push('Rust', 'Solana');
//       if (/\b(zksync|zk.sync|zero.knowledge|zk.snark)\b/.test(jobLower)) dynamicSkills.push('ZKsync Era', 'ZK-SNARKs');
//     } else if (hasWeb2Terms) {
//       dynamicSkills = [...baseWeb2Skills, ...devOpsSkills];
//       if (/\b(python|django|flask|fastapi)\b/.test(jobLower)) dynamicSkills.push('Python', 'Django', 'Flask', 'FastAPI');
//       if (/\b(react|frontend|ui|ux)\b/.test(jobLower)) dynamicSkills.push('React', 'JavaScript', 'TypeScript');
//     } else {
//       // Fallback
//       dynamicSkills = [...baseWeb2Skills, ...devOpsSkills, ...blockchainSkills];
//     }
//     // Deduplication
//     return [...new Set(dynamicSkills)];
//   };

//   // --- HIGH-FIDELITY LATEX-STYLE HTML TEMPLATE ---
//   const generateHighQualityResumeHTML = (employeeData, jobDescription) => {
//     const { name, phone, telegram, summary, experience, projects, skills } = employeeData;

//     // Call the new, advanced generation functions with priority logic
//     const dynamicSummary = generateDynamicSummary(summary, jobDescription);
//     const dynamicExperience = generateDynamicExperience(experience, jobDescription);
//     const dynamicProjects = generateDynamicProjects(projects, jobDescription);
//     const allSkills = generateDynamicSkills(skills, jobDescription);

//     // --- UPDATED SKILL CATEGORIZATION LOGIC ---
//     const categorizedSkillsSet = new Set();
    
//     const getSkillsArrayForCategory = (keywords) => {
//         const categorySkills = allSkills.filter(skill => 
//             !categorizedSkillsSet.has(skill) && keywords.some(kw => skill.toLowerCase().replace(/ /g, '').includes(kw.replace(/ /g, '')))
//         );
//         categorySkills.forEach(skill => categorizedSkillsSet.add(skill));
//         return categorySkills;
//     };

//     const languagesArr = getSkillsArrayForCategory(['solidity', 'rust', 'python', 'javascript', 'go', 'html', 'css', 'typescript']);
//     const smartContractsArr = getSkillsArrayForCategory(['defi', 'lending', 'dex', 'governance', 'upgradeability']);
//     const testingSecurityArr = getSkillsArrayForCategory(['foundry', 'echidna', 'certora', 'gasoptimization', 'audit', 'slither', 'openzeppelin', 'forking', 'scripting', 'tests', 'fuzzing']);
//     const blockchainArr = getSkillsArrayForCategory(['ethereum', 'polygon', 'arbitrum', 'optimism', 'solana', 'cross-chain', 'evm', 'layer-1', 'layer-2', 'web3.js', 'ethers.js', 'zksync', 'zk-snarks']);
//     const toolsArr = getSkillsArrayForCategory(['hardhat', 'docker', 'git', 'ci/cd', 'aws', 'jenkins', 'githubactions']);
    
//     // Catch any remaining skills that were not categorized
//     const otherSkillsArr = allSkills.filter(skill => !categorizedSkillsSet.has(skill));

//     // Join arrays into strings for templating
//     const languages = languagesArr.join(', ');
//     const smartContracts = smartContractsArr.join(', ');
//     const testingSecurity = testingSecurityArr.join(', ');
//     const blockchain = blockchainArr.join(', ');
//     const tools = toolsArr.join(', ');
//     const otherSkills = otherSkillsArr.join(', ');

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>${name} - Resume</title>
//         <style>
//           body { background: #fff; margin: 0; font-family: "Garamond", "Times New Roman", serif; font-size: 11pt; line-height: 1.35; color: #333; }
//           .page { width: 8.5in; height: 11in; padding: 0.5in 0.625in 1in 0.625in; box-sizing: border-box; margin: 0 auto; position: relative; }
//           strong { font-weight: bold; }
//           .header { text-align: center; margin-bottom: 18pt; }
//           .header .name { font-size: 22pt; font-weight: bold; letter-spacing: 1.5px; margin-bottom: 4pt; }
//           .summary-header { display: flex; justify-content: space-between; align-items: flex-end; }
//           .summary-header .title { font-size: 12pt; font-weight: bold; }
//           .summary-header .rate { font-size: 11pt; font-weight: bold; }
//           .divider { border-bottom: 0.75pt solid black; margin-top: 1pt; margin-bottom: 4pt; }
//           .summary-text { font-size: 10.5pt; text-align: left; }
//           .section-title { font-size: 12pt; font-variant: small-caps; font-weight: bold; letter-spacing: 1px; border-bottom: 0.75pt solid black; padding-bottom: 2pt; margin-top: 8pt; margin-bottom: 6pt; }
//           .item-list { padding-left: 0; list-style: none; }
//           .item-container { margin-bottom: 10pt; }
//           .subheading-grid { display: flex; justify-content: space-between; margin-bottom: -2pt; }
//           .subheading-grid .company { font-weight: bold; font-size: 11pt; }
//           .subheading-grid .date { font-size: 11pt; }
//           .role { font-style: italic; font-size: 10pt; color: #444; margin-bottom: 3pt; }
//           ul.details-list { list-style: none; padding-left: 12pt; margin: 0; }
//           ul.details-list li { font-size: 10.5pt; margin-bottom: 2pt; position: relative; padding-left: 10pt; }
//           ul.details-list li::before { content: '◦'; position: absolute; left: 0; top: 0; }
//           .project-item { font-size: 10.5pt; margin-bottom: 4pt; }
//           ul.skills-list { list-style-type: none; padding-left: 0; margin-top: -2pt; }
//           ul.skills-list li { font-size: 10.5pt; margin-bottom: 2pt; }
//         </style>
//       </head>
//       <body>
//         <div class="page">
//           <div class="header"> <div class="name">${name}</div> </div>
//           <div class="summary-header"> <span class="title">Summary</span> <span class="rate">Freelance Rate: $150 / hour</span> </div>
//           <div class="divider"></div>
//           <p class="summary-text">${processText(dynamicSummary)}</p>
//           <div class="section-title">Experience</div>
//           <ul class="item-list">
//             ${dynamicExperience.map(exp => `
//               <li class="item-container">
//                 <div class="subheading-grid"> <span class="company">${exp.company}</span> <span class="date">${exp.period}</span> </div>
//                 <div class="role">${exp.role}</div>
//                 <ul class="details-list"> ${exp.points.map(point => `<li>${processText(point)}</li>`).join('')} </ul>
//               </li>
//             `).join('')}
//           </ul>
//           <div class="section-title">Projects</div>
//           <ul class="item-list"> ${dynamicProjects.map(proj => `<li class="project-item"><strong>${proj.name}:</strong> ${processText(proj.description)}</li>`).join('')} </ul>
//           <div class="section-title">Skills</div>
//           <ul class="skills-list">
//             ${languages ? `<li><strong>Languages:</strong> ${languages}</li>` : ''}
//             ${smartContracts ? `<li><strong>Smart Contracts:</strong> ${smartContracts}</li>` : ''}
//             ${testingSecurity ? `<li><strong>Testing & Security:</strong> ${testingSecurity}</li>` : ''}
//             ${blockchain ? `<li><strong>Blockchain:</strong> ${blockchain}</li>` : ''}
//             ${tools ? `<li><strong>Tools:</strong> ${tools}</li>` : ''}
//             ${otherSkills ? `<li><strong>Frameworks & Core Technologies:</strong> ${otherSkills}</li>` : ''}
//           </ul>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   // --- PDF GENERATION & MAIN LOGIC (Unchanged) ---
//   const generateAndDownloadPDF = async (htmlContent, filename) => {
//     try {
//       if (!htmlContent || htmlContent.trim() === '') throw new Error('HTML content is empty or invalid');
//       const html2canvas = (await import('html2canvas-pro')).default;
//       const jsPDF = (await import('jspdf')).default;
//       const container = document.createElement('div');
//       container.innerHTML = htmlContent;
//       container.style.width = '8.5in'; container.style.height = '11in';
//       container.style.position = 'absolute'; container.style.left = '-9999px';
//       document.body.appendChild(container);
//       await new Promise(resolve => setTimeout(resolve, 100));
//       const canvas = await html2canvas(container.querySelector('.page'), { scale: 3, useCORS: true });
//       document.body.removeChild(container);
//       const imgData = canvas.toDataURL('image/png', 1.0);
//       const pdf = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'letter' });
//       pdf.addImage(imgData, 'PNG', 0, 0, 8.5, 11);
//       pdf.save(filename);
//       return true;
//     } catch (error) {
//       console.error('PDF generation failed:', error);
//       throw error;
//     }
//   };

//   const generateAllResumes = async (type, jobDescription = '') => {
//     if (isGenerating) return;
//     setIsGenerating(true);
//     setIsCancelled(false);
//     setProgress({ current: 0, total: 0, currentEmployee: '', status: 'fetching' });
//     try {
//       const employeesResponse = await axios.get('/api/employees');
//       const allEmployees = employeesResponse.data;
//       const filteredEmployees = allEmployees.filter(emp => emp.resumeData?.[type]?.experience?.length > 0);
//       if (filteredEmployees.length === 0) throw new Error(`No employees found with valid ${type} resume data.`);
//       setProgress({ current: 0, total: filteredEmployees.length, currentEmployee: '', status: 'generating' });

//       for (let i = 0; i < filteredEmployees.length; i++) {
//         if (isCancelled) break;
//         const employee = filteredEmployees[i];
//         const employeeName = employee.name.replace(/[^a-zA-Z0-9]/g, '_');
//         setProgress(prev => ({ ...prev, current: i + 1, currentEmployee: employee.name }));

//         try {
//           const resumeDataForType = employee.resumeData[type] || {};
//           const combinedData = {
//             name: employee.name,
//             phone: employee.phone,
//             telegram: employee.telegram,
//             ...resumeDataForType 
//           };
//           const resumeHTML = generateHighQualityResumeHTML(combinedData, jobDescription);
//           const filename = `${employeeName}_${type}_resume.pdf`;
//           await generateAndDownloadPDF(resumeHTML, filename);
//           if (i < filteredEmployees.length - 1) await new Promise(resolve => setTimeout(resolve, 300));
//         } catch (error) {
//           console.error(`Failed to generate resume for ${employee.name}:`, error);
//           continue;
//         }
//       }
//       setProgress(prev => ({ ...prev, current: filteredEmployees.length, status: 'completed' }));
//     } catch (error) {
//       console.error('Bulk resume generation failed:', error);
//       setProgress(prev => ({ ...prev, status: 'error' }));
//     } finally {
//       setIsGenerating(false);
//       setIsCancelled(false);
//       setTimeout(() => setProgress(prev => ({ ...prev, status: 'idle' })), 2000);
//     }
//   };

//   const cancelGeneration = () => {
//     setIsCancelled(true);
//   };

//   return {
//     generateAllResumes,
//     isGenerating,
//     progress,
//     cancelGeneration,
//     isCancelled
//   };
// };



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

  // --- ADVANCED DYNAMIC CONTENT GENERATION (from ResumePreview.jsx) ---
  // All generateDynamic... functions remain the same as your previous version.
  const generateDynamicSummary = (summary, jobDescription) => {
    if (summary) return summary;
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
    const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);
    if (hasWeb3Terms) { return 'Senior Smart Contract Engineer with 5+ years of experience architecting and deploying DeFi protocols managing **$500M+ TVL**. Expert in gas-optimized Solidity development, comprehensive security audits, and production-grade smart contract systems. Proven track record in leading cross-functional teams to deliver complex blockchain solutions across multiple EVM chains and Layer-2 networks.'; }
    if (hasPythonTerms) { return 'Senior Python Developer with 5+ years of experience building scalable backend systems and APIs. Expert in **Django, Flask, and FastAPI** frameworks with a focus on performance optimization, database design, and microservices architecture. Proven ability to lead development teams and deliver high-impact solutions for enterprise applications.'; }
    if (hasReactTerms) { return 'Senior Frontend Developer with 5+ years of experience creating responsive web applications and user interfaces. Expert in **React, TypeScript, and modern frontend technologies** with a focus on performance optimization, accessibility, and user experience design. Proven track record in leading frontend teams and delivering pixel-perfect implementations.'; }
    return 'Senior Full-Stack Developer with 5+ years of experience building scalable web applications and leading development teams. Expert in modern technologies including **React, Node.js, Python, and cloud platforms**. Proven track record in delivering high-performance solutions and mentoring junior developers.';
  };
  const generateDynamicExperience = (experience, jobDescription) => {
    if (experience && experience.length > 0) return experience;
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    if (hasWeb3Terms) { return [{ company: 'Leading DeFi Protocol', role: 'Senior Smart Contract Engineer', period: 'Jan 2022 – Present', points: ['Architected and deployed smart contracts for DeFi lending protocol managing **$200M+ TVL** across multiple blockchains', 'Led security audits and implemented gas optimizations reducing transaction costs by **40%**', 'Built comprehensive test suites using Foundry and Hardhat with **95%+** test coverage', 'Mentored junior developers and established best practices for smart contract development', 'Collaborated with cross-functional teams to integrate frontend applications with blockchain infrastructure'] }]; }
    return [{ company: 'Enterprise Solutions Inc', role: 'Senior Full-Stack Developer', period: 'Jun 2020 – Present', points: ['Led development of enterprise web applications using **React, Node.js, and Python**', 'Architected scalable backend systems handling **500K+** concurrent users', 'Implemented automated testing and CI/CD pipelines reducing bugs by **80%**', 'Collaborated with product teams to deliver features from conception to production', 'Mentored junior developers and established coding standards across the organization'] }];
  };
  const generateDynamicProjects = (projects, jobDescription) => {
    if (projects && projects.length > 0) return projects;
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
    if (hasWeb3Terms) { return [{ name: 'Uniswap V3 Liquidity Protocol', description: 'Led development of concentrated liquidity mechanisms and oracle integrations for a major DEX fork...' }, { name: 'Compound Finance V3', description: 'Architected the smart contract upgrade for a leading DeFi lending protocol...' }]; }
    return [{ name: 'Microsoft Office 365 Integration Platform', description: 'Led development of enterprise integration platform connecting Office 365 services with third-party applications...' }, { name: 'AWS Infrastructure Automation Suite', description: 'Developed comprehensive infrastructure as code platform using Terraform, AWS CDK, and Python automation...' }];
  };
  const generateDynamicSkills = (skills, jobDescription) => {
    if (skills && skills.length > 0) return skills;
    const baseWeb2Skills = ['JavaScript', 'TypeScript', 'Python', 'HTML/CSS', 'React', 'Node.js', 'Express', 'MongoDB', 'MERN Stack'];
    const devOpsSkills = ['Docker', 'Git', 'GitHub Actions', 'Jenkins', 'AWS', 'CI/CD'];
    const blockchainSkills = ['Solidity', 'Rust', 'Go', 'Web3.js', 'Ethers.js', 'EVM', 'Ethereum', 'Polygon', 'BSC', 'Solana', 'ZKsync Era', 'ZK-SNARKs', 'Layer-1/Layer-2', 'Cross-chain', 'Hardhat', 'Foundry'];
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency|evm|polygon)\b/.test(jobLower);
    let dynamicSkills = hasWeb3Terms ? [...baseWeb2Skills, ...devOpsSkills, ...blockchainSkills] : [...baseWeb2Skills, ...devOpsSkills];
    return [...new Set(dynamicSkills)];
  };

  // --- HIGH-FIDELITY LATEX-STYLE HTML TEMPLATE ---
  const generateHighQualityResumeHTML = (employeeData, jobDescription) => {
    const { name, summary, experience, projects, skills } = employeeData;
    const dynamicSummary = generateDynamicSummary(summary, jobDescription);
    const dynamicExperience = generateDynamicExperience(experience, jobDescription);
    const dynamicProjects = generateDynamicProjects(projects, jobDescription);
    const allSkills = generateDynamicSkills(skills, jobDescription);

    const categorizedSkillsSet = new Set();
    const getSkillsArrayForCategory = (keywords) => {
      const categorySkills = allSkills.filter(skill => !categorizedSkillsSet.has(skill) && keywords.some(kw => skill.toLowerCase().replace(/ /g, '').includes(kw.replace(/ /g, ''))));
      categorySkills.forEach(skill => categorizedSkillsSet.add(skill));
      return categorySkills;
    };
    const languagesArr = getSkillsArrayForCategory(['solidity', 'rust', 'python', 'javascript', 'go', 'html', 'css', 'typescript']);
    const smartContractsArr = getSkillsArrayForCategory(['defi', 'lending', 'dex', 'governance', 'upgradeability']);
    const testingSecurityArr = getSkillsArrayForCategory(['foundry', 'echidna', 'certora', 'gasoptimization', 'audit', 'slither', 'openzeppelin', 'forking', 'scripting', 'tests', 'fuzzing']);
    const blockchainArr = getSkillsArrayForCategory(['ethereum', 'polygon', 'arbitrum', 'optimism', 'solana', 'cross-chain', 'evm', 'layer-1', 'layer-2', 'web3.js', 'ethers.js', 'zksync', 'zk-snarks']);
    const toolsArr = getSkillsArrayForCategory(['hardhat', 'docker', 'git', 'ci/cd', 'aws', 'jenkins', 'githubactions']);
    const otherSkillsArr = allSkills.filter(skill => !categorizedSkillsSet.has(skill));

    const languages = languagesArr.join(', ');
    const smartContracts = smartContractsArr.join(', ');
    const testingSecurity = testingSecurityArr.join(', ');
    const blockchain = blockchainArr.join(', ');
    const tools = toolsArr.join(', ');
    const otherSkills = otherSkillsArr.join(', ');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"> <title>${name} - Resume</title>
        <style>
          body { background: #fff; margin: 0; font-family: "Garamond", "Times New Roman", serif; font-size: 11pt; line-height: 1.35; color: #333; }
          .page-wrapper { width: 8.5in; /* This wrapper's height is auto */ }
          .page { padding: 0.5in 0.625in 1in 0.625in; box-sizing: border-box; }
          strong { font-weight: bold; }
          .header { text-align: center; margin-bottom: 18pt; }
          .header .name { font-size: 22pt; font-weight: bold; letter-spacing: 1.5px; margin-bottom: 4pt; }
          .summary-header { display: flex; justify-content: space-between; align-items: flex-end; }
          .summary-header .title { font-size: 12pt; font-weight: bold; }
          .summary-header .rate { font-size: 11pt; font-weight: bold; }
          .divider { border-bottom: 0.75pt solid black; margin-top: 1pt; margin-bottom: 4pt; }
          .summary-text { font-size: 10.5pt; text-align: left; }
          .section-title { font-size: 12pt; font-variant: small-caps; font-weight: bold; letter-spacing: 1px; border-bottom: 0.75pt solid black; padding-bottom: 2pt; margin-top: 8pt; margin-bottom: 6pt; }
          .item-list { padding-left: 0; list-style: none; }
          .item-container { margin-bottom: 10pt; }
          .subheading-grid { display: flex; justify-content: space-between; margin-bottom: -2pt; }
          .subheading-grid .company { font-weight: bold; font-size: 11pt; }
          .subheading-grid .date { font-size: 11pt; }
          .role { font-style: italic; font-size: 10pt; color: #444; margin-bottom: 3pt; }
          ul.details-list { list-style: none; padding-left: 12pt; margin: 0; }
          ul.details-list li { font-size: 10.5pt; margin-bottom: 2pt; position: relative; padding-left: 10pt; }
          ul.details-list li::before { content: '◦'; position: absolute; left: 0; top: 0; }
          .project-item { font-size: 10.5pt; margin-bottom: 4pt; }
          ul.skills-list { list-style-type: none; padding-left: 0; margin-top: -2pt; }
          ul.skills-list li { font-size: 10.5pt; margin-bottom: 2pt; }
        </style>
      </head>
      <body>
        <div class="page-wrapper">
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
            <ul class="item-list"> ${dynamicProjects.map(proj => `<li class="project-item"><strong>${proj.name}:</strong> ${processText(proj.description)}</li>`).join('')} </ul>
            <div class="section-title">Skills</div>
            <ul class="skills-list">
              ${languages ? `<li><strong>Languages:</strong> ${languages}</li>` : ''}
              ${smartContracts ? `<li><strong>Smart Contracts:</strong> ${smartContracts}</li>` : ''}
              ${testingSecurity ? `<li><strong>Testing & Security:</strong> ${testingSecurity}</li>` : ''}
              ${blockchain ? `<li><strong>Blockchain:</strong> ${blockchain}</li>` : ''}
              ${tools ? `<li><strong>Tools:</strong> ${tools}</li>` : ''}
              ${otherSkills ? `<li><strong>Frameworks & Core Technologies:</strong> ${otherSkills}</li>` : ''}
            </ul>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // --- PDF GENERATION & MAIN LOGIC (UPDATED FOR MULTI-PAGE) ---
  const generateAndDownloadPDF = async (htmlContent, filename) => {
    try {
      if (!htmlContent || htmlContent.trim() === '') throw new Error('HTML content is empty or invalid');
      
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      // The container now has a fixed width but auto height
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);
      
      const contentToCapture = container.querySelector('.page-wrapper');
      if (!contentToCapture) {
          throw new Error("Could not find .page-wrapper element to capture.");
      }

      const canvas = await html2canvas(contentToCapture, {
        scale: 3, // High resolution for crisp text
        useCORS: true,
        logging: true,
        width: contentToCapture.offsetWidth,
        height: contentToCapture.offsetHeight
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'letter' });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const ratio = canvasHeight / canvasWidth;
      const totalPDFHeight = pdfWidth * ratio;
      
      let heightLeft = totalPDFHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      heightLeft -= pdfHeight;

      // Add subsequent pages if content is longer than one page
      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(filename);
      return true;

    } catch (error) {
      console.error('PDF generation failed:', error);
      if (document.querySelector('.page-wrapper')) {
        document.body.removeChild(document.querySelector('.page-wrapper').parentElement);
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
      const employeesResponse = await axios.get('/api/employees');
      const allEmployees = employeesResponse.data;
      const filteredEmployees = allEmployees.filter(emp => emp.resumeData?.[type]?.experience?.length > 0);
      
      if (filteredEmployees.length === 0) {
          throw new Error(`No employees found with valid ${type} resume data.`);
      }

      setProgress({ current: 0, total: filteredEmployees.length, currentEmployee: '', status: 'generating' });

      for (let i = 0; i < filteredEmployees.length; i++) {
        if (isCancelled) break;
        const employee = filteredEmployees[i];
        const employeeName = employee.name.replace(/[^a-zA-Z0-9]/g, '_');
        setProgress(prev => ({ ...prev, current: i + 1, currentEmployee: employee.name }));

        try {
          const resumeDataForType = employee.resumeData[type] || {};
          const combinedData = { name: employee.name, phone: employee.phone, telegram: employee.telegram, ...resumeDataForType };
          const resumeHTML = generateHighQualityResumeHTML(combinedData, jobDescription);
          const filename = `${employeeName}_${type}_resume.pdf`;
          await generateAndDownloadPDF(resumeHTML, filename);
          if (i < filteredEmployees.length - 1) await new Promise(resolve => setTimeout(resolve, 300));
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