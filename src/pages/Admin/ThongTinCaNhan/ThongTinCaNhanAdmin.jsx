import React from 'react';
import UserPageInfoDetail from '../../../components/UserPageInfoDetail';
import UserPageInfoPassword from '../../../components/UserPageInfoPassword';
import { useFetchProfile } from '../../../utils/useFetchProfile';

const ThongTinCaNhanAdmin = () => {
  const { profile, loading, error } = useFetchProfile(); // Sử dụng custom hook
    return (
        <div className='page_thong_tin_ca_nhan_admin'>
            <h2 className="users-page__body--right title title_2">Thông tin tài khoản</h2>
            <UserPageInfoDetail profile={profile} loading={loading} error={error}></UserPageInfoDetail>
            <h2 className="users-page__body--right title title_2">Thay đổi mật khẩu</h2>
            <UserPageInfoPassword></UserPageInfoPassword>
        </div>
    );
};

export default ThongTinCaNhanAdmin;