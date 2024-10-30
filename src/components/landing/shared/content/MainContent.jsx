import Section1Image from "../../../../assets/striped-bass.png";
import {
  SECTION1_DESCRIPTION,
  SUBSECTION_OBJECTS,
} from "../../../../lib/constants/landing/MainContentConstants.jsx";
import Section from "./section/Section.jsx";
import MultiSection from "./section/MultiSection.jsx";

function MainContent() {
  return (
    <main className="py-12 px-4 sm:py-20 md:px-12 lg:py-28 2xl:py-36 text-slate-800">
      <Section image={Section1Image} description={SECTION1_DESCRIPTION} />
      <MultiSection objects={SUBSECTION_OBJECTS} />
    </main>
  );
}

export default MainContent;
