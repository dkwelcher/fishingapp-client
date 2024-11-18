function SubSectionText({ title, description }) {
  return (
    <>
      <h2 className="pb-4 text-2xl md:text-3xl lg:text-4xl 2xl:text-5x font-semibold">
        {title}
      </h2>
      <p className="text-slate-600 text-sm md:text-base lg:text-lg 2xl:text-xl">
        {description}
      </p>
    </>
  );
}

export default SubSectionText;
