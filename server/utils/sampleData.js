const sampleData = {
    name: "Sukhdev Singh",
    phone: "9664627236",
    telegram: "sukhdevsingh",
    baseResume: {
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
  };
  
  module.exports = sampleData;