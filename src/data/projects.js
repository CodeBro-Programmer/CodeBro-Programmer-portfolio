// Add new project objects to this array. The Projects component renders each card automatically.
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import project6 from "../assets/project6.png";
import project7 from "../assets/project7.png";


const projects = [
  {
    id: "studyqv",
    title: "StudyQV – Academic Learning Platform",
    category: "EdTech / SaaS",
    image: project1,
    description:
      "A university-focused learning platform that helps students prepare for examinations through organized past questions, topic-based revision, CBT practice, subscriptions and competitive academic challenges.",
    tech: ["JavaScript", "Node.js", "Express.js", "PostgreSQL", "HTML", "CSS"],
    live: "https://www.studyqv.xyz",
    github: "",
    featured: true,
  },
  {
    id: "business-manager",
    title: "Business Manager WebApp",
    category: "Business software",
    image: project2,
    description:
      "A business management system designed for SMEs to manage inventory, sales, revenue, employees, business operations and performance insights from a centralized workspace.",
    tech: ["JavaScript", "Node.js", "Express.js", "PostgreSQL", "HTML", "CSS"],
    live: "",
    github: "",
    featured: true,
  },
  {
    id: "gpa-calculator",
    title: "GPA & CGPA Calculator",
    category: "Web application",
    image: project3,
    description:
      "A responsive academic calculator that allows students to organize courses, select grades and credit units, calculate semester GPAs and determine their cumulative CGPA.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://gpa-calculator-codebro.vercel.app/",
    github: "https://github.com/CodeBro-Programmer/GPA-calculator",
  },
  {
    id: "anonymous-social-feed",
    title: "Anonymous Social Feed API",
    category: "Backend development",
    image: project4,
    description:
      "An anonymous social platform backend where users can create posts, like, comment and reply without traditional accounts. Features UUID-based identities, HTTP-only cookies, resource ownership and structured database relationships.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "REST API"],
    live: "",
    github:
      "https://github.com/CodeBro-Programmer/anonymous_social_feed_by_codebro",
  },
   {
    id: "aura-essence",
    title: "Aura Essence – Fragrance Brand",
    category: "Brand website",
    image: project5,
    description:
      "A premium fragrance brand website showcasing perfume collections, scent categories, product descriptions and brand storytelling through an immersive visual experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://aura-essence-vicky.vercel.app/",
    github: "https://github.com/CodeBro-Programmer/aura-essence",
  },
  {
    id: "zike-naturals",
    title: "Zike Naturals – Hair Studio",
    category: "Business website",
    image: project6,
    description:
      "A professional website for a natural hair studio, featuring service listings, a categorized gallery, customer reviews, appointment booking and business information.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://zike-hair-and-naturals.vercel.app/",
    github: "https://github.com/CodeBro-Programmer/zike-hair-and-naturals",
  },
  {
    id: "grandora",
    title: "Grandora – Luxury Event Centre",
    category: "Business website",
    image: project7,
    description:
      "An elegant website concept for a luxury event centre, featuring venue presentations, event experiences, an image gallery and an enquiry flow for prospective clients.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://grandora-black.vercel.app/",
    github: "https://github.com/CodeBro-Programmer/grandora",
  }
];


export default projects;
