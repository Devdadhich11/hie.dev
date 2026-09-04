/**
 * Dev Dadhich — Portfolio Data Store
 * Executive Architecture: Preloader, Marquee Stack, Verified Links, & Aspiring APM/BA Copy
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Dev Dadhich",
    title: "Aspiring Associate Product Manager & Business Analyst",
    degree: "PGDM (IT & Marketing) • BCA",
    experience: "Founder's Office Intern @ Avionic Consulting Solution",
    photo: "dev image.jpg",
    location: "Ahmedabad / Jaipur, India",
    email: "dadhich2004dev@gmail.com",
    phone: "+91 8503863642",
    linkedin: "https://linkedin.com/in/devdadhich/",
    github: "https://github.com/Devdadhich11",
    linktree: "https://linktr.ee/hie.dev",
    twitter: "https://x.com/hie.dev",
    instagram: "https://www.instagram.com/hie.dev/",
    
    bioAPM: "Aspiring Associate Product Manager combining technical software grounding (BCA) with business management and analytical rigor (PGDM). Hands-on experience in the Founder's Office authoring PRDs, architecting internal low code workflow automation products , and managing cross functional teams of 12+ recruiters across active client accounts.",
    bioBA: "Aspiring Business Analyst specializing in process re - engineering, requirement elicitation, and data visualization. Proven track record of translating complex operational bottlenecks into interactive Power BI KPI dashboards, SQL queries, and standardized operating procedures (SOPs).",
    
    stats: [
      { num: 10, suffix: "+", label: "Client Engagements Lifecycle Managed" },
      { num: 12, suffix: "+", label: "Recruiters & Ops Team Members Led" },
      { num: 75, suffix: "%", label: "Turnaround Latency Reduced via Automation" },
      { num: 10, suffix: "+", label: "Power BI & Data Analytics Projects" }
    ]
  },

  roles: {
    apm: {
      heroTagline: "Targeting APM roles: Bridging product strategy, technical requirements (PRDs), and workflow automation.",
      focus: [
        "Product Requirement Specifications (PRDs) & Feature Scoping",
        "Low-Code Digital Product Architecture (AppSheet & Apps Script)",
        "User Story Mapping, Figma Wireframing & Feedback Loops",
        "Cross-Functional Team Leadership & Stakeholder Management"
      ]
    },
    ba: {
      heroTagline: "Targeting BA roles: Translating qualitative business needs into data models and actionable KPI dashboards.",
      focus: [
        "Business Process Mapping & As-Is / To-Be Operational Analysis",
        "Interactive Power BI Dashboards & DAX Data Modeling",
        "SQL Relational Data Extraction & Performance Metrics",
        "Standard Operating Procedures (SOPs) & Gap Identification"
      ]
    }
  },

  marquee: {
    line1: ["Power BI", "SQL", "Python", "PRD Specification", "Figma Wireframing", "RICE Prioritization", "AppSheet CRM", "DAX Modeling", "Excel Analysis", "Business Analytics"],
    line2: ["HTML5", "CSS3", "JavaScript", "C++", "Git", "VS Code", "Google Apps Script", "Tailwind CSS", "Meta Ads", "Canva", "Process Optimization"],
    line3: ["DaVinci Resolve", "Framer", "PowerPoint", "Process Mapping", "Agile / Scrum", "Stakeholder Lead", "Field Research", "User Testing", "GTM Strategy", "SOP Frameworks"]
  },

  competencies: [
    {
      code: "01",
      title: "Product Discovery & PRD Architecture",
      desc: "Deconstructing ambiguous business goals into crisp Product Requirement Documents (PRDs), user stories, acceptance criteria, and priority backlogs."
    },
    {
      code: "02",
      title: "Data Analytics & Power BI Modeling",
      desc: "Building interactive analytical dashboards, performing DAX calculations, and writing SQL queries to evaluate performance KPIs."
    },
    {
      code: "03",
      title: "Process Automation & Low-Code Dev",
      desc: "Designing operational CRM tools and workflow automations using AppSheet, Google Apps Script, Excel formulas, and database structures."
    },
    {
      code: "04",
      title: "Cross-Functional Stakeholder Lead",
      desc: "Leading teams of 8+ recruiters, coordinating client deliverables across 5+ engagements, and conducting user acceptance testing (UAT)."
    }
  ],

  samplePRD: {
    title: "Internal Recruitment CRM & Operations Workflow",
    organization: "Avionic Consulting Solution",
    author: "Dev Dadhich (Founder's Office Intern)",
    status: "Implemented",
    problem: "Recruitment operations lacked centralized tracking across 8+ recruiters, causing 40% latency in candidate onboarding and opaque client SLA visibility.",
    objectives: [
      "Unify candidate pipeline and client engagement records into a single relational system.",
      "Automate email alerts and SLA status changes via Google Apps Script.",
      "Provide real-time bandwidth and conversion dashboards for the Founder."
    ],
    stories: [
      { role: "Recruiter", task: "Log candidate status updates in 1 click via web/mobile interface", value: "Saves 30+ minutes of manual spreadsheet maintenance daily." },
      { role: "Founder", task: "View live recruiter throughput and active client engagement metrics", value: "Enables immediate resource reallocation and accurate SLA tracking." },
      { role: "Client Lead", task: "Receive automated weekly status digest emails", value: "Maintains transparency without unnecessary status meetings." }
    ],
    architecture: ["AppSheet Frontend", "Google Apps Script Engine", "Google Sheets / Relational DB", "Power BI Executive Dashboard"],
    metrics: ["35% reduction in onboarding latency", "100% visibility across 5+ client accounts", "Zero lead drops due to manual errors"]
  },

  chartData: {
    labels: ["Sourcing", "Screening", "Shortlist", "Interview", "Offer", "Joined"],
    candidates: [128, 96, 54, 32, 18, 14],
    sla: [72, 78, 84, 89, 94, 97]
  },

  projects: [
    {
      id: "power-plant-analytics",
      num: "02",
      title: "Global Power Plant Analytics Dashboard",
      type: "Data Analytics",
      role: "Business Analyst Track",
      image: "global.jpeg",
      summary: "Interactive Power BI dashboard visualizing global power generation capacity, fuel distributions, and geospatial efficiency metrics.",
      problem: "Analysts lacked a unified multi-dimensional dashboard to evaluate global energy mix and plant performance indicators.",
      solution: "Cleaned raw global datasets, built star-schema relationships in Power BI, created DAX measures, and integrated dynamic drill-down capabilities.",
      impact: "Facilitated rapid geospatial and capacity analysis across 6 energy categories.",
      link: "https://linkedin.com/in/devdadhich/",
      tags: ["Power BI", "DAX", "SQL", "Data Modeling"]
    },
    {
      id: "avionic-crm-product",
      num: "01",
      title: "Avionic Workflow & CRM Digital Product",
      type: "Product Management",
      role: "APM Track",
      image: "event.png",
      summary: "Designed and built internal CRM and operational workflow automation tool during Founder's Office internship.",
      problem: "Manual spreadsheet management led to lead drop-offs, recruiter misallocations, and delayed client deliverables.",
      solution: "Authored comprehensive PRDs, mapped As-Is/To-Be workflows, constructed low-code AppSheet interface with Google Apps Script triggers.",
      impact: "Reduced operational turnaround latency by 35% and streamlined 5+ client accounts.",
      link: "https://drive.google.com/file/d/1Pwgnd-tumXcqIikDnFAi8jpuXr9QzxB1/view?usp=sharing",
      tags: ["AppSheet", "PRD", "Workflow Automation", "Stakeholder Lead"]
    },
    {
      id: "vyndo-market-strategy",
      num: "03",
      title: "Vyndo - Brand Development & Growth Strategy",
      type: "Market Strategy",
      role: "APM / Product Strategist",
      image: "vyndo.png",
      summary: "Strategic market positioning, competitor benchmarking, and go-to-market plan for Vyndo consumer brand.",
      problem: "Brand required clear value proposition, audience segmentation, and activation tactics to capture market share.",
      solution: "Evaluated target customer segments, designed digital marketing funnels, and proposed a custom digital portal concept.",
      impact: "Delivered actionable GTM recommendations backed by market research metrics.",
      link: "https://drive.google.com/file/d/1Y5dEzqyxh8Ao3HK9DANXdjOgp2AwM8J9/view?usp=sharing",
      tags: ["GTM Strategy", "User Research", "Market Positioning"]
    },
    {
      id: "ravivari-retail-study",
      num: "04",
      title: "Marketing Strategies in Unorganized Markets",
      type: "Business Research",
      role: "Business Analyst Track",
      image: "unrecognised.png",
      summary: "Field-based analysis of informal retail tactics at Ahmedabad's Ravivari Bazaar market.",
      problem: "Investigating how unorganized traditional vendors maintain price competitiveness against organized modern retail.",
      solution: "Interviewed 50+ vendors, analyzed footfall-to-location dynamics, and structured comparative informal retail frameworks.",
      impact: "Identified key trust-building and low-overhead operational tactics in a comprehensive study report.",
      link: "https://drive.google.com/file/d/1Y5dEzqyxh8Ao3HK9DANXdjOgp2AwM8J9/view?usp=sharing",
      tags: ["Field Analysis", "Retail Strategy", "Qualitative Analytics"]
    },
    {
      id: "drishti-brand-web",
      num: "05",
      title: "Drishti — Visual Storytelling Studio Web App",
      type: "Web Development",
      role: "Web Developer & UI Designer",
      image: "drishti.png",
      summary: "Minimalist brand web platform for Drishti creative production studio showcasing visual film portfolios.",
      problem: "Studio required a sleek, narrative-driven digital showcase to convert potential brand clients.",
      solution: "Designed high-performance web layout with smooth visual transitions, video carousels, and responsive typography.",
      impact: "Elevated brand credibility and streamlined incoming client inquiries.",
      link: "https://devdadhich11.github.io/Drishti/",
      tags: ["HTML/CSS", "JavaScript", "UI Design"]
    },
    {
      id: "eventsphere-app",
      num: "06",
      title: "EventSphere — Campus Event Management Platform",
      type: "Web Application",
      role: "Frontend Developer",
      image: "event.png",
      summary: "Web platform designed to streamline event discovery, schedule tracking, and user registration.",
      problem: "Campus events lacked a single digital location for real-time updates and schedule tracking.",
      solution: "Built clean modular UI components with filterable category views and clean mobile-first navigation.",
      impact: "Delivered intuitive event discovery user interface.",
      link: "https://devdadhich11.github.io/EventSPHERE/",
      tags: ["Web App", "Event Tech", "Responsive Design"]
    },
    {
      id: "pinkcity-parichay",
      num: "07",
      title: "Pink City Parichay — Jaipur Tourism Portal",
      type: "Web Application",
      role: "Product Developer",
      image: "pinkcity.png",
      summary: "Interactive tourism platform showcasing Jaipur's culture, heritage, and city maps.",
      problem: "Static tourist web portals lacked engaging visual storytelling.",
      solution: "Combined narrative cards with landmark maps and pink-themed UI aesthetics.",
      impact: "Enhanced city tourism exploration experience.",
      link: "https://devdadhich11.github.io/pinkcity-parichay/index.html",
      tags: ["Tourism Platform", "UI/UX", "JavaScript"]
    },

  ],

  experiences: [
    {
      period: "May 2026 – July 2026",
      role: "Founder's Office Intern",
      organization: "Avionic Consulting Solution",
      bullets: [
        "Worked directly with the founder on business operations, product strategy, and organizational growth.",
        "Identified operational bottlenecks, authored Product Requirement Documents (PRDs), and managed 8+ recruiters.",
        "Oversee 5+ client engagements from lead generation to post-implementation support.",
        "Directed development of internal digital products (AppSheet, Google Workspace, Excel, Google Apps Script).",
        "Designed KPI dashboards and standard operating procedures (SOPs) to boost organizational performance."
      ]
    },
    {
      period: "Feb 2023 – Mar 2024",
      role: "Club Treasurer",
      organization: "ACM Student Chapter (JECRC University)",
      bullets: [
        "Managed ACM event finances, budgeting, expense tracking, and transparent financial reporting.",
        "Collaborated with core leadership to develop financially sound technical event plans."
      ]
    },
    {
      period: "Aug 2023 – Nov 2023",
      role: "Head of Social Media",
      organization: "Student Media Team",
      bullets: [
        "Spearheaded digital content campaigns boosting event turnouts and platform reach.",
        "Produced video edits, graphics, and led content team members."
      ]
    }
  ],

  education: [
    {
      year: "2025 – Present",
      degree: "Post Graduate Diploma in Management (PGDM)",
      detail: "IT & Marketing",
      institution: "Narayana Business School (AICTE)",
      score: "71.9%"
    },
    {
      year: "2022 – 2025",
      degree: "Bachelor of Computer Applications (BCA)",
      detail: "Computer Application & Software Dev",
      institution: "JECRC University",
      score: "67.0%"
    },
    {
      year: "2021",
      degree: "Senior Secondary (12th Grade)",
      detail: "Science (Medical - PCB)",
      institution: "St. Edmund's School (CBSE)",
      score: "84.0%"
    },
    {
      year: "2019",
      degree: "Secondary School (10th Grade)",
      detail: "General Studies",
      institution: "St. Edmund's School (CBSE)",
      score: "90.2%"
    }
  ],

  certifications: [
    {
      title: "Deloitte Data Analytics Job Simulation",
      issuer: "Forage",
      id: "JswbZNiDvwET3Cmg4",
      link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_69c7b8ce9fc323c8024b04ca_1774700064235_completion_certificate.pdf"
    },
    {
      title: "Data Visualization with Power BI",
      issuer: "Great Learning",
      id: "SYXPDJMM",
      link: "https://www.mygreatlearning.com/certificate/SYXPDJMM"
    },
    {
      title: "Harnessing the Power of Data with Power BI",
      issuer: "Coursera",
      id: "57TQN6OZHUCQ",
      link: "https://www.coursera.org/account/accomplishments/verify/57TQN6OZHUCQ"
    }
  ]
};

if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
