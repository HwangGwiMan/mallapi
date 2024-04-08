import React from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

function ReadPage(props) {

    const { tno } = useParams()

    return (
        <div className="font-extrabold w-full bg-white mt-6">
            <div className="text-2xl "> 
                Todo Read Page Component {tno}
             </div>
            <ReadComponent tno={tno}></ReadComponent>
        </div>
    )
}

export default ReadPage;