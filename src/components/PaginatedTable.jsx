import React, { useEffect, useRef, useState } from 'react';


const PaginatedTable = ({data , dataInfo , additionField , numOfPage , searchParams , children}) => {
    const searchRef = useRef();

    const [initData , setInitData] = useState(data);
    const [tableData , setTableData] = useState([]);
    const [tableSearch , setTableSearch] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [pages , setPages] = useState([]);
    const [pageCount , setPageCount] = useState(1);


    

    useEffect(() => {
        let pCount = Math.ceil(initData.length / numOfPage);
        pCount = (pCount === 0 ? 1 : pCount);
        setPageCount(pCount);
    
        let pArr = [];
        for (let i = 1; i <= pCount ; i++) pArr = [...pArr , i] ;
        setPages(pArr);
    }, [initData]);


    useEffect(() => {
        let start = (currentPage*numOfPage)-numOfPage;
        let end = (currentPage*numOfPage);

        setTableData(initData.slice(start , end));
    }, [currentPage , initData]);



    const handleSetSearch = (target)=>{
        setInitData(data.filter(d=>d[searchParams.searchField].includes(target)))
    }


    return (
        <>
            <div className="row justify-content-between">
                <div className="col-10 col-md-6 col-lg-4">
                    <div className="input-group mb-3 dir_ltr">
                        <input type="text" className="form-control" ref={searchRef} placeholder={searchParams.placeholder} />
                        <button type='button' className="input-group-text btn btn-primary" 
                         onClick={()=>handleSetSearch(searchRef.current.value)} >
                            {searchParams.title}
                        </button>
                    </div>
                </div>
                <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                    {children}
                </div>
            </div>
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
        </>
    );
}

export default PaginatedTable;
