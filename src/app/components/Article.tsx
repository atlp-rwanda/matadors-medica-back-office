import React, { ReactNode } from 'react';
import Navbar from './navbar';
import Image from 'next/image';


interface ArticleProps {
    children: ReactNode;
    name: string;
    imageSrc: string; // Assuming imageSrc is the path to your image
    date: string;
    className?:string ;
    
}

const Article: React.FC<ArticleProps> = ({ children, name, imageSrc, date,className }) => {
    return (
        <div className={className}>
            <div className="">
                <div className="flex  gap-5">
                    <div className=' rounded-2xl bg-green-500 w-[50%] h-[20%]'>
                        <img src={imageSrc} alt="Profile Image" className='w-full rounded-2xl object-cover'/>
                    </div>
                    <div>
                        <h3 className="text-md text-[#424242] py-1 font-semibold flex flex-col">{date}<span className='font-semibold text-md text-black py-4'>{name}</span></h3>
                        <main className=" text-black">
                    {children}
                </main>
                    </div>
                </div>
               
            </div>
          
        </div>
    );
};

export default Article;
