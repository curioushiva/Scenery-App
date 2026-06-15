import { useSelector } from "react-redux";

const Askai = () => {
  /* To select Name */
  const { Name } = useSelector((store) => store.account.profile);

  return (
    <div className="w-full navPadding">
      <div className="w-full flex flex-col gap-10">
        {/* Intro */}
        <div className="flex">
          <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
            Ask AI
          </h1>
        </div>

        <div className="flex">
          <h1 className="text-sm lg:text-base font-regular  text-text-secondary">
            Hey,
            <span className="italic font-medium text-text-primary">
              {" "}
              {Name}{" "}
            </span>
            . Something in mind? Ask AI
          </h1>
        </div>

        {/*  */}
        <div className="flex flex-col gap-10 pt-5"></div>
      </div>
    </div>
  );
};

export default Askai;
