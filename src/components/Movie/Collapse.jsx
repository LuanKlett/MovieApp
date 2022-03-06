import React, { useState, useEffect } from "react";

export default function Collapse({ arr, letter }) {
  const [ open, setOpen ] = useState(false);
  const [nArr, setNArr] = useState(arr.slice(0, 11))

  useEffect(() => {
    open ? setNArr(arr) : setNArr(arr.slice(0, 11))
  }, [open, arr])

  return (
    <>
      {open ? nArr.map((i, j) =>
        j !== nArr.length - 1 ? (
          <span key={letter + i.id}>{i.name}, </span>
        ) : (
          <span>{i.name}</span>
        )
      ) : nArr.map((i, j) =>
      j !== nArr.length - 1 ? (
        <span key={letter + i.id}>{i.name}, </span>
      ) : (
        <span>{i.name}</span>
      )
    )}
    {open ? <><span> </span><span style={{cursor: "pointer", color: "CornflowerBlue", textDecoration: "underline"}} onClick={() => setOpen(false)}>...show less</span></> : <><span> </span><span style={{cursor: "pointer", color: "CornflowerBlue", textDecoration: "underline"}} onClick={() => setOpen(true)}>...show more</span></>}
    </>
  );
}
