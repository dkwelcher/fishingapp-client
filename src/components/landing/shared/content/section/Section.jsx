import Image from "./SectionImage.jsx";
import Description from "./SectionDescription.jsx";
import { STRIPED_BASS_ALT_TEXT } from "../../../../../lib/constants/landing/MainContentConstants.jsx";

function Section({ image, description }) {
  return (
    <div className="pb-12 flex flex-col items-center sm:pb-20 lg:pb-28 2xl:pb-52 2xl:flex-row 2xl:justify-center 2xl:items-start 2xl:gap-x-20">
      <Image image={image} altText={STRIPED_BASS_ALT_TEXT} />
      <div className="p-4 rounded-sm sm:max-w-[600px] 2xl:p-8">
        <h2 className="pb-4 text-2xl md:text-3xl lg:text-4xl 2xl:text-5x font-semibold">
          What is{" "}
          <span className="text-blue-600 text-3xl font-bold md:text-4xl lg:text-5xl lg:font-bold">
            Fishing App?
          </span>
        </h2>
        <Description text={description} />
      </div>
    </div>
  );
}

export default Section;
