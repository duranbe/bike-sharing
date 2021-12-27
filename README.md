# bike-sharing
London Bike Sharing App


`docker build . -t bike-sharing`
`docker run --name bike-sharing-container -p 80:80 --env-file .env bike-sharing `
` docker rm --force bike-sharing`