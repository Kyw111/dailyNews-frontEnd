import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const BodyBox = () => {

    const [responseData, setResponseData] = useState(null);
    const [companyName, setCompanyName] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/news');
            setResponseData(response.data.content);
            // response.data.reduce(
            //     (acc, item) => {
            //        console.log(">>> cpName : ", item.companyName);
        
            //     });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
      }, []);

      

    //   const groupedData = responseData.reduce(
    //     (acc, item) => {
    //       const cpName = item.newsCompanyName;
    //       if (cpName === "SBS Biz") {
    //         acc.group1.push(item);
    //       } else {
    //         acc.group2.push(item);
    //       }
    //       return acc;
    //     },
    //     { group1: [], group2: [] }
    //   );

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