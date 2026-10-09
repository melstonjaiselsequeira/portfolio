export const personalInfo = {
  name: "Melston Jaisel Sequeira",
  title: "Data Engineer | Machine Learning | Software Engineer | Full Stack Developer",
  shortTitle: "Data Engineer & ML Developer",
  location: "Bengaluru, Karnataka",
  email: "melstonjaiselsequeira@gmail.com",
  phone: "+91-7337764722",
  roles: [
    "Data Engineer",
    "Machine Learning Engineer",
    "Software Engineer",
    "Full Stack Developer"
  ],
  bio: "I build data-driven applications, machine learning systems, intelligent solutions and modern full-stack software that solve real-world problems.",
  highlights: [
    "Machine Learning",
    "Data Engineering",
    "Full Stack Development"
  ],
  resumeUrl: "/Melston_Jaisel_Sequeira_Resume.pdf",
  socials: {
    github: "https://github.com/melstonjaiselsequeira", // Placeholder as per instructions
    linkedin: "https://www.linkedin.com/in/melstonjaiselsequeira/", // Placeholder as per instructions
    email: "melstonjaiselsequeira@gmail.com"
  }
};

export const aboutData = {
  heading: "ABOUT ME",
  description:
    " I am a passionate Software Engineer with a strong interest in building innovative solutions that solve real-world problems. I have experience with hands-on project across the full development lifecycle, including analysis, design, development, testing, and implementation. With a strong analytical mindset and problem-solving focus, I specializes in building robust data engineering pipelines, machine learning models, and scalable full-stack web applications.",
  skillsOverview:
    " I work with modern technologies including Python, MERN, Flask, TensorFlow/OpenCV, Kafka, and PyFlink, demonstrating problem-solving, communication, teamwork, adaptability, initiative, and an analytical mindset.",
  domains: [
    {
      id: "data-engineering",
      title: "Data Engineering",
      icon: "Database",
      summary: "Data pipelines, Kafka, PyFlink, databases and data processing.",
      details: [
        "Event streaming and message queuing with Apache Kafka",
        "Stream processing and aggregation with PyFlink",
        "Relational & NoSQL database schemas (MongoDB, MySQL, SQLite)",
        "Automated data pipeline orchestration and ETL flows"
      ]
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      icon: "Cpu",
      summary: "Healthcare risk prediction, NLP, scikit-learn and data analysis.",
      details: [
        "Predictive modeling using scikit-learn and statistical methods",
        "Natural language processing with spaCy and text mining",
        "Maternal healthcare risk prediction analytics",
        "Data-driven public health and operational decision support"
      ]
    },
    {
      id: "software-engineering",
      title: "Software Engineering",
      icon: "Terminal",
      summary: "Backend APIs, application development, testing and debugging.",
      details: [
        "High-performance RESTful APIs with Node.js, Express, and FastAPI",
        "MVC architectural patterns and clean modular code design",
        "Comprehensive debugging, unit testing, and test coverage",
        "Algorithms, optimized data structures, and system efficiency"
      ]
    },
    {
      id: "full-stack",
      title: "Full Stack Development",
      icon: "Code",
      summary: "React, JavaScript, Flask, Node.js and responsive web applications.",
      details: [
        "Modern reactive user interfaces with React.js and CSS3/Tailwind",
        "Robust server-side logic in Python (Flask) and JavaScript (Node.js)",
        "State management, API integration, and asynchronous flows",
        "Mobile-first responsive design and cross-device optimization"
      ]
    }
  ]
};

export const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", icon: "SiPython" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "C", icon: "SiC" },
      { name: "SQL", icon: "TbDatabase" }
    ]
  },
  {
    category: "Machine Learning",
    skills: [
      { name: "scikit-learn", icon: "SiScikitlearn" },
      { name: "spaCy", icon: "SiSpacy" },
      { name: "NLP", icon: "TbBrain" },
      { name: "Streamlit", icon: "SiStreamlit" },
      { name: "Pandas", icon: "SiPandas" },
      { name: "Data Analysis", icon: "TbChartDots3" },
      { name: "Data-Driven Decision Making", icon: "TbTargetArrow" }
    ]
  },
  {
    category: "Data Engineering & Pipelines",
    skills: [
      { name: "Apache Kafka", icon: "SiApachekafka" },
      { name: "PyFlink", icon: "SiApacheflink" },
      { name: "Data Pipeline Orchestration", icon: "TbBinaryTree2" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Mongoose", icon: "TbFlame" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "SQLite", icon: "SiSqlite" }
    ]
  },
  {
    category: "Backend Development & APIs",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "RESTful APIs", icon: "TbApi" },
      { name: "FastAPI", icon: "SiFastapi" }
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "React.js", icon: "SiReact" },
      { name: "HTML5", icon: "SiHtml5" },
      { name: "CSS3", icon: "TbBrandCss3" },
      { name: "JavaScript ES6+", icon: "TbBrandJavascript" },
      { name: "Responsive Design", icon: "TbDevices" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" }
    ]
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "VS Code", icon: "TbBrandVscode" },
      { name: "Render", icon: "SiRender" },
      { name: "Vercel", icon: "SiVercel" }
    ]
  },
  {
    category: "Concepts",
    skills: [
      { name: "MVC Architecture", icon: "TbHierarchy2" },
      { name: "Debugging & Testing", icon: "TbBug" },
      { name: "Data Structures & Algorithms", icon: "TbCodeAsterisk" }
    ]
  }
];

