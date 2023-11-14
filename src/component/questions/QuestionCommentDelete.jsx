import {useEffect, useState} from "react";
import {api} from "../../network/api";

const CommentDelete =({id}) =>{
    const [changeData, setChangeData]=useState({
        title:""
    })
    const commentDel =async () =>{
        await api(`api/v1/question/article/${id}`,"DELETE");
    }
    useEffect(() => {
        commentDel();
    }, []);
    return(
        <>

        </>
    )

}
export default CommentDelete;