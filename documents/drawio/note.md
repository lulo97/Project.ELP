# Why to get body of fetch, we have to await 2 times?

fetch API return Response object.
    - const result = await fetch(...)
    - We can access result.status, result.header quickly
After that we can using json(), text(), blob() method of Response class on result
    - const data = await result.json()
    - This process can take a long time because it transmitted as stream
These 2 step make sure we can quickly access metadata of response before data of response.

# Setup simple 2 enviroment for dev and production

Install env for express, add PORT=3000 to .env file

In Dockerfile and "docker run" command, set ENV PORT=3001 and "-p 3001:3001"

This way, when run in dev enviroment by "npm run dev" port in .env will be used. And when docker run will override .env PORT with ENV PORT=3001 in Dockerfile.



