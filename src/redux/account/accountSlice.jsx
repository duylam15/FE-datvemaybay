import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        idTaiKhoan: "",
        tenDangNhap: "",
        matKhau: "",
        quyen: {
            idQuyen: "",
            tenQuyen: ""
        },
        khachHang: {
            idKhachHang: "",
            cccd: "",
            email: "",
            gioiTinh: "",
            hoTen: "",
            ngaySinh: "",
            soDienThoai: "",
            trangThai: ""
        },
        nhanVien: null,
        thoiGianTao: "",
        trangThaiActive: "",
        avatar: "", // Bổ sung avatar vào cấu trúc
        phone: "", // Bổ sung phone vào cấu trúc
        fullName: "" // Bổ sung fullName vào cấu trúc
    },
    tempAvatar: ""
};

// Tạo slice
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doLogoutAction: (state) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                idTaiKhoan: "",
                tenDangNhap: "",
                matKhau: "",
                quyen: {
                    idQuyen: "",
                    tenQuyen: ""
                },
                khachHang: {
                    idKhachHang: "",
                    cccd: "",
                    email: "",
                    gioiTinh: "",
                    hoTen: "",
                    ngaySinh: "",
                    soDienThoai: "",
                    trangThai: ""
                },
                nhanVien: null,
                thoiGianTao: "",
                trangThaiActive: "",
                avatar: "",
                phone: "",
                fullName: ""
            };
        },
        doUpdateUserInfoAction: (state, action) => {
            state.user.avatar = action.payload.avatar;
            state.user.phone = action.payload.phone;
            state.user.fullName = action.payload.fullName;
        },
        doUploadAvatarAction: (state, action) => {
            state.tempAvatar = action.payload.avatar;
        }
    },
    extraReducers: (builder) => {
        // Xử lý async actions ở đây nếu cần
    },
});

export const {
    doLoginAction,
    doGetAccountAction,
    doLogoutAction,
    doUpdateUserInfoAction,
    doUploadAvatarAction
} = accountSlice.actions;

export default accountSlice.reducer;
