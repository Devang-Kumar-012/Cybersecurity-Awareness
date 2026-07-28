import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Circle,
  Crown,
  FileText,
  Lock,
  MessageSquare,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Target,
  Wand2,
  Download,
  Share2,
  Mail,
  Smartphone,
  ScanLine,
  ShieldAlert,
  Eye,
  KeyRound,
  BadgeAlert,
  Zap
} from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';

type Question = {
  id: string;
  category: string;
  title: string;
  prompt: string;
  type: 'choice' | 'match' | 'inspect' | 'drag';
  options?: Array<{ label: string; correct: boolean; explanation: string }>;
  matches?: Array<{ left: string; right: string }>;
  answer?: string;
  explanation: string;
  tip: string;
};

const questions: Question[] = [
  {
    id: 'phish-email',
    category: 'Phishing',
    title: 'Spot the suspicious email',
    prompt: 'Which signal suggests this message is unsafe?',
    type: 'choice',
    options: [
      { label: 'It asks you to verify through the official app', correct: true, explanation: 'Safe behaviour means verifying through a trusted channel.' },
      { label: 'It uses a deadline and fear-based wording', correct: false, explanation: 'Urgent messages often pressure people into acting fast.' }
    ],
    explanation: 'A safer response is to pause and confirm the request through an official source.',
    tip: 'Look for urgency, mismatched sender details, and unexpected login prompts.'
  },
  {
    id: 'fake-site',
    category: 'Website Safety',
    title: 'Inspect the login page',
    prompt: 'Which detail is the biggest warning sign?',
    type: 'inspect',
    options: [
      { label: 'A slightly altered domain name', correct: true, explanation: 'Spoofed domains often look nearly identical to the trusted brand.' },
      { label: 'A clean layout', correct: false, explanation: 'A polished design does not guarantee the site is genuine.' }
    ],
    explanation: 'Careful inspection of the address bar and page cues can prevent credential theft.',
    tip: 'Check the domain, padlock, and whether the page is the one you expected.'
  },
  {
    id: 'password-lab',
    category: 'Passwords',
    title: 'Choose the strongest password approach',
    prompt: 'Which password approach is safest?',
    type: 'choice',
    options: [
      { label: 'A long passphrase with random words', correct: true, explanation: 'Long and unique passphrases are much harder to guess.' },
      { label: 'A family name with a number', correct: false, explanation: 'Simple personal details are easy to predict.' }
    ],
    explanation: 'Strong passwords are long, unique, and not tied to personal information.',
    tip: 'A password manager can make strong passwords practical.'
  },
  {
    id: 'scam-match',
    category: 'Scams',
    title: 'Match the scam to the warning',
    prompt: 'Pair each scam clue with the best response.',
    type: 'match',
    matches: [
      { left: 'Fake prize', right: 'Verify the source' },
      { left: 'Urgent payment', right: 'Pause and confirm' },
      { left: 'Unexpected attachment', right: 'Do not open it' }
    ],
    explanation: 'Scam awareness improves when you slow down and verify before responding.',
    tip: 'If something feels rushed or too good to be true, treat it cautiously.'
  },
  {
    id: 'mobile-security',
    category: 'Mobile Safety',
    title: 'Secure the phone',
    prompt: 'What should be enabled first?',
    type: 'choice',
    options: [
      { label: 'A strong screen lock and remote find feature', correct: true, explanation: 'These reduce the risk of theft and unauthorised access.' },
      { label: 'No lock at all for convenience', correct: false, explanation: 'A weak or missing lock makes the device far easier to compromise.' }
    ],
    explanation: 'Mobile devices need strong physical and digital protection because they travel with us.',
    tip: 'Biometrics and remote tracking significantly improve recovery options.'
  }
];

const achievements = [
  { id: 'first', title: 'First Signal', icon: Sparkles },
  { id: 'focus', title: 'Sharp Eye', icon: Eye },
  { id: 'guardian', title: 'Guardian', icon: ShieldCheck }
];

