Authentication:
- Table users in database store users information
- Using JWT method:
    + Client login send username + password to client
    + Backend hash token and send back to client
    + Client save token in localStorage
    + Token encrypt username and token timeout time 

Authorization:
- Client send "Bearer token" to Backend to verify identity and permission for perform actions