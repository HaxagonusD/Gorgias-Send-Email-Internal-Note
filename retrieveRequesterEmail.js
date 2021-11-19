import fetch from "node-fetch"
import { Buffer  } from 'buffer';


const retriveRequesterEmail = async (ticketId, authObject ) =>{
  // gets the email associated to the customer in the given Gorgias ticket
  // @params
  // ticketId: (Number)id of the the ticket
  // authObject: (Object) contains authentication information in the format: {
  //    username: (String) username provied by gorgias (it is usally an email), 
  //    password: (String) Api key provided by Gogias,
  //    base_url: (String) base url provided by Gorgias
  // }
  // @returns email from the user requesting help in Gorgias ticket 
  //
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
