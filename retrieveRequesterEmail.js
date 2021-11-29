import fetch from "node-fetch";
import { Buffer } from "buffer";

const retriveRequesterEmail = async (ticketId, authObject) => {
  /*
   *   adds response to ticket
   *
   *   @param ticketId { Number } id of the the ticket
   *   communication supported by Gorgias
   *   @param authObject { Object } contains authentication information in the format: {
   *      @param username: { String } username provied by gorgias (it is usally an email),
   *      @param password: { String } Api key provided by Gogias,
   *      @param base_url: { String } base url provided by Gorgias
   *
   *   }
   *   @returns { String } Enmail of the person that initially sent the ticket
   */

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from(`${authObject.username}:${authObject.password}`).toString(
          "base64"
        ),
    },
  };

  const response = await fetch(
    `${authObject.base_url}tickets/${ticketId}/`,
    options
  ).then((response) => response.json());

  return response.requester.email;
};

export default retriveRequesterEmail;
