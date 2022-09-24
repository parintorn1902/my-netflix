import { createRef, forwardRef, useEffect, useState } from "react";
import ThreadHelper from "@utils/ThreadHelper";
import tw from "@utils/Tailwind";
import { IconX } from "@tabler/icons";

const BACK_SPACE_KEY = "Backspace";

function AuthenProfile({ profileData, onLaunchProfile, onCancel }) {
  const { profilePassword } = profileData || {};

  const [ready, setReady] = useState(true);
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [showPIN, setShowPIN] = useState(false);
  const [showPinLengthError, setShowPinLengthError] = useState(false);
  const [showPinInvalidError, setShowPinInvalidError] = useState(false);

  const pin1Ref = createRef();
  const pin2Ref = createRef();
  const pin3Ref = createRef();
  const pin4Ref = createRef();
  const pinParent = createRef();

  const handlePin1Change = ({ target }) => {
    setPin1(target.value);
    if (target.value !== "") {
      pin2Ref.current.focus();
    }
  };

  const handlePin2Change = ({ target }) => {
    setPin2(target.value);
    if (target.value !== "") {
      pin3Ref.current.focus();
    }
  };

  const handlePin2KeyDown = ({ key }) => {
    if (key === BACK_SPACE_KEY) {
      pin1Ref.current.focus();
      pin1Ref.current.select();
    }
  };

  const handlePin3Change = ({ target }) => {
    setPin3(target.value);
    if (target.value !== "") {
      pin4Ref.current.focus();
    }
  };

  const handlePin3KeyDown = ({ key }) => {
    if (key === BACK_SPACE_KEY) {
      pin2Ref.current.focus();
      pin2Ref.current.select();
    }
  };

  const handlePin4Change = ({ target }) => {
    setPin4(target.value);
  };

  const handlePin4KeyDown = ({ key }) => {
    if (key === BACK_SPACE_KEY) {
      pin3Ref.current.focus();
      pin3Ref.current.select();
    }
  };

  const validtePinLength = () => {
    let combinePin = pin1 + pin2 + pin3 + pin4;
    if (combinePin.length < 4) {
      setShowPinLengthError(true);
    }
  };

  const handleShowPINClick = async () => {
    setShowPIN(true);
    await ThreadHelper.sleep(3000);
    setShowPIN(false);
  };

  const handleSubmit = async (userFillInPin) => {
    // clear animation class
    let animateClassName = "animate-error-shake";
    pinParent.current.classList.remove(animateClassName);

    if (userFillInPin === profilePassword) {
      // pass
      onLaunchProfile();

      // router.reload(PageConstant.BROWSE);
    } else {
      // fail, reset pin
      setPin1("");
      setPin2("");
      setPin3("");
      setPin4("");
      setShowPinInvalidError(true);

      pin1Ref.current.focus();
      pinParent.current.classList.add(animateClassName);
    }
  };

  useEffect(() => {
    // reset
    if (pin1 || pin2 || pin3 || pin4) {
      setShowPinLengthError(false);
    }

    let combinePin = pin1 + pin2 + pin3 + pin4;
    if (combinePin.length === 4) {
      handleSubmit(combinePin);
    }
  }, [pin1, pin2, pin3, pin4]);

  useEffect(() => {
    pin1Ref.current.focus();
  }, [ready]);

  return (
    <div
      className={tw(
        "absolute flex flex-col items-center justify-center",
        "w-screen h-screen",
        "bg-[#040404] z-10 transition duration-300 animate-fade-in"
      )}
    >
      <div
        className={tw("absolute", "top-[100px] right-[30px] w-[3vw] lg:w-[30px]", "cursor-pointer")}
        onClick={onCancel}
      >
        <IconX className="text-white h-full w-full" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <span>Profile Lock is currently on.</span>
        <span
          className={tw(
            "text-[2.5vw] lg:text-[20px]",
            "text-center",
            showPinInvalidError ? "text-[#e6b029]" : "text-white"
          )}
        >
          {showPinInvalidError
            ? "Whoops, wrong PIN. Please try again."
            : "Enter your PIN to access this profile."}
        </span>

        <div ref={pinParent} className={tw("flex flex-row", "my-[3em] space-x-[.4em]")}>
          <PinInput
            ref={pin1Ref}
            value={pin1}
            onChange={handlePin1Change}
            onBlur={validtePinLength}
          />
          <PinInput
            ref={pin2Ref}
            value={pin2}
            onChange={handlePin2Change}
            onKeyDown={handlePin2KeyDown}
            onBlur={validtePinLength}
          />
          <PinInput
            ref={pin3Ref}
            value={pin3}
            onChange={handlePin3Change}
            onKeyDown={handlePin3KeyDown}
            onBlur={validtePinLength}
          />
          <PinInput
            ref={pin4Ref}
            value={pin4}
            onChange={handlePin4Change}
            onKeyDown={handlePin4KeyDown}
            onBlur={validtePinLength}
          />
        </div>
        <p className={`${showPinLengthError ? "text-[#b9090b]" : "text-black"}`}>
          Your PIN must be 4 numbers.
        </p>

        <div className="absolute bottom-[5vw] cursor-pointer" onClick={handleShowPINClick}>
          <p className="text-white animate-bounce">Your PIN is {profilePassword}</p>
        </div>
      </div>
    </div>
  );
}

export default AuthenProfile;

const PinInput = forwardRef(({ value, onChange, onBlur, onKeyDown }, ref) => {
  return (
    <input
      ref={ref}
      type="password"
      pattern="[0-9]*"
      inputMode="numeric"
      className="border-2 border-solid outline-none border-white w-[9vw] h-[9vw] bg-transparent focus:scale-110 transition duration-150 text-[2.5vw] text-center text-white lg:w-[60px] lg:h-[60px] lg:text-[24px]"
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      autoComplete="off"
    />
  );
});
