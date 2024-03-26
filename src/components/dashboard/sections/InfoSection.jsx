/* 
InfoSection.jsx is an intermediate component that displays a background image, text, & the DateSearch component.

@since 2024-03-18
*/

import DateSearch from "../shared/DateSearch";

/* 
InfoSection renders a div that contains a background image, heading & paragraph text, & the DateSearch component.

@param setOpenSelectDateModal Setter function that sets the openSelectDateModal to true or false.
@param getTripDate Function that retrieves a date.
@param setTripDate Setter function that sets the tripDate state with a date object formatted YYYY-MM-DD.
@param setTrip Setter function that sets the trip state.
@param backgroundImage String that holds the path to an image file.
@param title String that holds the heading text.
@param description String that holds the paragraph text.
@return HTML that renders a background image, heading & paragraph elements, & the DateSearch component.
*/
function InfoSection({
  setOpenSelectDateModal,
  getTripDate,
  setTripDate,
  setTrip,
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
          setTripDate={setTripDate}
          setTrip={setTrip}
        />
      </div>
    </div>
  );
}

export default InfoSection;
