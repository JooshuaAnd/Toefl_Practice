import {
  Headphones,
  FileText,
  BookOpen,
  Compass,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Free Trial", href: "/free-trial" },
  { label: "Login", href: "/signin" },
  { label: "Register", href: "/signup" },
];

export interface FeatureCard {
  title: string;
  description: string;
  iconName: string;
  gradient: string;
}

export const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Listening Practice",
    description: "Sharpen your listening skills with realistic TOEFL audio passages, native speaker accents, and comprehension questions that mirror the actual exam.",
    iconName: "Headphones",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    title: "Structure Practice",
    description: "Master grammar, sentence completion, and error identification with hundreds of TOEFL-style structure questions and detailed explanations.",
    iconName: "FileText",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Reading Practice",
    description: "Tackle academic passages with interactive dual-pane layouts, vocabulary assistance, highlight features, and passage mapping tools.",
    iconName: "BookOpen",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    title: "TOEFL Simulation",
    description: "Experience full-length mock tests with actual timing, real TOEFL UI, and authentic question distribution to simulate test-day conditions.",
    iconName: "Compass",
    gradient: "from-blue-400 to-indigo-500",
  },
];

export interface PackagePlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  target: string;
}

export const PACKAGE_PLANS: PackagePlan[] = [
  {
    name: "Starter",
    price: "$19",
    period: "month",
    description: "Perfect for individuals starting their TOEFL preparation journey.",
    features: [
      "2 Full-Length TOEFL Simulations",
      "5 Listening Section Audios",
      "100 Structure & Written Expressions",
      "Basic Score Prediction Engine",
      "Email support within 48h",
    ],
    isPopular: false,
    ctaText: "Get Started",
    target: "Individual",
  },
  {
    name: "Silver",
    price: "$39",
    period: "month",
    description: "Best value for serious learners aiming for a high score.",
    features: [
      "10 Full-Length TOEFL Simulations",
      "30 Listening Section Audios",
      "500 Structure & Written Expressions",
      "Advanced Score Analytics",
      "Priority email support",
      "Performance tracking dashboard",
    ],
    isPopular: true,
    ctaText: "Start Free Trial",
    target: "Individual",
  },
  {
    name: "Gold",
    price: "$59",
    period: "month",
    description: "Comprehensive preparation with premium features for maximum scores.",
    features: [
      "Unlimited TOEFL Simulations",
      "Unlimited Listening Practice",
      "1,500+ Structure & Written Expressions",
      "AI-Powered Essay Scoring",
      "1-on-1 Tutor Review Sessions",
      "Offline Study Guides & Downloads",
    ],
    isPopular: false,
    ctaText: "Go Gold",
    target: "Individual",
  },
  {
    name: "Corporate",
    price: "$199",
    period: "month",
    description: "Enterprise solution for institutions and companies training employees.",
    features: [
      "Everything in Gold",
      "Admin Dashboard & Analytics",
      "Team Management (up to 50 users)",
      "Custom Test Creator",
      "Dedicated Account Manager",
      "Bulk enrollment & progress reports",
    ],
    isPopular: false,
    ctaText: "Contact Sales",
    target: "Company",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  score: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "University Student",
    company: "Universitas Indonesia",
    avatar: "SC",
    content: "The TOEFL simulation feature is incredibly realistic. I scored 112 on my actual test after just 2 months of practice. The detailed feedback on structure questions helped me improve my grammar significantly.",
    score: "112/120",
  },
  {
    name: "Ahmad Rizki",
    role: "Professional",
    company: "Bank Mandiri",
    avatar: "AR",
    content: "As a working professional, the flexible practice schedule and mobile-friendly interface made it easy to prepare during my commute. I improved from 85 to 105 in just 6 weeks.",
    score: "105/120",
  },
  {
    name: "Lisa Putri",
    role: "Graduate Applicant",
    company: "UGM",
    avatar: "LP",
    content: "The listening section practice with various accents was exactly what I needed. The transcripts and explanations helped me understand every nuance. Highly recommended for serious TOEFL takers!",
    score: "108/120",
  },
  {
    name: "David Okafor",
    role: "HR Director",
    company: "TechCorp Indonesia",
    avatar: "DO",
    content: "We use the Corporate package for employee training. The admin dashboard makes it easy to track progress across teams. Our employees' average TOEFL score improved by 15 points.",
    score: "Enterprise",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is included in the Free Trial?",
    answer: "The Free Trial gives you access to 5 listening questions, 5 structure questions, and 5 reading questions so you can experience the quality of our platform before committing to a paid plan.",
  },
  {
    question: "How long does it take to complete a TOEFL simulation?",
    answer: "Our full-length TOEFL simulations follow the actual test format and take approximately 3 hours to complete. You can pause and resume at any time.",
  },
  {
    question: "Can I switch between packages?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to all new features. Downgrades take effect at the start of the next billing cycle.",
  },
  {
    question: "Is there a Corporate plan for companies?",
    answer: "Absolutely! Our Corporate plan is designed for companies and institutions. It includes team management, admin dashboard, custom test creation, and dedicated account manager support.",
  },
  {
    question: "Are the practice questions updated regularly?",
    answer: "Yes, our content team continuously updates the question bank to ensure alignment with the latest TOEFL format and difficulty levels. New questions are added weekly.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, simply contact our support team for a full refund.",
  },
];

