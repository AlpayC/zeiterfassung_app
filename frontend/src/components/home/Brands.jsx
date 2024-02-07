const Brand = () => {
  return (
    <>
      <section className=" py-20 dark:bg-dark lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="flex flex-wrap items-center justify-center">
                <SingleImage
                  href="#"
                  imgSrc="https://cdn.svgporn.com/logos/stability-ai.svg"
                />

                <SingleImage
                  href="#"
                  imgSrc="https://cdn.svgporn.com/logos/risingwave.svg"
                />

                <SingleImage
                  href="#"
                  imgSrc="https://cdn.svgporn.com/logos/workplace.svg"
                />
                <SingleImage
                  href="#"
                  imgSrc="https://cdn.svgporn.com/logos/appwrite.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brand;

const SingleImage = ({ href, imgSrc, Alt }) => {
  return (
    <>
      <a
        href={href}
        className="mx-4 flex w-[150px] items-center justify-center  2xl:w-[180px]"
      >
        <img src={imgSrc} alt={Alt} className="w-full h-10" />
      </a>
    </>
  );
};
