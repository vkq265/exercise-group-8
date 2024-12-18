import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HeaderWithSideBar } from '../components/common'
import { AdminLandingPage, AdminDashboard, AccountManagement, ProductManagement, NotFound, CategoryManagement, OrderManagement, CostManagement, RevenueStatitics, PromotionSetting, PoliciesSetting } from '../pages';


const AdminRoute = () => {
  return (
    <>
      <HeaderWithSideBar />
      <Routes>
        <Route path='/' element={<AdminLandingPage />} />
        <Route path='/dashboard'
          element={<AdminLandingPage child={<AdminDashboard />} />} />

        <Route path='/manage' element={<AdminLandingPage />} />
        <Route
          path='/manage/user'
          element={<AdminLandingPage child={<AccountManagement />} />}
        />
        <Route
          path='/manage/product'
          element={<AdminLandingPage child={<ProductManagement />} />}
        />
        <Route path='/manage/category'
          element={<AdminLandingPage child={<CategoryManagement />} />}
        />
        <Route path='/manage/order'
          element={<AdminLandingPage child={<OrderManagement />} />}
        />
        <Route path='/manage/cost'
          element={<AdminLandingPage child={<CostManagement />} />}
        />

        <Route path='/analytics' element={<AdminLandingPage />} />
        <Route path='/analytics/revenue'
          element={<AdminLandingPage child={<RevenueStatitics />} />}
        />

        <Route path='/settings' element={<AdminLandingPage />} />
        <Route path='/settings/promotion'
          element={<AdminLandingPage child={<PromotionSetting />} />}
        />
        <Route path='/settings/policies'
          element={<AdminLandingPage child={<PoliciesSetting />} />}
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AdminRoute;
