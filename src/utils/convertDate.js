import jMoment from 'moment-jalaali'


export const convertDate = (date)=>{
    return (jMoment(date).format('jYYYY/jMM/jDD'))
}