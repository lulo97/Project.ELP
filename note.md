# Why to get body of fetch, we have to await 2 times?

fetch API return Response object.
    - const result = await fetch(...)
    - We can access result.status, result.header quickly
After that we can using json(), text(), blob() method of Response class on result
    - const data = await result.json()
    - This process can take a long time because it transmitted as stream
These 2 step make sure we can quickly access metadata of response before data of response.