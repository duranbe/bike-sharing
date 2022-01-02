from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from datetime import datetime
from bson.json_util import dumps, loads
import motor.motor_asyncio

import pymongo
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="./app/templates")

db_user = os.environ["db_user"]
db_name = os.environ["db_name"]
db_password = os.environ["db_password"]
db_cluster = os.environ["db_cluster"]

client = motor.motor_asyncio.AsyncIOMotorClient(
    f"mongodb+srv://{db_user}:{db_password}@{db_cluster}/{db_name}?retryWrites=true&w=majority"
)

db = client[db_name]


@app.get("/", response_class=HTMLResponse)
async def main(request: Request):
    """
    Main
    """

    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/trips")
async def get_trips_between(startDate: datetime, endDate: datetime):

    data = (
        await db["trips"]
        .aggregate(
            [
                {"$match": {"starttime": {"$gte": startDate, "$lt": endDate}}},
                {
                    "$group": {
                        "_id": {
                            "$dateToString": {
                                "format": "%Y-%m-%d",
                                "date": "$starttime",
                            }
                        },
                        "count": {"$sum": 1},
                    }
                },
                {"$sort": {"_id": 1}},
            ]
        )
        .to_list(length=None)
    )

    return data


@app.get("/hour")
async def get_count_trip_hour():
    data = (
        await db["trips"]
        .aggregate(
            [
                {
                    "$group": {
                        "_id": {
                            "$dateToString": {
                                "format": "%Y-%m-%d %H",
                                "date": "$starttime",
                            }
                        },
                        "count": {"$sum": 1},
                    }
                },
                {
                    "$group": {
                        "_id": {
                            "$hour": {
                                "$dateFromString": {
                                    "dateString": "$_id",
                                    "format": "%Y-%m-%d %H",
                                }
                            }
                        },
                        "avg": {"$avg": "$count"},
                    }
                },
                {
                    "$project": {
                        "avg": {"$ceil": "$avg"},
                    }
                },
                {"$sort": {"_id": 1}},
            ]
        )
        .to_list(length=None)
    )

    return data


@app.get("/stats")
async def get_global_stats():
    data = {}

    data["TripDuration"] = (
        await db["trips"]
        .aggregate(
            [
                {
                    "$group": {
                        "_id": None,
                        "max": {"$max": "$tripduration"},
                        "min": {"$min": "$tripduration"},
                        "avg": {"$avg": "$tripduration"},
                    }
                },
                { 
                    "$project": {
                        
                       "max": { "$divide": [ "$max", 60 ] },
                       "min": { "$divide": [ "$min", 60 ] },
                       "avg": { "$divide": [ "$avg", 60 ] },
                    }

                },
                {
                    "$project": {
                        "max": {"$ceil": "$max"},
                        "min": {"$ceil": "$min"},
                        "avg": {"$ceil": "$avg"},
                    }
                },
            ]
        )
        .to_list(length=None)
    )

    return data


@app.get("/members")
async def get_most_start_stations():

    data = (
        await db["trips"]
        .aggregate([{"$group": {"_id": "$usertype", "count": {"$sum": 1}}}])
        .to_list(length=None)
    )

    return data
