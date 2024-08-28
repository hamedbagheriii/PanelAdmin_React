import React, { Fragment, useEffect, useRef, useState } from 'react';
import SpinnerLoad from '../../UI/All/SpinnerLoad';



const PaginatedTable = ({data , dataInfo , additionField ,
    numOfPage , searchParams , targetSearch , children , isLoading}) => {
        
    const searchRef = useRef();
    const [initData , setInitData] = useState(data);
    const [tableData , setTableData] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [pages , setPages] = useState([]);
    const [pageCount , setPageCount] = useState(1);
    const pageRange = 2;

    // TSP = target Search placeholder
    const [TSP , setTSP] = useState(
        {placeholder : searchParams.placeholder ,
        target : searchParams.searchField}
    )


    useEffect(() => {
        setInitData(data)
        setCurrentPage(1)
    }, [data]);


    useEffect(() => {
        setCurrentPage(1);
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
    }, [currentPage , initData ]);



    const handleSetSearch = (target)=>{
        setInitData(data.filter(d=>d[TSP.target || searchParams.searchField].includes(target)))
    }


    return (
        <>
            {!isLoading ? (
                <div>
                    <div className="row justify-content-between"> 
                        <div className="col-10 col-md-6 col-lg-8">
                            <div className="input-group mb-3 dir_ltr d-flex justify-content-end">
                                <input type="text" className="form-control" style={{maxWidth:350}} ref={searchRef} placeholder={TSP.placeholder || searchParams.placeholder} />
                                {targetSearch ? 
                                    <>
                                        <button type='button' className="input-group-text  btn btn-primary" 
                                        onClick={()=>handleSetSearch(searchRef.current.value)} style={{borderRadius:'0px 4px 0px 0px'}}>
                                            {searchParams.title}
                                        </button>
                                        <div className='w-100'>
                                            {targetSearch.map(t=>(
                                                <button key={t.target+'btn'} className={`btn input-group-text text-white fs-6 fw-bold`}
                                                disabled={TSP.target == t.target}
                                                onClick={()=>setTSP({placeholder : t.placeholder , target : t.target})}
                                                style={{backgroundColor: t.color,borderRadius:'0px 0px 4px 4px'}}>
                                                    {t.title}
                                                </button>
                                            ))}
                                            
                                        </div>
                                    </>
                                : 
                                    <button type='button' className="input-group-text btn btn-primary" 
                                    onClick={()=>handleSetSearch(searchRef.current.value)} >
                                        {searchParams.title}
                                    </button>
                                }
                            </div>
                        </div>
                        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end ">
                            {children}
                        </div>
                    </div>
                    <div className='h-75 d-flex flex-column justify-content-between' >
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
                            {tableData.length ? 
                                <tbody>
                                    {tableData.map(d=>(
                                        <tr key={d.id}> 
                                            {dataInfo.map(i=>(
                                                <td className='dir_ltr' key={`${i.field}_${d.id}`}>{d[i.field]}</td>
                                            ))}
                                            {/* --- فیلد های اختصاصی / dedicatedField --- */}
                                            {additionField.map(i=>(
                                                <Fragment key={i.field}>{i.element(d.id,d)}</Fragment>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            : null }
                        </table>
                        {!tableData.length ?
                            <div className='w-100 fs-6 fw-bold alert text-center alert-warning' >آیتمی یافت نشد .</div>
                        : null}
                        
                        <nav aria-label="Page navigation example " className="d-flex justify-content-center ">
                            <ul className="pagination mx-auto p-0 bg-dark">
                                <li className="page-item prev pointer" onClick={()=>setCurrentPage(currentPage - 1)}>
                                    <button type='button' disabled={currentPage - 1 == 0} className="page-link bg-dark prev-btn">
                                        <span aria-hidden="true">قبلی</span>
                                    </button>
                                </li>
                                {currentPage > pageRange ?
                                    <li className={`page-item pointer `} onClick={()=>setCurrentPage(1)}>
                                        <span className={`page-link bg-dark `}>1</span>
                                    </li>
                                : null}

                                {pages.map(page=>(
                                    page > currentPage - pageRange && page < currentPage+pageRange ? (
                                        <li key={page} className={`page-item pointer `} onClick={()=>setCurrentPage(page)}>
                                            <span className={`page-link bg-dark ${currentPage === page ? 'page_active' : null}`}>{page}</span>
                                        </li>
                                    ) : null
                                ))}

                                {currentPage < pageCount-(pageRange-1) ?
                                    <>
                                        {currentPage < pageCount-pageRange ?
                                            <li  className={`page-item  `}>
                                                <span className={`page-link bg-dark`}>...</span>
                                            </li>
                                        : null}
                                        <li className={`page-item pointer `} onClick={()=>setCurrentPage(pageCount)}>
                                            <span className={`page-link bg-dark `}>{pageCount}</span>
                                        </li>
                                    </>
                                : null}

                                <li className="page-item next pointer" onClick={()=>setCurrentPage(currentPage + 1)}>
                                    <button type='button' disabled={currentPage + 1 > pageCount} className="page-link bg-dark next-btn">
                                        <span aria-hidden="true">بعدی</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            ) : (
                <div className='w-100 mt-2'>
                    <hr className='bg-white w-75 mx-auto my-5' />
                    <div className='w-100 fs-6 fw-bold alert text-center alert-primary' >
                        <SpinnerLoad  />
                        <span className='fs-5 mt-1'>
                            لطفا کمی صبر کنید . . .
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export default PaginatedTable;
