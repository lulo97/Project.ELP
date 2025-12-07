Authentication:
- Table users in database store users information
- Using JWT method:
    + Client login send username + password to client
    + Backend hash token and send back to client
    + Client save token in cookies (Avoid store in localStorage because it is security risk)
    + Token encrypt username and token timeout 

Authorization:
- Client send "Bearer token" to Backend to verify identity and permission for perform actions
- User ADMIN can view users and delete users

Logout logic:
- Call /api/auth/logout
- Call /api/auth/me and checking user exist in response
    + If user exist then logout fail
    + if user not exist then token is cleared -> Logout success