const sampleData = [
  {
    name: "Sukhdev Singh",
    phone: "9664627236",
    telegram: "sukhdevsingh",
    resumeData: {
      freelance: {
        experience: [
          {
            company: "Techsteck Solutions",
            role: "Blockchain Developer",
            period: "Mar 2023 - Present",
            points: [
              "Smart Contract Development: Designed and developed smart contracts for Ethereum and BNB Chain using Solidity.",
              "Used Hardhat and Ethers.js for testing and deployment.",
              "DApp Integration: Built decentralized applications with React and Node.js, integrated with Web3.js and Ethers.js for wallet and contract interactions.",
              "Security and Gas Optimization: Implemented best practices using OpenZeppelin libraries to enhance smart contract security and optimize gas usage.",
            ],
          },
          {
            company: "BlockNova Technologies",
            role: "Software Developer - Blockchain",
            period: "Jan 2021 - Feb 2023",
            points: [
              "DApp Development: Developed decentralized marketplaces and token-based voting systems using Solidity and Web3.js.",
              "Cross-Chain Compatibility: Integrated Ethereum and Polygon-based smart contracts with front-end applications.",
              "Backend Services: Created RESTful APIs and middleware using Node.js and Express, connecting blockchain data to frontend dashboards.",
            ],
          },
           {
            company: "Open Source Contributions",
            role: "Web3 Projects and Libraries",
            period: "Oct 2022 - Present",
            points: [
              "Hacktoberfest and Community Tools: Contributed to blockchain-related SDKs and community DApps, focusing on contract improvements and tooling libraries.",
            ],
          },
        ],
        projects: [
          {
            name: "Crowdfunding DApp",
            description:
              "Built a decentralized platform for transparent fundraising using Solidity, Truffle, React, and IPFS. Features include contributor voting and fund release approvals.",
          },
          {
            name: "NFT Marketplace",
            description:
              "Developed a full-stack NFT marketplace for minting and trading NFTs, deployed on Ethereum with IPFS integration.",
          },
          {
            name: "Token Staking DApp",
            description: "Implemented staking mechanics and reward distribution for ERC20 tokens using smart contracts.",
          },
          {
            name: "Property Registration DApp",
            description: "Engineered a secure and fraud-resistant system for property records using Ethereum smart contracts and IPFS.",
          },
        ],
        skills: [
          "Solidity", "JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS",
          "Ethereum", "Polygon", "BNB Chain", "IPFS",
          "Hardhat", "Truffle", "Web3.js", "Ethers.js", "OpenZeppelin", "React", "Node.js",
          "Git", "Docker", "MongoDB", "Express.js", "REST APIs"
        ],
      },
      techstack: {
        experience: [
          {
            company: "TechSteck Solutions LLP",
            role: "Senior Full-Stack Developer",
            period: "Mar 2023 - Present",
            points: [
              "Led development of enterprise web applications using React, Node.js, and Python",
              "Architected scalable backend systems handling 500K+ concurrent users",
              "Implemented automated testing and CI/CD pipelines reducing bugs by 80%",
              "Collaborated with product teams to deliver features from conception to production",
              "Mentored junior developers and established coding standards across the organization"
            ],
          },
          {
            company: "InnovateTech Corp",
            role: "Full-Stack Developer",
            period: "Jan 2021 - Feb 2023",
            points: [
              "Developed responsive web applications using React, TypeScript, and Node.js",
              "Built RESTful APIs and microservices with Express.js and MongoDB",
              "Integrated third-party services and payment gateways",
              "Optimized application performance and user experience",
              "Participated in code reviews and agile development processes"
            ],
          }
        ],
        projects: [
          {
            name: "E-commerce Platform",
            description: "Built a scalable e-commerce platform with React, Node.js, and MongoDB, featuring user authentication, product management, and payment integration.",
          },
          {
            name: "Task Management System",
            description: "Developed a collaborative task management application with real-time updates, team collaboration features, and progress tracking.",
          },
          {
            name: "Analytics Dashboard",
            description: "Created a comprehensive analytics dashboard with data visualization, reporting features, and real-time data processing.",
          }
        ],
        skills: [
          "JavaScript", "TypeScript", "Python", "React", "Node.js", "Express.js",
          "MongoDB", "PostgreSQL", "AWS", "Docker", "Git", "REST APIs",
          "GraphQL", "Microservices", "Agile", "CI/CD"
        ],
      }
    }
  },
  {
    name: "John Doe",
    phone: "9876543210",
    telegram: "johndoe_dev",
    resumeData: {
      freelance: {
        experience: [
          {
            company: "Freelance Projects",
            role: "Full-Stack Developer",
            period: "Jan 2022 - Present",
            points: [
              "Developed custom web applications for various clients using React and Node.js",
              "Built responsive websites and e-commerce solutions",
              "Integrated payment systems and third-party APIs",
              "Provided ongoing maintenance and feature updates"
            ],
          }
        ],
        projects: [
          {
            name: "Portfolio Website",
            description: "Created a modern portfolio website with React, featuring smooth animations and responsive design.",
          },
          {
            name: "E-commerce Store",
            description: "Built a complete e-commerce solution with shopping cart, payment processing, and admin dashboard.",
          }
        ],
        skills: [
          "React", "Node.js", "JavaScript", "HTML/CSS", "MongoDB", "Express.js"
        ],
      },
      techstack: {
        experience: [
          {
            company: "TechCorp Inc",
            role: "Senior Developer",
            period: "Jan 2020 - Present",
            points: [
              "Led development of enterprise applications using modern tech stacks",
              "Mentored junior developers and conducted code reviews",
              "Implemented scalable architecture patterns",
              "Collaborated with cross-functional teams"
            ],
          }
        ],
        projects: [
          {
            name: "Enterprise Dashboard",
            description: "Developed a comprehensive dashboard for enterprise data visualization and reporting.",
          }
        ],
        skills: [
          "React", "TypeScript", "Node.js", "Python", "AWS", "Docker"
        ],
      }
    }
  }
];

module.exports = sampleData;