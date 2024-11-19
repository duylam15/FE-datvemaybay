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
            const newDanhGia = {
                noiDung: currentData.noiDung || '',
                sao: currentData.sao || -1,
                parentComment: replyToId ? { idDanhGia: replyToId } : null,
                hangBay: null,
                idKhachHang: user?.id || 1, // Sử dụng ID người dùng nếu có
            };

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
                        <p className="rating">{reply.sao} sao</p>
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
                        value={commentsData[id]?.sao || -1}
                        onChange={(e) => updateCommentData(id, 'sao', Number(e.target.value))}
                    >
                        <option value={-1}>Chọn sao</option>
                        {[1, 2, 3, 4, 5].map(star => (
                            <option key={star} value={star}>{star} sao</option>
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
                            <option value={-1}>Chọn sao</option>
                            {[1, 2, 3, 4, 5].map(star => (
                                <option key={star} value={star}>{star} sao</option>
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
                            <p><strong className="author">{danhGia.tenKhachHang}:</strong> {danhGia.noiDung}</p>
                            <p className="rating">{danhGia.sao} sao</p>
                            {renderReplies(danhGia.idDanhGia)} {/* Render các câu trả lời cấp 0 cho các bình luận chính */}
                            <span
                                onClick={() => setReplyToId(danhGia.idDanhGia)}
                                className="reply-button"
                            >
                                Trả lời
                            </span>
                            {replyToId === danhGia.idDanhGia && renderReplyInput(danhGia.idDanhGia)}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DanhGia;
