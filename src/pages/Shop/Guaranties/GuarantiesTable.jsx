import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddGuarantie from './AddGuarantie';
import GuarantiesActions from './tableAdditons/GuarantiesActions';
import { deleteGuaranteeService, getGuarantiesService } from '../../../services/shop/Guaranties/guaranties';
import { Alert } from '../../../utils/alert';
import { Confirm } from '../../../utils/confirm';

const GuarantiesTable = () => {
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [guarantiesToEdit , setGuarantiesToEdit] = useState(null);



    // This is for get Guaranties
    const handleGetGuaranties = async ()=>{
        try {
            const res = await getGuarantiesService();
            if (res.status == 200) {
                setData(res.data.data)
            }
        } catch (error) {
            // set error in httpService
        }
        finally{
            setLoading(false);
        }
    }

    // This is for delete Guarantee
    const handleDeleteGuarantie = async (rowData)=>{
        if (await Confirm(`آیا از حذف گارانتی ${rowData.title}
        اطمینان دارید ؟`)) {
            try {
                const res = await deleteGuaranteeService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .' ,
                    `گارانتی ${rowData.title} با موفقیت حذف شد .` , 'success');
                    handleGetGuaranties();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }

    // This is for calling Get Guaranties function
    useEffect(() => {
        handleGetGuaranties();
        setLoading(true);
    }, []);



    
    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان گارانتی'},
        {field : 'descriptions' , title : 'توضیحات'},
        {field : 'length' , title : 'مدت گارانتی'},
        {field : 'length_unit' , title : 'واحد زمانی'},
        {   
            field : null ,
            title : 'عملیات',
            element : (rowData)=>{
                return <GuarantiesActions rowData={rowData} 
                handleDeleteGuarantie={handleDeleteGuarantie} 
                setGuarantiesToEdit={setGuarantiesToEdit} />
            } ,
        }
    ]   
    
    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} searchParams={searchParams}
        numOfPage={4} isLoading={isLoading}>
            {/* --- Modal add Guarantie --- */}
            <AddGuarantie handleGetGuaranties={handleGetGuaranties} 
            guarantiesToEdit={guarantiesToEdit}
            setGuarantiesToEdit={setGuarantiesToEdit}/>
        </PaginatedTable>            
    );
}

export default GuarantiesTable;
