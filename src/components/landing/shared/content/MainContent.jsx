import Section1Image from "../../../../assets/striped-bass.png";
import {
  SECTION1_DESCRIPTION,
  SUBSECTION_OBJECTS,
} from "../../../../lib/constants/landing/MainContentConstants.jsx";
import SectionContent from "./section/SectionContent.jsx";
import MultiSection from "./section/MultiSection.jsx";

function MainContent() {
  return (
    <>
      <section className="pb-12 flex flex-col items-center sm:pb-20 lg:pb-28 2xl:pb-52 2xl:flex-row 2xl:justify-center 2xl:items-start 2xl:gap-x-20">
        <SectionContent
          image={Section1Image}
          description={SECTION1_DESCRIPTION}
        />
      </section>
      <div className="flex flex-col 2xl:flex-row 2xl:justify-center 2xl:gap-x-20">
        <MultiSection objects={SUBSECTION_OBJECTS} />
      </div>
    </>
  );
}

export default MainContent;
