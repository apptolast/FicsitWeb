import { NavBar } from '../../components/NavBar/NavBar';
import { HeroSection } from '../../components/HeroSection/HeroSection';
import { SocialProof } from '../../components/SocialProof/SocialProof';
import { WhySection } from '../../components/WhySection/WhySection';
import { FeaturesGrid } from '../../components/FeaturesGrid/FeaturesGrid';
import { DeployProtocol } from '../../components/DeployProtocol/DeployProtocol';
import { PricingSection } from '../../components/PricingSection/PricingSection';
import { IntegrationsSection } from '../../components/IntegrationsSection/IntegrationsSection';
import { RoadmapSection } from '../../components/RoadmapSection/RoadmapSection';
import { CTASection } from '../../components/CTASection/CTASection';
import { ContactGrid } from '../../components/ContactGrid/ContactGrid';
import { SiteFooter } from '../../components/SiteFooter/SiteFooter';
import styles from './LandingPage.module.scss';

export function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.gridBg} aria-hidden="true"></div>

      <NavBar />
      <main id="main-content">
        <HeroSection />
        <SocialProof />
        <WhySection />
        <FeaturesGrid />
        <DeployProtocol />
        <PricingSection />
        <IntegrationsSection />
        <RoadmapSection />
        <CTASection />
        <ContactGrid />
      </main>
      <SiteFooter />
    </div>
  );
}
