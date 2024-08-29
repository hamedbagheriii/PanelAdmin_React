import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddColor from './AddColor';
import { deleteColorService, getColorsService } from '../../../services/shop/color/colors';
import { Alert } from '../../../utils/alert';
import Actions from './tableAdditons/Actions';
import { Confirm } from '../../../utils/confirm';
import ShowColor from './tableAdditons/showColor';

const ColorsTable = () => {
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [colorToEdit , setColorToEdit] = useState(null);




    // This is for get Colors
    const handleGetColors = async ()=>{
        try {
            const res = await getColorsService();
            if (res.status == 200) {
                setData(res.data.data);
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    // This is for delete Color
    const handleDeleteColor = async (rowData)=>{
        if (await Confirm(`آیا از حذف رنگ ${rowData.title}
        اطمینان دارید ؟`)) {
            try {
                const res = await deleteColorService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .',
                    `رنگ ${rowData.title} با موفقیت حذف شد .` , 'success');
                    handleGetColors();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }

    // This is for calling Get Colors function
    useEffect(() => {
        handleGetColors();
        setLoading(true)
    }, []);



    const additionField = [
        {
            field : 'color' ,
            title : 'رنگ' ,
            element : (itemId , rowData)=> <ShowColor rowData={rowData} />
        } ,
        {
            field : 'Operation' ,
            title : 'عملیات' ,
            element : (itemId , rowData)=> <Actions rowData={rowData}
            handleDeleteColor={handleDeleteColor} setColorToEdit={setColorToEdit} />
        } 
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نام رنگ را وارد کنید .' ,
        searchField : 'title'
    }
    
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'نام رنگ'},
        {field : 'code' , title : 'کد رنگ'},
    ]
    
    const targetSearch = [
        {id : 1 , color : '#e312ff' , title : 'نام رنگ' , target : 'title' ,
        placeholder : 'قسمتی از نام رنگ را وارد کنید .'} ,
        {id : 2 , color : '#000' , title : 'کد رنگ' , target : 'code' ,
        placeholder : 'قسمتی از کد رنگ را وارد کنید .'} ,
    ]


    return (
        <>
            <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
             searchParams={searchParams} numOfPage={4} targetSearch={targetSearch} isLoading={isLoading}>
                {/* --- Modal add Color --- */}
                <AddColor setColorToEdit={setColorToEdit} handleGetColors={handleGetColors}
                colorToEdit={colorToEdit} />
            </PaginatedTable>
        </>
    );
}

export default ColorsTable;
