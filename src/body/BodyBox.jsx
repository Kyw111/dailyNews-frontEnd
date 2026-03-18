import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./BodyBox.css";

const PAGE_SIZE = 20;

const BodyBox = () => {

    const [newsList, setNewsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get('/news');
            // 백엔드가 plain text로 반환 — 줄 단위로 파싱
            const lines = response.data
                .split('\n')
                .map(line => line.replace(/^-\s*/, '').trim())
                .filter(line => line.length > 0);
            // 첫 줄은 날짜+타이틀 헤더이므로 제외
            setNewsList(lines.slice(1));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalPages = Math.ceil(newsList.length / PAGE_SIZE);
    const paginated = newsList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const now = new Date().toLocaleString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    return (
        <>
        <p className="current-time">{now}</p>
        <div className="body-box">
            <table className="news-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>뉴스 제목</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((title, index) => (
                        <tr key={index}>
                            <td className="no-cell">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                            <td>{title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
                        이전
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
                        다음
                    </button>
                </div>
            )}
        </div>
        </>
    );
}
export default BodyBox;
