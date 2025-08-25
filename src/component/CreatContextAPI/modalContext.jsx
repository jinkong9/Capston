import { Children } from "react";
import { createContext, useState, useEffect, useContext } from "react";

const ModalContext=createContext();


export const ModalProvider=({children})=>{
    const[modalState, SetModalState]=useState();

    return(
        <ModalContext.Provider value={{modalState, SetModalState}}>
            {children}
        </ModalContext.Provider>
    )

}
export const useModalContext=()=>useContext(ModalContext)