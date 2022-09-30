import React from "react";
import { date } from "yup/lib/locale";
import { useState } from "react";
const Card = (
   
  {deleteCard,
  editCardStatus,
    data: {
      _id,
      title,
      createdAt,
      user: { userName },
      description,
      status,
      importance,
    },
    data
  }
) => {
 
  const dateTime = new Date(createdAt).toLocaleString() + " hs";
  const limitString = (string) => {
    if (string.length > 200) {
      return { str: string.slice(0, 200).concat("..."), addButton: true };
    } else {
      return { str: string, addButton: false };
    }
  };
  console.log('id',_id)
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="card">
      <div className="close"  onClick={() => deleteCard(_id)} >
        x
      </div>
      <h3>{title}</h3>
      <h6>{dateTime}</h6>
      <h5>{userName}</h5>
      <button className={status.toLowerCase()} type="button" onClick={()=>editCardStatus(data)}>
        {status.toLowerCase()}
      </button>
      <button className={importance.toLowerCase()} type="button">
        {importance.toLowerCase()}
      </button>
      <p>{!showMore && limitString(description).str}</p>
      {showMore && (
        <>
          <p>{description}</p>{" "}
          <button type="button" onClick={() => setShowMore(false)}>
            Ver menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button type="button" onClick={() => setShowMore(true)}>
          Ver más
        </button>
      )}
    </div>
  );
};
export default Card;
