import swal from "sweetalert"

export const Alert = (title , text , icon)=>{
    swal({
        title : title ,
        text : text ,
        icon : icon ,
        buttons : 'باشه' ,
    })
}