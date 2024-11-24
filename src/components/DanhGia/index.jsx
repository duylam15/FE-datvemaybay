import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import "./DanhGia.scss";
import { notification } from 'antd';

const DanhGia = () => {
    const [danhGiaList, setDanhGiaList] = useState([]);
    const [commentsData, setCommentsData] = useState({});
    const [replyToId, setReplyToId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visibleReplies, setVisibleReplies] = useState({}); // Để theo dõi việc hiển thị câu trả lời

    const user = useSelector(state => state.account.user);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    console.log("user from danh gia", user.khachHang.hoTen)
    useEffect(() => {
        fetchDanhGia();
    }, []);

    const fetchDanhGia = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/danhgia/getAllReview');
            const data = Array.isArray(response.data.data) ? response.data.data : [];
            setDanhGiaList(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đánh giá:", error);
            setDanhGiaList([]);
        }
    };

    const updateCommentData = (id, field, value) => {
        setCommentsData(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleAddDanhGia = async () => {
        setLoading(true);
        const currentData = commentsData[replyToId] || {};
        try {
            console.log("currentData.sao", currentData.sao - 1)
            const newDanhGia = {
                noiDung: currentData.noiDung || '',
                sao: currentData.sao - 1,
                parentComment: replyToId ? { idDanhGia: replyToId } : null,
                hangBay: null,
                idKhachHang: user?.khachHang?.idKhachHang || 1, // Sử dụng ID người dùng nếu có
            };

            console.log("newDanhGia", newDanhGia)

            await axios.post('http://localhost:8080/admin/danhgia/addCMT', newDanhGia);
            await fetchDanhGia();

            // Reset trạng thái của form hiện tại
            setCommentsData(prev => ({
                ...prev,
                [replyToId]: { noiDung: '', sao: -1 },
            }));
            setReplyToId(null);
        } catch (error) {
            notification.error({
                message: "Lỗi khi thêm đánh giá",
                description: "Vui lòng nhập đánh giá và chọn sao trước khi gửi",
                duration: 3
            });
        }
        setLoading(false);
    };

    const toggleRepliesVisibility = (parentId) => {
        setVisibleReplies(prevState => ({
            ...prevState,
            [parentId]: !prevState[parentId], // Chuyển đổi trạng thái hiển thị của các câu trả lời
        }));
    };

    const renderReplies = (parentId, level = 0) => {
        const replies = danhGiaList.filter(danhGia => danhGia && danhGia.parentComment && danhGia.parentComment.idDanhGia === parentId);
        if (replies.length === 0) return null;

        return (
            <>
                <button
                    onClick={() => toggleRepliesVisibility(parentId)}
                    className="toggle-replies"
                >
                    {visibleReplies[parentId] ? 'Ẩn câu trả lời' : 'Xem câu trả lời'}
                </button>

                {visibleReplies[parentId] && replies.map(reply => (
                    <div key={reply.idDanhGia} className="reply-section" style={{ marginLeft: `${level * 20}px` }}>
                        <p><strong className="author">{reply.tenKhachHang}:</strong> {reply.noiDung}</p>
                        <p className="rating">
                            {reply.sao === "ONE" ? (
                                <>
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                </>
                            ) : reply.sao === "TWO" ? (
                                <>
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                </>
                            ) : reply.sao === "THREE" ? (
                                <>
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                </>
                            ) : reply.sao === "FOUR" ? (
                                <>
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                </>
                            ) : reply.sao === "FIVE" ? (
                                <>
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                    <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                </>
                            ) : (
                                <></>
                            )}
                        </p>
                        {renderReplies(reply.idDanhGia, level + 1)} {/* Tăng level để tạo phân cấp cho các câu trả lời */}
                        <span
                            onClick={() => setReplyToId(reply.idDanhGia)}
                            className="reply-button"
                        >
                            Trả lời
                        </span>
                        {replyToId === reply.idDanhGia && renderReplyInput(reply.idDanhGia)}
                    </div>
                ))}
            </>
        );
    };

    const renderReplyInput = (id) => (
        <>
            {isAuthenticated ? (
                <div className="form-container">
                    <textarea
                        placeholder="Nội dung trả lời"
                        value={commentsData[id]?.noiDung || ''}
                        onChange={(e) => updateCommentData(id, 'noiDung', e.target.value)}
                    />
                    <select
                        value={commentsData[id]?.sao}
                        onChange={(e) => updateCommentData(id, 'sao', Number(e.target.value))}
                    >
                        <option value={-1}>Chọn sao</option>
                        {[0, 1, 2, 3, 4].map(star => (
                            <option key={star} value={star + 1}>{star + 1} sao</option>
                        ))}
                    </select>
                    <span
                        onClick={handleAddDanhGia}
                        className="submit-button"
                    >
                        {loading ? "Loading..." : "Gửi"}
                    </span>
                    <span
                        onClick={() => {
                            setCommentsData(prev => ({ ...prev, [id]: { noiDung: '', sao: -1 } }));
                            setReplyToId(null);
                        }}
                        className="cancel-button"
                    >
                        Hủy
                    </span>
                </div>
            ) : (
                <div className="login-message">Vui lòng đăng nhập để trả lời.</div>
            )}
        </>
    );
    // Hàm tính khoảng thời gian thủ công
    function calculateTimeDifference(createdTime) {
        const now = new Date();
        const createdDate = new Date(createdTime);
        const diffInSeconds = Math.floor((now - createdDate) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} giờ trước`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) return `${diffInDays} ngày trước`;
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths} tháng trước`;
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} năm trước`;
    }

    return (
        <div className="danh-gia-container">
            <div className='container'>
                <h2>Danh Sách Đánh Giá</h2>
                {isAuthenticated ? (
                    <div className="form-container">
                        <textarea
                            placeholder="Thêm bình luận mới"
                            value={commentsData[null]?.noiDung || ''}
                            onChange={(e) => updateCommentData(null, 'noiDung', e.target.value)}
                        />
                        <select
                            value={commentsData[null]?.sao || -1}
                            onChange={(e) => updateCommentData(null, 'sao', Number(e.target.value))}
                        >
                            <option value={-1}>Chọn saosss</option>
                            {[0, 1, 2, 3, 4].map(star => (
                                <option key={star} value={star + 1}>{star + 1} sao</option>
                            ))}
                        </select>
                        <span
                            onClick={handleAddDanhGia}
                            className="submit-button"
                        >
                            {loading ? "Loading..." : "Gửi"}
                        </span>
                    </div>
                ) : (
                    <p className="login-message">Bạn cần đăng nhập để thêm bình luận.</p>
                )}
                {danhGiaList
                    .filter(danhGia => danhGia && !danhGia.parentComment?.idDanhGia)
                    .map(danhGia => (
                        <div key={danhGia.idDanhGia} className="review">
                            <div style={{ display: 'flex' }}>
                                <p style={{ marginRight: '10px' }}><strong className="author">{danhGia.tenKhachHang}</strong> </p>
                                <p className="rating">
                                    {danhGia.sao === "ONE" ? (
                                        <>
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                        </>
                                    ) : danhGia.sao === "TWO" ? (
                                        <>
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                        </>
                                    ) : danhGia.sao === "THREE" ? (
                                        <>
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                        </>
                                    ) : danhGia.sao === "FOUR" ? (
                                        <>
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                        </>
                                    ) : danhGia.sao === "FIVE" ? (
                                        <>
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                            <img src="public/icons/star-svgrepo-com (2).svg" className='icon-star' alt="" />
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </p>
                            </div>
                            <p style={{ marginTop: '10px' }}>{danhGia.noiDung}</p>



                            {renderReplies(danhGia.idDanhGia)} {/* Render các câu trả lời cấp 0 cho các bình luận chính */}

                            <div style={{ display: 'flex' }}>
                                <p className="time-created" style={{ marginTop: '10px', marginRight: '10px', fontSize: '0.8em' }}>
                                    {calculateTimeDifference(danhGia.thoiGianTao)}
                                </p>
                                <span
                                    style={{ fontSize: '0.8em' }}
                                    onClick={() => setReplyToId(danhGia.idDanhGia)}
                                    className="reply-button"
                                >
                                    Trả lời
                                </span>
                            </div>
                            {replyToId === danhGia.idDanhGia && renderReplyInput(danhGia.idDanhGia)}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DanhGia;
