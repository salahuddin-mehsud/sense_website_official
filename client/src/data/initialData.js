export const initialSessions = [
  {
    id: 'sess-2026-2027',
    name: 'Cohort 2026–2027',
    slug: '2026-2027',
    startYear: 2026,
    endYear: 2027,
    isCurrent: true,
    isArchived: false,
    isHiringOpen: true,
    teamsList: ['Executive Council', 'Web Development', 'AI & Research', 'Operations', 'Media & Decor'],
    hiringFormConfig: {
      requireLinkedIn: true,
      requireInstagram: true,
      requirePortfolio: false,
      customQuestion: 'What technical project, open-source contribution, or society initiative are you most proud of?'
    },
    theme: 'Scaling Frontiers & Real-World Impact',
    description: 'Current tenure focusing on Agentic AI, full-stack systems, industry hackathons, and research publications.'
  },
  {
    id: 'sess-2025-2026',
    name: 'Cohort 2025–2026',
    slug: '2025-2026',
    startYear: 2025,
    endYear: 2026,
    isCurrent: false,
    isArchived: true,
    isHiringOpen: false,
    teamsList: ['Executive Council', 'Web Development', 'Operations'],
    hiringFormConfig: {
      requireLinkedIn: true,
      requireInstagram: false,
      requirePortfolio: false,
      customQuestion: ''
    },
    theme: 'Foundations of Excellence',
    description: 'Founding tenure of SENSE IIUI, setting departmental standards, organizing inaugural bootcamps and team formation.'
  }
];

export const initialTeamCategories = [
  { id: 'cat-exec', key: 'Executive Council', label: 'Executive Council', description: 'Society governance and executive leadership' },
  { id: 'cat-web', key: 'Web Development', label: 'Web Development', description: 'MERN stack, frontend architecture, and cloud platforms' },
  { id: 'cat-ai', key: 'AI & Research', label: 'AI & Research', description: 'Agentic AI, LLM applications, and academic research' },
  { id: 'cat-ops', key: 'Operations', label: 'Operations', description: 'Event operations, logistics, guest reception, and team scheduling' },
  { id: 'cat-media', key: 'Media & Decor', label: 'Media & Decor', description: 'Photography, videography, stage decor, and branding' }
];

export const initialCabinet = [
  {
    id: 'cab-1',
    sessionId: 'sess-2026-2027',
    name: 'Ahmed Khursheed',
    position: 'President',
    roleTag: 'Executive Leadership',
    headline: 'Software Engineering Student | Full-Stack Web Developer (MERN) | React Native Mobile Architect | Project Management & Team Leadership',
    bio: 'Leading SENSE IIUI towards technical innovation, strategic university partnerships, and empowering software engineering students to build scalable, production-grade applications with integrity.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/ahmed-khursheed',
    github: 'https://github.com/ahmedkhursheed',
    email: 'ahmed.khursheed@senseiiui.org',
    skills: ['MERN Stack', 'React Native', 'System Design', 'Agile Leadership', 'Full-Stack Architecture'],
    displayOrder: 1
  },
  {
    id: 'cab-2',
    sessionId: 'sess-2026-2027',
    name: 'Muhammad Zain ul abdin',
    position: 'Vice President',
    roleTag: 'Executive Leadership',
    headline: 'Software Engineering Student | Frontend Developer | Aspiring MERN Stack Developer | Digital Solutions Architect',
    bio: 'Spearheading student engagement, technical curriculum development, community outreach, and high-standard UI/UX development across society initiatives.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/muhammad-zain-ul-abdin-7a5868386',
    github: 'https://github.com/mzainulabdin',
    email: 'zainulabdin@senseiiui.org',
    skills: ['Frontend Architecture', 'React.js', 'Tailwind CSS', 'WordPress', 'Community Growth'],
    displayOrder: 2
  },
  {
    id: 'cab-3',
    sessionId: 'sess-2026-2027',
    name: 'Ameer Hamza Afridi',
    position: 'General Secretary',
    roleTag: 'Executive Leadership',
    headline: 'Software Engineering Student | CCNA Certified | Aspiring SOC Analyst | Cybersecurity & AI Enthusiast',
    bio: 'Managing society governance, administrative operations, event logistics coordination, and championing cybersecurity awareness within the department.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/ameer-hamza-afridi-134261333',
    github: 'https://github.com/ameerhamzaafridi',
    email: 'general.secretary@senseiiui.org',
    skills: ['SOC Analysis', 'Network Security', 'Operations Strategy', 'Python', 'Governance'],
    displayOrder: 3
  },
  // 2025-2026 Founding Cabinet for session switching verification
  {
    id: 'cab-founding-1',
    sessionId: 'sess-2025-2026',
    name: 'Ahmed Khursheed',
    position: 'Founding President',
    roleTag: 'Founding Cabinet',
    headline: 'Founder & President (2025–2026) | Full-Stack Developer',
    bio: 'Established SENSE IIUI as the premier student-led technical organization under the Department of Software Engineering.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/ahmed-khursheed',
    skills: ['Vision & Strategy', 'Team Building', 'Full-Stack'],
    displayOrder: 1
  },
  {
    id: 'cab-founding-2',
    sessionId: 'sess-2025-2026',
    name: 'Muhammad Zain ul abdin',
    position: 'Founding General Secretary',
    roleTag: 'Founding Cabinet',
    headline: 'Founding General Secretary | Frontend Developer',
    bio: 'Drafted society charter and spearheaded the first annual recruitment drive.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/muhammad-zain-ul-abdin-7a5868386',
    skills: ['Operations', 'Web Design', 'Charter Governance'],
    displayOrder: 2
  }
];

