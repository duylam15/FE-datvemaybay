import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DanhGia = () => {
    const [danhGiaList, setDanhGiaList] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedRating, setSelectedRating] = useState(-1);
    const [replyToId, setReplyToId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDanhGia();
    }, []);

    const fetchDanhGia = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/danhgia/getAllReview');
            const data = Array.isArray(response.data.data) ? response.data.data : [];
            console.log("Fetched data:", data);
            setDanhGiaList(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đánh giá:", error);
            setDanhGiaList([]);
        }
    };

    const handleAddDanhGia = async () => {
        setLoading(true);
        try {
            const newDanhGia = {
                noiDung: newComment,
                sao: selectedRating,
                parentComment: replyToId ? { idDanhGia: replyToId } : null,
                hangBay: { id: 1 },
                khachHang: { id: 1 },
            };

            await axios.post('http://localhost:8080/admin/danhgia/addCMT', newDanhGia);
            await fetchDanhGia();
            setNewComment('');
            setSelectedRating(-1);
            setReplyToId(null);
        } catch (error) {
            console.error("Lỗi khi thêm đánh giá:", error);
        }
        setLoading(false);
    };

    const renderReplies = (parentId) => {
        const replies = danhGiaList.filter(danhGia => danhGia && danhGia.parentComment && danhGia.parentComment.idDanhGia === parentId);
        if (replies.length === 0) return null;

        return replies.map(reply => (
            <div key={reply.idDanhGia} style={{ marginLeft: '20px', borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
                <p><strong>abc:</strong> {reply.noiDung}</p>
                <p>{reply.sao} sao</p>
                {renderReplies(reply.idDanhGia)}
                <span onClick={() => setReplyToId(reply.idDanhGia)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                    Trả lời
                </span>
                {replyToId === reply.idDanhGia && renderReplyInput()}
            </div>
        ));
    };

    const renderReplyInput = () => (
        <div style={{ marginTop: '10px' }}>
            <textarea
                placeholder="Nội dung trả lời"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <select value={selectedRating} onChange={(e) => setSelectedRating(Number(e.target.value))}>
                <option value={-1}>Chọn sao</option>
                {[1, 2, 3, 4, 5].map(star => (
                    <option key={star} value={star}>{star} sao</option>
                ))}
            </select>
            <span onClick={handleAddDanhGia} style={{ cursor: 'pointer', color: 'green', marginLeft: '5px' }}>
                {loading ? "Loading..." : "Gửi"}
            </span>
            <span onClick={() => setReplyToId(null)} style={{ cursor: 'pointer', color: 'red', marginLeft: '5px' }}>
                Hủy
            </span>
        </div>
    );

    return (
        <div>
            <h2>Danh Sách Đánh Giá</h2>
            {danhGiaList
                .filter(danhGia => danhGia && !danhGia.parentComment?.idDanhGia)
                .map(danhGia => (
                    <div key={danhGia.idDanhGia}>
                        <p><strong>abc:</strong> {danhGia.noiDung}</p>
                        <p>{danhGia.sao} sao</p>
                        {renderReplies(danhGia.idDanhGia)}
                        <span onClick={() => setReplyToId(danhGia.idDanhGia)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                            Trả lời
                        </span>
                        {replyToId === danhGia.idDanhGia && renderReplyInput()}
                    </div>
                ))}
        </div>
    );
};

export default DanhGia;
