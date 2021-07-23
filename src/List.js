import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

export const List = ({items, removeItem, editiItem}) => {
    return (
        <div className="grocery-list">
            {items.map((item)=>{
                const { id,title,titles } = item;
                return( 
                <article key={id} className="grocery-item">
                    <p className="title">{title}</p>
                    <p className="title">{titles}</p>
                    <div className="btn-container">
                        <button type="button" className="edit-btn" onClick={() => editiItem(id)}>
                            <FaEdit />
                        </button>
                        <button type="button" className="delete-btn" onClick={()=> removeItem(id)}>
                            <FaTrash />
                        </button>
                    </div>
                </article>
                )
            })}
        </div>
    )
}
