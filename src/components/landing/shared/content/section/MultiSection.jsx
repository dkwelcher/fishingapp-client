import SubSectionContent from "./SubSectionContent.jsx";

function MultiSection({ objects }) {
  return (
    <>
      {objects.map((object, index) => {
        return (
          <section
            key={index}
            className="pb-12 last:pb-0 flex flex-col items-center sm:pb-20 lg:pb-28 2xl:pb-0"
          >
            <SubSectionContent
              key={index}
              image={object.image}
              altText={object.altText}
              title={object.title}
              description={object.description}
            />
          </section>
        );
      })}
    </>
  );
}

export default MultiSection;
