import React from 'react'
import { useEffect } from 'react'

const useOutsideClick = (ref,handler) => {
  useEffect(()=> {
    const eventHandler = (event) => {
        if(!ref.current || ref.current.contains(event.target)){
            return;
        }
        handler(event);
    }
    document.addEventListener("mousedown", eventHandler);
    document.addEventListener("touchstart", eventHandler);

    return ()=>{
        document.removeEventListener("mousedown", eventHandler);
        document.removeEventListener("touchstart", eventHandler);
    }
  },[ref])
}

export default useOutsideClick