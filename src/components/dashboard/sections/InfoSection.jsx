import DateSearch from "../shared/DateSearch";

function InfoSection({
  setOpenSelectDateModal,
  getTripDate,
  backgroundImage,
  title,
  description,
}) {
  /* Tailwind Class Styles */
  const infoSectionStyles = `flex flex-col justify-center items-left px-4 pt-12 pb-4 bg-cover bg-center text-white ${backgroundImage} md:py-12 md:px-4 shadow-md shadow-slate-800`;
  const infoSectionTitleStyles =
    "font-title font-medium text-3xl pb-4 lg:text-4xl";
  const infoSectionDescriptionStyles =
    "font-paragraph text-md pb-4 lg:w-[60%] 2xl:w-[40%]";
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
