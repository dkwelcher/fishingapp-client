import DateSearch from "../shared/DateSearch";

function InfoSection({
  setOpenSelectDateModal,
  getTripDate,
  backgroundImage,
  title,
  description,
}) {
  /* Tailwind Class Styles */
  const infoSectionStyles = `flex flex-col justify-center items-left px-10 py-20 mb-8 bg-cover bg-center text-white ${backgroundImage}`;
  const infoSectionTitleStyles = "font-title font-medium text-4xl mb-4";
  const infoSectionDescriptionStyles = "w-[40%] font-paragraph text-md mb-8";
  /* End Tailwind Class Styles */

  return (
    <div className={infoSectionStyles}>
      <h1 className={infoSectionTitleStyles}>{title}</h1>
      <p className={infoSectionDescriptionStyles}>{description}</p>
      <div>
        <DateSearch
          setOpenSelectDateModal={setOpenSelectDateModal}
          getTripDate={getTripDate}
        />
      </div>
    </div>
  );
}

export default InfoSection;
