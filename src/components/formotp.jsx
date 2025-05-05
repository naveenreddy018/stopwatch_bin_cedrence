import React, { useRef, useState } from 'react';
import styles from './form.module.css'; 

function Formotp() {
    const [array,setArray] = useState(
        new Array(4).fill("")
    )

    const inputRef = useRef([])


    const handleChange = (e, index) => {
        console.log(e.target.value)
        const newArray = [...array];
        newArray[index] = e.target.value;
        setArray(newArray);
    };


    const validdata = ()=>{
                   
        let status = true

        for(let i=0;i<array.length;i++){

            if(array[i] === ""){
                status = false
                alert("enter otp proplery");
                break;

            } 
    
        }

        if(status){
            alert('submitted')
        }
          

        
    }

    const handleKeydown = (e,index)=>{

        if(e.key === "Backspace"  &&  array[index] === ""){
            if (index > 0) {
                inputRef.current[index - 1].focus(); 
            }
        }
         
        if (e.key === "Enter") {
            if (index < array.length - 1) {
                inputRef.current[index + 1].focus();
            }
        }

    }


  return (
    <div className={styles.container}>
       {
        array.map((item,index) => (
            <input className={styles.inputBox} type="number" key={index}    onChange={(e) => handleChange(e, index)}  
             
            ref={(el) => inputRef.current[index] = el}
            onKeyDown={(e) => handleKeydown(e,index)}
            
            value={item} />
        ))
       }

       <button onClick={validdata}>Submit </button>
    </div>  
  )
}

export default Formotp
