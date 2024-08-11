import React, { useEffect, useState } from 'react';

const numOfPage = 4;
const PaginatedTable = ({data , dataInfo , additionField }) => {
    // برای فیلد ها در هر صفحه
    const [tableData , setTableData] = useState([]);
    // برای پیجی که الان هست
    const [currentPage , setCurrentPage] = useState(1);
    // برای حلقه زدن و جا ب جایی بین صفحات
    const [pages , setPages] = useState([]);
    // تعداد کل صفحات
    const [pageCount , setPageCount] = useState(1);

    // برای جا ب جایی بین صفحات
    useEffect(() => {
        let pCount = Math.ceil(data.length / numOfPage);
        setPageCount(pCount);

        let pArr = [];
        for (let i = 1; i <= pCount ; i++) pArr = [...pArr , i] ;
        setPages(pArr);
    }, []);

    // برای فیلد ها
    useEffect(() => {
        let start = (currentPage*numOfPage)-numOfPage;
        let end = (currentPage*numOfPage);

        setTableData(data.slice(start , end))
    }, [currentPage]);




    return (
        <div className='h-75 d-flex flex-column justify-content-between'>
            <table className="table table-responsive text-center table-hover font_08 table-dark table-bordered">
                <thead className="table-dark">
                    <tr className='fs-6 text-primary'>
                        {dataInfo.map(i=>(
                            <th key={i.field}>{i.title}</th>
                        ))}
                        {/* --- فیلد های اختصاصی / dedicatedField --- */}
                        {additionField.map(i=>(
                            <th key={i.field}>{i.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(d=>(
                        <tr key={d.id}> 
                            {dataInfo.map(i=>(
                                <td key={`${i.field}_${d.id}`}>{d[i.field]}</td>
                            ))}
                            {/* --- فیلد های اختصاصی / dedicatedField --- */}
                            {additionField.map(i=>(
                                <td key={i.field}>{i.element(d.id)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <nav aria-label="Page navigation example " className="d-flex justify-content-center ">
                <ul className="pagination mx-auto p-0 bg-dark">
                    <li className="page-item prev pointer" onClick={()=>setCurrentPage(currentPage - 1)}>
                        <button type='button' disabled={currentPage - 1 == 0} className="page-link bg-dark prev-btn">
                            <span aria-hidden="true">قبلی</span>
                        </button>
                    </li>
                    {pages.map(page=>(
                        <li key={page} className={`page-item pointer `} onClick={()=>setCurrentPage(page)}>
                            <span className={`page-link bg-dark ${currentPage === page ? 'page_active' : null}`}>{page}</span>
                        </li>
                    ))}
                    <li className="page-item next pointer" onClick={()=>setCurrentPage(currentPage + 1)}>
                        <button type='button' disabled={currentPage + 1 > pageCount} className="page-link bg-dark next-btn">
                            <span aria-hidden="true">بعدی</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default PaginatedTable;
