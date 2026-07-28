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

export function AppShell() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div className="app-shell">
      <BackgroundEffects />
      <SiteHeader />

      <main id="overview" className="page-content">
        <HeroSection />
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
