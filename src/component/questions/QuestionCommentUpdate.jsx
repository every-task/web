import {useEffect, useState} from "react";
import {api} from "../../network/api";

const QuestionCommentUpdate =({id}) =>{
    const [changeData, setChangeData]=useState({
        title:""
    })
    const commentUpdate =async () =>{
        await api(`api/v1/question/article`,"UPDATE",changeData);
    }
    useEffect(() => {
        commentUpdate();
    }, []);
}
export default QuestionCommentUpdate;