const form_btn = document.querySelector('#create_post_data');
const alert_msg = document.querySelector('.msg');
const show_post= document.querySelector('.show_post');
const create_btn_close = document.querySelector(".create_btn_close");
const edit_btn_close = document.querySelector(".edit_btn_close");
const edit_post_data = document.querySelector("#edit_post_data");



//  Show post
const showPost = ()=>{
  let data = getDataFromLs('posts');
  
  let postList='';
  if(data){
      data.reverse().forEach((element)=>{
    postList+=`<div class="card shadow-lg mt-2">
          <div class="card-body d-flex post_card">
            <div class="facebook_timeline d-flex gap-2">
              <img
                src="${element.photo}"
                alt="" srcset="">

                <div class="author_info ">
                  <h3>${element.name}</h3>
                  <p>${timeAgo(element.createdAt)}</p>
                </div> 
             </div>
              <div class="fb_post_btn">
                <span class="text-white" onclick="deletePost('${element.id}')"><i class="fa-solid fa-xmark"></i></span>
                <span class="text-white" onclick = "updatePost('${element.id}')" data-bs-toggle="modal" data-bs-target = "#post_update_form"><i class="fa-regular fa-pen-to-square"></i></span>
              </div>
              
          </div>
            <p class="p-3 fs-7">${element.post_content}
            </p>
             <img
                src="${element.post_photo}"
                alt="" srcset="">
        </div> `
   })
  }


 show_post.innerHTML=postList;
   
}
showPost();


//Delete post

const deletePost = (id)=>{
  const data = getDataFromLs("posts")

  let conf = confirm('Are you sure')

  if(conf){
     const deletePost = data.filter((item) => item.id != id);

     localStorage.setItem("posts", JSON.stringify(deletePost));
     showPost();
  }
  
  
}



//update post

const updatePost = (id)=>{
  const data = getDataFromLs("posts");

  const { inputId, name, photo, post_photo, post_content } = data.find(
    (post) => {
      return post.id == id;
    }
  );

  edit_post_data.querySelector("input[name='name']").value = name;
  edit_post_data.querySelector("input[name='photo']").value = photo;
  edit_post_data.querySelector("textarea[name='post_content']").value=post_content;
  edit_post_data.querySelector("input[name='post_photo']").value =post_photo
  edit_post_data.querySelector("input[name='inputId']").value = id;
}


edit_post_data.onsubmit = (e) => {
  e.preventDefault();
  const get_form_data = new FormData(edit_post_data);

  const { inputId, name, photo, post_photo, post_content } =
    Object.fromEntries(get_form_data);

  
    const data = JSON.parse(localStorage.getItem("posts"));

 
    
    const updateData = data.map((item)=>{
       
        
      if(item.id==inputId){
       
       return {
         ...item,
         name,
         photo,
         post_photo,
         post_content,
       };
      }else{
        return item;
      }
    })
   
    localStorage.setItem("posts", JSON.stringify(updateData));
    edit_btn_close.click();
    showPost();
 
};



// 
// edit_post_data.onsubmit = (e) => {
//   e.preventDefault(); // Prevent default form submission
// 
//   // Get form data
//   const get_form_data = new FormData(edit_post_data);
// 
//   // Destructure form data
//   const { id, name, photo, post_photo, post_content } =
//     Object.fromEntries(get_form_data);
// 
//   // Retrieve existing post data from localStorage
//   let data = JSON.parse(localStorage.getItem("posts")) || [];
// 
//   // Update the post data
//   const updateData = data.map((item) => {
//     if (item.id === id) {
//       return {
//         ...item,
//         name: name || item.name, // Use the new name if provided, otherwise keep the old one
//         photo: photo || item.photo,
//         post_photo: post_photo || item.post_photo,
//         post_content: post_content || item.post_content,
//       };
//     } else {
//       return item;
//     }
//   });
// 
//   // Store the updated post data back to localStorage
//   localStorage.setItem("posts", JSON.stringify(updateData));
// 
//   // Call a function to display the updated post
//   showPost();
// };




// Create post
form_btn.onsubmit = (e)=>{
  e.preventDefault();
  //get data form

  const data = new FormData(e.target)
  const {name,photo,post_content,post_photo} = Object.fromEntries(data)




  // data validation
  if(!name.trim() || !photo.trim() ){
   alert_msg.innerHTML = alertMessage("danger", "All fields are required !");
   }else{
    sendDataToLs("posts",{
      id:unique_id(),
      name:name,
      photo:photo,
      post_content:post_content,
      post_photo:post_photo,
      createdAt:Date.now(),
      status:1
    });

    
  }
  e.target.reset();
  create_btn_close.click();
  showPost();

}


