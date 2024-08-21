import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const Confirm =  (title)=>{
  return (
    swal({
      title: title ,
      icon: "warning",
      buttons: ['لغو' , 'تایید'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        return true;
      } else {
        swal("عملیات لغو شد ." , {
          icon : 'info'
        });
        return false;
      }
    }))
}