export function ChallengeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const current = questions[currentIndex];
  const progress = useMemo(() => Math.round(((currentIndex + (selectedAnswer ? 1 : 0)) / questions.length) * 100), [currentIndex, selectedAnswer]);
  const isComplete = currentIndex >= questions.length - 1 && selectedAnswer;

  const handleSelect = (label: string) => {
    if (selectedAnswer) return;
    const option = current.options?.find((item) => item.label === label);
    const correct = option?.correct ?? false;
    setSelectedAnswer(label);
    setFeedback(correct ? 'Great choice. You recognised the safer behaviour.' : 'That choice needs caution. The safer move is to pause and verify.');
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setShowResults(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const resetChallenge = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFeedback(null);
    setCompleted([]);
    setShowResults(false);
  };

  const resultLabel = score >= 4 ? 'Cyber Aware' : score >= 3 ? 'Rising Strong' : 'Keep Building';
  const certificateScore = Math.min(100, score * 20);

  return (
    <section className="challenge-section" id="challenge">
      <Container>
        <motion.div
          className="section-heading-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Badge>
            <Trophy size={14} />
            Cybersecurity Challenge & Knowledge Test
          </Badge>
          <h2>Complete the mission and become more cyber aware.</h2>
          <p>
            This challenge turns lessons into practical decisions. Each step is designed to feel like part of a mission rather than a standard quiz.
          </p>
        </motion.div>

        {!showResults ? (
          <div className="challenge-shell">
            <motion.div
              className="challenge-panel"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div className="challenge-header">
                <div>
                  <p className="challenge-category">{current.category}</p>
                  <h3>{current.title}</h3>
                </div>
                <div className="challenge-pill">
                  <Target size={14} />
                  <span>{currentIndex + 1}/{questions.length}</span>
                </div>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="challenge-surface">
                <div className="challenge-surface-card">
                  <div className="surface-top">
                    <Lock size={16} />
                    <span>Mission brief</span>
                  </div>
                  <p>{current.prompt}</p>
                  {current.type === 'choice' && (
                    <div className="choice-stack">
                      {current.options?.map((option) => {
                        const active = selectedAnswer === option.label;
                        return (
                          <button key={option.label} className={`choice-item ${active ? 'active' : ''}`} onClick={() => handleSelect(option.label)}>
                            <span>{option.label}</span>
                            {active ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current.type === 'inspect' && (
                    <div className="inspect-card">
                      <div className="inspect-window">
                        <div className="inspect-topbar">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="inspect-body">
                          <div className="inspect-line" />
                          <div className="inspect-line short" />
                          <div className="inspect-line short" />
                          <div className="inspect-highlight">
                            <ShieldAlert size={16} />
                            <span>secure-bank.com</span>
                          </div>
                        </div>
                      </div>
                      <div className="choice-stack">
                        {current.options?.map((option) => {
                          const active = selectedAnswer === option.label;
                          return (
                            <button key={option.label} className={`choice-item ${active ? 'active' : ''}`} onClick={() => handleSelect(option.label)}>
                              <span>{option.label}</span>
                              {active ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {current.type === 'match' && (
                    <div className="match-card">
                      {current.matches?.map((match) => (
                        <div key={match.left} className="match-row">
                          <div className="match-pill">{match.left}</div>
                          <ArrowRight size={14} />
                          <div className="match-pill alt">{match.right}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="challenge-surface-card side-card">
                  <div className="surface-top">
                    <Sparkles size={16} />
                    <span>Feedback</span>
                  </div>
                  {feedback ? (
                    <>
                      <p>{feedback}</p>
                      <div className="tip-box">{current.explanation}</div>
                      <div className="tip-box muted">Tip: {current.tip}</div>
                    </>
                  ) : (
                    <p>Choose the answer that reflects the safest behaviour in the scenario.</p>
                  )}
                  <div className="score-box">
                    <span>Score</span>
                    <strong>{score}/{questions.length}</strong>
                  </div>
                </div>
              </div>

              <div className="challenge-footer">
                <p>Every correct answer unlocks confidence and adds to your cyber awareness score.</p>
                <Button variant="primary" rightIcon={<ArrowRight size={15} />} onClick={handleNext} disabled={!selectedAnswer}>
                  {currentIndex === questions.length - 1 ? 'See final results' : 'Next mission'}
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="challenge-side-panel"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div className="achievement-card">
                <div className="achievement-top">
                  <Crown size={16} />
                  <span>Achievement trail</span>
                </div>
                <div className="achievement-list">
                  {achievements.map((item) => (
                    <div key={item.id} className="achievement-item">
                      <item.icon size={16} />
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="achievement-card">
                <div className="achievement-top">
                  <ShieldCheck size={16} />
                  <span>Mission focus</span>
                </div>
                <p>Recognise the signs, trust the safer action, and build stronger habits every time.</p>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div className="results-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
            <div className="results-top">
              <Badge>
                <Trophy size={14} />
                Mission complete
              </Badge>
              <h3>You are now {resultLabel}.</h3>
              <p>Every choice you made reflects a stronger understanding of digital safety.</p>
            </div>

            <div className="results-grid">
              <div className="results-panel">
                <div className="score-ring">
                  <div className="score-ring-value">{score}/5</div>
                </div>
                <div>
                  <h4>Cyber Awareness Score</h4>
                  <p>{certificateScore}% confidence in everyday cyber safety.</p>
                </div>
              </div>
              <div className="results-panel">
                <h4>Unlocked achievements</h4>
                <div className="achievement-list">
                  {achievements.slice(0, score >= 3 ? 3 : 2).map((item) => (
                    <div key={item.id} className="achievement-item">
                      <item.icon size={16} />
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="certificate-card">
              <div className="certificate-left">
                <h4>Cyber Aware Digital Certificate</h4>
                <p>Issued to visitors who complete the mission with thoughtful, practical choices.</p>
                <div className="certificate-meta">
                  <span>{resultLabel}</span>
                  <span>{certificateScore}%</span>
                </div>
              </div>
              <div className="certificate-actions">
                <Button variant="secondary" size="sm" rightIcon={<Download size={14} />}>Download</Button>
                <Button variant="primary" size="sm" rightIcon={<Share2 size={14} />}>Share</Button>
              </div>
            </div>

            <div className="results-actions">
              <Button variant="primary" rightIcon={<RefreshCw size={15} />} onClick={resetChallenge}>Try again</Button>
              <Button variant="secondary" rightIcon={<ArrowRight size={15} />}>Continue learning</Button>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
