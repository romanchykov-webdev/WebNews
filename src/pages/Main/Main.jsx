import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import NewBanner from '../../components/NewBaner/NewBanner.jsx';
import { getNews } from '../../../api/apiNews.js';
import NewsList from '../../components/NewsList/NewsList.jsx';

function Main() {
    const [news, setNews] = useState([]);

    useEffect(()=>{
       const fetchNews=async () => {
           try {
               const response=await getNews()
               setNews(response.news);
               // console.log("response",response);
           }catch (e) {
               console.log(e);
           }
       }
        fetchNews();
    },[])

    return (
        <main className={styles.main}>
           {/*<NewItem item={news[0]}/>*/}
            {news.length>0 ? <NewBanner item={news[0]}/> : null}
            <NewsList news={news}/>
        </main>
    );
}

export default Main;