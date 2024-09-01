import jMoment from 'moment-jalaali'


export const convertDate = (date,format='jYYYY/jMM/jDD')=>{
    return (jMoment(date).format(format))
}


export const converFormDataToMiladi = (date)=>{
    // قرمتی که داریم رو به فرمتی که میخوایم تبدیل میکنیم
    return (jMoment(date , 'jD / jM / jYYYY').format('YYYY-M-D'))
}