function SectionImage({ image, altText }) {
  return (
    <div className="pb-2">
      <img className="rounded-lg shadow-slate-800" src={image} alt={altText} />
    </div>
  );
}

export default SectionImage;
