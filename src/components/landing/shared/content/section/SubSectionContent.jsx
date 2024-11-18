import Image from "./SectionImage.jsx";
import SubSectionText from "./SubSectionText.jsx";

function SubSectionContent({ image, altText, title, description }) {
  return (
    <>
      <div className="pb-2">
        <Image image={image} altText={altText} />
      </div>
      <div className="p-4 rounded-sm sm:max-w-[600px] 2xl:p-8">
        <SubSectionText title={title} description={description} />
      </div>
    </>
  );
}

export default SubSectionContent;
