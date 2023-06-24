// modifyDate 

export const modifyDate = (seconds: number, nanoseconds: number): string => {
  const currentDate = new Date();
  const messageDate = new Date(seconds * 1000 + nanoseconds / 1000000);
  
  const diffInMilliseconds = Math.abs(currentDate.getTime() - messageDate.getTime());
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

  
  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}mins ago`;
  } else if (diffInMinutes < 1440) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return  `${diffInHours}hours ago`
  } else {
    return messageDate.toLocaleDateString();
  }

  }
  
  
  
  
  
  