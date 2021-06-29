import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
import { createRef, forwardRef, useEffect, useState } from "react";
import ThreadHelper from "@utils/ThreadHelper";
import PageConstant from "@constants/PageConstant";
import tw from "@utils/Tailwind";

function EnterPinContent({ visible = false, profilePassword, onCancel }) {

  const router = useRouter();

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
  }

  const handlePin2Change = ({ target }) => {
    setPin2(target.value);
    if (target.value !== "") {
      pin3Ref.current.focus();
    } else {
      pin1Ref.current.focus();
      pin1Ref.current.select();
    }
  }

  const handlePin3Change = ({ target }) => {
    setPin3(target.value);
    if (target.value !== "") {
      pin4Ref.current.focus();
    } else {
      pin2Ref.current.focus();
      pin2Ref.current.select();
    }
  }

  const handlePin4Change = ({ target }) => {
    setPin4(target.value);
    if (target.value !== "") {
      // do nothing
    } else {
      pin3Ref.current.focus();
      pin3Ref.current.select();
    }
  }

  const validtePinLength = () => {
    let combinePin = pin1 + pin2 + pin3 + pin4;
    if (combinePin.length < 4) {
      setShowPinLengthError(true);
    }
  }

  const handleShowPINClick = async () => {
    setShowPIN(true);
    await ThreadHelper.sleep(3000);
    setShowPIN(false);
  }

  const handleSubmit = async (userFillInPin) => {
    // clear animation class
    let animateClassName = "animate-error-shake";
    pinParent.current.classList.remove(animateClassName);

    if (userFillInPin === profilePassword) {
      // pass
      router.push(PageConstant.BROWSE);
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
  }

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
    if (visible) {
      pin1Ref.current.focus();
    }
  }, [visible]);

  return (
    <div
      className={tw(
        "absolute flex flex-col items-center justify-center",
        "w-screen h-screen",
        "bg-[#040404] z-10 transition duration-300 animate-fade-in",
        visible === true ? "visible" : "hidden"
      )}
    >

      <div
        className={tw(
          "absolute",
          "top-[100px] right-[30px] w-[3vw] lg:w-[30px]",
          "cursor-pointer"
        )}
        onClick={onCancel}
      >
        <XIcon className="text-white" />
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
          {showPinInvalidError ? "Whoops, wrong PIN. Please try again." : "Enter your PIN to access this profile."}
        </span>

        <div
          ref={pinParent}
          className={tw(
            "flex flex-row",
            "my-[3em] space-x-[.4em]"
          )}
        >
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
            onBlur={validtePinLength}
          />
          <PinInput
            ref={pin3Ref}
            value={pin3}
            onChange={handlePin3Change}
            onBlur={validtePinLength}
          />
          <PinInput
            ref={pin4Ref}
            value={pin4}
            onChange={handlePin4Change}
            onBlur={validtePinLength}
          />
        </div>
        <p className={`${showPinLengthError ? "text-[#b9090b]" : "text-black"}`}>
          Your PIN must be 4 numbers.
        </p>

        <div
          className="absolute bottom-[5vw] cursor-pointer"
          onClick={handleShowPINClick}
        >
          {
            showPIN ? (
              <p className="text-white animate-bounce">
                Your PIN is {profilePassword}
              </p>
            ) : (
              <a className="text-[#ccc] px-[1em] py-[.5em] transition duration-300 hover:scale-110 hover:bg-[#33333366]">
                Forgot PIN?
              </a>
            )
          }

        </div>
      </div>

    </div>
  )
}

export default EnterPinContent

const PinInput = forwardRef(({ value, onChange, onBlur }, ref) => {
  return (
    <input
      ref={ref}
      type="password"
      pattern="[0-9]*"
      inputmode="numeric"
      className="border-2 border-solid outline-none border-white w-[9vw] h-[9vw] bg-transparent focus:scale-110 transition duration-150 text-[2.5vw] text-center text-white lg:w-[60px] lg:h-[60px] lg:text-[24px]"
      maxLength={1}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete="off"
    />
  )
});
