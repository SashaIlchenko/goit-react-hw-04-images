import { Grid } from "react-loader-spinner";
export const Loader = () => {
    return (
        <div><Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{ position: "fixed", top: "50%", left: "50%", zIndex: "100" }}
            wrapperClass=""
            visible={true}
        /></div>
    )
}
