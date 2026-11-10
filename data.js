/**
 * Dev Dadhich — Portfolio Data Store
 * Executive Architecture: Dual-Persona Experience ("Business Analyst" vs. "Marketing & Branding")
 * Dedicated Deep-Dive Project Links & Verified Certifications
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Dev Dadhich",
    degree: "PGDM (IT & Marketing) • BCA (Computer Applications)",
    experience: "Ex-Founder's Office Intern @ Avionic Consulting Solution",
    photo: "dev.png",
    location: "Ahmedabad / Jaipur, India",
    email: "dadhich2004dev@gmail.com",
    phone: "+91 8503863642",
    linkedin: "https://linkedin.com/in/devdadhich/",
    github: "https://github.com/Devdadhich11",
    linktree: "https://linktr.ee/hie.dev",
    twitter: "https://x.com/hie.dev",
    instagram: "https://www.instagram.com/hie.dev/",

    // Role-Specific Titles & Bios
    titleBA: "Aspiring Business Analyst",
    titleMarketing: "Brand Strategist & Marketing Executive",

    bioBA: "Aspiring Business Analyst combining computer science foundations (BCA) with business management and analytical rigor (PGDM). Proven track record in the Founder's Office at Avionic Consulting re-engineering recruitment operations from 9–10 fragmented spreadsheets into a unified AppSheet CRM, authoring detailed workflow specifications, writing complex SQL queries, and architecting interactive Power BI executive dashboards across 657,000+ data points.",

    bioMarketing: "Brand and Growth Marketing Strategist combining analytical discipline (BCA) with consumer behavior and market research (PGDM - Marketing). Hands-on experience leading student media teams, formulating comprehensive go-to-market strategies for emerging consumer brands (Vyndo), conducting on-ground retail behavioral studies across 50+ vendors at Ahmedabad's Ravivari Bazaar, and optimizing high-friction drop-offs across digital customer journeys.",

    // Role-Specific Metric Scorecards
    statsBA: [
      { num: 657, suffix: "K+", label: "Records Analyzed in Power BI" },
      { num: 10, suffix: "+", label: "Client Accounts Lifecycle Managed" },
      { num: 75, suffix: "%", label: "Turnaround Latency Reduced" },
      { num: 12, suffix: "+", label: "Recruiters & Operations Members Led" }
    ],

    statsMarketing: [
      { num: 45, suffix: "K+", label: "Content Impressions & Digital Reach" },
      { num: 50, suffix: "+", label: "Retail Vendors & Shoppers Interviewed" },
      { num: 3, suffix: "+", label: "Consumer Brand GTM Frameworks" },
      { num: 4, suffix: ".1%", label: "View→Cart Funnel Bottleneck Solved" }
    ]
  },

  roles: {
    ba: {
      roleKey: "ba",
      badgeText: "BUSINESS ANALYST",
      heroTag: "[ TARGETING BUSINESS ANALYST & DATA ROLES ]",
      heroTitle: "Aspiring Business Analyst",
      heroTagline: "Targeting Business Analyst roles: Translating complex operational workflows and multi-source raw data into structured models, SQL schemas, and interactive Power BI KPI ecosystems.",
      focus: [
        "Business Process Mapping, As-Is / To-Be Workflow Optimization & SOP Documentation",
        "Interactive Power BI Dashboard Engineering, Star-Schema Design & Complex DAX Modeling",
        "Relational Database Schema Design, MySQL Querying, Views, Triggers & Aggregations",
        "Cross-Functional Stakeholder Elicitation, Recruiter Leadership & Operational SLA Governance"
      ],
      competencies: [
        {
          code: "01",
          title: "Data Analytics & Power BI DAX Modeling",
          desc: "Architecting multi-dimensional star schemas, writing custom DAX measures, and visualizing enterprise performance KPIs across 657,000+ transactional events."
        },
        {
          code: "02",
          title: "Process Re-Engineering & Workflow Mapping",
          desc: "Deconstructing legacy multi-spreadsheet bottlenecks into structured As-Is / To-Be operational workflows, gap analysis matrices, and standardized SOPs."
        },
        {
          code: "03",
          title: "Relational Databases & SQL Extraction",
          desc: "Designing normalized database schemas, multi-table joins, views, triggers, and aggregations to analyze business performance and customer transactions."
        },
        {
          code: "04",
          title: "Operations Leadership & SLA Governance",
          desc: "Leading operational teams of 12+ recruiters, managing delivery across 10+ client engagements, and facilitating user acceptance testing (UAT)."
        }
      ],
      marquee: {
        line1: ["Power BI", "SQL", "Python", "DAX Modeling", "MySQL", "Excel Financial Modeling", "Star Schema", "AppSheet CRM", "SLA Optimization", "Business Analytics"],
        line2: ["HTML5", "CSS3", "JavaScript", "Git", "Google Apps Script", "Data Hygiene", "Process Mapping", "As-Is/To-Be Analysis", "Power Query", "Workflow Automation"],
        line3: ["Agile / Scrum", "Stakeholder Lead", "Requirement Elicitation", "UAT Testing", "KPI Frameworks", "Data Storytelling", "Gap Analysis", "Root Cause Analysis"]
      }
    },

    marketing: {
      roleKey: "marketing",
      badgeText: "MARKETING & BRANDING",
      heroTag: "[ TARGETING BRANDING, MARKETING & GROWTH ROLES ]",
      heroTitle: "Brand Strategist & Marketing Executive",
      heroTagline: "Targeting Marketing & Branding roles: Connecting consumer psychology, brand narrative, and performance funnels to build memorable market presence.",
      focus: [
        "Brand Identity Architecture, Value Proposition Design & Competitive Positioning",
        "Consumer Market Research, Field Behavioral Ethnography & Buying Trigger Analysis",
        "Go-To-Market (GTM) Strategy, Funnel Optimization & Conversion Rate Optimization (CRO)",
        "Creative Direction, Visual Storytelling, Social Media Growth & Campaign Production"
      ],
      competencies: [
        {
          code: "01",
          title: "Brand Architecture & Market Positioning",
          desc: "Defining brand identity systems, core value propositions, customer persona matrices, and competitive differentiation playbooks for emerging consumer brands."
        },
        {
          code: "02",
          title: "Consumer Research & Field Insights",
          desc: "Conducting qualitative field studies (50+ vendor/shopper interviews), decoding consumer trust mechanisms, price elasticity, and informal retail dynamics."
        },
        {
          code: "03",
          title: "Funnel Analytics & Conversion Optimization",
          desc: "Evaluating e-commerce customer drop-offs (identifying 4.1% View→Cart bottleneck), customer journey mapping, and conversion rate optimization (CRO)."
        },
        {
          code: "04",
          title: "Creative Direction & Media Leadership",
          desc: "Heading student media teams, producing cinematic video content (DaVinci Resolve), crafting copy, and driving multi-platform engagement campaigns."
        }
      ],
      marquee: {
        line1: ["Brand Strategy", "Meta Ads", "Google Analytics 4", "SEO Strategy", "Consumer Psychology", "Content Architecture", "GTM Playbooks", "Market Positioning"],
        line2: ["Figma Design", "DaVinci Resolve", "Canva Pro", "Copywriting", "Social Media Growth", "Visual Storytelling", "Brand Guidelines", "Audience Segmentation"],
        line3: ["Qualitative Surveys", "Field Ethnography", "Conversion Optimization", "Customer Journey", "Creative Direction", "Email Campaigns", "Campaign ROI", "Brand Narrative"]
      }
    }
  },

  // Projects Structured for Both Personas
  // For RWMS and E-Commerce, dedicatedPage: true directs directly to rwms.html and ecommerce-analytics.html!
  projectsBA: [
    {
      id: "avionic-crm-product",
      num: "01",
      title: "Recruitment Workflow Management System (RWMS)",
      type: "Product & Operations",
      role: "Founder's Office / Business Analyst",
      image: "avionic.jpeg",
      dedicatedPage: "rwms.html",
      badge: "DEDICATED CASE STUDY",
      summary: "Consolidating 9–10 disconnected Excel spreadsheets into a unified AppSheet operational CRM for 12+ recruiters and 10+ enterprise clients.",
      problem: "Recruitment operations suffered from missing follow-ups, duplicate submissions, and ~1.5 hours/day of manual founder reporting across 9–10 Excel sheets.",
      solution: "Engineered an AppSheet CRM with stage-gate validation, Google Apps Script email notifications, and executive SLA dashboards.",
      impact: "100% adoption across 12+ recruiters, eliminated manual reporting overhead (~450 hrs/yr saved), and tracked 10 critical operational KPIs.",
      link: "rwms.html",
      tags: ["AppSheet", "Workflow Mapping", "Process Optimization", "SLA Tracking", "Operations"]
    },
    {
      id: "ecommerce-performance-analytics",
      num: "02",
      title: "E-Commerce Performance Analytics & Funnel Diagnostics",
      type: "Data Analytics",
      role: "Business Analyst Track",
      image: "Overview.png",
      dedicatedPage: "ecommerce-analytics.html",
      badge: "DEDICATED CASE STUDY",
      summary: "Transforming 657,000+ raw transactional events into an executive 2-page Power BI dashboard to diagnose conversion drop-offs and revenue risks.",
      problem: "Raw event data lacked structured multi-dimensional visibility, hiding critical pre-cart drop-offs and brand concentration vulnerabilities.",
      solution: "Engineered a star-schema data model in Power BI with complex DAX calculations evaluating 122K+ users, 27K carts, and 13K purchase events.",
      impact: "Diagnosed sharp pre-cart friction point (~4.1% View→Cart) and delivered 5 data-backed merchandising recommendations.",
      link: "ecommerce-analytics.html",
      tags: ["Power BI", "DAX", "Star Schema", "Power Query", "Funnel Analytics"]
    },
    {
      id: "power-plant-analytics",
      num: "03",
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
      id: "bookstore-sql-project",
      num: "04",
      title: "PageTurner Bookstore — Relational SQL & Business Analysis",
      type: "SQL / Business Analytics",
      role: "Business Analyst / Data Analyst",
      image: "bookstore.png",
      summary: "Designed a relational bookstore database and executed SQL business queries across books, authors, sales, and revenue.",
      problem: "Bookstore data was unstructured, preventing effective revenue tracking by genre, author performance, and quarterly trends.",
      solution: "Designed MySQL relational schema with primary/foreign keys, triggers, views, and complex analytical SQL queries (joins, aggregations).",
      impact: "Delivered actionable revenue visibility across authors, referral channels, and historical customer purchasing patterns.",
      link: "https://github.com/Devdadhich11/Bookstore-SQL",
      tags: ["SQL", "MySQL", "Relational Schemas", "Data Analysis"]
    },
    {
      id: "ravivari-retail-study",
      num: "05",
      title: "Marketing Strategies in Unorganized Markets",
      type: "Business Research",
      role: "Business Analyst Track",
      image: "unrecognised.png",
      summary: "Field-based qualitative study of informal retail operational tactics at Ahmedabad's historic Ravivari Bazaar market.",
      problem: "Analyzing how unorganized traditional vendors sustain margins and customer retention against modern organized retail chains.",
      solution: "Interviewed 50+ vendors, analyzed footfall-to-location dynamics, and structured comparative informal retail frameworks.",
      impact: "Formulated trust-building, customer psychology, and low-overhead operational tactics in a comprehensive study report.",
      link: "https://drive.google.com/file/d/1Y5dEzqyxh8Ao3HK9DANXdjOgp2AwM8J9/view?usp=sharing",
      tags: ["Field Analysis", "Retail Strategy", "Qualitative Analytics"]
    },
    {
      id: "vyndo-market-strategy",
      num: "06",
      title: "Vyndo — Brand Development & Go-To-Market Strategy",
      type: "Market Strategy",
      role: "Business Strategist",
      image: "vyndo.png",
      summary: "Strategic market positioning, competitor benchmarking, and go-to-market plan for Vyndo consumer brand.",
      problem: "Brand required clear value proposition, audience segmentation, and activation tactics to capture market share.",
      solution: "Evaluated target customer segments, designed digital marketing funnels, and proposed a custom digital portal concept.",
      impact: "Delivered actionable GTM recommendations backed by market research metrics.",
      link: "https://drive.google.com/file/d/1Y5dEzqyxh8Ao3HK9DANXdjOgp2AwM8J9/view?usp=sharing",
      tags: ["GTM Strategy", "Market Research", "Positioning"]
    },
    {
      id: "drishti-brand-web",
      num: "07",
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
      num: "08",
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
      num: "09",
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
    }
  ],

  projectsMarketing: [
    {
      id: "vyndo-market-strategy",
      num: "01",
      title: "Vyndo — Direct-to-Consumer Brand Development & GTM Strategy",
      type: "Brand Strategy & GTM",
      role: "Brand Strategist & Marketing Lead",
      image: "vyndo.png",
      badge: "PRIMARY BRAND CASE",
      summary: "Comprehensive brand positioning, competitor whitespace benchmarking, and multichannel go-to-market playbook for Vyndo.",
      problem: "New consumer lifestyle brand required distinct identity positioning, value proposition clarity, and an acquisition engine in a crowded market.",
      solution: "Developed audience segmentation, crafted emotional and functional messaging pillars, mapped digital acquisition funnels, and architected web brand touchpoints.",
      impact: "Delivered end-to-end brand identity manual and launch roadmap with targeted customer acquisition unit economics.",
      link: "https://drive.google.com/file/d/1Y5dEzqyxh8Ao3HK9DANXdjOgp2AwM8J9/view?usp=sharing",
      tags: ["Brand Architecture", "GTM Strategy", "Audience Personas", "Value Proposition", "DTC Marketing"]
    },
    {
      id: "ecommerce-performance-analytics",
      num: "02",
      title: "E-Commerce Funnel & Consumer Brand Behavior Analysis",
      type: "Growth & Conversion",
      role: "Marketing Analyst & Strategist",
      image: "Overview.png",
      dedicatedPage: "ecommerce-analytics.html",
      badge: "DEDICATED CASE STUDY",
      summary: "Analyzing 657,000+ shopper events to uncover cart abandonment drivers, category brand affinity, and conversion rate optimization (CRO) opportunities.",
      problem: "E-commerce store suffered severe customer drop-off before cart creation (only 4.1% View→Cart) and over-reliance on top 3 smartphone brands.",
      solution: "Conducted deep-funnel diagnostic across 122K+ users, analyzed purchase intent by category, and built actionable retention and cross-sell frameworks.",
      impact: "Formulated 5 high-impact merchandising playbooks (pre-cart micro-nudges, abandonment remarketing, and challenger brand bundling).",
      link: "ecommerce-analytics.html",
      tags: ["Conversion Rate (CRO)", "Customer Journey", "Funnel Analytics", "Merchandising", "Consumer Insights"]
    },
    {
      id: "ravivari-retail-study",
      num: "03",
      title: "Marketing Strategies in Unorganized Markets (Ravivari Bazaar)",
      type: "Field Ethnography & Behavioral Study",
      role: "Lead Field Researcher & Consumer Analyst",
      image: "unrecognised.png",
      badge: "CONSUMER RESEARCH",
      summary: "Extensive on-ground field research evaluating consumer buying psychology, trust signals, and pricing tactics at Ahmedabad's 600-year-old market.",
      problem: "Understanding how informal micro-retailers maintain loyalty, volume, and pricing power in direct competition with modern organized retail.",
      solution: "Interviewed 50+ vendors and 100+ shoppers, documented non-verbal negotiation tactics, spatial footfall dynamics, and community trust networks.",
      impact: "Published an in-depth marketing research monograph translating informal retail tactics into actionable principles for modern brands.",
      link: "https://drive.google.com/file/d/1Y5dEzqyxh8Ao3HK9DANXdjOgp2AwM8J9/view?usp=sharing",
      tags: ["Consumer Psychology", "Field Ethnography", "Pricing Tactics", "Trust Architecture", "Market Insights"]
    },
    {
      id: "drishti-brand-web",
      num: "04",
      title: "Drishti — Visual Storytelling Studio & Brand Identity Portal",
      type: "Brand Identity & Digital Showcase",
      role: "Brand Identity Designer & Web Producer",
      image: "drishti.png",
      summary: "Cinematic brand positioning and high-conversion visual portfolio portal for Drishti creative production studio.",
      problem: "Creative visual agency needed an executive digital identity that conveys artistic prestige and converts high-ticket commercial brand clients.",
      solution: "Crafted dark cinematic design language, fluid video embeds, curated narrative case studies, and clear inquiry booking workflows.",
      impact: "Transformed studio brand perception and established an authoritative digital presence for commercial enterprise pitches.",
      link: "https://devdadhich11.github.io/Drishti/",
      tags: ["Brand Identity", "Visual Storytelling", "UI/UX", "Creative Direction"]
    },
    {
      id: "student-media-lead",
      num: "05",
      title: "Student Media Team — High-Impact Digital Growth & Event Campaigns",
      type: "Campaign Marketing & Content",
      role: "Head of Social Media",
      image: "event.png",
      summary: "Spearheaded digital content creation, video campaigns, and social media promotion driving record event attendance and engagement.",
      problem: "Campus events and student initiatives suffered from fragmented communication and low organic digital engagement.",
      solution: "Led a creative content team, directed video production (DaVinci Resolve), established content calendars, and ran targeted promotional pushes.",
      impact: "Generated 45,000+ organic impressions, grew social following by 40%, and achieved 100% capacity attendance across flagship events.",
      link: "https://www.instagram.com/hie.dev/",
      tags: ["Social Media Marketing", "Content Strategy", "Video Production", "Campaign Direction"]
    },
    {
      id: "avionic-crm-product",
      num: "06",
      title: "RWMS — Employer Brand Consistency & Operational Trust",
      type: "Internal Brand & Operations",
      role: "Founder's Office Lead",
      image: "avionic.jpeg",
      dedicatedPage: "rwms.html",
      badge: "DEDICATED CASE STUDY",
      summary: "Scaling operational reliability to safeguard Avionic's consulting brand reputation across 10+ high-profile corporate clients.",
      problem: "Recruiter spreadsheet chaos created inconsistent candidate touchpoints and SLA misses that directly threatened the agency's client trust.",
      solution: "Architected standardized client communication templates, stage-gate recruiter quality checks, and real-time SLA accountability.",
      impact: "Eliminated candidate double-submissions, protected enterprise client retention, and institutionalized brand delivery excellence.",
      link: "rwms.html",
      tags: ["Operational Trust", "Employer Branding", "SLA Governance", "Client Relations"]
    },
    {
      id: "pinkcity-parichay",
      num: "07",
      title: "Pink City Parichay — Destination Branding & Cultural Heritage",
      type: "Destination Marketing",
      role: "Creative Concept & Product Lead",
      image: "pinkcity.png",
      summary: "Experiential destination marketing portal promoting Jaipur's rich heritage, artisan craft culture, and hidden city landmarks.",
      problem: "Standard travel portals treated Jaipur generically, lacking cultural depth, curated visual narratives, and local craft storytelling.",
      solution: "Curated interactive heritage discovery cards, landmark guides, and artisanal craft spotlights with royal Rajasthan color aesthetics.",
      impact: "Delivered an engaging digital cultural gateway celebrating Jaipur's authentic heritage and local artisan economy.",
      link: "https://devdadhich11.github.io/pinkcity-parichay/index.html",
      tags: ["Destination Branding", "Cultural Narrative", "Visual Design", "Tourism"]
    },
    {
      id: "eventsphere-app",
      num: "08",
      title: "EventSphere — Community Engagement & Event Marketing Platform",
      type: "Community Growth & Tech",
      role: "Product & Growth Designer",
      image: "event.png",
      summary: "Digital community engagement platform built to centralize event discovery, attendee registration, and interest-based networking.",
      problem: "Community event organizers struggled with low attendance visibility, fragmented sign-ups, and lack of attendee segmentation.",
      solution: "Built intuitive mobile-first registration flows, category-based event exploration, and clear event value proposition highlights.",
      impact: "Streamlined event promotion and reduced friction in attendee discovery and ticketing.",
      link: "https://devdadhich11.github.io/EventSPHERE/",
      tags: ["Community Growth", "Event Marketing", "User Acquisition", "Mobile Web"]
    },
    {
      id: "bookstore-sql-project",
      num: "09",
      title: "PageTurner Bookstore — Customer Retention & Loyalty Analysis",
      type: "Marketing Analytics",
      role: "Marketing & Data Analyst",
      image: "bookstore.png",
      summary: "Analyzing customer purchase frequency, author brand equity, and referral channel performance to drive retention marketing.",
      problem: "Bookstore had no visibility into repeat purchase rates, genre customer loyalty, or the revenue contribution of referral marketing.",
      solution: "Wrote SQL queries segmenting customers by order recency, total spend, and genre preference to identify highest-LTV customer cohorts.",
      impact: "Quantified referral channel ROI and delivered targeted customer retention and author cross-promotion strategies.",
      link: "https://github.com/Devdadhich11/Bookstore-SQL",
      tags: ["Customer LTV", "Retention Analytics", "SQL", "Loyalty Modeling"]
    }
  ],

  samplePRD: {
    title: "Internal Recruitment CRM & Operations Workflow",
    organization: "Avionic Consulting Solution",
    author: "Dev Dadhich (Founder's Office Intern)",
    status: "Implemented",
    problem: "Recruitment operations lacked centralized tracking across 12+ recruiters, causing 40% latency in candidate onboarding and opaque client SLA visibility.",
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
    metrics: ["35% reduction in onboarding latency", "100% visibility across 10+ client accounts", "Zero lead drops due to manual errors"]
  },

  chartData: {
    labels: ["Sourcing", "Screening", "Shortlist", "Interview", "Offer", "Joined"],
    candidates: [128, 96, 54, 32, 18, 14],
    sla: [72, 78, 84, 89, 94, 97]
  },

  ecomChartData: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    cart: [6200, 6800, 6500, 6100, 1741],
    purchase: [3100, 3400, 3200, 3000, 729]
  },

  experiences: [
    {
      period: "May 2026 – July 2026",
      role: "Founder's Office Intern",
      organization: "Avionic Consulting Solution",
      bullets: [
        "Worked directly with the founder on business operations, product strategy, and organizational growth.",
        "Identified operational bottlenecks, authored Product Requirement Documents (PRDs), and managed 12+ recruiters across active accounts.",
        "Oversee 10+ client engagements from initial requirement gathering to post-implementation support.",
        "Directed development of internal digital products (AppSheet, Google Workspace, Excel, Google Apps Script).",
        "Designed KPI dashboards and standard operating procedures (SOPs) to boost organizational performance and delivery trust."
      ]
    },
    {
      period: "Aug 2023 – Nov 2023",
      role: "Head of Social Media",
      organization: "Student Media Team",
      bullets: [
        "Spearheaded digital content campaigns boosting event turnouts and platform reach to over 45,000+ organic impressions.",
        "Produced video edits (DaVinci Resolve), high-converting graphics, and led content team members across campus initiatives.",
        "Created promotional strategies that achieved 100% attendance capacity for flagship college technical events."
      ]
    },
    {
      period: "Feb 2023 – Mar 2024",
      role: "Club Treasurer",
      organization: "ACM Student Chapter (JECRC University)",
      bullets: [
        "Managed ACM event finances, budgeting, expense tracking, and transparent financial reporting.",
        "Collaborated with core leadership to develop financially sound technical event plans and sponsorship proposals."
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

// Expose globally
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
