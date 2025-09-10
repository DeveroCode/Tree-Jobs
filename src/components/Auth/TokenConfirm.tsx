import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import type { ConfirmToken } from "@/types/index";

type TokenConfirmProps = {
    token: ConfirmToken['token'],
    handleChange: (token: ConfirmToken["token"]) => void,
    handleComplete: (token: ConfirmToken["token"]) => void

}

export default function TokenConfirm({token, handleChange, handleComplete}: TokenConfirmProps) {
    return (
        <>
            <div className="flex justify-center gap-5 max-w-md mx-auto">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    <PinInputField className="w-8 h-10 p-3 rounded-md border-purple-500 border placeholder-white" />
                    <PinInputField className="w-8 h-10 p-3 rounded-md border-purple-500 border placeholder-white" />
                    <PinInputField className="w-8 h-10 p-3 rounded-md border-purple-500 border placeholder-white" />
                    <PinInputField className="w-8 h-10 p-3 rounded-md border-purple-500 border placeholder-white" />
                    <PinInputField className="w-8 h-10 p-3 rounded-md border-purple-500 border placeholder-white" />
                    <PinInputField className="w-8 h-10 p-3 rounded-md border-purple-500 border placeholder-white" />
                    <PinInputField className="w-8 h-10 p-3 rounded-md border-purple-500 border placeholder-white" />
                </PinInput>
            </div>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/request-code'
                    className="text-center text-white font-semibold bg-purple-button py-2 px-5 rounded-md hover:bg-purple-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
                >
                    Request new code
                </Link>
            </nav>

        </>
    )
}