import '../config/env.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import AdminUser from '../models/AdminUser.js';
import Session from '../models/Session.js';
import Event from '../models/Event.js';
import CabinetMember from '../models/CabinetMember.js';
import TeamMember from '../models/TeamMember.js';
import GalleryItem from '../models/GalleryItem.js';
import SiteContent from '../models/SiteContent.js';
import FormSubmission from '../models/FormSubmission.js';

const seedDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sense_iiui';
    await mongoose.connect(uri, { dbName: 'sense_iiui' });
    console.log('[Seed] Connected to MongoDB Atlas (DB: sense_iiui)');

    // 1. Seed Admin Users
    await AdminUser.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash('admin123', salt);
    const editorPass = await bcrypt.hash('editor123', salt);

    await AdminUser.create([
      {
        name: 'Ahmed Khursheed',
        email: 'admin@senseiiui.org',
        passwordHash: adminPass,
        role: 'SUPER_ADMIN',
        isActive: true
      },
      {
        name: 'Muhammad Zain ul abdin',
        email: 'editor@senseiiui.org',
        passwordHash: editorPass,
        role: 'EDITOR',
        isActive: true
      }
    ]);
    console.log('[Seed] Admin Users created (admin@senseiiui.org / editor@senseiiui.org)');

    // 2. Seed Sessions
    await Session.deleteMany({});
    const sCurrent = await Session.create({
      name: 'Session 2026–2027',
      slug: '2026-2027',
      startYear: 2026,
      endYear: 2027,
      theme: 'Scaling Frontiers & Real-World Impact',
      description: 'Current tenure focusing on Agentic AI, full-stack systems, industry hackathons, and research publications.',
      isCurrent: true,
      isArchived: false
    });

    const sArchive = await Session.create({
      name: 'Session 2025–2026',
      slug: '2025-2026',
      startYear: 2025,
      endYear: 2026,
      theme: 'Foundations of Excellence',
      description: 'Founding tenure of SENSE IIUI, setting departmental standards, organizing inaugural bootcamps and team formation.',
      isCurrent: false,
      isArchived: true
    });
    console.log('[Seed] Sessions created (2026-2027 & 2025-2026)');

    // 3. Seed Executive Cabinet
    await CabinetMember.deleteMany({});
    await CabinetMember.create([
      {
        sessionId: sCurrent._id,
        name: 'Ahmed Khursheed',
        position: 'President',
        roleTag: 'Executive Leadership',
        headline: 'Software Engineering Student | Full-Stack Web Developer (MERN) | Full-Stack App Developer (React Native) | Project Management & Team Leadership',
        bio: 'Leading SENSE IIUI towards technical innovation, strategic university partnerships, and empowering students to build scalable web apps.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/ahmed-khursheed',
        email: 'ahmed.khursheed@senseiiui.org',
        skills: ['MERN Stack', 'React Native', 'Leadership', 'System Design'],
        displayOrder: 1
      },
      {
        sessionId: sCurrent._id,
        name: 'Muhammad Zain ul abdin',
        position: 'Vice President',
        roleTag: 'Executive Leadership',
        headline: 'Software Engineering Student | Frontend Developer | Aspiring MERN Stack Developer | Digital Solutions Architect',
        bio: 'Spearheading student engagement, technical curriculum development, community outreach, and high-standard UI/UX development across society initiatives.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/muhammad-zain-ul-abdin-7a5868386',
        email: 'zainulabdin@senseiiui.org',
        skills: ['React.js', 'Tailwind CSS', 'WordPress', 'Community Growth'],
        displayOrder: 2
      },
      {
        sessionId: sCurrent._id,
        name: 'Ameer Hamza Afridi',
        position: 'General Secretary',
        roleTag: 'Executive Leadership',
        headline: 'Software Engineering Student | CCNA Learner | Aspiring SOC Analyst | AI & Cybersecurity Enthusiast',
        bio: 'Managing society governance, administrative operations, event logistics coordination, and championing cybersecurity awareness within the department.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/ameer-hamza-afridi-134261333',
        email: 'general.secretary@senseiiui.org',
        skills: ['SOC Analysis', 'Network Security', 'Python', 'Governance'],
        displayOrder: 3
      },
      // Archive session cabinet
      {
        sessionId: sArchive._id,
        name: 'Ahmed Khursheed',
        position: 'Founding President',
        roleTag: 'Founding Leadership',
        headline: 'Founder & President (2025–2026)',
        bio: 'Founded SENSE IIUI as the official society of the Department of Software Engineering.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/ahmed-khursheed',
        skills: ['Founding Strategy', 'Team Building'],
        displayOrder: 1
      }
    ]);
    console.log('[Seed] Cabinet members created');

    // 4. Seed All 5 Teams
    await TeamMember.deleteMany({});
    await TeamMember.create([
      // Web Team
      {
        sessionId: sCurrent._id,
        teamCategory: 'Web',
        name: 'Salah ud Din',
        position: 'Web Team Lead & Full-Stack Architect',
        headline: 'Full-Stack Developer | MERN Stack | AI & Automation | Desktop & Mobile Apps | Scalable Cloud SaaS',
        bio: 'Directing the architecture and deployment of SENSE digital portals, CI/CD pipelines, and cloud backend infrastructure.',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/salahuddinmehsud',
        skills: ['MERN Stack', 'Next.js', 'Automation', 'Cloud Infrastructure'],
        displayOrder: 1
      },
      {
        sessionId: sCurrent._id,
        teamCategory: 'Web',
        name: 'Zoraiz Ahmed',
        position: 'Core Frontend & Scaling Engineer',
        headline: 'Software Engineer | Fintech Specialist | Core Front-End & Scaling Towards Full-Stack Infrastructure',
        bio: 'Crafting responsive user interfaces, state management architectures, and performance-tuned web interactions.',
        photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/zoraiz-ahmed-801206348',
        skills: ['React.js', 'Fintech Systems', 'TypeScript', 'Tailwind CSS'],
        displayOrder: 2
      },
      {
        sessionId: sCurrent._id,
        teamCategory: 'Web',
        name: 'Muhammad Mudassar',
        position: 'Full-Stack Associate',
        headline: 'Software Intern @Netkom | Frontend & API Integration Specialist | Software Engineering Student',
        bio: 'Building accessible web interfaces, managing database models, and maintaining Society web services.',
        photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/themudassarawan',
        skills: ['JavaScript', 'REST APIs', 'Node.js', 'Git'],
        displayOrder: 3
      },

      // R&D Team
      {
        sessionId: sCurrent._id,
        teamCategory: 'R&D',
        name: 'Abdullah Iqbal',
        position: 'R&D Lead & AI Researcher',
        headline: 'Aspiring Software Engineer | AI/ML & Generative AI Enthusiast | Agentic AI | Python & C++ | Research and Development',
        bio: 'Driving deep learning research, Agentic workflow experiments, and open-source software engineering tools for students at IIUI.',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/abdullah-iqbal-672032360',
        skills: ['Generative AI', 'Agentic Workflows', 'Python', 'C++'],
        displayOrder: 1
      },
      {
        sessionId: sCurrent._id,
        teamCategory: 'R&D',
        name: 'Asif Ali',
        position: 'AI Engineer & R&D Specialist',
        headline: 'AI Engineer | Software Engineer | Agentic AI & Machine Learning | LangChain & LLM Applications | Web Development',
        bio: 'Developing production LLM integrations, retrieval-augmented generation pipelines, and mentoring junior engineers in AI concepts.',
        photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/asif-ali-9b514b336',
        skills: ['LangChain', 'LLM Agents', 'Machine Learning', 'FastAPI'],
        displayOrder: 2
      },

      // Operations Team
      {
        sessionId: sCurrent._id,
        teamCategory: 'Operations',
        name: 'Ali Haidar',
        position: 'Operations Team Lead',
        headline: 'Computer Science Student | Full Stack Developer | Operations Team Member at SENSE Society',
        bio: 'Managing event execution, logistics pipelines, volunteer task forces, and departmental coordination for major tech conferences.',
        photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/ali-haidar120',
        skills: ['Event Operations', 'Logistics', 'Full Stack Development'],
        displayOrder: 1
      },
      {
        sessionId: sCurrent._id,
        teamCategory: 'Operations',
        name: 'Malik Taha',
        position: 'Community Outreach & Lead Coordinator',
        headline: 'UG Software Engineer | React Native Mobile App Dev | Harvard Aspire Leaders Program 26 | IT Leadership & Community Outreach',
        bio: 'Driving strategic partnerships with student bodies, tech companies, and coordinating nationwide hackathon participation.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/malik-taha-',
        skills: ['React Native', 'Community Outreach', 'IT Leadership'],
        displayOrder: 2
      },
      {
        sessionId: sCurrent._id,
        teamCategory: 'Operations',
        name: 'Abdul Manan Abbasi',
        position: 'Security & Operations Specialist',
        headline: 'Cybersecurity Intern @NCP | Security Researcher | VAPT | SAST | Ethical Hacker | Digital Marketer',
        bio: 'Ensuring digital security protocols for events, audit verification, and digital campaign marketing.',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/abdulmananabbasi',
        skills: ['VAPT', 'SAST', 'Ethical Hacking', 'Digital Marketing'],
        displayOrder: 3
      },

      // Media Team
      {
        sessionId: sCurrent._id,
        teamCategory: 'Media',
        name: 'Maryam Amir',
        position: 'Media & Decor Lead',
        headline: 'Ambassador @ETL Online | Decor Lead @Sense_IIUI | Software Engineering Student @IIUI | UI/UX & Brand Design',
        bio: 'Curating brand presence, visual storytelling, aesthetic stage direction, and social media campaigns for SENSE IIUI.',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/maryam-amir-18178b355',
        skills: ['Figma', 'Brand Design', 'Event Decor', 'Social Media Strategy'],
        displayOrder: 1
      },

      // Graphics Team
      {
        sessionId: sCurrent._id,
        teamCategory: 'Graphics',
        name: 'Zain Abid',
        position: 'Graphics & Visual Identity Lead',
        headline: 'Undergraduate Software Engineering Student | Visual Design Specialist | Brand Aesthetics & Creative Assets',
        bio: 'Crafting high-impact promotional posters, digital banners, event merchandise, and visual identity guides for SENSE IIUI.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        linkedIn: 'https://www.linkedin.com/in/zain-abid-6b2a82350',
        skills: ['Photoshop', 'Illustrator', 'Visual Identity', 'Typography'],
        displayOrder: 1
      }
    ]);
    console.log('[Seed] All 5 Team rosters seeded');

    // 5. Seed Events (Upcoming & Completed with required URLs)
    await Event.deleteMany({});
    await Event.create([
      {
        sessionId: sCurrent._id,
        title: 'DevSprint Hackathon 2026: Code the Future',
        slug: 'devsprint-hackathon-2026',
        category: 'Hackathon',
        status: 'UPCOMING',
        date: '2026-11-28',
        time: '09:00 AM - 08:00 PM PKT',
        registrationDeadline: '2026-11-26 11:59 PM PKT',
        venue: 'Auditorium & Computing Labs, Faculty of Basic & Applied Sciences, IIUI',
        summary: 'A 24-hour flagship hackathon challenging students to build scalable AI-driven solutions and web ecosystems.',
        description: 'Join over 40+ teams across universities competing in three high-impact tracks: Agentic AI Solutions, Fintech & Scalable Platforms, and Cybersecurity/DevSecOps.',
        registerUrl: 'https://forms.google.com/sense-iiui-devsprint-2026',
        bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        tags: ['Hackathon', 'AI & Cloud', 'Prizes', 'Networking'],
        isPublished: true,
        featured: true
      },
      {
        sessionId: sCurrent._id,
        title: 'Agentic AI & Multi-Agent Architecture Masterclass',
        slug: 'agentic-ai-masterclass',
        category: 'Technical Workshop',
        status: 'UPCOMING',
        date: '2026-12-05',
        time: '02:00 PM - 05:00 PM PKT',
        registrationDeadline: '2026-12-03 11:59 PM PKT',
        venue: 'Software Engineering Lab 04, IIUI New Campus',
        summary: 'Hands-on practical session building autonomous AI agent swarms using LangChain, LangGraph and Gemini API.',
        description: 'Learn how to transition from simple prompt engineering to autonomous cognitive architectures.',
        registerUrl: 'https://forms.google.com/sense-agentic-ai-workshop',
        bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        tags: ['Agentic AI', 'Python', 'LangChain'],
        isPublished: true,
        featured: true
      },
      {
        sessionId: sCurrent._id,
        title: 'Mastering Full-Stack MERN Architecture & CI/CD',
        slug: 'mastering-mern-cicd',
        category: 'Bootcamp',
        status: 'COMPLETED',
        date: '2026-10-18',
        time: '10:00 AM - 04:00 PM PKT',
        venue: 'FBAS Seminar Hall, IIUI',
        summary: 'Comprehensive deep dive into building production-ready REST APIs, JWT authentication, and deploying on Docker & Vercel.',
        description: 'A 6-hour intensive bootcamp led by President Ahmed Khursheed and the Web Team.',
        driveUrl: 'https://drive.google.com/drive/folders/sense-iiui-mern-bootcamp-2026-resources',
        bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        tags: ['React', 'Node.js', 'MongoDB', 'Docker'],
        isPublished: true,
        featured: false
      },
      {
        sessionId: sArchive._id,
        title: 'SENSE IIUI Grand Society Inauguration & Orientation',
        slug: 'sense-society-inauguration-2025',
        category: 'Ceremony',
        status: 'COMPLETED',
        date: '2025-10-15',
        time: '10:00 AM - 01:00 PM PKT',
        venue: 'Allama Iqbal Auditorium, IIUI Faisal Mosque Campus',
        summary: 'The historic launch of SENSE IIUI as the official society of the Department of Software Engineering.',
        driveUrl: 'https://drive.google.com/drive/folders/sense-iiui-inauguration-2025-photos',
        bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        tags: ['Inauguration', 'Department', 'Founding'],
        isPublished: true,
        featured: false
      }
    ]);
    console.log('[Seed] Events seeded');

    // 6. Seed Gallery
    await GalleryItem.deleteMany({});
    await GalleryItem.create([
      {
        sessionId: sCurrent._id,
        title: 'Full-Stack MERN Architecture Hands-on Session',
        category: 'Workshops',
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
        caption: 'Students collaboratively debugging backend endpoints and configuring Mongoose models during the MERN bootcamp.',
        driveFolderUrl: 'https://drive.google.com/drive/folders/sense-iiui-mern-bootcamp-2026-resources',
        date: '2026-10-18',
        displayOrder: 1
      },
      {
        sessionId: sCurrent._id,
        title: 'Cybersecurity & VAPT Live Demo in Lincoln Corner',
        category: 'Seminars',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
        caption: 'Live network packet analysis and vulnerability discovery demonstration to undergraduate researchers.',
        driveFolderUrl: 'https://drive.google.com/drive/folders/sense-cybersecurity-vapt-recap',
        date: '2026-09-24',
        displayOrder: 2
      },
      {
        sessionId: sArchive._id,
        title: 'Historic Society Inauguration at Allama Iqbal Auditorium',
        category: 'Ceremony',
        imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
        caption: 'Unveiling the official SENSE IIUI emblem in the presence of faculty members and department heads.',
        driveFolderUrl: 'https://drive.google.com/drive/folders/sense-iiui-inauguration-2025-photos',
        date: '2025-10-15',
        displayOrder: 3
      }
    ]);
    console.log('[Seed] Gallery records seeded');

    // 7. Seed Form Submissions
    await FormSubmission.deleteMany({});
    await FormSubmission.create([
      {
        type: 'MEMBERSHIP',
        name: 'Hamza Tariq',
        email: 'hamza.se.f23@iiui.edu.pk',
        phone: '+92 300 1234567',
        studentId: '412-FBAS/BSSE/F23',
        semester: 'Semester 4',
        domainInterest: 'Web Development (MERN)',
        status: 'IN_REVIEW',
        message: 'Eager to contribute to the Web Team and participate in DevSprint Hackathon 2026.'
      },
      {
        type: 'VOLUNTEER',
        name: 'Fatima Noor',
        email: 'fatima.cs.f24@iiui.edu.pk',
        phone: '+92 312 9876543',
        studentId: '108-FBAS/BSCS/F24',
        semester: 'Semester 2',
        domainInterest: 'Operations & Event Logistics',
        status: 'NEW',
        message: 'Experienced in organizing debates and university orientation booths.'
      }
    ]);
    console.log('[Seed] Form Submissions seeded');

    console.log('🎉 SENSE IIUI MongoDB Atlas Database Completely Seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
};

seedDatabase();
