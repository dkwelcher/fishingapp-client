import DateSearch from "../DateSearch";

function InfoSection({
  setOpenSelectDateModal,
  getTripInfo,
  backgroundImage,
  title,
  description,
}) {
  return (
    <div
      className={`flex flex-col justify-center items-left px-10 py-20 mb-8 bg-cover bg-center text-white ${backgroundImage}`}
    >
      <h1 className="font-title font-medium text-4xl mb-4">{title}</h1>
      <p className="w-[40%] font-paragraph text-md mb-8">{description}</p>
      <div>
        <DateSearch
          setOpenSelectDateModal={setOpenSelectDateModal}
          getTripInfo={getTripInfo}
        />
      </div>
    </div>
  );
}

export default InfoSection;
