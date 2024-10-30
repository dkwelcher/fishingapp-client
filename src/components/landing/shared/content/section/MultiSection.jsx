import SubSection from "./SubSection.jsx";

function MultiSection({ objects }) {
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:justify-center 2xl:gap-x-20">
      {objects.map((object, index) => {
        return (
          <SubSection
            key={index}
            image={object.image}
            altText={object.altText}
            title={object.title}
            description={object.description}
          />
        );
      })}
    </div>
  );
}

export default MultiSection;
