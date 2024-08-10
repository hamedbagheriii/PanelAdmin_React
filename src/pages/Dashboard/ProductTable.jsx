import React from 'react';
import DashboardTr from '../../UI/Dashbord/Tr';

const Table = () => {
    return (
        <div className="row">

            <div className="col-12 col-lg-6">
                <p className="text-center mt-3 text-white fw-bold">محصولات رو به اتمام :</p>

                <table className="table  table-responsive text-center table-dark table-hover table-bordered
                     no_shadow_back_table font_08 ">
                    <thead className="table-dark">
                        <tr className='fs-6 text-primary'>
                            <th>#</th>
                            <th>دسته</th>
                            <th>عنوان</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>

                        <DashboardTr
                         count={1}
                         categoryTitle={'دسته شماره 4'} 
                         title={'محصول فلان'}
                         status={'پایان یافته'}
                         icon={'fas fa-times'}
                        />

                        <DashboardTr
                         count={2}
                         categoryTitle={'دسته شماره 5'} 
                         title={'محصول فلان'}
                         status={'رو به اتمام - 4'}
                         icon={'fas fa-times'}
                        />

                        <DashboardTr
                         count={3}
                         categoryTitle={'دسته شماره 3'} 
                         title={'محصول فلان'}
                         status={'پایان یافته'}
                         icon={'fas fa-times'}
                        />

                        <DashboardTr
                         count={4}
                         categoryTitle={'دسته شماره 1'} 
                         title={'محصول فلان'}
                         status={'پایان یافته'}
                         icon={'fas fa-times'}
                        />

                        <DashboardTr
                         count={5}
                         categoryTitle={'دسته شماره 1'} 
                         title={'محصول فلان'}
                         status={'رو به اتمام - 2'}
                         icon={'fas fa-times'}
                        />

                        

                    </tbody>
                </table>
            </div>
        
            <div className="col-12 col-lg-6 text-light text-white">
                <canvas id="myCharts" height="195"></canvas>
            </div>

        </div>
    );
}

export default Table;
