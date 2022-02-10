# Bike Sharing 
Pronto Bike Sharing Dashboard

### Overview
The project consist in a small one-page dashboard to analyze and predicts the cycle share trips of the Pronto Cycle Share system, that was operating between 2014 and 2016 in Seattle, USA. 

It was created for the DEV.TO and MongoDB atlashackathon

Dev post : https://dev.to/duranbe/explore-and-predict-seattle-city-bikes-trips-cac

This project was built with FastAPI, MongoDB, Docker, Bootstrap and Chartjs.

![screen](https://github.com/duranbe/bike-sharing/blob/main/img/snapshot.PNG?raw=true)

### Setting up the project
This project is built with Docker 🐋,

First step is to build the image 

```
docker build . -t bike-sharing
```

Then create a container, map the network port and the .env file

```
docker run --name bike-sharing-container -p 80:80 --env-file .env bike-sharing
```

To stop and delete the container

```
docker rm --force bike-sharing-container
```

### Ressources 

- [MongoDB Quickstart : Fastapi and MongoDB](mongodb.com/developer/quickstart/python-quickstart-fastapi/)
- [Pronto Cycle Share dataset on Kaggle](https://www.kaggle.com/pronto/cycle-share-dataset)
- [FastAPI](https://fastapi.tiangolo.com)
- [Docker](https://www.docker.com)
- [MongoDB](MongoDB.com)
- [ChartJS](https://www.chartjs.org)
- [Bootstrap](https://getbootstrap.com)
