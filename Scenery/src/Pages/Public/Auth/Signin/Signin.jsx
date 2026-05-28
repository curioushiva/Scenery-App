
import { Link } from "react-router"
import { RiCloseCircleLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { useAuth } from "@/Utils/Hooks/useAuth/useAuth";
import { useSelector } from "react-redux";


const Signin = () => {

    /* Custom useAuth hook */
    const { validateSigninEmail, invalidSigninEmail, isSigninEmailValid, changeTypedSigninEmail, validateSigninPassword, invalidSigninPassword, firebaseSigninError } = useAuth();

    /* Email typed by user */
    const usersTypedEmail = useSelector((store) => store.auth.usersTypedEmail)

    /* Error Msg for invalid usersTypedEmail and pass */
    const [typedSigninEmail, settypedSigninEmail] = useState(usersTypedEmail);
    const [typedSigninPassword, settypedSigninPassword] = useState('');

    /* Toggle btwn usersTypedEmail and usersTypedPass logic */
    return (
        <div className="w-full bg-gradient-to-b from-[#431518] to-[#000000] p-8 pt-13">
            <div className="w-full h-[75dvh] flex justify-center items-center pb-70">
                {isSigninEmailValid ?
                    <div className="h-full flex flex-col gap-2 justify-start items-start">
                        <h1 className="text-4xl font-bold">Sign in to your account</h1>
                        <h2 className="text-lg text-textcolor-secondary pb-5">Enter your details to continue</h2>
                        <input value={typedSigninPassword} onChange={(e) => { settypedSigninPassword(e.target.value); }} className="w-[clamp(100%,40vw,480px)] px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary focus:outline focus:outline-white xs:w-[clamp(300px,50vw,480px)]" type="text" placeholder="Password" />
                        <h3 className="ext-sm text-uicolor-primary">{invalidSigninPassword ? invalidSigninPassword : firebaseSigninError}</h3>
                        <button onClick={() => validateSigninPassword(typedSigninPassword, typedSigninEmail)} className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-base bg-uicolor-primary font-medium xs:w-[clamp(300px,50vw,480px)] cursor-pointer transition duration-100 ease-out active:scale-[0.95]">Sign in</button>
                        <Link onClick={() => changeTypedSigninEmail()} className="text-base text-textcolor-secondary pt-5 underline decoration-solid">Not your account? Use another email</Link>
                    </div>
                    :
                    <div className="h-full flex flex-col gap-2 justify-start items-start">
                        <h1 className="text-4xl font-bold">Sign in to your account</h1>
                        <h2 className="text-lg text-textcolor-secondary pb-5">Enter your details to continue</h2>
                        <input value={typedSigninEmail} onChange={(e) => { settypedSigninEmail(e.target.value); }} className="w-[clamp(100%,40vw,480px)] px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary focus:outline focus:outline-white xs:w-[clamp(300px,50vw,480px)]" type="text" placeholder="Email Address" />
                        <h3 className="ext-sm text-uicolor-primary">{invalidSigninEmail}</h3>
                        <button onClick={() => validateSigninEmail(typedSigninEmail)} className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-base bg-uicolor-primary font-medium xs:w-[clamp(300px,50vw,480px)] cursor-pointer transition duration-100 ease-out active:scale-[0.95]">Continue</button>
                        <Link to="/signup" className="text-base text-textcolor-secondary pt-5 underline decoration-solid">New here? Sign up to get started</Link>
                    </div>
                }
            </div>
        </div >
    )
}

export default Signin;