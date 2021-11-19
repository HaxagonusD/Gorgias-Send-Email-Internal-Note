import fetch from "node-fetch"

const retriveRequesterEmail = async (ticketId, authObject ) =>{
  const options = {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${authObject.username}:${authObject.password}`).toString("base64")
      }
    
  };

  const response = await fetch(`${authObject.base_url}tickets/${ticketId}/`, options)
    .then(response => response.json())
   
  return response.requester.email
}

export default retriveRequesterEmail;
