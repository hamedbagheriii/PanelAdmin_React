import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const Confirm = (action)=>{
  swal({
    title: "آیا میخواهید از حساب خارج شوید ؟",
    icon: "warning",
    buttons: ['لغو' , 'تایید'],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
        action.navigate('/Logout')
    } else {
      swal("عملیات لغو شد ." , {
        icon : 'info'
      });
    }
  });
}