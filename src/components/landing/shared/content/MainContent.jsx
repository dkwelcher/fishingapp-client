import Section1Image from "../../../../assets/striped-bass.png";
import Section2Image from "../../../../assets/blue-catfish.png";
import Section3Image from "../../../../assets/pier.png";
import { SUBSECTION_IMAGE_ALT_TEXTS } from "../../../../lib/constants/landing/LandingPageAltTexts.jsx";
import { SECTION1_DESCRIPTION } from "../../../../lib/constants/landing/LandingPageText";
import { SUBSECTION_TITLES } from "../../../../lib/constants/landing/LandingPageText";
import { SUBSECTION_DESCRIPTIONS } from "../../../../lib/constants/landing/LandingPageText";
import Section from "./shared/Section.jsx";
import MultiSection from "./shared/MultiSection.jsx";

function MainContent() {
  const subsectionImages = [Section2Image, Section3Image];
  const subsectionObjects = subsectionImages.map((image, index) => ({
    image: image,
    altText: SUBSECTION_IMAGE_ALT_TEXTS[index],
    title: SUBSECTION_TITLES[index],
    description: SUBSECTION_DESCRIPTIONS[index],
  }));

  return (
    <main className="py-12 px-4 sm:py-20 md:px-12 lg:py-28 2xl:py-36 text-slate-800">
      <Section image={Section1Image} description={SECTION1_DESCRIPTION} />
      <MultiSection objects={subsectionObjects} />
    </main>
  );
}

export default MainContent;
