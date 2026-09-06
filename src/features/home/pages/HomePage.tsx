import HeroSection from "../components/HeroSection";
import FeaturedCareers from "../components/FeaturedCareers";
import InstitutionalPreview from "../components/InstitutionalPreview";
import LatestPublications from "../components/LatestPublications";
import UpcomingActivities from "../components/UpcomingActivities";
import GalleryPreview from "../components/GalleryPreview";
import SedesPreview from "../components/SedesPreview";
import ContactCTA from "../components/ContactCTA";

export default function HomePage() {
  return <main><HeroSection /><FeaturedCareers /><InstitutionalPreview /><LatestPublications /><UpcomingActivities /><GalleryPreview /><SedesPreview /><ContactCTA /></main>;
}
