import React, {useEffect, useState} from "react";
import { Chip } from "@mui/material";

const DateChip = ({ date }) => {

  const [dateConvert, setDataConvert] =useState();
  useEffect(() => {
      changeDateConvert(date);
  }, [date]);
  const changeDateConvert =(date) =>{
    if(date)
    {
      const year =date.substring(0,4);
      const month =date.substring(5,7)-1;
      const day =date.substring(8,10);
      const hour =date.substring(11,13);
      const minute=date.substring(14,16);
      const second=date.substring(17,19);
      const getServerDate = new Date(year,month,day,hour,minute,second);
      const serverTime = getServerDate.getTime();
      const nowDate = new Date();
      const nowTime = nowDate.getTime();
      const diff = ((nowTime-serverTime)/1000);
      const result = Math.floor((diff/60));
      if(result<1)
      {
        var returnData = "";
        returnData +="방금 전";
        setDataConvert(returnData);
      }
      else if((1<=result) && (result < 60))
      {
        var returnData = "";
        const stringResult = result.toString();
        returnData +=stringResult;
        returnData +="분 전";
        setDataConvert(returnData);
      }
      else if((60<=result) && (result < 60*24))
      {
        var returnData ="";
        const stringResult = Math.floor(result/60).toString();
        returnData +=stringResult;
        returnData +="시간 전";
        setDataConvert(returnData);
      }
      else {
        var returnData ="";
        returnData +=year;
        returnData +=".";
        returnData +=month;
        returnData +=".";
        returnData +=day;
        setDataConvert(returnData);
      }
    }
  }
  return <>{dateConvert && <Chip label={dateConvert} variant="outlined" />}</>
};

export default DateChip;
