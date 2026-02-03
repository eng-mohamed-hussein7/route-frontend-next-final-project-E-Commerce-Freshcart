import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../store/auth.slice";
import { removeToken } from "../server/auth.actions";

export default function useLogout() {
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = async () => {
        await removeToken();
        dispatch(setAuthInfo({
            userInfo: null,
            token: null,
            isAuthenticated: false,
        }));
        router.push("/login");
        router.refresh();
    }
    return {logout};
}