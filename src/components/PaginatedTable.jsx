import React from 'react';

const PaginatedTable = ({data , dataInfo , additionField}) => {

    return (
        <>
            <table className="table table-responsive text-center table-hover font_08 table-dark table-bordered">
                <thead className="table-dark">
                    <tr className='fs-6 text-primary'>
                        {dataInfo.map(i=>(
                            <th key={i.field}>{i.title}</th>
                        ))}
                        {/* --- فیلد های اختصاصی / personalField --- */}
                        {additionField.map(i=>(
                            <th key={i.field}>{i.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(d=>(
                        <tr key={d.id}>
                            {dataInfo.map(i=>(
                                <td key={`${i.field}_${d.id}`}>{d[i.field]}</td>
                            ))}
                            {/* --- فیلد های اختصاصی / personalField --- */}
                            {additionField.map(i=>(
                                <td key={i.field}>{i.element(d.id)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr bg-dark">
                    <li className="page-item">
                        <a className="page-link bg-dark" href="#" aria-label="Previous">
                        <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link bg-dark" href="#">1</a></li>
                    <li className="page-item"><a className="page-link bg-dark" href="#">2</a></li>
                    <li className="page-item"><a className="page-link bg-dark" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link bg-dark" href="#" aria-label="Next">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default PaginatedTable;
