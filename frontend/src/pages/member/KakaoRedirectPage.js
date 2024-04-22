import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";


const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams()

    const { moveToPath, saveAsCookie } = useCustomLogin()

    const authCode = searchParams.get("code")

    

    //const dispatch = useDispatch()

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {

            getMemberWithAccessToken(accessToken).then(memberInfo => {
                //dispatch(login(memberInfo))

                saveAsCookie(memberInfo)
                if (memberInfo && !memberInfo.social) {//소셜 회원이 아니라면
                    moveToPath("/")
                } else {
                    moveToPath("/member/modify")
                }

            })
        })
    }, [authCode])
    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    );
}

export default KakaoRedirectPage;