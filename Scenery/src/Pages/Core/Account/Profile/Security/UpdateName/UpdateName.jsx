import { Link } from "react-router";
import { RiArrowLeftLongFill } from "@remixicon/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";

const UpdateName = () => {
  /* To update the name */
  const { changeName } = useAccount();

  /* Selecting Name */
  const { Name } = useSelector((store) => store.account.profile);

  /* To set new name */
  const [newName, setNewName] = useState(Name);

  /* To set new name validation msg - (error/updation) */
  const [newNameValidation, setNewNameValidation] = useState(null);

  /* To set button action label */
  const [btnActionLabel, setBtnActionLabel] = useState("Update");

  /* To handle change name */
  const handleChangeName = async () => {
    setBtnActionLabel("Updating...");
    const response = await changeName(newName);
    setNewNameValidation(response);
    setBtnActionLabel("Updated");
  };

  return (
    <div className="w-full navPadding">
      <div className="w-full flex flex-col gap-10">
        {/* Intro */}
        <div className="flex">
          <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
            Account
          </h1>
        </div>

        {/* Update Username */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full grid grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] gap-x-20 lg:gap-x-0 gap-y-5">
            {/* Back to account */}
            <Link to="/account" className="flex">
              <RiArrowLeftLongFill />
            </Link>

            {/* Main Container */}
            <div className="w-full flex items-center justify-start sm:justify-center">
              {/* Content */}
              <div className="w-full max-w-3xl flex flex-col gap-10">
                {/* Heading */}
                <div className="w-full flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">Update your name</h1>
                  <p className="text-sm sm:text-base text-regular text-text-secondary italic">
                    Update the name associated with your account.
                  </p>
                </div>
                {/* Name updation component */}
                <div className="w-full flex flex-col gap-4">
                  {/* Inputs */}
                  <div className="flex flex-col gap-2">
                    <input
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                        setBtnActionLabel("Update");
                        setNewNameValidation(null);
                      }}
                      className="w-full text-sm sm:text-base px-5 py-3 rounded-sm border text-text-secondary border-br-primary bg-bg-inputcolor placeholder-text-secondary focus:outline focus:outline-white"
                      type="text"
                      placeholder="Name"
                    />
                    <p
                      className={`text-xs sm:text-sm  ${newNameValidation?.success ? "text-noerrorcolor" : "text-errorcolor"} pl-2`}
                    >
                      {newNameValidation?.message}
                    </p>
                  </div>
                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleChangeName()}
                      className="w-full px-5 py-2 text-sm sm:text-base font-medium rounded-sm bg-btn-primary cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
                    >
                      {btnActionLabel}
                    </button>
                    <Link
                      to="/account"
                      className="w-full px-5 py-2 text-sm sm:text-base font-medium text-center rounded-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-bg-whitecolor/60"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateName;
