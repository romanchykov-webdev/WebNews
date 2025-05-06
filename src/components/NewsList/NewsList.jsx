import React from 'react';
import styles from './styles.module.css'
import NewItem from '../NewItem/NewItem.jsx';

function NewsList({news}) {
    // console.log("newBAner item",news);
    return (
        <ul className={styles.list}>
            {
                news.map(item => {
                    return <NewItem key={item.id} item={item} />
                })
            }
        </ul>
    );
}

export default NewsList;