import { Loader2 } from "lucide-react"
import { Button, ButtonProps } from "./button"
import { Children } from "react"

type LoadingButtonprops = {
    isloading: boolean
} & ButtonProps

export default function LoadingButton({ children, isloading, ...props} : LoadingButtonprops){

    return (
        <>
            <Button {...props} disabled={props.disabled || isloading} className="w-full">
                { isloading && <Loader2 className="w-4 h-4 animate-spin mr-2"/>}
                {children}
            </Button>
        </>
    )
}