import React, { Children } from "react";

interface CardProps {
    name: string;
  icon:any
    className?: string; 
    countx:String;
   
  }

  const Card: React.FC<CardProps> = ({ name, icon, className,countx}) =>  {
    return ( 
        <>
        <div className={className}>
        <div className="flex items-center gap-5">
            <div className='p-3 rounded-full'>
             {icon}
            </div>
            <div>
              <h3 className="text-4xl font-semibold flex flex-col ">{countx}<span className='font-light text-xl'>{name}</span></h3>
            </div>
           
          </div>
          
        
        </div>
     
        </>
     );
}
 
export default Card;