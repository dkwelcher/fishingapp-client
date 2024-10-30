function SubSectionText({ title, description }) {
  return (
    <div className="p-4 rounded-sm sm:max-w-[600px] 2xl:p-8">
      <h2 className="pb-4 text-2xl md:text-3xl lg:text-4xl 2xl:text-5x font-semibold">
        {title}
      </h2>
      <p className="text-slate-400 text-sm md:text-base lg:text-lg 2xl:text-xl">
        {description}
      </p>
    </div>
  );
}

export default SubSectionText;
