import { motion } from 'framer-motion';
import { Container } from '@/components/primitives/Container';
import { BackgroundEffects } from '@/components/layout/BackgroundEffects';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { HeroSection } from '@/sections/HeroSection';
import { WhyMattersSection } from '@/sections/WhyMattersSection';
import { CommonThreatsSection } from '@/sections/CommonThreatsSection';
import { InteractiveExperienceSection } from '@/sections/InteractiveExperienceSection';
import { ProtectYourselfSection } from '@/sections/ProtectYourselfSection';
import { ImpactSection } from '@/sections/ImpactSection';
import { ChallengeSection } from '@/sections/ChallengeSection';

const journeyLinks = [
  { number: '01', label: 'Understand', detail: 'Why awareness matters', href: '#awareness' },
  { number: '02', label: 'Recognize', detail: 'Threats in the wild', href: '#threats' },
  { number: '03', label: 'Practice', detail: 'Interactive cyber lab', href: '#interactive' },
  { number: '04', label: 'Protect', detail: 'Your everyday toolkit', href: '#practices' },
  { number: '05', label: 'Test yourself', detail: 'The cyber challenge', href: '#challenge' }
];

export function AppShell() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div className="app-shell">
      <BackgroundEffects />
      <SiteHeader />

      <div className="project-credits" aria-label="Project credits">
        <span className="project-credits-title">Made By</span>
        <span>Name: <strong>[Sania Pal, Swati Saxena]</strong></span>
        <span>Roll No.: <strong>[240962106047, 240962106055]</strong></span>
        <span>College: <strong>[VMLG]</strong></span>
        <span>Course / Year: <strong>[BCA 3rd Year]</strong></span>
      </div>

      <main id="overview" className="page-content">
        <HeroSection />
        <Container>
          <section className="journey-section" id="journey" aria-labelledby="journey-title">
            <div className="journey-heading">
              <p className="journey-kicker">Your learning path</p>
              <h2 id="journey-title">Journey from curious to cyber confident.</h2>
              <p>Move through five focused steps, at your own pace.</p>
            </div>
            <nav className="journey-rail" aria-label="Cyber awareness journey">
              {journeyLinks.map((link) => (
                <a className="journey-step" href={link.href} key={link.number}>
                  <span className="journey-number">{link.number}</span>
                  <span className="journey-step-copy">
                    <strong>{link.label}</strong>
                    <small>{link.detail}</small>
                  </span>
                  <span className="journey-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
          </section>
        </Container>
        <WhyMattersSection />
        <CommonThreatsSection />
        <InteractiveExperienceSection />
        <ProtectYourselfSection />
        <ImpactSection />
        <ChallengeSection />

        <Container>
          <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 24 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="shell-intro"
          >
            <p className="shell-intro-kicker">Final reminder</p>
            <h2>Cyber awareness is not a one-time lesson. It is a daily habit that protects everything you value.</h2>
            <p>
              The experience is designed to leave you more confident, more prepared, and more aware of how digital threats really work.
            </p>
          </motion.section>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
