import { useEffect } from "react";
export default function AddBlogForm({blog,type,handleEdit,handleAddButton}) {

        if (type && blog) {

            console.log("blog");

            document.getElementById("edit-source").value = blog.source.name;
            document.getElementById("edit-image").value = blog.urlToImage;
            document.getElementById("edit-title").value = blog.title;
            document.getElementById("edit-pub-at").value = blog.publishedAt;
            document.getElementById("edit-author").value = blog.author;
            document.getElementById("edit-content").value = blog.content;
            
        }


  return   <div id={type} tabIndex={-1} className="hidden bg-gray-800 bg-opacity-70 h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full">
<main className="w-[28%] h-4/5 justify-center items-center flex bg-white rounded-lg">

        <div className=" w-full h-full ">
    <section className="w-full h-full border-black border-2 rounded-lg ">
    <div className="flex flex-col w-full justify-around items-center h-full" >

       
        <input className="input input-bordered w-1/3  border-slate-950" id={type + "-source"} placeholder=" Blog Source..." type="text" name="title"/>
        <input className="input input-bordered w-5/6  border-slate-950"   id={type + "-image"} placeholder=" Blog Pictur URL..." type="text" name="title"/>
        <input className="input input-bordered w-5/6  border-slate-950"  id={type +  "-title"} placeholder=" Blog Title..." type="text" name="title"/>
<div className="flex justify-between w-5/6">

        <input className="input input-bordered w-[45%]  border-slate-950"  id={type + "-pub-at"}  placeholder=" Blog Published At..." type="text" name="title"/>
        <input className="input input-bordered w-[45%] border-slate-950"  id={type + "-author"}  placeholder=" Blog Author..." type="text" name="title"/>
</div>
        <textarea className="input input-bordered w-5/6  h-28  border-slate-950" name="content" id={type + "-content"} placeholder=" Blog Content..." ></textarea>
        {type == "edit" ? <button  onClick={()=>handleEdit(blog)} className="btn bg-slate-500">Save</button> : <button onClick={()=>{handleAddButton()}} className="btn bg-slate-500">Add Item</button>}
    </div>
    </section>
</div>
</main>
</div>
} 