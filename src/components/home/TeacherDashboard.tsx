import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { GlassCard } from '../ui/GlassCard';
import { 
  Sparkles, FileText, Target, FileCheck2, Filter, 
  Library, LineChart, UserMinus, CheckCircle, 
  ListOrdered, Map, Send, Users, BookOpen,
  Image, Layers, AlertTriangle, History, MessageSquare, Palette, 
  MessageCircle, Mail, Lightbulb, Mic, Wand2, FileQuestion, RefreshCw, 
  Calendar, TrendingUp
} from 'lucide-react';
import styles from './TeacherDashboard.module.css';

interface TeacherTool {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const TEACHER_TOOLS: TeacherTool[] = [
  {
    id: 'tt1',
    title: 'Lesson Content Creator',
    description: 'Generates visual, text, video, or narrated material for any lesson topic on demand.',
    icon: FileText,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'tt2',
    title: 'Adaptive Study Plan Builder',
    description: 'Builds individualised or small-group study plans that respond to real, ongoing student progress.',
    icon: Target,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'tt3',
    title: 'Interactive Assessment Designer',
    description: 'Creates evaluations beyond standard written tests — verbal, visual, project-based formats.',
    icon: FileCheck2,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'tt4',
    title: 'Differentiated Worksheet Generator',
    description: 'The same topic, generated at multiple levels of complexity simultaneously.',
    icon: Filter,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'tt5',
    title: 'Smart Content Organiser',
    description: 'A natural-language searchable library of everything a teacher has created or uploaded.',
    icon: Library,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'tt6',
    title: 'Progress Analytics Dashboard',
    description: 'Class-wide view of who\'s excelling, who\'s struggling, and by which topic.',
    icon: LineChart,
    color: 'linear-gradient(135deg, #3a86ff, #023e8a)'
  },
  {
    id: 'tt7',
    title: 'Substitute Teacher Briefing Agent',
    description: 'Briefs a cover teacher on exactly where a class left off.',
    icon: UserMinus,
    color: 'linear-gradient(135deg, #ff006e, #8338ec)'
  },
  {
    id: 'tt8',
    title: 'Marking & Feedback Assistant',
    description: 'Supports grading and generates constructive, specific feedback for student work.',
    icon: CheckCircle,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'tt9',
    title: 'Lesson Planning Companion',
    description: 'Helps structure a full lesson or unit, sequencing content and pacing.',
    icon: ListOrdered,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'tt10',
    title: 'Curriculum Mapping Assistant',
    description: 'Links generated material directly to specific syllabus points and standards.',
    icon: Map,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'tt11',
    title: 'Parent Communication Drafting Tool',
    description: 'Helps draft clear, warm progress updates and communications for parents.',
    icon: Send,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'tt12',
    title: 'Classroom Management Advisor',
    description: 'Offers strategies and content suited to specific classroom dynamics or challenges.',
    icon: Users,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'tt13',
    title: 'Professional Development Companion',
    description: 'Surfaces teaching techniques, research, and ideas relevant to a teacher\'s subject and style.',
    icon: BookOpen,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  }
];

const POWER_USE_CASES: TeacherTool[] = [
  {
    id: 'puc1',
    title: 'Generate a full lesson\'s visuals in under a minute',
    description: 'Turn a lesson plan into a complete set of visual aids instantly.',
    icon: Image,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'puc2',
    title: 'Build a differentiated worksheet in one request',
    description: 'The same topic, produced at three levels of difficulty simultaneously.',
    icon: Layers,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc3',
    title: 'Ask Vizzy to flag who\'s falling behind',
    description: 'A real-time snapshot of which students need attention this week, before parents\' evening surprises anyone.',
    icon: AlertTriangle,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc4',
    title: 'Create a custom assessment beyond multiple choice',
    description: 'Verbal, visual, or project-based evaluation built in minutes.',
    icon: FileCheck2,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc5',
    title: 'Retrieve last year\'s material instantly',
    description: '"Find what I used for the water cycle last spring" returns it immediately, no manual filing needed.',
    icon: History,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'puc6',
    title: 'Build a targeted revision plan for one struggling student',
    description: 'Individualised, adaptive, ready before the next lesson.',
    icon: Target,
    color: 'linear-gradient(135deg, #3a86ff, #023e8a)'
  },
  {
    id: 'puc7',
    title: 'Generate marking feedback drafts',
    description: 'Specific, constructive comments generated from student work, reviewed and finalised by the teacher.',
    icon: MessageSquare,
    color: 'linear-gradient(135deg, #ff006e, #8338ec)'
  },
  {
    id: 'puc8',
    title: 'Set up subject-themed room ambience for the week',
    description: 'Schedule the room\'s visual identity in advance across the timetable.',
    icon: Palette,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc9',
    title: 'Create a historically-grounded dialogue activity',
    description: 'Set up a live conversation experience with a figure relevant to this week\'s topic.',
    icon: MessageCircle,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'puc10',
    title: 'Draft a parent progress update',
    description: 'A warm, specific communication generated from real student data, ready to send.',
    icon: Mail,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc11',
    title: 'Build a small-group intervention session',
    description: 'Targeted content for three or four students working on the same gap.',
    icon: Users,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc12',
    title: 'Generate an immersive visual for tomorrow\'s hardest concept',
    description: 'Turn an abstract idea into something the class can actually see.',
    icon: Lightbulb,
    color: 'linear-gradient(135deg, #ff006e, #ff6b6b)'
  },
  {
    id: 'puc13',
    title: 'Brief a substitute teacher',
    description: 'A clear handover of exactly where the class left off, generated automatically.',
    icon: UserMinus,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc14',
    title: 'Pull a class-wide topic heatmap',
    description: 'See at a glance which concepts the whole class has and hasn\'t grasped.',
    icon: Map,
    color: 'linear-gradient(135deg, #3a86ff, #023e8a)'
  },
  {
    id: 'puc15',
    title: 'Create a narrated version of a lesson',
    description: 'For students who benefit from audio alongside visual and text.',
    icon: Mic,
    color: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  },
  {
    id: 'puc16',
    title: 'Set up whole-class creative mode for a project',
    description: 'A shared creative session across the whole room, facilitated by Vizzy.',
    icon: Wand2,
    color: 'linear-gradient(135deg, #9d4edd, #c77dff)'
  },
  {
    id: 'puc17',
    title: 'Generate exam-style questions matched to the syllabus',
    description: 'Practice material mapped directly to your curriculum points.',
    icon: FileQuestion,
    color: 'linear-gradient(135deg, #ff006e, #8338ec)'
  },
  {
    id: 'puc18',
    title: 'Request an alternative explanation on the spot',
    description: 'Mid-lesson, when the first explanation clearly hasn\'t landed for the room.',
    icon: RefreshCw,
    color: 'linear-gradient(135deg, #3a86ff, #00b4d8)'
  },
  {
    id: 'puc19',
    title: 'Build a term-long unit plan in one session',
    description: 'Sequenced content and pacing generated from a syllabus outline.',
    icon: Calendar,
    color: 'linear-gradient(135deg, #06d6a0, #2dc653)'
  },
  {
    id: 'puc20',
    title: 'Review individual student growth over the year',
    description: 'Pull a longitudinal view for a specific student ahead of a parent meeting or report writing.',
    icon: TrendingUp,
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

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore(state => state.user);
  const [stats, setStats] = useState({ activeClasses: 0, studentsNeedingAttention: 0 });

  React.useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3001/api/teacher/dashboard?teacherId=${user.id}`)
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(console.error);
    }
  }, [user]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h2><BookOpen size={24} /> Teacher Tools</h2>
        <p>Your classes are ready. {stats.studentsNeedingAttention} students might need attention today.</p>
      </header>

      {/* Teacher Tools Section */}
      <section className={styles.dashboardSection} style={{ marginBottom: '3rem' }}>
        <header className={styles.header}>
          <Sparkles size={20} color="var(--accent-blue)" />
          <h3>Teacher Tools</h3>
        </header>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {TEACHER_TOOLS.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <GlassCard className={styles.toolCard} interactive>
                <div 
                  className={styles.iconWrapper}
                  style={{ background: tool.color }}
                >
                  <tool.icon size={18} />
                </div>
                <h4 className={styles.title}>{tool.title}</h4>
                <p className={styles.description}>{tool.description}</p>
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
          {POWER_USE_CASES.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <GlassCard className={styles.toolCard} interactive>
                <div 
                  className={styles.iconWrapper}
                  style={{ background: tool.color }}
                >
                  <tool.icon size={18} />
                </div>
                <h4 className={styles.title}>{tool.title}</h4>
                <p className={styles.description}>{tool.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};
