/**
 * Send Data To Ls
 * @param {*} key 
 * @param {*} data 
 * @returns 
 */
const sendDataToLs = (key,data)=>{
 const oldData =  localStorage.getItem(key);
 let newData;

 if(oldData){
   newData = JSON.parse(oldData)
 }else{
  newData=[]
 }
 
 newData.push(data)
 localStorage.setItem(key,JSON.stringify(newData))

}

// const sendDataLs = (key,data)=>{
//   const lsData = localStorage.getItem(key);
//   let newData;
//   if(lsData){
//     newData= JSON.parse(lsData)
//   }else{
//     newData= [];
//   }
// 
//   newData.push(data)
//   localStorage.setItem(key,JSON.stringify(newData))
// }

/**
 * Get Data From Ls
 * @param {*} key 
 * @returns 
 */

const getDataFromLs =(key)=>{
 const data =  localStorage.getItem(key)
  if(data){
   return JSON.parse(data)
  }else{
    return false
  }
}

