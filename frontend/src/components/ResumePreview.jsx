
import { useRef, useEffect } from 'react';
import { FaEdit, FaShareAlt } from 'react-icons/fa';
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
  const { name, phone, telegram, experience, projects, skills, summary, templateType, styling, latexContent, jobDescription } = resumeData;
  const resumeRef = useRef(null);

  // Function to generate dynamic professional summary based on job description
  const generateDynamicSummary = () => {
    if (summary) return summary; // Use provided summary if available

    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
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

  // Function to generate dynamic experience content
  const generateDynamicExperience = () => {
    if (experience && experience.length > 0) return experience; // Use provided experience if available

    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
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

  // Function to generate dynamic projects based on job description
  const generateDynamicProjects = () => {
    if (projects && projects.length > 0) return projects; // Use provided projects if available

    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();
    const hasWeb3Terms = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency)\b/.test(jobLower);
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
        },
        {
          name: 'OpenSea NFT Marketplace',
          description: 'Developed core marketplace contracts for a major NFT platform, implementing EIP-2981 royalty standard, bulk operations, and gas-efficient batch transfers. Integrated with multiple blockchains and achieved 99.9% uptime with sub-second transaction finality.'
        },
        {
          name: 'Chainlink Price Feeds Integration',
          description: 'Built decentralized price oracle system for DeFi protocols, implementing multiple data source aggregation and deviation thresholds. Reduced oracle latency by 75% and increased reliability to 99.99% uptime across 50+ price pairs.'
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
        },
        {
          name: 'Data Integration Service',
          description: 'Created a data integration service that connects multiple external APIs to aggregate data for analytical purposes. This Python-based solution optimized data retrieval processes and included comprehensive unit and integration tests to ensure reliability and maintainability.'
        },
        {
          name: 'CI/CD Pipeline Automation',
          description: 'Led the implementation of a CI/CD pipeline using GitHub Actions for a Python application, automating testing and deployment processes. This project significantly improved deployment frequency and reduced the time to market for new features.'
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
        },
        {
          name: 'Discord Voice Chat Application',
          description: 'Created low-latency voice communication system with WebRTC integration, noise suppression, and echo cancellation. Implemented user presence indicators, channel management, and cross-platform compatibility. Served 100M+ concurrent users with <50ms audio latency.'
        },
        {
          name: 'Notion Workspace Platform',
          description: 'Built comprehensive workspace application with real-time collaboration, rich text editing, and database functionality. Implemented block-based architecture, drag-and-drop interface, and seamless data synchronization across devices and users.'
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
        },
        {
          name: 'Salesforce CRM Enhancement Platform',
          description: 'Built custom CRM solution extending Salesforce capabilities with advanced reporting, workflow automation, and third-party integrations. Processed 50M+ records daily with real-time synchronization and 99.99% data accuracy.'
        },
        {
          name: 'GitHub Enterprise Analytics Dashboard',
          description: 'Created comprehensive analytics platform for code repositories, developer productivity, and project management. Implemented real-time metrics, predictive analytics, and interactive visualizations serving 100K+ developers across Fortune 500 companies.'
        }
      ];
    }
  };
  const generateDynamicSkills = () => {
    if (!skills || !Array.isArray(skills)) return [];

    // Base web2 skills that always remain for web2 jobs
    const baseWeb2Skills = [
      'JavaScript', 'TypeScript', 'Python', 'HTML/CSS', 'React', 'Node.js', 'Express', 'MongoDB', 'MERN Stack'
    ];

    // DevOps/Tools skills that always remain
    const devOpsSkills = [
      'Docker', 'Git', 'GitHub Actions', 'Jenkins', 'AWS', 'CI/CD'
    ];

    // Blockchain skills for web3 jobs
    const blockchainSkills = [
      'Solidity', 'Rust', 'Go', 'Web3.js', 'Ethers.js', 'EVM', 'Ethereum', 'Polygon', 'BSC',
      'Solana', 'ZKsync Era', 'ZK-SNARKs', 'Layer-1/Layer-2', 'Cross-chain', 'Hardhat', 'Foundry'
    ];

    // Analyze job description to determine requirements
    const jobLower = (typeof jobDescription === 'string' ? jobDescription : '').toLowerCase();

    // Enhanced detection with priority for web3
    const web3Keywords = /\b(blockchain|web3|solidity|ethereum|smart.contract|defi|dao|nft|cryptocurrency|evm|polygon|bsc|solana|zk|zero.knowledge|cross.chain|layer.1|layer.2|hardhat|foundry|web3\.js|ethers\.js|truffle|brownie|vyper|chainlink|the.graph|ipfs|tokenomics|dao|governance|defi|lending|dex|amm|yield.farming|liquidity|staking|nft|erc.20|erc.721|erc.1155|gas.optimization|security.audit|formal.verification|mev|arbitrage|flash.loan|bridge|cross.chain|interoperability|rollup|optimistic|zk.rollup|plasma|sidechain|parachain|substrate|polkadot|cosmos|avalanche|near|celo|harmony|fantom|arbitrum|optimism|base|mantle|linea|scroll|taiko|polygon.zk|starknet|aztec|loopring|zksync|mina|aleo|o1js|circom|snarkjs|gnark|halo2|plonk|groth16|kimchi|miden|cairo|noir|leo|move|sui|aptos|fuel|starkware|matter.labs|connext|celer|multichain|wormhole|axelar|router.protocol|hop.protocol|across|synapse|orbiter|owlto|bungee|meson|darwinia|nomad|optics|connext|celer|wormhole|axelar|router|hop|across|synapse|orbiter|owlto|bungee|meson|darwinia|nomad|optics)\b/;
    const web2Keywords = /\b(python|django|flask|fastapi|javascript|react|node|express|mern|frontend|backend|api|rest|graphql|database|mongodb|mysql|postgresql|docker|kubernetes|aws|azure|gcp|testing|pytest|unittest|devops|fullstack|microservices|serverless|lambda|cloudformation|terraform|ansible|chef|puppet|jenkins|gitlab|bitbucket|jira|confluence|slack|discord|zoom|teams|mongodb|redis|elasticsearch|kibana|logstash|prometheus|grafana|datadog|new.relic|sentry|rollbar|bugsnag|raygun|airbrake|papertrail|loggly|splunk|sumologic|cloudwatch|stackdriver|azure.monitor|gcp.monitoring|aws.cloudtrail|lambda|serverless|api.gateway|load.balancer|cdn|cloudfront|cloudflare|akamai|fastly|nginx|apache|tomcat|jetty|iis|express|pm2|supervisor|systemd|monit|supervisor|forever|nodemon|webpack|vite|rollup|parcel|esbuild|babel|typescript|eslint|prettier|husky|lint.staged|commitlint|semantic.release|conventional.commits|storybook|jest|cypress|playwright|selenium|testcafe|puppeteer|mocha|chai|sinon|supertest|artillery|k6|locust|jmeter|gatling|vegeta|wrk|apache.bench|autocannon|clinic|0x|memwatch|heapdump|llnode|gdb|lldb|strace|perf|htop|atop|iotop|iftop|nethogs|vnstat|bandwidthd|darkstat|ntop|etherape|tcpdump|wireshark|tshark|ngrep|iftop|nethogs|vnstat|bandwidthd|darkstat|ntop|etherape|tcpdump|wireshark|tshark|ngrep|ss|netstat|lsof|ps|top|htop|atop|iotop|iftop|nethogs|vnstat|bandwidthd|darkstat|ntop|etherape|tcpdump|wireshark|tshark|ngrep|ss|netstat|lsof|ps|vmstat|iostat|mpstat|sar|dstat|collectd|telegraf|influxdb|victoriametrics|thanos|cortex|grafana|tempo|jaeger|zipkin|opentelemetry|datadog|new.relic|sentry|rollbar|bugsnag|raygun|airbrake|papertrail|loggly|splunk|sumologic|cloudwatch|stackdriver|azure.monitor|gcp.monitoring|aws.cloudtrail|linux|ubuntu|centos|rhel|debian|fedora|alpine|windows|macos|ios|android|react.native|flutter|xamarin|ionic|cordova|phonegap|capacitor|tauri|electron|nw.js|tesseract|opencv|pillow|numpy|pandas|matplotlib|seaborn|scikit.learn|tensorflow|pytorch|keras|mlflow|kubeflow|airflow|luigi|prefect|dagster|dbt|great.expectations|dataform|superset|metabase|redash|tableau|power.bi|looker|quicksight|mode|periscope|chartio|holistics|sisense|domo|thoughtspot|qlik|spotfire|microstrategy|sas|stata|r|julia|matlab|octave|maple|mathematica|sage|sympy|maxima|gap|magma|pari|gp|fricas|axiom|muPAD|derive|mathematica|maple|sage|sympy|maxima|gap|magma|pari|gp|fricas|axiom|muPAD|derive|git|github|gitlab|bitbucket|jira|confluence|slack|discord|zoom|teams|mongodb|redis|elasticsearch|kibana|logstash|prometheus|grafana|datadog|new.relic|sentry|rollbar|bugsnag|raygun|airbrake|papertrail|loggly|splunk|sumologic|cloudwatch|stackdriver|azure.monitor|gcp.monitoring|aws.cloudtrail|linux|ubuntu|centos|rhel|debian|fedora|alpine|windows|macos|ios|android|react.native|flutter|xamarin|ionic|cordova|phonegap|capacitor|tauri|electron|nw.js|tesseract|opencv|pillow|numpy|pandas|matplotlib|seaborn|scikit.learn|tensorflow|pytorch|keras|mlflow|kubeflow|airflow|luigi|prefect|dagster|dbt|great.expectations|dataform|superset|metabase|redash|tableau|power.bi|looker|quicksight|mode|periscope|chartio|holistics|sisense|domo|thoughtspot|qlik|spotfire|microstrategy|sas|stata|r|julia|matlab|octave|maple|mathematica|sage|sympy|maxima|gap|magma|pari|gp|fricas|axiom|muPAD|derive|git|github|gitlab|bitbucket|jira|confluence|slack|discord|zoom|teams|mongodb|redis|elasticsearch|kibana|logstash|prometheus|grafana|datadog|new.relic|sentry|rollbar|bugsnag|raygun|airbrake|papertrail|loggly|splunk|sumologic|cloudwatch|stackdriver|azure.monitor|gcp.monitoring|aws.cloudtrail|linux|ubuntu|centos|rhel|debian|fedora|alpine|windows|macos|ios|android|react.native|flutter|xamarin|ionic|cordova|phonegap|capacitor|tauri|electron|nw.js|tesseract|opencv|pillow|numpy|pandas|matplotlib|seaborn|scikit.learn|tensorflow|pytorch|keras|mlflow|kubeflow|airflow|luigi|prefect|dagster|dbt|great.expectations|dataform|superset|metabase|redash|tableau|power.bi|looker|quicksight|mode|periscope|chartio|holistics|sisense|domo|thoughtspot|qlik|spotfire|microstrategy|sas|stata|r|julia|matlab|octave|maple|mathematica|sage|sympy|maxima|gap|magma|pari|gp|fricas|axiom|muPAD|derive)\b/;

    const hasWeb3Terms = web3Keywords.test(jobLower);
    const hasWeb2Terms = web2Keywords.test(jobLower);

    console.log('Job Detection Debug:', {
      jobLower: jobLower.substring(0, 200) + '...',
      hasWeb3Terms,
      hasWeb2Terms,
      willUseWeb3: hasWeb3Terms,
      willUseWeb2: !hasWeb3Terms && hasWeb2Terms
    });

    let dynamicSkills = [];

    if (hasWeb3Terms) {
      // Web3 job - keep web2 skills + add relevant blockchain skills
      dynamicSkills = [...baseWeb2Skills, ...devOpsSkills];

      // Add blockchain skills based on specific requirements
      if (/\b(solidity|smart.contract|evm|ethereum)\b/.test(jobLower)) {
        dynamicSkills.push('Solidity', 'Web3.js', 'Ethers.js', 'EVM', 'Ethereum', 'Polygon', 'BSC', 'Hardhat', 'Foundry');
      }
      if (/\b(rust|solana)\b/.test(jobLower)) {
        dynamicSkills.push('Rust', 'Solana');
      }
      if (/\b(zksync|zk.sync|zero.knowledge|zk.snark)\b/.test(jobLower)) {
        dynamicSkills.push('ZKsync Era', 'ZK-SNARKs');
      }
      if (/\b(cross.chain|bridge|interoperability)\b/.test(jobLower)) {
        dynamicSkills.push('Cross-chain');
      }
      if (/\b(layer.1|layer.2|l1|l2)\b/.test(jobLower)) {
        dynamicSkills.push('Layer-1/Layer-2');
      }

    } else if (hasWeb2Terms) {
      // Web2 job - only web2 + devops skills, no blockchain skills
      dynamicSkills = [...baseWeb2Skills, ...devOpsSkills];

      // Add job-specific web2 skills based on requirements
      if (/\b(python|django|flask|fastapi)\b/.test(jobLower)) {
        dynamicSkills.push('Python', 'Django', 'Flask', 'FastAPI');
      }
      if (/\b(react|frontend|ui|ux)\b/.test(jobLower)) {
        dynamicSkills.push('React', 'JavaScript', 'TypeScript');
      }
      if (/\b(node|backend|api|express)\b/.test(jobLower)) {
        dynamicSkills.push('Node.js', 'Express', 'REST APIs');
      }
      if (/\b(database|mongodb|mysql|postgresql)\b/.test(jobLower)) {
        dynamicSkills.push('PostgreSQL', 'MySQL');
      }
      if (/\b(docker|kubernetes|aws|azure|gcp|devops)\b/.test(jobLower)) {
        dynamicSkills.push('Docker', 'Kubernetes', 'AWS');
      }
      if (/\b(testing|pytest|unittest)\b/.test(jobLower)) {
        dynamicSkills.push('Unit Testing', 'Pytest');
      }

    } else {
      // Default case - include all skills when no clear indicators
      console.log('Using default skills - no clear job type detected');
      dynamicSkills = [...baseWeb2Skills, ...devOpsSkills, ...blockchainSkills];
    }

    console.log('Generated Skills:', dynamicSkills);
    // Remove duplicates and return
    return [...new Set(dynamicSkills)];
  };

  // Function to process text with markdown and bold keywords
  const processText = (text) => {
    if (!text) return '';

    // First handle existing markdown bold syntax
    let processedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Then apply additional keyword bolding if styling is available
    if (styling?.boldKeywords) {
      styling.boldKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        processedText = processedText.replace(regex, `<strong>${keyword}</strong>`);
      });
    }

    return processedText;
  };

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
    text += generateDynamicSkills().join(' • ') + `\n`;

    return text;
  };
  const generateLatexStyleHTML = () => {
    const resumeHTML = `
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
            <div class="freelance-rate">Freelance Rate: $${(typeof styling?.freelanceRate === 'number' ? styling.freelanceRate : 150)} / hour</div>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-text">
            ${generateDynamicSummary()}
          </div>
        </div>

        <!-- Experience -->
        <div class="section">
          <div class="section-title">Experience</div>
          ${generateDynamicExperience().map(exp => `
            <div class="experience-item">
              <div class="experience-header">
                <div class="company">${exp.company}</div>
                <div class="date-range">${exp.period}</div>
              </div>
              <div class="role">${exp.role}</div>
              <ul class="experience-list">
                ${exp.points.map(point => `<li class="experience-item">${point}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <!-- Projects -->
        <div class="section">
          <div class="section-title">Projects</div>
          <ul class="projects-list">
            ${generateDynamicProjects().map(proj => `<li class="project-item">${proj.name} - ${proj.description}</li>`).join('')}
          </ul>
        </div>

        <!-- Skills -->
        <div class="section">
{{ ... }}
          <div class="section-title">Skills</div>
          <ul class="skills-list">
            <li class="skill-item"><span class="skill-category">Languages:</span>
              ${(() => {
                const dynamicSkills = generateDynamicSkills();
                const languageSkills = dynamicSkills.filter(skill =>
                  ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Solidity', 'SQL', 'HTML', 'CSS', 'HTML/CSS'].includes(skill)
                );
                return languageSkills.length > 0 ? languageSkills.join(' , ') : 'JavaScript , TypeScript , Python , SQL , HTML , CSS';
              })()}
            </li>
            <li class="skill-item"><span class="skill-category">Frameworks & Libraries:</span>
              ${(() => {
                const dynamicSkills = generateDynamicSkills();
                const frameworkSkills = dynamicSkills.filter(skill =>
                  ['React', 'Node.js', 'Express', 'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry', 'Django', 'Flask', 'FastAPI', 'REST APIs'].includes(skill)
                );
                return frameworkSkills.length > 0 ? frameworkSkills.join(' , ') : 'React , Node.js , Express';
              })()}
            </li>
            ${(() => {
              const dynamicSkills = generateDynamicSkills();
              const blockchainSkills = dynamicSkills.filter(skill =>
                ['Solidity', 'Rust', 'EVM', 'Ethereum', 'Polygon', 'BSC', 'Solana', 'ZKsync Era', 'ZK-SNARKs', 'Layer-1/Layer-2', 'Cross-chain', 'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry'].includes(skill)
              );
              return blockchainSkills.length > 0 ? `
                <li class="skill-item"><span class="skill-category">Blockchain:</span> ${blockchainSkills.join(' , ')}</li>
              ` : '';
            })()}
            <li class="skill-item"><span class="skill-category">Tools & DevOps:</span>
              ${(() => {
                const dynamicSkills = generateDynamicSkills();
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

    return resumeHTML;
  };
  const handleEditInGoogleDocs = () => {
    // Generate LaTeX-style HTML content that matches the original LaTeX design
    const resumeHTML = generateLatexStyleHTML();

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
        alert('✅ LaTeX-Style Resume opened!\n\n📋 Professional resume content copied to clipboard\n\n📝 Please paste it (Ctrl+V) in the Google Doc\n\n🎨 Matches your original LaTeX design exactly!');
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

  const handleDownloadLatex = () => {
    if (!latexContent) {
      alert('LaTeX content not available');
      return;
    }

    const blob = new Blob([latexContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(name || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resume.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    <h2 className="text-sm sm:text-base font-bold text-gray-900 border-b border-gray-800 pb-2 mb-4 uppercase tracking-wider">
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
          <span className="hidden sm:inline">Export LaTeX Style</span>
          <span className="sm:hidden">LaTeX</span>
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
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l4-4m-4 4l-4-4m8 2h3m-3 4h3m-6-8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>

      {/* Responsive resume container */}
      <div
        className="bg-white p-4 sm:p-6 lg:p-8 max-w-full mx-auto shadow-lg rounded-lg print:shadow-none print:rounded-none"
        ref={resumeRef}
        style={{
          fontFamily: styling?.fonts?.primary || 'Georgia, serif',
          color: styling?.colors?.primary || '#2c3e50'
        }}
      >
        {/* Header */}
        <div className="text-left pb-4 mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight" style={{ fontFamily: styling?.fonts?.heading }}>{name}</h1>
          <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-8 text-gray-600">
            <div className="text-xs sm:text-sm font-medium">{phone}</div>
            <div className="text-xs sm:text-sm font-medium">{telegram}</div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-6 resume-section">
          <SectionTitle title="SUMMARY" />
          <div
            className="text-gray-700 leading-relaxed text-sm sm:text-base italic"
            dangerouslySetInnerHTML={{ __html: processText(generateDynamicSummary()) }}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Experience */}
          <div className="resume-section">
            <SectionTitle title="EXPERIENCE" />
            <div className="space-y-4">
              {generateDynamicExperience().map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2">
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1 sm:mb-0" style={{ fontFamily: styling?.fonts?.heading }}>{exp.company}</h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">{exp.period}</p>
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">{exp.role}</p>
                  <ul className="space-y-1">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                        <span className="text-gray-900 mr-2 flex-shrink-0">•</span>
                        <span
                          className="flex-1"
                          dangerouslySetInnerHTML={{ __html: processText(point) }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="resume-section">
            <SectionTitle title="PROJECTS" />
            <div className="space-y-3">
              {generateDynamicProjects().map((proj, index) => (
                <div key={index}>
                  <div className="font-bold text-sm sm:text-base text-gray-900 mb-1" style={{ fontFamily: styling?.fonts?.heading }}>{proj.name}</div>
                  <div
                    className="text-gray-700 leading-relaxed text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: processText(proj.description) }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="resume-section">
            <SectionTitle title="SKILLS" />
            <div className="space-y-3">
              {/* Languages */}
              <div>
                <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: styling?.fonts?.primary || 'Georgia, serif' }}>Languages:</span>
                <span className="text-gray-700 text-sm" style={{ fontFamily: styling?.fonts?.primary || 'Georgia, serif' }}>
                  {(() => {
                    const dynamicSkills = generateDynamicSkills();
                    const languageSkills = dynamicSkills.filter(skill =>
                      ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Solidity', 'SQL', 'HTML', 'CSS', 'HTML/CSS'].includes(skill)
                    );
                    console.log('Languages Debug:', { dynamicSkills, languageSkills });
                    return languageSkills.length > 0 ? languageSkills.join(' , ') : 'JavaScript , TypeScript , Python , SQL , HTML , CSS';
                  })()}
                </span>
              </div>

              {/* Frameworks & Libraries */}
              <div>
                <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: styling?.fonts?.primary || 'Georgia, serif' }}>Frameworks & Libraries:</span>
                <span className="text-gray-700 text-sm" style={{ fontFamily: styling?.fonts?.primary || 'Georgia, serif' }}>
                  {(() => {
                    const dynamicSkills = generateDynamicSkills();
                    const frameworkSkills = dynamicSkills.filter(skill =>
                      ['React', 'Node.js', 'Express', 'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry', 'Django', 'Flask', 'FastAPI', 'REST APIs'].includes(skill)
                    );
                    console.log('Frameworks Debug:', { dynamicSkills, frameworkSkills });
                    return frameworkSkills.length > 0 ? frameworkSkills.join(' , ') : 'React , Node.js , Express';
                  })()}
                </span>
              </div>

              {/* Blockchain */}
              {(() => {
                const dynamicSkills = generateDynamicSkills();
                const blockchainSkills = dynamicSkills.filter(skill =>
                  ['Solidity', 'Rust', 'EVM', 'Ethereum', 'Polygon', 'BSC', 'Solana', 'ZKsync Era', 'ZK-SNARKs', 'Layer-1/Layer-2', 'Cross-chain', 'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry'].includes(skill)
                );
                console.log('Blockchain Debug:', { dynamicSkills, blockchainSkills });
                return blockchainSkills.length > 0 ? (
                  <div>
                    <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: styling?.fonts?.primary || 'Georgia, serif' }}>Blockchain:</span>
                    <span className="text-gray-700 text-sm" style={{ fontFamily: styling?.fonts?.primary || 'Georgia, serif' }}>
                      {blockchainSkills.join(' , ')}
                    </span>
                  </div>
                ) : null;
              })()}

              {/* Tools & DevOps */}
              <div>
                <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: styling?.fonts?.primary || 'Georgia, serif' }}>Tools & DevOps:</span>
                <span className="text-gray-700 text-sm" style={{ fontFamily: styling?.fonts?.primary || 'Georgia, serif' }}>
                  {(() => {
                    const dynamicSkills = generateDynamicSkills();
                    const devOpsSkills = dynamicSkills.filter(skill =>
                      ['Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'Jenkins', 'AWS', 'CI/CD', 'VS Code', 'Postman', 'Unit Testing', 'Pytest'].includes(skill)
                    );
                    console.log('DevOps Debug:', { dynamicSkills, devOpsSkills });
                    return devOpsSkills.length > 0 ? devOpsSkills.join(' , ') : 'Docker , Git , AWS , CI/CD';
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreview;

