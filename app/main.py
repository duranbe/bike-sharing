from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from datetime import datetime
from bson.json_util import dumps, loads
  
import pymongo
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="./app/templates")

db_user = os.environ['db_user']
db_name = os.environ['db_name']
db_password = os.environ['db_password']
db_cluster = os.environ['db_cluster']

client = pymongo.MongoClient(
    f"mongodb+srv://{db_user}:{db_password}@{db_cluster}/{db_name}?retryWrites=true&w=majority")

db = client[db_name]


@app.get("/", response_class=HTMLResponse)
async def main(request: Request):
    """
    Main
    """

    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/trips")
async def get_trips_between(startDate: datetime, endDate: datetime):
 
    data = db['trips'].aggregate([
        {"$match":
            {"starttime":
            {"$gte": startDate,
             "$lt": endDate
             }
            }
         },
         {"$group":
             { 
                 "_id": "$starttime",
                 "count":{ "$sum":1}
             }
         }
         
    ])
    list_cur = list(data)
  
    # Converting to the JSON
    json_data = dumps(list_cur) 

    
    return JSONResponse(content=json_data)
