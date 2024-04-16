import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const BodyBox = () => {

    const [responseData, setResponseData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/news');
            console.log(response.data.content);
            setResponseData(response.data.content);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
        console.log("useEffect");
        console.log(responseData);

      }, []);

    return (
        <>
            <div className="body-box">
                <table>
                    <thead>
                        <tr>
                            <td>언론사</td>
                            <td>제목</td>
                            <td>url</td>
                        </tr>
                    </thead>
                    <tbody>
                    {responseData && responseData.map((data) => (
                            <tr key={data.newsId}>
                                <td>{data.newsCompanyName}</td>
                                <td>{data.newsTitle}</td>
                                <td>{data.newsUrl}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </div>        
        </>
    );
}
export default BodyBox;