export const projects = [
  {
    id: "obsera-health",
    title: "Obsera-Health",
    subtitle: "Maternal Health Risk Prediction",
    description:
      "A machine learning-based system that predicts maternal health risk levels using healthcare indicators.",
    details:
      "Provides district- and state-level risk analysis to support data-driven public health decisions.",
    technologies: ["Python", "Streamlit", "Pandas"],
    image: "/projects/obsera-health.png",
    github: "https://github.com/melstonjaiselsequeira/OBSERA-Health", // Placeholder - real URLs only when provided
    demo: "https://obsera-health.streamlit.app/",   // Placeholder - real URLs only when provided
    badge: "Machine Learning"
  },
  {
    id: "expenseflow",
    title: "ExpenseFlow",
    subtitle: "Expense Tracker",
    description:
      "A full-stack expense tracking web application with category/date filtering, search and sorting.",
    details:
      "Features: Expense dashboard, spending-trend charts, category-breakdown charts, add/edit/delete expense, CSV export, category and date filtering, search, and sorting.",
    features: [
      "Expense dashboard",
      "Spending-trend charts",
      "Category-breakdown charts",
      "Add expense",
      "Edit expense",
      "Delete expense",
      "CSV export",
      "Category filtering",
      "Date filtering",
      "Search",
      "Sorting"
    ],
    backend: ["Flask", "SQLite", "SQLAlchemy"],
    frontend: ["HTML", "CSS", "JavaScript"],
    deployment: "Render",
    technologies: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "SQLite",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    image: "/projects/expenseflow.png",
    github: "https://github.com/melstonjaiselsequeira/Expense-tracker", // Placeholder
    demo: "https://expense-tracker-wph9.onrender.com/",   // Placeholder
    badge: "Full Stack"
  },
  {
    id: "resume-screening",
    title: "Resume-Screening",
    subtitle: "NLP Resume Screening",
    description:
      "An NLP-based resume screening system that extracts candidate skills and matches resumes to job requirements for automated candidate ranking.",
    details:
      "Parses diverse file formats (PDF, DOCX), performs Named Entity Recognition & tokenization via spaCy, computes skill-to-job similarity vectors via scikit-learn, and ranks candidates instantly.",
    technologies: [
      "Python",
      "FastAPI",
      "spaCy",
      "scikit-learn",
      "PyPDF2",
      "python-docx",
      "SQLite",
      "HTML",
      "CSS",
      "Vanilla JavaScript"
    ],
    image: "/projects/resume-screening.png",
    github: "https://github.com/melstonjaiselsequeira/Resume-Screening", // Placeholder
    demo: "https://resume-screening-xi.vercel.app/",   // Placeholder
    badge: "NLP & AI"
  }
];

export const education = [
  {
    degree: "Master of Computer Applications",
    shortDegree: "MCA",
    institution: "PES University",
    location: "Bengaluru, Karnataka",
    cgpa: "7.50/10.0",
    period: "09/2025 – Present",
    status: "In Progress",
    description:
      "Focusing on advanced computing, distributed data engineering architectures, machine learning frameworks, and scalable cloud systems."
  },
  {
    degree: "Bachelor of Computer Applications",
    shortDegree: "BCA",
    institution: "St. Aloysius College, Mangalore-575003",
    location: "Mangalore, Karnataka",
    cgpa: "7.50/10.0",
    period: "08/2022 – 05/2025",
    status: "Completed",
    description:
      "Core foundation in computer science, software engineering methodologies, data structures, algorithms, database management, and full-stack web technologies."
  }
];

export const achievements = [
  {
    title: "Adobe University Hackathon 2026",
    description: "Participated and received a certificate of participation.",
    tag: "Hackathon",
    issuer: "Adobe"
  },
  {
    title: "Societe Generale Hackathon",
    description: "Participated in the hackathon.",
    tag: "Hackathon",
    issuer: "Societe Generale"
  },
  {
    title: "Speech Recognition Workshop",
    description: "Participated in a Speech Recognition workshop.",
    tag: "Technical Workshop",
    issuer: "Workshop"
  },
  {
    title: "Pipeline Automation Workshop",
    description: "Attended a Pipeline Automation workshop.",
    tag: "Engineering Workshop",
    issuer: "Workshop"
  }
];

export const certifications = [
  {
    name: "Data Science Job Simulation",
    issuer: "Forage",
    category: "Data Science"
  },
  {
    name: "AI Agents and Agentic AI",
    issuer: "Coursera",
    category: "Artificial Intelligence"
  },
  {
    name: "Quantitative Research Job Simulation",
    issuer: "Forage",
    category: "Quantitative Analytics"
  },
  {
    name: "Graphic Design",
    issuer: "St. Aloysius College",
    category: "Design & UX"
  }
];

export const languages = [
  {
    name: "English",
    proficiency: "Advanced",
    level: "Full Professional Working Proficiency"
  },
  {
    name: "Kannada",
    proficiency: "Advanced",
    level: "Native / Bilingual Proficiency"
  },
  {
    name: "Konkani",
    proficiency: "Advanced",
    level: "Native / Bilingual Proficiency"
  },
  {
    name: "Hindi",
    proficiency: "Intermediate",
    level: "Working Proficiency"
  }
];

export default {
  personalInfo,
  aboutData,
  skillCategories,
  projects,
  education,
  achievements,
  certifications,
  languages
};
