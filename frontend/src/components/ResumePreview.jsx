import { useRef, useEffect } from "react";
import { FaEdit, FaShareAlt } from "react-icons/fa";
import html2canvas from "html2canvas-pro";

import jsPDF from "jspdf";

const ResumePreview = ({ resumeData }) => {
  if (!resumeData || typeof resumeData !== "object") {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
        Error: Invalid resume data provided.
      </div>
    );
  }
  const {
    name,
    phone,
    telegram,
    experience,
    projects,
    skills,
    summary,
    templateType,
    styling,
    latexContent,
    jobDescription,
  } = resumeData;
  const resumeRef = useRef(null);

  // Dynamic summary (synced with useBulkResumeGenerator)
  const generateDynamicSummary = (summaryArg, jobDescArg) => {
    const summaryVal = summaryArg ?? summary;
    const jobDesc = jobDescArg ?? jobDescription;
    if (summaryVal) return summaryVal;
    const jobLower = (typeof jobDesc === "string" ? jobDesc : "").toLowerCase();
    const hasRustTerms =
      /\b(rust|tokio|async-std|wasm|webassembly|systems programming)\b/.test(
        jobLower
      );
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(
      jobLower
    );
    const hasPythonTerms = /\b(python|django|flask|fastapi)\b/.test(jobLower);
    const hasReactTerms = /\b(react|frontend|ui|ux)\b/.test(jobLower);

    if (hasRustTerms) {
      return "Highly skilled **Rust Developer** with **2+ years** of hands-on experience **developing** high-performance, **reliable**, and **secure** systems. **Expertise** in systems programming concepts including memory safety, concurrency, and lifetimes. **Skilled** in **designing**, **implementing**, and maintaining backend services and performance-critical components using async frameworks like **Tokio**.";
    } else if (hasWeb3Terms) {
      return "Senior Smart Contract Engineer with 5+ years of experience architecting and deploying DeFi protocols managing **$500M+ TVL**. Expert in gas-optimized Solidity development, comprehensive security audits, and production-grade smart contract systems. Proven track record in leading cross-functional teams to deliver complex blockchain solutions across multiple EVM chains and Layer-2 networks.";
    } else if (hasPythonTerms) {
      return "Senior Python Developer with 5+ years of experience building scalable backend systems and APIs. Expert in **Django, Flask, and FastAPI** frameworks with a focus on performance optimization, database design, and microservices architecture. Proven ability to lead development teams and deliver high-impact solutions for enterprise applications.";
    } else if (hasReactTerms) {
      return "Senior Frontend Developer with 5+ years of experience creating responsive web applications and user interfaces. Expert in **React, TypeScript, and modern frontend technologies** with a focus on performance optimization, accessibility, and user experience design. Proven track record in leading frontend teams and delivering pixel-perfect implementations.";
    } else {
      return "Senior Full-Stack Developer with 5+ years of experience building scalable web applications and leading development teams. Expert in modern technologies including **React, Node.js, Python, and cloud platforms**. Proven track record in delivering high-performance solutions and mentoring junior developers.";
    }
  };

  // Function to generate dynamic experience content (synced with useBulkResumeGenerator)
  const generateDynamicExperience = (experienceArg, jobDescArg) => {
    const expVal = experienceArg ?? experience;
    const jobDesc = jobDescArg ?? jobDescription;
    if (expVal && expVal.length > 0) return expVal;
    const jobLower = (typeof jobDesc === "string" ? jobDesc : "").toLowerCase();
    const hasRustTerms = /\b(rust|tokio|async-std|wasm|webassembly)\b/.test(
      jobLower
    );
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(
      jobLower
    );

    if (hasRustTerms) {
      return [
        {
          company: "Systems Performance Inc.",
          role: "Rust Developer",
          period: "Oct 2023 – Present",
          points: [
            "**Designed** and **developed** high-performance backend systems and APIs using **Rust** and **Tokio** for production-grade applications.",
            "**Wrote** efficient, modular, and **secure** code, leveraging Rust’s memory safety and concurrency features to ensure system **reliability**.",
            "**Implemented** comprehensive unit and integration tests, participating in rigorous code reviews to maintain high code quality.",
            "**Optimized** existing applications for speed and memory usage, and contributed to system architecture discussions.",
          ],
        },
        {
          company: "Open Source Contributor",
          role: "Systems Programmer",
          period: "Jan 2022 – Sep 2023",
          points: [
            "Contributed to open-source Rust projects, focusing on performance-critical components and systems software.",
            "Collaborated with a distributed team to troubleshoot complex issues in production environments using advanced debugging skills.",
            "Gained deep familiarity with the Rust ecosystem, including modern tools, libraries, and best practices.",
          ],
        },
      ];
    } else if (hasWeb3Terms) {
      return [
        {
          company: "Freelance",
          role: "Smart Contract Engineer",
          period: "Jan 2024 – Present",
          points: [
            "**Core Blockchain Development:** Built a Layer-1 validator node in Python from scratch, implementing block reading and production using JAM grey paper consensus.",
            "**Validator Lifecycle:** Developed secure validator node infrastructure for block proposal, validation, and finalization.",
            "**ZK Financial Applications:** Built financial dApps leveraging ZK-SNARKS/ZKsync for transaction privacy and security.",
          ],
        },
        {
          company: "TechSteck Solutions LLP",
          role: "Blockchain Developer",
          period: "Oct 2022 – Dec 2024",
          points: [
            "**Protocol Development:** Developed EVM-compatible blockchain modules (networking, consensus, execution).",
            "**Smart Contracts:** Built and audited Solidity DeFi protocols with gas optimization and upgradeability.",
            "**Cross-Chain Integrations:** Implemented interoperability solutions across Ethereum, Polygon, and Solana using bridges and ZK technologies.",
          ],
        },
      ];
    } else {
      return [
        {
          company: "Enterprise Solutions Inc",
          role: "Senior Full-Stack Developer",
          period: "Jun 2020 – Present",
          points: [
            "Led development of enterprise web applications using **React, Node.js, and Python**, serving over 100,000 users.",
            "Architected and maintained scalable backend systems handling **500K+** concurrent users with 99.9% uptime.",
            "Implemented automated testing and CI/CD pipelines, reducing production bugs by **80%** and improving deployment frequency.",
            "Collaborated with product teams to translate business requirements into technical solutions from conception to production.",
          ],
        },
      ];
    }
  };

  // Function to generate dynamic projects based on job description (synced with hook)
  const generateDynamicProjects = (projectsArg, jobDescArg) => {
    const projectsVal = projectsArg ?? projects;
    const jobDesc = jobDescArg ?? jobDescription;
    if (projectsVal && projectsVal.length > 0) return projectsVal;
    const jobLower = (typeof jobDesc === "string" ? jobDesc : "").toLowerCase();
    const hasRustTerms = /\b(rust|tokio|async-std|wasm|webassembly)\b/.test(
      jobLower
    );
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(
      jobLower
    );

    if (hasRustTerms) {
      return [
        {
          name: "High-Performance API Service",
          description:
            "Built a backend service in **Rust** using the **Tokio** framework to handle thousands of concurrent requests with low latency. Implemented RESTful endpoints and integrated with a **PostgreSQL** database for persistent storage.",
        },
        {
          name: "WebAssembly (WASM) Module",
          description:
            "Developed a performance-critical data processing library in **Rust** and compiled it to **WebAssembly (WASM)** for use in a browser environment, achieving near-native execution speed for complex calculations.",
        },
        {
          name: "Distributed Key-Value Store",
          description:
            "Created a simple distributed key-value store using gRPC for communication between nodes, demonstrating an understanding of distributed systems architecture in Rust.",
        },
      ];
    } else if (hasWeb3Terms) {
      return [
        {
          name: "Layer-1 Blockchain (JAM Protocol)",
          description:
            "Implemented validator selection, consensus, and networking in Python based on the JAM grey paper, building a functional validator node from scratch.",
        },
        {
          name: "Zero-Knowledge Financial Apps",
          description:
            "Built ZK-powered dApps for confidential transactions and secure on-chain finance using ZK-SNARKS and the ZKsync Era toolchain.",
        },
        {
          name: "Cross-Chain Bridge",
          description:
            "Developed a multi-chain bridge using Hyperlane, Chainlink CCIP, and Wormhole for seamless asset and data interoperability between EVM and non-EVM chains.",
        },
      ];
    } else {
      return [
        {
          name: "Microsoft Office 365 Integration Platform",
          description:
            "Led development of an enterprise integration platform connecting Office 365 services with third-party applications. Built a scalable Node.js backend with a React frontend.",
        },
        {
          name: "AWS Infrastructure Automation Suite",
          description:
            "Developed a comprehensive infrastructure-as-code platform using Terraform, AWS CDK, and Python automation. Implemented blue-green deployments and auto-scaling policies.",
        },
      ];
    }
  };

  // Wrapper to get sanitized experience consistently across preview and export
  const getSanitizedExperience = (experienceArg, jobDescArg) => {
    const raw = generateDynamicExperience(experienceArg, jobDescArg);
    return sanitizeExperienceFinal(raw);
  };

  // (removed duplicate projects generator)

  // --- SKILLS FUNCTION (from useBulkResumeGenerator.js) ---
  const generateDynamicSkills = (skills, jobDescription) => {
    // Baseline/default skills to include in all generated resumes
    const baselineSkills = [
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL",
      "HTML/CSS",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "MERN Stack",
      "Docker",
      "Git",
      "GitHub Actions",
      "Jenkins",
      "AWS",
      "CI/CD",
      "EVM",
      "Ethereum",
      "Polygon",
      "BSC",
      "Hyperlane",
      "Chainlink",
      "Wormhole",
    ];

    const jobLower = (
      typeof jobDescription === "string" ? jobDescription : ""
    ).toLowerCase();
    const hasRustTerms = /\b(rust|tokio|async-std|wasm|webassembly)\b/.test(
      jobLower
    );
    const hasWeb3Terms = /\b(solidity|ethereum|smart.contract|defi|evm)\b/.test(
      jobLower
    );

    let generated = [];
    if (hasRustTerms) {
      generated = [
        "Rust",
        "Tokio",
        "async-std",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "RESTful APIs",
        "gRPC",
        "GraphQL",
        "C++",
        "Go",
        "Systems Programming",
        "Concurrency",
      ];
    } else if (hasWeb3Terms) {
      generated = [
        "Solidity",
        "Rust",
        "Go",
        "Hardhat",
        "Foundry",
        "ZK-SNARKs",
        "JAM Protocol",
        "Cross-chain",
      ];
    } else {
      generated = [
        "JavaScript",
        "TypeScript",
        "Python",
        "HTML/CSS",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "SQL",
        "Docker",
        "Git",
        "AWS",
        "CI/CD",
      ];
    }

    // Merge provided skills, generated skills based on job description, and baseline defaults
    const merged = new Set([
      ...(skills || []),
      ...generated,
      ...baselineSkills,
    ]);

    return Array.from(merged);
  };

  // Function to process text with markdown and bold keywords
  const processText = (text) => {
    if (!text) return "";
    let processedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    if (styling?.boldKeywords) {
      styling.boldKeywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        processedText = processedText.replace(
          regex,
          `<strong>${keyword}</strong>`
        );
      });
    }
    return processedText;
  };

  // Truncate a text to a maximum number of words (keeps readability for PDF scaling)
  // reduced default to 45 words to improve fit on A4
  const truncateWords = (text, maxWords = 45) => {
    if (!text || typeof text !== "string") return "";
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // Heuristics for freelancer detection and sanitizing experience points
  const isFreelancer = () => {
    if (typeof templateType === "string" && /freel/i.test(templateType))
      return true;
    if (
      typeof jobDescription === "string" &&
      /freelance|freelancer|contractor|gig|independent/i.test(jobDescription)
    )
      return true;
    if (styling && typeof styling.freelanceRate === "number") return true;
    return false;
  };

  const isTechStackPoint = (point) => {
    if (!point || typeof point !== "string") return false;
    const techKeywords = [
      "react",
      "node",
      "python",
      "java",
      "aws",
      "docker",
      "kubernetes",
      "sql",
      "typescript",
      "javascript",
      "mongodb",
      "django",
      "flask",
      "fastapi",
      "solidity",
      "hardhat",
      "foundry",
      "graphql",
      "redis",
      "postgres",
      "postgresql",
    ];
    const lower = point.toLowerCase();
    let matches = 0;
    techKeywords.forEach((kw) => {
      if (lower.includes(kw)) matches += 1;
    });
    return matches >= 2; // likely a tech-stack list when 2+ keywords present
  };

  const sanitizeExperience = (expArray) => {
    if (!Array.isArray(expArray)) return expArray;
    const freelancer = isFreelancer();
    return expArray.map((exp) => {
      const pts = Array.isArray(exp.points) ? exp.points : [];
      const filtered = freelancer
        ? pts.filter((p) => !isTechStackPoint(p))
        : pts.slice();
      const truncated = filtered.map((p) =>
        typeof p === "string" ? truncateWords(p, 18) : p
      );
      return { ...exp, points: truncated };
    });
  };
  // If freelancer, drop any experience entries that end up with 0 points
  const sanitizeExperienceFinal = (expArray) => {
    const sanitized = sanitizeExperience(expArray);
    if (!isFreelancer()) return sanitized;
    // Remove entries with no points and also drop TechSteck company entries for freelancers
    return sanitized.filter(
      (e) =>
        Array.isArray(e.points) &&
        e.points.length > 0 &&
        !(typeof e.company === "string" && /techsteck/i.test(e.company))
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("share-dropdown");
      const shareButton = event.target.closest("button");

      if (dropdown && !dropdown.contains(event.target) && !shareButton) {
        dropdown.classList.add("hidden");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateResumeText = () => {
    let text = `${name}\n`;
    text += `Phone: ${phone} | Telegram: ${telegram}\n\n`;
    text += `EXPERIENCE\n`;
    text += `═`.repeat(50) + `\n`;
    generateDynamicExperience().forEach((exp) => {
      // Skip TechSteck company entries for freelancer resumes
      if (
        isFreelancer() &&
        typeof exp.company === "string" &&
        /techsteck/i.test(exp.company)
      )
        return;
      text += `${exp.company}\n`;
      text += `${exp.role}\n`;
      text += `${exp.period}\n`;
      // include only up to 2 bullets in the exported text to help A4 fit
      (exp.points || []).slice(0, 2).forEach((point) => {
        text += `• ${point}\n`;
      });
      text += `\n`;
    });
    text += `PROJECTS\n`;
    text += `═`.repeat(50) + `\n`;
    generateDynamicProjects().forEach((proj) => {
      text += `${proj.name}\n`;
      text += `${proj.description}\n\n`;
    });
    text += `SKILLS\n`;
    text += `═`.repeat(50) + `\n`;
    text += generateDynamicSkills(skills, jobDescription).join(" • ") + `\n`;
    return text;
  };

  const generateLatexStyleHTML = () => {
    // This function remains unchanged as it's for a different feature
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${name} - Resume</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Georgia, 'Times New Roman', serif; font-size: 13px; line-height: 1; color: #000; background-color: #ffffff; padding: 1in; max-width: 700px; margin: 0 auto; }
.header { text-align: center; }
.name { font-size: 1.2rem; font-weight: 700; }
.summary-section { margin-bottom: 15px; }
.summary-header { display: table; width: 100%; margin-bottom: 2px; }
.summary-title { font-size: 12px; font-weight: 600; text-transform: uppercase; display: table-cell; }
.freelance-rate { font-size: 12; font-weight: 600; text-transform: uppercase; display: table-cell; text-align: right; }
.summary-divider { height: 1px; background-color: #000; margin: 6px 0 12px 0; }
.summary-text { font-size: 0.9rem; line-height: 1; text-align: left; }
.section { margin-bottom: 15px; }
.section-title { font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 10px 0 6px 0; padding-bottom: 2px; border-bottom: 1px solid #000; }
.experience-item { margin-bottom: 8px; }
.experience-header { display: table; width: 100%; margin-bottom: 1px; }
.company { font-weight: bold; display: table-cell; }
.date-range { display: table-cell; text-align: right; }
.role { font-style: italic; font-size: 11px; margin-bottom: 2px; }
.experience-list { list-style-type: circle; padding-left: 20px; margin: 0; }
li.experience-item { font-size: 11px; line-height: 1; margin-bottom: 1px; }
.projects-list { list-style-type: circle; padding-left: 20px; margin: 0; }
.project-item { font-size: 11px; line-height: 1; margin-bottom: 1px; }
.skills-list { list-style-type: none; padding-left: 0; margin: 0; }
.skill-item { font-size: 11px; line-height: 1; margin-bottom: 1px; }
.skill-category { font-weight: bold; }
@media print { body { padding: 0.5in; max-width: none; } }
</style>
</head>
<body>
<div class="header">
<div class="name">${name}</div>
</div>
<div class="summary-section">
<div class="summary-header">
<div class="summary-title">Summary</div>
<div class="freelance-rate">Freelance Rate: $${
      typeof styling?.freelanceRate === "number" ? styling.freelanceRate : 150
    } / hour</div>
</div>
<div class="summary-divider"></div>
<div class="summary-text">
${generateDynamicSummary()}
</div>
</div>
<div class="section">
<div class="section-title">Experience</div>
${generateDynamicExperience()
  .map(
    (exp) => `
<div class="experience-item">
<div class="experience-header">
<div class="company">${exp.company}</div>
<div class="date-range">${exp.period}</div>
</div>
<div class="role">${exp.role}</div>
<ul class="experience-list">
${exp.points
  .map((point) => `<li class="experience-item">${point}</li>`)
  .join("")}
</ul>
</div>
`
  )
  .join("")}
</div>
<div class="section">
<div class="section-title">Projects</div>
<ul class="projects-list">
${generateDynamicProjects()
  .map(
    (proj) => `<li class="project-item">${proj.name} - ${proj.description}</li>`
  )
  .join("")}
</ul>
</div>
<div class="section">
<div class="section-title">Skills</div>
<ul class="skills-list">
<li class="skill-item"><span class="skill-category">Languages:</span>
${(() => {
  const dynamicSkills = generateDynamicSkills(skills, jobDescription); // Pass params
  const languageSkills = dynamicSkills.filter((skill) =>
    [
      "JavaScript",
      "TypeScript",
      "Python",
      "Rust",
      "Go",
      "Solidity",
      "SQL",
      "HTML",
      "CSS",
      "HTML/CSS",
    ].includes(skill)
  );
  return languageSkills.length > 0
    ? languageSkills.join(" , ")
    : "JavaScript , TypeScript , Python , SQL , HTML , CSS";
})()}
</li>
<li class="skill-item"><span class="skill-category">Frameworks & Libraries:</span>
${(() => {
  const dynamicSkills = generateDynamicSkills(skills, jobDescription); // Pass params
  const frameworkSkills = dynamicSkills.filter((skill) =>
    [
      "React",
      "Node.js",
      "Express",
      "Web3.js",
      "Ethers.js",
      "Hardhat",
      "Foundry",
      "Django",
      "Flask",
      "FastAPI",
      "REST APIs",
      "MERN Stack",
      "MongoDB",
    ].includes(skill)
  );
  return frameworkSkills.length > 0
    ? frameworkSkills.join(" , ")
    : "React , Node.js , Express";
})()}
</li>
${(() => {
  const dynamicSkills = generateDynamicSkills(skills, jobDescription); // Pass params
  const blockchainSkills = dynamicSkills.filter((skill) =>
    [
      "Solidity",
      "Rust",
      "EVM",
      "Ethereum",
      "Polygon",
      "BSC",
      "Solana",
      "ZKsync Era",
      "ZK-SNARKs",
      "Layer-1/Layer-2",
      "Cross-chain",
      "Web3.js",
      "Ethers.js",
      "Hardhat",
      "Foundry",
      "Hyperlane",
      "Chainlink",
      "Wormhole",
      "JAM Protocol",
    ].includes(skill)
  );
  return blockchainSkills.length > 0
    ? `
<li class="skill-item"><span class="skill-category">Blockchain:</span> ${blockchainSkills.join(
        " , "
      )}</li>
`
    : "";
})()}
<li class="skill-item"><span class="skill-category">Tools & DevOps:</span>
${(() => {
  const dynamicSkills = generateDynamicSkills(skills, jobDescription); // Pass params
  const devOpsSkills = dynamicSkills.filter((skill) =>
    [
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub Actions",
      "Jenkins",
      "AWS",
      "CI/CD",
      "Unit Testing",
      "Pytest",
    ].includes(skill)
  );
  return devOpsSkills.length > 0
    ? devOpsSkills.join(" , ")
    : "Docker , Git , AWS , CI/CD";
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
    // This function remains unchanged
    const resumeHTML = generateLatexStyleHTML();
    const formattedContent = resumeHTML
      .replace(/<!DOCTYPE html>/g, "")
      .replace(/<html>/g, "")
      .replace(/<head>.*?<\/head>/gs, "")
      .replace(/<\/html>/g, "")
      .replace(/<\/body>/g, "");
    navigator.clipboard
      .writeText(formattedContent)
      .then(() => {
        window.open("https://docs.google.com/document/create", "_blank");
        setTimeout(() => {
          alert(
            "✅ LaTeX-Style Resume opened!\n\n📋 Professional resume content copied to clipboard\n\n📝 Please paste it (Ctrl+V) in the Google Doc\n\n🎨 Matches your original LaTeX design exactly!"
          );
        }, 1000);
      })
      .catch(() => {
        alert(
          "📋 Please copy this content and paste it in Google Docs:\n\n" +
            formattedContent.substring(0, 500) +
            "..."
        );
      });
  };

  // --- ### UPDATED PDF GENERATION LOGIC ### ---

  /**
   * Captures the resume element as a canvas, styled for A4.
   * This clones the element into a hidden div to ensure correct styling.
   * @returns {Promise<HTMLCanvasElement>} A promise that resolves with the canvas.
   */
  const captureA4Canvas = () => {
    return new Promise((resolve, reject) => {
      const sourceElement = resumeRef.current;
      if (!sourceElement) {
        reject(new Error("Resume element not found"));
        return;
      }

      // 1. Create a clone
      const clonedElement = sourceElement.cloneNode(true);

      // 2. Create a hidden container for styling
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px"; // Off-screen
      container.style.top = "0";
      container.style.width = "210mm"; // A4 width
      container.style.height = "auto"; // Let content flow
      container.style.margin = "0";
      container.style.padding = "0";

      // 3. Apply A4 styles to the cloned element
      // We override the existing responsive classes
      clonedElement.className = "bg-white"; // Reset classes
      clonedElement.style.width = "210mm";
      clonedElement.style.minHeight = "297mm"; // A4 height (for visual consistency if needed)
      clonedElement.style.height = "auto"; // Let content determine flow
      clonedElement.style.maxWidth = "210mm";
      clonedElement.style.padding = "0.3in"; // Standard A4 padding
      clonedElement.style.boxSizing = "border-box";
      clonedElement.style.fontSize = "11px";
      clonedElement.style.margin = "0";
      clonedElement.style.boxShadow = "none";
      clonedElement.style.borderRadius = "0";

      // 4. Append to body to allow rendering
      container.appendChild(clonedElement);
      document.body.appendChild(container);

      const options = {
        scale: 2, // High resolution
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        // Let html2canvas use the element's styled width/height
      };

      // 5. Capture the styled clone
      html2canvas(clonedElement, options)
        .then((canvas) => {
          try {
            // Crop left/right whitespace similar to hook logic
            const ctx = canvas.getContext("2d");
            const w = canvas.width;
            const h = canvas.height;
            const imgDataFull = ctx.getImageData(0, 0, w, h).data;

            const isNotWhiteColumn = (col) => {
              const threshold = 250;
              for (let row = 0; row < h; row++) {
                const idx = (row * w + col) * 4;
                const r = imgDataFull[idx];
                const g = imgDataFull[idx + 1];
                const b = imgDataFull[idx + 2];
                const a = imgDataFull[idx + 3];
                if (a > 0 && (r < threshold || g < threshold || b < threshold))
                  return true;
              }
              return false;
            };

            let left = 0;
            let right = w - 1;
            for (let c = 0; c < w; c++) {
              if (isNotWhiteColumn(c)) {
                left = c;
                break;
              }
            }
            for (let c = w - 1; c >= 0; c--) {
              if (isNotWhiteColumn(c)) {
                right = c;
                break;
              }
            }

            if (left > 0 || right < w - 1) {
              const cropW = Math.max(1, right - left + 1);
              const cropH = h;
              const cropped = document.createElement("canvas");
              cropped.width = cropW;
              cropped.height = cropH;
              const croppedCtx = cropped.getContext("2d");
              croppedCtx.drawImage(
                canvas,
                left,
                0,
                cropW,
                cropH,
                0,
                0,
                cropW,
                cropH
              );
              resolve(cropped);
              return;
            }
          } catch (e) {
            // if cropping fails, fall back to original canvas
          }
          resolve(canvas); // Resolves with canvas
        })
        .catch(reject)
        .finally(() => {
          // 6. Clean up the DOM
          document.body.removeChild(container);
        });
    });
  };

  /**
   * Generates the PDF and returns it as a Blob.
   * Used for 'Share to Drive'.
   */
  const generateAndGetPDF = () => {
    return new Promise((resolve, reject) => {
      captureA4Canvas() // Use the new robust capture function
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/jpeg", 0.95);
          // Use 'in' (inches) for units as it's standard for A4/Letter
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: "a4",
            compress: true,
          });

          const pdfWidth = pdf.internal.pageSize.getWidth(); // in inches
          const pdfHeight = pdf.internal.pageSize.getHeight(); // in inches

          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          // Use W/H aspect ratio
          const canvasAspectRatio = canvasWidth / canvasHeight;
          const pageAspectRatio = pdfWidth / pdfHeight;

          let finalWidth, finalHeight;

          // Scale image to fit page (this is the single-page logic)
          if (canvasAspectRatio > pageAspectRatio) {
            // Image is wider than page
            finalWidth = pdfWidth;
            finalHeight = pdfWidth / canvasAspectRatio;
          } else {
            // Image is taller than page
            finalHeight = pdfHeight;
            finalWidth = pdfHeight * canvasAspectRatio;
          }

          // Center the image
          const x = (pdfWidth - finalWidth) / 2;
          const y = (pdfHeight - finalHeight) / 2;

          pdf.addImage(imgData, "JPEG", x, y, finalWidth, finalHeight);

          const pdfBlob = pdf.output("blob");
          resolve(pdfBlob);
        })
        .catch(reject);
    });
  };

  const handleShare = async (platform) => {
    const resumeText = generateResumeText();

    switch (platform) {
      case "whatsapp":
        const whatsappText = `📄 *My Resume - ${name}*\n\n${resumeText}\n\n_Sent via Resume Builder_`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          whatsappText
        )}`;
        window.open(whatsappUrl, "_blank");
        break;

      case "gmail":
        const subject = encodeURIComponent(`${name} - Resume`);
        const body = encodeURIComponent(
          `Dear Hiring Manager,\n\nPlease find my resume below:\n\n${resumeText}\n\nBest regards,\n${name}\n${phone}\n${telegram}\n\n(This resume was generated using Resume Builder)`
        );
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
        window.open(gmailUrl, "_blank");
        break;

      case "drive":
        try {
          const pdfBlob = await generateAndGetPDF(); // Uses the new A4 logic
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = `${(name || "resume")
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase()}_resume.pdf`;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          const driveWindow = window.open("https://drive.google.com", "_blank");
          setTimeout(() => {
            if (driveWindow && !driveWindow.closed) {
              alert(
                '✅ Resume PDF downloaded!\n\n☁️ Google Drive opened...\n\n📤 Quick Upload Steps:\n1. Click "New" → "File upload"\n2. Select the downloaded PDF file\n\n💡 File is in your Downloads folder'
              );
            } else {
              alert(
                '✅ Resume PDF downloaded!\n\n☁️ Please visit: drive.google.com\n\n📤 Upload Steps:\n1. Click "New" → "File upload"\n2. Select the downloaded PDF\n\n💡 File is in your Downloads folder'
              );
            }
            setTimeout(() => {
              URL.revokeObjectURL(pdfUrl);
            }, 1000);
          }, 1500);
        } catch (error) {
          console.error("Failed to generate PDF for Drive:", error);
          alert(`PDF generation failed: ${error.message}`);
        }
        break;
    }
    document.getElementById("share-dropdown").classList.add("hidden");
  };

  const handleDownloadLatex = () => {
    if (!latexContent) {
      alert("LaTeX content not available");
      return;
    }
    const blob = new Blob([latexContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(name || "resume")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}_resume.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Generates the PDF and triggers a download.
   * Used for the main 'Download PDF' button.
   */
  const handleDownload = () => {
    captureA4Canvas() // Use the new robust capture function
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "a4",
          compress: true,
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;
        const pageAspectRatio = pdfWidth / pdfHeight;

        let finalWidth, finalHeight;

        // Scale image to fit page
        if (canvasAspectRatio > pageAspectRatio) {
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / canvasAspectRatio;
        } else {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * canvasAspectRatio;
        }

        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        pdf.addImage(imgData, "JPEG", x, y, finalWidth, finalHeight);

        const safeName = (name || "resume")
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase();
        pdf.save(`${safeName}_resume.pdf`);
      })
      .catch((err) => {
        console.error("Error capturing component with html2canvas:", err);
        alert(`Failed to capture resume: ${err.message}.`);
      });
  };

  const SectionTitle = ({ title }) => (
    <h2 className="text-sm sm:text-base font-bold text-gray-900 border-b border-gray-800 pb-2 mb-2 uppercase tracking-wider">
      {title}
    </h2>
  );

  // --- SKILLS CATEGORIZATION (from useBulkResumeGenerator.js) ---
  const allSkills = generateDynamicSkills(skills, jobDescription);
  const categorizedSkillsSet = new Set();
  const getSkillsArrayForCategory = (keywords) => {
    const categorySkills = allSkills.filter(
      (skill) =>
        !categorizedSkillsSet.has(skill) &&
        keywords.some((kw) =>
          skill
            .toLowerCase()
            .replace(/[-. /]/g, "")
            .includes(kw.replace(/[-. /]/g, ""))
        )
    );
    categorySkills.forEach((skill) => categorizedSkillsSet.add(skill));
    return categorySkills;
  };

  const languagesArr = getSkillsArrayForCategory([
    "rust",
    "solidity",
    "python",
    "javascript",
    "js",
    "go",
    "html",
    "css",
    "typescript",
    "ts",
    "c++",
    "sql",
    "node.js",
  ]);
  const frameworksArr = getSkillsArrayForCategory([
    "tokio",
    "async-std",
    "react",
    "express",
    "next",
    "next.js",
    "django",
    "flask",
    "fastapi",
    "mern",
    "mongodb",
    "mongoose",
  ]);
  const toolsArr = getSkillsArrayForCategory([
    "git",
    "github",
    "githubactions",
    "docker",
    "kubernetes",
    "aws",
    "gcp",
    "azure",
    "ci/cd",
    "cicd",
    "jenkins",
    "terraform",
  ]);
  const blockchainArr = getSkillsArrayForCategory([
    "ethereum",
    "polygon",
    "solana",
    "evm",
    "web3",
    "web3.js",
    "ethers",
    "ethers.js",
    "ipfs",
    "filecoin",
    "decentralized",
    "zk",
    "zk-snarks",
    "zksnarks",
    "smartcontracts",
    "smart.contract",
    "jamprotocol",
    "cross-chain",
    "hyperlane",
    "chainlink",
    "bsc",
    "wormhole",
    "blockchain",
    "hardhat",
    "foundry",
  ]);

  const languagesList = languagesArr.join(", ");
  const frameworksList = frameworksArr.join(", ");
  const toolsList = toolsArr.join(", ");
  const blockchainList = blockchainArr.join(", ");

  return (
    <>
      {/* Responsive button container */}
      <div className="flex flex-col sm:flex-row justify-end mb-4 gap-3">
        <button
          onClick={handleEditInGoogleDocs}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <FaEdit className="w-4 h-4" />
          <span className="hidden sm:inline">Export LaTceX Style</span>
          <span className="sm:hidden">LaTeX</span>
        </button>

        <div className="relative">
          <button
            onClick={() =>
              document
                .getElementById("share-dropdown")
                .classList.toggle("hidden")
            }
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <FaShareAlt className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
            <span className="sm:hidden">Share</span>
          </button>

          <div
            id="share-dropdown"
            className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
          >
            <button
              onClick={() => handleShare("whatsapp")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
            >
              <span className="text-lg">📱</span>
              WhatsApp (Instant)
            </button>
            <button
              onClick={() => handleShare("gmail")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
            >
              <span className="text-lg">📧</span>
              Gmail (Instant)
            </button>
            <button
              onClick={() => handleShare("drive")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
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
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l4-4m-4 4l-4-4m8 2h3m-3 4h3m-6-8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>

      {/* Responsive resume container */}
      {/* Insert print-specific CSS to reduce side padding and set A4 width for PDF/print exports */}
      <style>{`@media print { .resume-print-container { padding: 0.35in !important; max-width: 8.27in !important; box-shadow: none !important; border-radius: 0 !important; } .resume-print-container * { -webkit-print-color-adjust: exact; } }`}</style>

      <div
        className="bg-white p-4 sm:p-6 lg:p-8 max-w-full mx-auto shadow-lg rounded-lg print:shadow-none print:rounded-none resume-print-container"
        ref={resumeRef}
        style={{
          fontFamily: styling?.fonts?.primary || "Georgia, serif",
          color: styling?.colors?.primary || "#2c3e50",
        }}
      >
        {/* Header */}
        <div className="text-left pb-4 ">
          <h1
            className="text-lg sm:text-xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: styling?.fonts?.heading }}
          >
            {name}
          </h1>
          <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-8 text-gray-600">
            <div className="text-xs sm:text-sm font-medium">{phone}</div>
            <div className="text-xs sm:text-sm font-medium">{telegram}</div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-4 resume-section">
          <SectionTitle title="SUMMARY" />
          <div
            className="text-gray-700 leading-relaxed text-sm sm:text-base italic"
            dangerouslySetInnerHTML={{
              __html: processText(truncateWords(generateDynamicSummary(), 60)),
            }}
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
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-1">
                    <h3
                      className="font-bold text-sm sm:text-base text-gray-900 mb-1 sm:mb-0"
                      style={{ fontFamily: styling?.fonts?.heading }}
                    >
                      {exp.company}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">
                      {exp.period}
                    </p>
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-gray-800 mb-1">
                    {exp.role}
                  </p>
                  <ul className="space-y-1">
                    {exp.points &&
                      exp.points.length > 0 &&
                      // show up to 3 important bullets (slice helps avoid overflow)
                      exp.points.slice(0, 2).map((point, i) => (
                        <li
                          key={i}
                          className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base"
                        >
                          <span className="text-gray-900 mr-2 flex-shrink-0">
                            •
                          </span>
                          <span
                            className="flex-1"
                            dangerouslySetInnerHTML={{
                              __html: processText(point),
                            }}
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
              {generateDynamicProjects()
                .slice(0, 3)
                .map((proj, index) => (
                  <div key={index}>
                    <div
                      className="font-bold text-sm sm:text-base text-gray-900 mb-1"
                      style={{ fontFamily: styling?.fonts?.heading }}
                    >
                      {proj.name}
                    </div>
                    <div
                      className="text-gray-700 leading-relaxed text-sm sm:text-base"
                      dangerouslySetInnerHTML={{
                        __html: processText(proj.description),
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* --- SKILLS RENDERING --- */}
          <div className="resume-section">
            <SectionTitle title="SKILLS" />
            <div className="">
              {languagesList && (
                <div>
                  <span
                    className="font-bold text-gray-900 text-sm"
                    style={{
                      fontFamily: styling?.fonts?.primary || "Georgia, serif",
                    }}
                  >
                    Languages:
                  </span>
                  <span
                    className="text-gray-700 text-sm"
                    style={{
                      fontFamily: styling?.fonts?.primary || "Georgia, serif",
                    }}
                  >
                    {" "}
                    {languagesList}
                  </span>
                </div>
              )}
              {frameworksList && (
                <div>
                  <span
                    className="font-bold text-gray-900 text-sm"
                    style={{
                      fontFamily: styling?.fonts?.primary || "Georgia, serif",
                    }}
                  >
                    Frameworks & Libraries:
                  </span>
                  <span
                    className="text-gray-700 text-sm"
                    style={{
                      fontFamily: styling?.fonts?.primary || "Georgia, serif",
                    }}
                  >
                    {" "}
                    {frameworksList}
                  </span>
                </div>
              )}
              {blockchainList && (
                <div>
                  <span
                    className="font-bold text-gray-900 text-sm"
                    style={{
                      fontFamily: styling?.fonts?.primary || "Georgia, serif",
                    }}
                  >
                    Blockchain:
                  </span>
                  <span
                    className="text-gray-700 text-sm"
                    style={{
                      fontFamily: styling?.fonts?.primary || "Georgia, serif",
                    }}
                  >
                    {" "}
                    {blockchainList}
                  </span>
                </div>
              )}
              {toolsList && (
                <div>
                  <span
                    className="font-bold text-gray-900 text-sm"
                    style={{
                      fontFamily: styling?.fonts?.primary || "Georgia, serif",
                    }}
                  >
                    Tools & DevOps:
                  </span>
                  <span
                    className="text-gray-700 text-sm"
                    style={{
                      fontFamily: styling?.fonts?.primary || "Georgia, serif",
                    }}
                  >
                    {" "}
                    {toolsList}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreview;








