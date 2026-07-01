import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleVoucherCategoryPage from "../components/app_components/VoucherCategoryPage/SingleVoucherCategoryPage";
import VoucherCategoryProjectLayoutPage from "../components/app_components/VoucherCategoryPage/VoucherCategoryProjectLayoutPage";
import SingleVoucherPage from "../components/app_components/VoucherPage/SingleVoucherPage";
import VoucherProjectLayoutPage from "../components/app_components/VoucherPage/VoucherProjectLayoutPage";
import SingleVoucherUsagePage from "../components/app_components/VoucherUsagePage/SingleVoucherUsagePage";
import VoucherUsageProjectLayoutPage from "../components/app_components/VoucherUsagePage/VoucherUsageProjectLayoutPage";
import SingleVoucherReportPage from "../components/app_components/VoucherReportPage/SingleVoucherReportPage";
import VoucherReportProjectLayoutPage from "../components/app_components/VoucherReportPage/VoucherReportProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/voucherCategory/:singleVoucherCategoryId" exact element={<SingleVoucherCategoryPage />} />
<Route path="/voucherCategory" exact element={<VoucherCategoryProjectLayoutPage />} />
<Route path="/voucher/:singleVoucherId" exact element={<SingleVoucherPage />} />
<Route path="/voucher" exact element={<VoucherProjectLayoutPage />} />
<Route path="/voucherUsage/:singleVoucherUsageId" exact element={<SingleVoucherUsagePage />} />
<Route path="/voucherUsage" exact element={<VoucherUsageProjectLayoutPage />} />
<Route path="/voucherReport/:singleVoucherReportId" exact element={<SingleVoucherReportPage />} />
<Route path="/voucherReport" exact element={<VoucherReportProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
