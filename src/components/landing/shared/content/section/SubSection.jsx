import Image from "./SectionImage.jsx";
import SubSectionText from "./SubSectionText.jsx";

function SubSection({ image, altText, title, description }) {
  return (
    <div className="pb-12 last:pb-0 flex flex-col items-center sm:pb-20 lg:pb-28 2xl:pb-0">
      <Image image={image} altText={altText} />
      <SubSectionText title={title} description={description} />
    </div>
  );
}

export default SubSection;
