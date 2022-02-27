import { useEffect } from "react";
import useAuth from "../authentication/useAuth";

function Logout() {
    const { logout } = useAuth();

    useEffect(() => {
        async function dummy() {
            await logout('/');
        }
        dummy();
    }, []);

    return (
        <>Processing logout</>
    )
}

export default Logout;