import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { 
  MessageCircleQuestion, LifeBuoy, TrendingUp, Sparkles, 
  Flame, BookOpen, PenTool, Lightbulb, Library, Target,
  RefreshCw, Image, Users, MessageSquare, Globe, 
  Palette, Music, Zap, Clock, FileQuestion, Compass, 
  LayoutList, History, Flag, LayoutTemplate, Heart, Search, List, FileText, 
  Mic, CheckSquare, Book, Calendar, Award
} from 'lucide-react';
import styles from './StudentCompanions.module.css';

interface StudentCompanion {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const COMPANIONS: StudentCompanion[] = [
  {
    id: 'sc1',
    title: 'Socratic Tutor',
    description: 'Engages through guided questioning rather than direct answers, building genuine understanding.',
    icon: MessageCircleQuestion,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'sc2',
    title: 'Struggle Detection & Support Agent',
    description: 'Notices when a student is stuck and offers scaffolded help, not shortcuts.',
    icon: LifeBuoy,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'sc3',
    title: 'Personal Progress Companion',
    description: 'Tracks and reflects a student\'s growth back to them, visually and non-judgementally.',
    icon: TrendingUp,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'sc4',
    title: 'Passion & Interest Discovery Agent',
    description: 'Notices what genuinely excites a specific child over time and helps nurture it.',
    icon: Sparkles,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'sc5',
    title: 'Motivation & Encouragement Agent',
    description: 'Nudges and celebrates progress in a way calibrated to the individual child.',
    icon: Flame,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'sc6',
    title: 'Revision & Exam Prep Companion',
    description: 'Builds targeted, adaptive revision plans ahead of assessments.',
    icon: BookOpen,
    color: 'linear-gradient(135deg, #3a86ff, #023e8a)'
  },
  {
    id: 'sc7',
    title: 'Homework Companion Mode',
    description: 'Socratic-style support for independent work, designed against dependency.',
    icon: PenTool,
    color: 'linear-gradient(135deg, #ff006e, #8338ec)'
  },
  {
    id: 'sc8',
    title: 'Concept Re-Explainer',
    description: 'Generates alternative explanations or visual metaphors when the first one hasn\'t landed.',
    icon: Lightbulb,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'sc9',
    title: 'Reading Companion',
    description: 'Supports comprehension and engagement with assigned or independent reading.',
    icon: Library,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'sc10',
    title: 'Goal-Setting & Reflection Agent',
    description: 'Helps students set, track, and reflect on their own learning goals over time.',
    icon: Target,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  }
];

const STUDENT_POWER_USE_CASES: StudentCompanion[] = [
  {
    id: 'puc1',
    title: 'Ask "I don\'t get this" and get a different explanation',
    description: 'A new visual or analogy when the first one didn\'t land.',
    icon: RefreshCw,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc2',
    title: 'See a concept visualised, not just described',
    description: 'Turn a paragraph in a textbook into something to actually look at.',
    icon: Image,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'puc3',
    title: 'Talk to a historical figure about what they\'re studying',
    description: 'Ask a real question and get a grounded, in-character answer.',
    icon: Users,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc4',
    title: 'Have a conversation with a book\'s character',
    description: 'Explore motivations and choices directly, in dialogue.',
    icon: MessageSquare,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc5',
    title: 'Get help on homework without getting the answer handed over',
    description: 'Socratic-style guidance that unblocks thinking rather than replacing it.',
    icon: LifeBuoy,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'puc6',
    title: 'Build a personal revision plan before a test',
    description: 'Adaptive, based on what they actually still need to work on.',
    icon: Target,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc7',
    title: 'See their own progress mapped out visually',
    description: 'Strengths, growth areas, and improvement over time, without comparison to classmates.',
    icon: TrendingUp,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'puc8',
    title: 'Practice a language conversationally',
    description: 'Spoken and written practice calibrated to their current level.',
    icon: Globe,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc9',
    title: 'Turn a rough idea into a piece of art',
    description: 'Co-create visually with Vizzy from a simple description.',
    icon: Palette,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc10',
    title: 'Compose a short piece of music',
    description: 'Generate and iterate on a musical idea conversationally.',
    icon: Music,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'puc11',
    title: 'Get extra challenge material when finished early',
    description: 'Content that keeps pace with curiosity instead of waiting for the rest of the class.',
    icon: Zap,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc12',
    title: 'Write a daily study journal entry',
    description: 'A quick reflective log of what they learned or found difficult that day.',
    icon: PenTool,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'puc13',
    title: 'Ask "why" as many times as they want',
    description: 'Follow their own curiosity down a line of questioning without running out of patience on the other end.',
    icon: MessageCircleQuestion,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc14',
    title: 'Get a concept re-explained at a slower pace',
    description: 'The same idea broken into smaller, more manageable steps.',
    icon: Clock,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc15',
    title: 'Practice for an upcoming test interactively',
    description: 'Generated practice questions matched to what\'s actually being assessed.',
    icon: FileQuestion,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'puc16',
    title: 'Explore what a historical period actually felt like',
    description: 'An immersive journey into the setting, not just a description of it.',
    icon: Compass,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc17',
    title: 'Turn a dry topic into a story',
    description: 'Ask Vizzy to reframe a concept narratively to make it stick.',
    icon: BookOpen,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'puc18',
    title: 'Get help structuring an essay before writing it',
    description: 'A scaffolded plan built from their own ideas, not written for them.',
    icon: LayoutList,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc19',
    title: 'Review what they learned last term',
    description: 'Pull back prior material to refresh before it\'s built on further.',
    icon: History,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc20',
    title: 'Set a personal learning goal and track it',
    description: 'Define something they want to improve at and see progress toward it over time.',
    icon: Flag,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'puc21',
    title: 'Ask for a diagram instead of reading another paragraph',
    description: 'Request a visual version of any written explanation.',
    icon: LayoutTemplate,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc22',
    title: 'Get encouragement after a difficult topic',
    description: 'A genuine, specific nudge calibrated to what actually helps them, not generic praise.',
    icon: Heart,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'puc23',
    title: 'Explore a subject they\'re curious about but aren\'t formally studying',
    description: 'Follow independent interest outside the set curriculum.',
    icon: Search,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc24',
    title: 'Prepare talking points for a class discussion or debate',
    description: 'Structured thinking support ahead of a verbal task.',
    icon: List,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc25',
    title: 'Turn class notes into a cleaner summary',
    description: 'Condense and organise their own notes into something more useful for revision.',
    icon: FileText,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'puc26',
    title: 'Practice explaining a concept out loud',
    description: 'A verbal check that tests real understanding, not just recognition.',
    icon: Mic,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc27',
    title: 'Get a second opinion on a piece of creative work',
    description: 'Thoughtful, specific feedback on their own writing, art, or music before submitting it.',
    icon: CheckSquare,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'puc28',
    title: 'Ask what a word, era, or reference actually means in context',
    description: 'Quick, embedded clarification without leaving the topic.',
    icon: Book,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc29',
    title: 'Build a project plan for a longer piece of coursework',
    description: 'Break a big task into manageable, sequenced steps.',
    icon: Calendar,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc30',
    title: 'Look back at how much they\'ve grown since the start of the year',
    description: 'A genuine, motivating view of real progress over time, not just this week\'s grade.',
    icon: Award,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export const StudentCompanions: React.FC = () => {
  return (
    <div className={styles.companionsContainer}>
      {/* Learning Companions Section */}
      <section className={styles.dashboardSection} style={{ marginBottom: '3rem' }}>
        <header className={styles.header}>
          <Sparkles size={20} color="var(--accent-blue)" />
          <h3>My Learning Companions</h3>
        </header>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {COMPANIONS.map((companion) => (
            <motion.div key={companion.id} variants={itemVariants}>
              <GlassCard className={styles.companionCard} interactive>
                <div 
                  className={styles.iconWrapper}
                  style={{ background: companion.color }}
                >
                  <companion.icon size={18} />
                </div>
                <h4 className={styles.title}>{companion.title}</h4>
                <p className={styles.description}>{companion.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Power Use Cases Section */}
      <section className={styles.dashboardSection}>
        <header className={styles.header}>
          <Sparkles size={20} color="var(--accent-purple)" />
          <h3>Power Use Cases</h3>
        </header>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {STUDENT_POWER_USE_CASES.map((companion) => (
            <motion.div key={companion.id} variants={itemVariants}>
              <GlassCard className={styles.companionCard} interactive>
                <div 
                  className={styles.iconWrapper}
                  style={{ background: companion.color }}
                >
                  <companion.icon size={18} />
                </div>
                <h4 className={styles.title}>{companion.title}</h4>
                <p className={styles.description}>{companion.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};