export const initialTeamMembers = [
  // RESEARCH & DEVELOPMENT (R&D) TEAM
  {
    id: 'tm-1',
    sessionId: 'sess-2026-2027',
    name: 'Abdullah Iqbal',
    teamCategory: 'R&D',
    position: 'R&D Lead & AI Researcher',
    headline: 'Aspiring Software Engineer | AI/ML & Generative AI Enthusiast | Agentic AI | Python & C++ | Research and Development',
    bio: 'Driving deep learning research, Agentic workflow experiments, and open-source software engineering tools for students at IIUI.',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/abdullah-iqbal-672032360',
    skills: ['Generative AI', 'Agentic Workflows', 'Python', 'C++', 'PyTorch'],
    displayOrder: 1
  },
  {
    id: 'tm-2',
    sessionId: 'sess-2026-2027',
    name: 'Asif Ali',
    teamCategory: 'R&D',
    position: 'AI Engineer & R&D Specialist',
    headline: 'AI Engineer | Software Engineer | Agentic AI & Machine Learning | LangChain & LLM Applications | Web Development',
    bio: 'Developing production LLM integrations, retrieval-augmented generation pipelines, and mentoring junior engineers in AI concepts.',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/asif-ali-9b514b336',
    skills: ['LangChain', 'LLM Agents', 'Machine Learning', 'Computer Networking', 'FastAPI'],
    displayOrder: 2
  },

  // WEB TEAM
  {
    id: 'tm-3',
    sessionId: 'sess-2026-2027',
    name: 'Salah ud Din',
    teamCategory: 'Web',
    position: 'Web Team Lead & Full-Stack Architect',
    headline: 'Full-Stack Developer | MERN Stack | AI & Automation | Desktop & Mobile Apps | Scalable Cloud SaaS',
    bio: 'Directing the architecture and deployment of SENSE digital portals, CI/CD pipelines, and cloud backend infrastructure.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/salahuddinmehsud',
    skills: ['MERN Stack', 'Next.js', 'Automation', 'Cloud Infrastructure', 'System Security'],
    displayOrder: 1
  },
  {
    id: 'tm-4',
    sessionId: 'sess-2026-2027',
    name: 'Zoraiz Ahmed',
    teamCategory: 'Web',
    position: 'Core Frontend & Scaling Engineer',
    headline: 'Software Engineer | Fintech Specialist | Core Front-End & Scaling Towards Full-Stack Infrastructure',
    bio: 'Crafting responsive user interfaces, state management architectures, and performance-tuned web interactions.',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/zoraiz-ahmed-801206348',
    skills: ['React.js', 'Fintech Systems', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
    displayOrder: 2
  },
  {
    id: 'tm-5',
    sessionId: 'sess-2026-2027',
    name: 'Muhammad Mudassar',
    teamCategory: 'Web',
    position: 'Full-Stack Web Associate',
    headline: 'Software Intern @Netkom | Frontend & API Integration Specialist | Software Engineering Student',
    bio: 'Building accessible web interfaces, managing database models, and maintaining Society web services.',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/themudassarawan',
    skills: ['JavaScript', 'REST APIs', 'Node.js', 'Git', 'Bootstrap/Tailwind'],
    displayOrder: 3
  },

  // OPERATIONS TEAM
  {
    id: 'tm-6',
    sessionId: 'sess-2026-2027',
    name: 'Ali Haidar',
    teamCategory: 'Operations',
    position: 'Operations Team Lead',
    headline: 'Computer Science Student | Full Stack Developer | Operations Team Member at SENSE Society',
    bio: 'Managing event execution, logistics pipelines, volunteer task forces, and departmental coordination for major tech conferences.',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/ali-haidar120',
    skills: ['Event Operations', 'Logistics', 'Full Stack Development', 'Problem Solving', 'Team Lead'],
    displayOrder: 1
  },
  {
    id: 'tm-7',
    sessionId: 'sess-2026-2027',
    name: 'Malik Taha',
    teamCategory: 'Operations',
    position: 'Community Outreach & Lead Coordinator',
    headline: 'UG Software Engineer | React Native Mobile App Dev | Harvard Aspire Leaders Program 26 | IT Leadership & Community Outreach',
    bio: 'Driving strategic partnerships with student bodies, tech companies, and coordinating nationwide hackathon participation.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/malik-taha-',
    skills: ['React Native', 'Community Outreach', 'IT Leadership', 'Lead Generation', 'Public Relations'],
    displayOrder: 2
  },
  {
    id: 'tm-8',
    sessionId: 'sess-2026-2027',
    name: 'Abdul Manan Abbasi',
    teamCategory: 'Operations',
    position: 'Security & Operations Specialist',
    headline: 'Cybersecurity Intern @NCP | Security Researcher | VAPT | SAST | Ethical Hacker | Digital Marketer',
    bio: 'Ensuring digital security protocols for events, audit verification, and digital campaign marketing.',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/abdulmananabbasi',
    skills: ['VAPT', 'SAST', 'Ethical Hacking', 'Digital Marketing', 'Operations'],
    displayOrder: 3
  },

  // MEDIA TEAM
  {
    id: 'tm-9',
    sessionId: 'sess-2026-2027',
    name: 'Maryam Amir',
    teamCategory: 'Media',
    position: 'Media & Decor Lead',
    headline: 'Ambassador @ETL Online | Decor Lead @Sense_IIUI | Software Engineering Student @IIUI | UI/UX & Brand Design',
    bio: 'Curating brand presence, visual storytelling, aesthetic stage direction, and social media campaigns for SENSE IIUI.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/maryam-amir-18178b355',
    skills: ['Figma', 'Brand Design', 'Event Decor', 'Social Media Strategy', 'Canva'],
    displayOrder: 1
  },

  // GRAPHICS TEAM
  {
    id: 'tm-10',
    sessionId: 'sess-2026-2027',
    name: 'Zain Abid',
    teamCategory: 'Graphics',
    position: 'Graphics & Visual Identity Lead',
    headline: 'Undergraduate Software Engineering Student | Visual Design Specialist | Brand Aesthetics & Creative Assets',
    bio: 'Crafting high-impact promotional posters, digital banners, event merchandise, and visual identity guides for SENSE IIUI.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/zain-abid-6b2a82350',
    skills: ['Photoshop', 'Illustrator', 'Visual Identity', 'Typography', 'UI Design'],
    displayOrder: 1
  },

  // 2025-2026 Historical Team sample
  {
    id: 'tm-founding-1',
    sessionId: 'sess-2025-2026',
    name: 'Ali Haidar',
    teamCategory: 'Operations',
    position: 'Founding Operations Associate',
    headline: 'Operations Associate (2025-2026)',
    bio: 'Handled venue bookings and attendee registrations for the inaugural semester.',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    linkedIn: 'https://www.linkedin.com/in/ali-haidar120',
    skills: ['Event Management', 'Student Engagement'],
    displayOrder: 1
  }
];

export const initialEvents = [
  {
    id: 'evt-1',
    sessionId: 'sess-2026-2027',
    title: 'DevSprint Hackathon 2026: Code the Future',
    slug: 'devsprint-hackathon-2026',
    category: 'Hackathon',
    status: 'UPCOMING',
    date: '2026-11-28',
    time: '09:00 AM - 08:00 PM PKT',
    registrationDeadline: '2026-11-26 11:59 PM PKT',
    venue: 'Auditorium & Computing Labs, Faculty of Basic & Applied Sciences, IIUI',
    summary: 'A 24-hour flagship hackathon challenging students to build scalable AI-driven solutions and web ecosystems.',
    description: 'Join over 40+ teams across universities competing in three high-impact tracks: Agentic AI Solutions, Fintech & Scalable Platforms, and Cybersecurity/DevSecOps. Mentors from top tech industries will provide hands-on coaching and cash prizes will be awarded.',
    registerUrl: 'https://forms.google.com/sense-iiui-devsprint-2026',
    driveUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    seatsTotal: 150,
    seatsRemaining: 34,
    tags: ['Hackathon', 'AI & Cloud', 'Prizes', 'Networking'],
    isPublished: true,
    featured: true
  },
  {
    id: 'evt-2',
    sessionId: 'sess-2026-2027',
    title: 'Agentic AI & Multi-Agent Architecture Masterclass',
    slug: 'agentic-ai-masterclass',
    category: 'Technical Workshop',
    status: 'UPCOMING',
    date: '2026-12-05',
    time: '02:00 PM - 05:00 PM PKT',
    registrationDeadline: '2026-12-03 11:59 PM PKT',
    venue: 'Software Engineering Lab 04, IIUI New Campus',
    summary: 'Hands-on practical session building autonomous AI agent swarms using LangChain, LangGraph and Gemini API.',
    description: 'Learn how to transition from simple prompt engineering to autonomous cognitive architectures. Conducted by SENSE R&D Team with live code execution and take-home project templates.',
    registerUrl: 'https://forms.google.com/sense-agentic-ai-workshop',
    driveUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    seatsTotal: 60,
    seatsRemaining: 12,
    tags: ['Agentic AI', 'Python', 'LangChain', 'Hands-On'],
    isPublished: true,
    featured: true
  },
  {
    id: 'evt-3',
    sessionId: 'sess-2026-2027',
    title: 'Mastering Full-Stack MERN Architecture & CI/CD',
    slug: 'mastering-mern-cicd',
    category: 'Bootcamp',
    status: 'COMPLETED',
    date: '2026-10-18',
    time: '10:00 AM - 04:00 PM PKT',
    registrationDeadline: '2026-10-15 11:59 PM PKT',
    venue: 'FBAS Seminar Hall, IIUI',
    summary: 'Comprehensive deep dive into building production-ready REST APIs, JWT authentication, and deploying on Docker & Vercel.',
    description: 'A 6-hour intensive bootcamp led by President Ahmed Khursheed and the Web Team. Attendees built a complete real-world SaaS template from scratch with database indexing and secure cookies.',
    registerUrl: '',
    driveUrl: 'https://drive.google.com/drive/folders/sense-iiui-mern-bootcamp-2026-resources',
    bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    seatsTotal: 100,
    seatsRemaining: 0,
    tags: ['React', 'Node.js', 'MongoDB', 'Docker', 'Vercel'],
    isPublished: true,
    featured: false
  },
  {
    id: 'evt-4',
    sessionId: 'sess-2026-2027',
    title: 'Cybersecurity, SAST & VAPT in Modern Software',
    slug: 'cybersecurity-vapt-workshop',
    category: 'Seminar',
    status: 'COMPLETED',
    date: '2026-09-24',
    time: '11:00 AM - 01:30 PM PKT',
    venue: 'Lincoln Corner / Central Library Auditorium, IIUI',
    summary: 'Industry seminar exploring modern vulnerability assessment, ethical hacking frameworks, and secure code practices.',
    description: 'Featuring security researchers Abdul Manan Abbasi and guest security leads from Islamabad tech firms. Practical demonstrations of OWASP Top 10 vulnerabilities and automated SAST scans.',
    registerUrl: '',
    driveUrl: 'https://drive.google.com/drive/folders/sense-cybersecurity-vapt-recap',
    bannerImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    seatsTotal: 120,
    seatsRemaining: 0,
    tags: ['Cybersecurity', 'Ethical Hacking', 'VAPT', 'OWASP'],
    isPublished: true,
    featured: false
  },
  // 2025-2026 Events
  {
    id: 'evt-5',
    sessionId: 'sess-2025-2026',
    title: 'SENSE IIUI Grand Society Inauguration & Orientation',
    slug: 'sense-society-inauguration-2025',
    category: 'Ceremony',
    status: 'COMPLETED',
    date: '2025-10-15',
    time: '10:00 AM - 01:00 PM PKT',
    venue: 'Allama Iqbal Auditorium, IIUI Faisal Mosque Campus',
    summary: 'The historic launch of SENSE IIUI as the official society of the Department of Software Engineering.',
    description: 'Attended by department faculty, respected Dean of Computing, senior engineers and over 300 student delegates. Unveiled the official logo, motto "Where Innovation meets Integrity", and annual roadmap.',
    registerUrl: '',
    driveUrl: 'https://drive.google.com/drive/folders/sense-iiui-inauguration-2025-photos',
    bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    seatsTotal: 300,
    seatsRemaining: 0,
    tags: ['Inauguration', 'Department', 'Founding', 'Orientation'],
    isPublished: true,
    featured: false
  },
  {
    id: 'evt-6',
    sessionId: 'sess-2025-2026',
    title: 'Winter CodeSprint: Data Structures & Algorithms',
    slug: 'winter-codesprint-2025',
    category: 'Competition',
    status: 'COMPLETED',
    date: '2025-12-10',
    time: '02:00 PM - 06:00 PM PKT',
    venue: 'SE Lab 1 & 2, IIUI',
    summary: 'Inter-department competitive programming contest evaluating algorithmic speed and optimization.',
    description: 'Top 50 coders went head-to-head tackling dynamic programming, graph traversal and optimization problems.',
    registerUrl: '',
    driveUrl: 'https://drive.google.com/drive/folders/winter-codesprint-2025-solutions',
    bannerImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    seatsTotal: 80,
    seatsRemaining: 0,
    tags: ['Competitive Programming', 'C++', 'DSA', 'Contest'],
    isPublished: true,
    featured: false
  }
];

export const initialGallery = [
  {
    id: 'gal-1',
    sessionId: 'sess-2026-2027',
    eventId: 'evt-3',
    title: 'Full-Stack MERN Architecture Hands-on Session',
    category: 'Workshops',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    caption: 'Students collaboratively debugging backend endpoints and configuring Mongoose models during the MERN bootcamp.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/sense-iiui-mern-bootcamp-2026-resources',
    date: '2026-10-18',
    displayOrder: 1
  },
  {
    id: 'gal-2',
    sessionId: 'sess-2026-2027',
    eventId: 'evt-4',
    title: 'Cybersecurity & VAPT Live Demo in Lincoln Corner',
    category: 'Seminars',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    caption: 'Live network packet analysis and vulnerability discovery demonstration to undergraduate researchers.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/sense-cybersecurity-vapt-recap',
    date: '2026-09-24',
    displayOrder: 2
  },
  {
    id: 'gal-3',
    sessionId: 'sess-2026-2027',
    eventId: null,
    title: 'Executive Cabinet Strategy & Project Planning Session',
    category: 'Cabinet',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    caption: 'President Ahmed Khursheed, VP Muhammad Zain ul abdin and leads discussing the upcoming DevSprint Hackathon 2026 roadmap.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/sense-cabinet-planning-2026',
    date: '2026-09-10',
    displayOrder: 3
  },
  {
    id: 'gal-4',
    sessionId: 'sess-2026-2027',
    eventId: null,
    title: 'Web & R&D Team Collaborative Sprint',
    category: 'Team Meetups',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    caption: 'Software engineering student developers reviewing pull requests and system design documents.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/sense-team-sprints',
    date: '2026-10-02',
    displayOrder: 4
  },
  // 2025-2026 Founding Session Gallery
  {
    id: 'gal-5',
    sessionId: 'sess-2025-2026',
    eventId: 'evt-5',
    title: 'Historic Society Inauguration at Allama Iqbal Auditorium',
    category: 'Ceremony',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
    caption: 'Unveiling the official SENSE IIUI emblem in the presence of faculty members and department heads.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/sense-iiui-inauguration-2025-photos',
    date: '2025-10-15',
    displayOrder: 5
  },
  {
    id: 'gal-6',
    sessionId: 'sess-2025-2026',
    eventId: 'evt-6',
    title: 'Winter CodeSprint Prize Distribution Ceremony',
    category: 'Competitions',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    caption: 'Honoring top algorithm contenders and presenting shields of achievement.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/winter-codesprint-2025-solutions',
    date: '2025-12-10',
    displayOrder: 6
  }
];

export const initialSiteContent = {
  about: {
    title: 'About SENSE IIUI',
    headline: 'Software Engineering Society for Excellence - IIUI | Where Innovation meets Integrity',
    overview: 'Software Engineering Society for Excellence (SENSE) is the official Society of Department of Software Engineering at International Islamic University Islamabad. SENSE is a student-led organization and serves as a platform for students to enhance their academic learning, technical skills, and professional development in the field of computing and technology. SENSE stands as a hub for innovation, skill development, and knowledge-sharing, empowering students to excel in their academic and professional journeys while contributing to the advancement of technology and society at large.',
    departmentName: 'Department of Software Engineering',
    facultyName: 'Faculty of Basic & Applied Sciences / Computing',
    universityName: 'International Islamic University Islamabad (IIUI)',
    foundedYear: '2025',
    specialties: 'Software Engineering, Events, Hackathons, Programming, Technology, and Students Affiliation',
    location: 'Sector H-10, Islamabad, 44000, Pakistan',
    motto: 'Where Innovation meets Integrity'
  },
  mission: {
    title: 'Our Mission',
    summary: 'To bridge academic theory and industry reality through hands-on technical immersion, collaborative software craftsmanship, ethical professional values, and transformative student leadership.',
    pillars: [
      {
        title: 'Technical Mastery',
        description: 'Equipping members with production-grade engineering skills across full-stack systems, cloud architectures, AI engineering, and cybersecurity.'
      },
      {
        title: 'Ethics & Integrity',
        description: 'Cultivating digital stewardship, academic honesty, data ethics, and principled software development practices.'
      },
      {
        title: 'Innovation Ecosystem',
        description: 'Fostering competitive hackathons, open-source incubation, and research-backed student problem solving.'
      },
      {
        title: 'Career Advancement',
        description: 'Connecting students with tech industry leaders, mock technical interviews, internship pipelines, and international fellowships.'
      }
    ]
  },
  vision: {
    title: 'Our Vision',
    summary: 'To become Pakistan\'s premier university software society, recognized nationally and internationally for cultivating engineers who engineer robust digital solutions with uncompromising integrity.',
    objectives: [
      'Foster student research and publications in recognized IEEE / ACM conferences.',
      'Organize the premier annual inter-university hackathon (DevSprint).',
      'Provide structured peer-to-peer mentorship across all undergraduate semesters.',
      'Establish permanent technology partnerships with leading software houses in Islamabad, Lahore, and Karachi.'
    ]
  },
  contact: {
    email: 'sense.iiui@gmail.com',
    departmentEmail: 'software.eng@iiui.edu.pk',
    phone: '+92 51 9019100',
    address: 'Department of Software Engineering, Faculty of Computing, International Islamic University, Sector H-10, Islamabad, Pakistan',
    instagram: 'https://www.instagram.com/sense.iiui/',
    linkedin: 'https://www.linkedin.com/company/sense-iiui/',
    github: 'https://github.com/sense-iiui'
  }
};

export const initialSubmissions = [
  {
    id: 'sub-1',
    type: 'MEMBERSHIP',
    name: 'Hamza Tariq',
    email: 'hamza.se.f23@iiui.edu.pk',
    phone: '+92 300 1234567',
    studentId: '412-FBAS/BSSE/F23',
    semester: 'Semester 4',
    domainInterest: 'Web Development',
    preferredRole: 'Frontend Developer',
    linkedin: 'https://linkedin.com/in/hamzatariq-dev',
    instagram: '@hamza.tariq_dev',
    status: 'ACCEPTED',
    submittedAt: '2026-11-10T09:30:00Z',
    message: 'Proficient in React, Tailwind, and REST APIs. Eager to build society web products and contribute to DevSprint.',
    links: 'https://github.com/hamzatariq-dev'
  },
  {
    id: 'sub-2',
    type: 'MEMBERSHIP',
    name: 'Fatima Noor',
    email: 'fatima.cs.f24@iiui.edu.pk',
    phone: '+92 312 9876543',
    studentId: '108-FBAS/BSCS/F24',
    semester: 'Semester 2',
    domainInterest: 'Operations',
    preferredRole: 'Event Coordinator',
    linkedin: 'https://linkedin.com/in/fatimanoor-example',
    instagram: '@fatima.noor_iiui',
    status: 'INTERVIEWED',
    submittedAt: '2026-11-11T14:15:00Z',
    message: 'Experienced in organizing high school debates and university orientation booths. Looking to lead event logistics.',
    links: 'https://linkedin.com/in/fatimanoor-example'
  },
  {
    id: 'sub-3',
    type: 'MEMBERSHIP',
    name: 'Bilal Hassan',
    email: 'bilal.hassan@iiui.edu.pk',
    phone: '+92 333 5556677',
    studentId: '245-FBAS/BSSE/F24',
    semester: 'Semester 3',
    domainInterest: 'AI & Research',
    preferredRole: 'AI Agent Researcher',
    linkedin: 'https://linkedin.com/in/bilal-hassan-ai',
    instagram: '@bilal.hassan',
    status: 'PENDING',
    submittedAt: '2026-11-12T10:00:00Z',
    message: 'Working with LangChain, Gemini API, and vector databases. Want to assist senior researchers on IEEE student papers.',
    links: 'https://github.com/bilal-hassan'
  },
  {
    id: 'sub-4',
    type: 'MEMBERSHIP',
    name: 'Ayesha Siddiqui',
    email: 'ayesha.s@iiui.edu.pk',
    phone: '+92 345 8899001',
    studentId: '320-FBAS/BSSE/F23',
    semester: 'Semester 4',
    domainInterest: 'Media & Decor',
    preferredRole: 'Stage & Visual Lead',
    linkedin: 'https://linkedin.com/in/ayesha-siddiqui',
    instagram: '@ayesha.designs',
    status: 'IN_PROGRESS',
    submittedAt: '2026-11-12T11:20:00Z',
    message: 'Graphic design expert with Adobe Photoshop and Figma. Have designed posters and managed stage decorations for faculty galas.',
    links: 'https://behance.net/ayeshasiddiqui'
  }
];

export const initialAdminUsers = [
  {
    id: 'usr-1',
    name: 'Ahmed Khursheed',
    email: 'admin@senseiiui.org',
    role: 'Admin',
    designation: 'President & Administrator'
  }
];

export const initialEventRegistrations = [
  {
    id: 'ereg-1',
    eventId: 'evt-1',
    eventTitle: 'DevSprint Hackathon 2026: Code the Future',
    name: 'Hamza Farooq',
    email: 'hamza.f@iiui.edu.pk',
    phone: '+92 301 5551234',
    studentId: '112-FBAS/BSSE/F23',
    semester: 'Semester 4',
    department: 'Software Engineering',
    teamName: 'ByteCraft Solutions',
    motivation: 'Excited to compete in the Agentic AI track with our prototype on autonomous healthcare agents.',
    status: 'CONFIRMED',
    registeredAt: '2026-11-10T09:30:00Z'
  },
  {
    id: 'ereg-2',
    eventId: 'evt-1',
    eventTitle: 'DevSprint Hackathon 2026: Code the Future',
    name: 'Fatima Zahra',
    email: 'fatima.z@iiui.edu.pk',
    phone: '+92 333 4445566',
    studentId: '204-FBAS/BSSE/F24',
    semester: 'Semester 2',
    department: 'Software Engineering',
    teamName: 'CyberNova',
    motivation: 'Looking forward to building a secure fintech platform under the DevSecOps guidelines.',
    status: 'CONFIRMED',
    registeredAt: '2026-11-11T14:15:00Z'
  },
  {
    id: 'ereg-3',
    eventId: 'evt-1',
    eventTitle: 'DevSprint Hackathon 2026: Code the Future',
    name: 'Usman Ali Khan',
    email: 'usman.ali@iiui.edu.pk',
    phone: '+92 312 9988776',
    studentId: '519-FBAS/BSSE/F22',
    semester: 'Semester 6',
    department: 'Software Engineering',
    teamName: 'Solo Contender',
    motivation: 'Ready to build high performance microservices with MERN and Docker.',
    status: 'CONFIRMED',
    registeredAt: '2026-11-12T10:00:00Z'
  },
  {
    id: 'ereg-4',
    eventId: 'evt-2',
    eventTitle: 'Masterclass: Production MERN & System Design',
    name: 'Bilal Hassan',
    email: 'bilal.h@iiui.edu.pk',
    phone: '+92 321 7788990',
    studentId: '340-FBAS/BSSE/F23',
    semester: 'Semester 3',
    department: 'Software Engineering',
    teamName: '',
    motivation: 'Want to understand caching with Redis and index tuning on MongoDB Atlas.',
    status: 'CONFIRMED',
    registeredAt: '2026-11-11T16:20:00Z'
  }
];

