import DateSearch from "../shared/DateSearch";

function InfoSection({
  setOpenSelectDateModal,
  getTripDate,
  backgroundImage,
  title,
  description,
}) {
  /* Tailwind Class Styles */
  const infoSectionStyles = `flex flex-col justify-center items-left px-4 pt-10 pb-4 mb-4 bg-cover bg-center text-white ${backgroundImage}`;
  const infoSectionTitleStyles = "font-title font-medium text-3xl pb-2";
  const infoSectionDescriptionStyles = "font-paragraph text-md pb-4";
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
