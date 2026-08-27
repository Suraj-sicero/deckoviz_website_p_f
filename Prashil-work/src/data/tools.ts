import { 
  Scale, BookOpen, Map, Compass, Users, 
  User, History, Book, FlaskConical, UserMinus,
  MessageCircle, Languages, ShieldAlert, UserPlus, Link,
  Mic, CheckCircle2, UserRoundPlus, TrendingUp, Clock 
} from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  promptFilePath: string;
}

export const TOOLS: Tool[] = [
  {
    id: 't1',
    title: 'Debate & Perspective-Taking Mode',
    description: 'Vizzy takes one side of an issue and helps a student or class argue the other, generating visual evidence and counterpoints in real time. Builds critical thinking and comfort with disagreement.',
    icon: Scale,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)',
    promptFilePath: 'docs/prompts/t1_debate_mode.md'
  },
  {
    id: 't2',
    title: 'Exam Cram Companion',
    description: 'A focused, high-intensity session in the days before a test, adaptive flashcards rendered visually, rapid-fire recall questions, and a confidence-tracking layer that flags what still needs work.',
    icon: BookOpen,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)',
    promptFilePath: 'docs/prompts/t2_exam_cram.md'
  },
  {
    id: 't3',
    title: 'Field Trip Without Leaving the Room',
    description: 'Vizzy generates an immersive, narrated visual journey to a place tied to the curriculum, ancient Rome, the Amazon, the moon, turning the frame into a window rather than a wall.',
    icon: Map,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)',
    promptFilePath: 'docs/prompts/t3_field_trip.md'
  },
  {
    id: 't4',
    title: 'Career Exploration Session',
    description: 'A guided conversation where Vizzy helps a student explore potential career paths based on their interests and strengths, generating visual "day in the life" material for each.',
    icon: Compass,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)',
    promptFilePath: 'docs/prompts/t4_career_exploration.md'
  },
  {
    id: 't5',
    title: 'Peer Teaching Mode',
    description: 'A student explains a concept back to Vizzy as if teaching it, with Vizzy playing an engaged, curious student and gently exposing gaps in understanding through questions.',
    icon: Users,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)',
    promptFilePath: 'docs/prompts/t5_peer_teaching.md'
  },
  {
    id: 't6',
    title: 'Parent-Teacher Conference Prep',
    description: 'Vizzy helps a teacher assemble a visual summary of a student\'s progress, strengths, and growth areas ahead of a parent meeting, pulling from the student\'s Deep Profile and recent evaluations.',
    icon: User,
    color: 'linear-gradient(135deg, #ff006e, #8338ec)',
    promptFilePath: 'docs/prompts/t6_pt_conference.md'
  },
  {
    id: 't7',
    title: 'Class Time Capsule',
    description: 'A once-a-term session where the class collaboratively creates a visual and narrated record of what they\'ve learned and experienced, stored and revisited at year\'s end.',
    icon: History,
    color: 'linear-gradient(135deg, #3a86ff, #023e8a)',
    promptFilePath: 'docs/prompts/t7_time_capsule.md'
  },
  {
    id: 't8',
    title: 'Reading Companion Mode',
    description: 'Vizzy reads alongside a student, generating scene visuals as a book progresses and asking comprehension questions tuned to keep engagement without breaking immersion.',
    icon: Book,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)',
    promptFilePath: 'docs/prompts/t8_reading_companion.md'
  },
  {
    id: 't9',
    title: 'Science Fair & Project Coach',
    description: 'A longer-arc collaborative mode, like the novella project but for a science project, helping a student develop a hypothesis, visualise their process, and prepare a presentation.',
    icon: FlaskConical,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)',
    promptFilePath: 'docs/prompts/t9_science_fair.md'
  },
  {
    id: 't10',
    title: 'Substitute Teacher Bridge',
    description: 'A session designed for days with a substitute teacher, where Vizzy has context on the regular curriculum pace and can help keep continuity even with an unfamiliar teacher in the room.',
    icon: UserMinus,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)',
    promptFilePath: 'docs/prompts/t10_substitute_bridge.md'
  },
  {
    id: 't11',
    title: 'Socratic Seminar Mode',
    description: 'Vizzy poses open, provocative questions and deliberately withholds answers, guiding a class or student toward deeper reasoning through dialogue rather than delivery.',
    icon: MessageCircle,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)',
    promptFilePath: 'docs/prompts/t11_socratic_seminar.md'
  },
  {
    id: 't12',
    title: 'Language Immersion Mode',
    description: 'An entire session conducted in the target language, with visuals generated to reinforce vocabulary and context in real time, no translation crutch.',
    icon: Languages,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)',
    promptFilePath: 'docs/prompts/t12_language_immersion.md'
  },
  {
    id: 't13',
    title: 'Lab Safety & Pre-Experiment Simulation',
    description: 'Before a physical experiment, Vizzy walks students through a visualised simulation, what should happen, what to watch for, key safety points, so the real lab session runs sharper and safer.',
    icon: ShieldAlert,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)',
    promptFilePath: 'docs/prompts/t13_lab_safety.md'
  },
  {
    id: 't14',
    title: 'New Student Orientation & Welcome',
    description: 'A warm, guided session for a student joining mid-year, introducing them to the school\'s culture, layout, and rhythms through visual storytelling rather than a printed handbook.',
    icon: UserPlus,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)',
    promptFilePath: 'docs/prompts/t14_student_orientation.md'
  },
  {
    id: 't15',
    title: 'Cross-Curricular Connections Mode',
    description: 'Vizzy deliberately draws links across subjects, the maths inside a painting, the physics inside a sport, helping students see knowledge as connected rather than siloed.',
    icon: Link,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)',
    promptFilePath: 'docs/prompts/t15_cross_curricular.md'
  },
  {
    id: 't16',
    title: 'Public Speaking & Presentation Coach',
    description: 'A rehearsal space where a student practises a presentation, Vizzy generates supporting visuals live and offers direct, specific feedback on pacing, clarity, and delivery.',
    icon: Mic,
    color: 'linear-gradient(135deg, #3a86ff, #023e8a)',
    promptFilePath: 'docs/prompts/t16_presentation_coach.md'
  },
  {
    id: 't17',
    title: 'Class Decision & Consensus Builder',
    description: 'For group choices, project topics, class trip destinations, elections, Vizzy visualises options and facilitates the group toward a decision everyone feels heard in.',
    icon: CheckCircle2,
    color: 'linear-gradient(135deg, #ff006e, #8338ec)',
    promptFilePath: 'docs/prompts/t17_consensus_builder.md'
  },
  {
    id: 't18',
    title: 'Study Buddy Matchmaker',
    description: 'Using learning profiles, Vizzy suggests and facilitates small ad hoc study pairings where students\' strengths and gaps genuinely complement each other.',
    icon: UserRoundPlus,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)',
    promptFilePath: 'docs/prompts/t18_study_buddy.md'
  },
  {
    id: 't19',
    title: 'End-of-Year Growth Retrospective',
    description: 'A once-a-year individual session where Vizzy pulls together a student\'s full-year journey, visualising growth, milestones, and what changed, a personal counterpart to the class time capsule.',
    icon: TrendingUp,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)',
    promptFilePath: 'docs/prompts/t19_growth_retrospective.md'
  },
  {
    id: 't20',
    title: 'After-School Homework Help Desk',
    description: 'A drop-in session, at school, after hours, where Vizzy provides patient, Socratic-style homework support without simply supplying answers, bridging the gap until a parent or tutor is available.',
    icon: Clock,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)',
    promptFilePath: 'docs/prompts/t20_homework_help.md'
  }
];
