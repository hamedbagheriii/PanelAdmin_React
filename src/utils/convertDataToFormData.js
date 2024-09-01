export const convertDataToFormData = (data)=>{
    const formData = new FormData();
    for (const item in data) {
        formData.append(item , data[item])
    }
    return formData;
}

