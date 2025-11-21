## API Design

# Response structure
{
    "data": [ rows ],
    "error": "This is error message"
}

# APIs with GET method

Pagination: Query pageIndex, pageSize
Default pageSize = 5, pageIndex = 1

# Handle slow api

- Table events store information like status and metadata about current api
- Client using EventSource to fetch events data every 1 second given event id
- Backend set header "Content-Type: text/event-stream" to stream data