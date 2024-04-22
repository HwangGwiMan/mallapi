import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { loginPostAsync, logout } from "../slices/loginSlice"
import { useRecoilState, useResetRecoilState } from "recoil"
import signinState from "../atoms/signinState"
import { loginPost } from "../api/memberApi"
import { removeCookie, setCookie } from "../util/cookieUtil"
import { cartState } from "../atoms/cartState"

const useCustomLogin = () => {
    const navigate = useNavigate()

    //const dispatch = useDispatch()

    //const loginState = useSelector(state => state.loginSlice)

    const [loginState, setLoginState] = useRecoilState(signinState)

    const resetState = useResetRecoilState(signinState)

    const resetCartState = useResetRecoilState(cartState)

    const isLogin = loginState.email ? true : false

    const doLogin = async (loginParam) => {
        // const action = await dispatch(loginPostAsync(loginParam))
        // return action.payload

        const result = await loginPost(loginParam)
        saveAsCookie(result)

        return result
    }

    const saveAsCookie = (data) => {
        setCookie("member", JSON.stringify(data), 1) //1일
        setLoginState(data)
    }

    const doLogout = () => { //---------------로그아웃 함수
        // dispatch(logout())

        removeCookie("member")
        resetState()
        resetCartState()
    }

    const moveToPath = (path) => { //----------------페이지 이동
        navigate({ pathname: path }, { replace: true })
    }

    const moveToLogin = () => { //----------------------로그인 페이지로 이동
        navigate({ pathname: '/member/login' }, { replace: true })
    }

    const moveToLoginReturn = () => { //--------로그인 페이지로 이동 컴포넌트
        return <Navigate replace to="/member/login" />
    }

    return {
        loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin,
        moveToLoginReturn, saveAsCookie
    }

}
export default useCustomLogin