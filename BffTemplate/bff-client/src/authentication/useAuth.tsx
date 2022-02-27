import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserType from "./User";
import { getCurrentUser, userLogout } from "./UsersApi";

interface AuthContextType {
    user?: UserType
    authenticated: boolean
    login: (returnUrl: string) => Promise<void>
    logout: (returnUrl: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [user, setUser] = useState<UserType>();
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        async function dummy() {
            try {
                let user = await getCurrentUser();
                setUser(user);
                setAuthenticated(true);
            }
            catch (error) {
                setUser(undefined);
                setAuthenticated(false);
            }
        }
        dummy();
    }, []);

    async function logout(returnUrl: string): Promise<void> {
        setUser(undefined);
        setAuthenticated(false);
        await userLogout(user!.logoutUrl + '&returnUrl=' + returnUrl);
    }

    async function login(returnUrl: string): Promise<void> {
        window.location.href = "/bff/login?returnUrl=" + returnUrl;
    }

    const memoedValue = { user, logout, login, authenticated }

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
    let { authenticated } = useAuth();
    let location = useLocation();

    return authenticated
        ? children
        : <Navigate to="/" state={{ from: location }} replace />;
}