export interface PackageDetail {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface LearningMaterial {
  id: string;
  category: "listening" | "structure" | "reading";
  title: string;
  description: string;
  thumbnail: string;
  thumbnailColor: string;
  minTier: number;
  duration: string;
  totalLessons: number;
}

export const MATERIALS: LearningMaterial[] = [
  // LISTENING
  {
    id: "listening-1",
    category: "listening",
    title: "Basic Listening Comprehension",
    description: "Learn to understand main ideas and supporting details in short conversations.",
    thumbnail: "🎧",
    thumbnailColor: "bg-blue-50",
    minTier: 0,
    duration: "45 min",
    totalLessons: 6,
  },
  {
    id: "listening-2",
    category: "listening",
    title: "Academic Lecture Listening",
    description: "Practice listening to university-level lectures with note-taking strategies.",
    thumbnail: "📚",
    thumbnailColor: "bg-blue-50",
    minTier: 1,
    duration: "60 min",
    totalLessons: 8,
  },
  {
    id: "listening-3",
    category: "listening",
    title: "Conversation & Inference",
    description: "Master understanding implied meaning and speaker intent in dialogues.",
    thumbnail: "💬",
    thumbnailColor: "bg-blue-50",
    minTier: 2,
    duration: "50 min",
    totalLessons: 7,
  },
  {
    id: "listening-4",
    category: "listening",
    title: "Advanced Listening: Scientific Topics",
    description: "Tackle complex scientific lectures with dense vocabulary and fast speech.",
    thumbnail: "🔬",
    thumbnailColor: "bg-blue-50",
    minTier: 2,
    duration: "70 min",
    totalLessons: 10,
  },
  {
    id: "listening-5",
    category: "listening",
    title: "TOEFL Listening Full Simulation",
    description: "Complete listening section simulation with timed questions and real TOEFL format.",
    thumbnail: "🎯",
    thumbnailColor: "bg-blue-50",
    minTier: 3,
    duration: "90 min",
    totalLessons: 12,
  },

  // STRUCTURE
  {
    id: "structure-1",
    category: "structure",
    title: "Subject-Verb Agreement",
    description: "Understand the core rules of subject-verb agreement in complex sentences.",
    thumbnail: "✏️",
    thumbnailColor: "bg-purple-50",
    minTier: 0,
    duration: "40 min",
    totalLessons: 5,
  },
  {
    id: "structure-2",
    category: "structure",
    title: "Tenses & Verb Forms",
    description: "Master past, present, future tenses and their perfect/progressive forms.",
    thumbnail: "📝",
    thumbnailColor: "bg-purple-50",
    minTier: 1,
    duration: "55 min",
    totalLessons: 8,
  },
  {
    id: "structure-3",
    category: "structure",
    title: "Inversions & Negative Adverbials",
    description: "Learn when and how to invert subject and verb in formal English structures.",
    thumbnail: "🔄",
    thumbnailColor: "bg-purple-50",
    minTier: 1,
    duration: "45 min",
    totalLessons: 6,
  },
  {
    id: "structure-4",
    category: "structure",
    title: "Relative Clauses & Modifiers",
    description: "Explore defining and non-defining clauses, and correct modifier placement.",
    thumbnail: "🔗",
    thumbnailColor: "bg-purple-50",
    minTier: 2,
    duration: "50 min",
    totalLessons: 7,
  },
  {
    id: "structure-5",
    category: "structure",
    title: "Parallelism & Comparisons",
    description: "Master parallel structure and comparative forms in TOEFL-style sentences.",
    thumbnail: "⚖️",
    thumbnailColor: "bg-purple-50",
    minTier: 2,
    duration: "50 min",
    totalLessons: 7,
  },
  {
    id: "structure-6",
    category: "structure",
    title: "Advanced Grammar: Subjunctive & Conditionals",
    description: "Deep dive into subjunctive mood, conditional sentences, and hypotheticals.",
    thumbnail: "🧠",
    thumbnailColor: "bg-purple-50",
    minTier: 3,
    duration: "60 min",
    totalLessons: 9,
  },

  // READING
  {
    id: "reading-1",
    category: "reading",
    title: "Skimming & Scanning Techniques",
    description: "Learn efficient reading strategies to quickly locate key information.",
    thumbnail: "📖",
    thumbnailColor: "bg-emerald-50",
    minTier: 0,
    duration: "40 min",
    totalLessons: 5,
  },
  {
    id: "reading-2",
    category: "reading",
    title: "Vocabulary in Context",
    description: "Understand how to infer word meanings from surrounding text and context clues.",
    thumbnail: "📘",
    thumbnailColor: "bg-emerald-50",
    minTier: 1,
    duration: "45 min",
    totalLessons: 6,
  },
  {
    id: "reading-3",
    category: "reading",
    title: "Main Idea & Supporting Details",
    description: "Identify thesis statements, main ideas, and supporting evidence in passages.",
    thumbnail: "🎯",
    thumbnailColor: "bg-emerald-50",
    minTier: 1,
    duration: "50 min",
    totalLessons: 7,
  },
  {
    id: "reading-4",
    category: "reading",
    title: "Inference & Author's Purpose",
    description: "Read between the lines to understand implied meaning and author intent.",
    thumbnail: "🔍",
    thumbnailColor: "bg-emerald-50",
    minTier: 2,
    duration: "55 min",
    totalLessons: 7,
  },
  {
    id: "reading-5",
    category: "reading",
    title: "Academic Passages: Science & History",
    description: "Practice reading dense academic texts from scientific and historical domains.",
    thumbnail: "🌍",
    thumbnailColor: "bg-emerald-50",
    minTier: 2,
    duration: "65 min",
    totalLessons: 9,
  },
  {
    id: "reading-6",
    category: "reading",
    title: "TOEFL Reading Full Simulation",
    description: "Complete reading section simulation with timed passages and 40 questions.",
    thumbnail: "📋",
    thumbnailColor: "bg-emerald-50",
    minTier: 3,
    duration: "90 min",
    totalLessons: 12,
  },
];

export const PACKAGE_DETAILS: PackageDetail[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Cocok untuk individu yang baru memulai persiapan TOEFL.",
    features: [
      "10 materi pembelajaran",
      "100 soal latihan",
      "1 simulasi TOEFL",
      "Skor prediksi dasar",
      "Dukungan email",
    ],
    highlighted: false,
  },
  {
    id: "silver",
    name: "Silver",
    price: "$39",
    period: "/month",
    description: "Nilai terbaik untuk pelajar serius yang ingin skor tinggi.",
    features: [
      "20 materi pembelajaran",
      "300 soal latihan",
      "3 simulasi TOEFL",
      "Analitik skor lanjutan",
      "Dukungan prioritas",
      "Dashboard progres",
    ],
    highlighted: true,
    badge: "Terpopuler",
  },
  {
    id: "gold",
    name: "Gold",
    price: "$59",
    period: "/month",
    description: "Paket komprehensif dengan akses penuh ke semua fitur premium.",
    features: [
      "Semua materi pembelajaran",
      "1.000+ soal latihan",
      "10 simulasi TOEFL",
      "Sertifikat kelulusan",
      "Penilaian esai AI",
      "Sesi tutor 1-on-1",
    ],
    highlighted: false,
  },
  {
    id: "corporate",
    name: "Corporate",
    price: "$199",
    period: "/month",
    description: "Solusi perusahaan untuk pelatihan TOEFL karyawan atau institusi.",
    features: [
      "Multi user (hingga 50)",
      "Monitoring peserta",
      "Report progress real-time",
      "Pembuat tes kustom",
      "Admin dashboard",
      "Account manager dedicated",
    ],
    highlighted: false,
  },
];
