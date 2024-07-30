import {useEffect} from 'react'
export default function PaggingBar({pages,handleClick,currentPage}) {
  const nums = []
  for (let i = 0; i < pages; i++) {
   nums.push(<button onClick={(e)=>{handleClick(i)
 const buttons =  document.getElementsByClassName("page");
     Array.prototype.forEach.call(buttons, function(element) {
      element.classList.remove("bg-gray-100")
      element.classList.add("bg-gray-400")
  });
      
      
    
     e.target.classList.add("bg-gray-100")
     e.target.classList.remove("bg-gray-400")
   }} key={i} className={"join-item btn page  " + (i === currentPage - 1 ? 'bg-gray-100': 'bg-gray-400')}>{i+1}</button>)
   
 }
 
    return <div className="join   w-screen flex justify-center items-center mb-12">
   {nums.map((num)=>{
    return num
   })}
  </div>
}