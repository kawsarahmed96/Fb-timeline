/**
 * Alert message 
 * @param {*} type 
 * @param {*} msg 
 * @returns 
 */

const alertMessage = (type = "danger",msg)=>{
return ` <p class="alert alert-${type} d-flex justify-content-between">${msg} <button class="btn-close" data-bs-dismiss="alert"></button> </p>`
}

/**
 * Generate ID
 * @returns 
 */

function unique_id() {
  // Current timestamp in milliseconds
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);

  // Generate a random 8-character hexadecimal string
  const randomPart = (Math.random() * 0xffffffff | 0).toString(16);

  // Create a unique ID by concatenating timestamp and random part
  const uniqueId = timestamp + 'xxxxxxxxxxxxxxxx'.substr(0, 8 - randomPart.length) + randomPart;

  return uniqueId;
}


/**
 * 
 * @param {*} postDate 
 * @returns 
 */
const timeAgo = (postDate) => {
  const currentDate = new Date();
  const diff = currentDate - postDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};
