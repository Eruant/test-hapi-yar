# Testing yar (hapi)

This repo is to test an issue with yar not saving cookies.

## Steps

- start the servers with `npm start`
- navigate to the first server `http://localhost:3001`
- observe the number of visits (which is set in a cookie)
- refreshing the page should add to the visit numbers
- use the link to visit the second server and observe the same thing
- finally navigate back to the first server

## Expected

The first server should have saved the previous visits in a cookie

## Actual

The cookie is blank, and so starts counting from 0 again
