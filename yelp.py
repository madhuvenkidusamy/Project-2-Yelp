## This script gets data from YELP API, does data cleaning and ETL, loads to database


 #pip install yelpapi
from yelpapi import YelpAPI
import pandas as pd
import requests


# Set up Yelp API Key
client_id = 'QFEVJMDVtV4QHEUVepKk1w'
api_key = '9OcFOk6yy50Q515gwbQBpIJkBjiSbLfJkERDt0PBL2ccytMe8euGxRQsECS6DbH0P1vvBjxMHaVvnhVY-BDXpHLCzugOE5l6gcNjMBGArfR6d4MpjclMXHnjVaIHYHYx'
yelp_api = YelpAPI(api_key)


# Get list of 100 largest cities in US by population
url = "https://www.nationalpopularvote.com/100-biggest-cities-have-59849899-people-and-rural-areas-have-59492267-people"
response = requests.get(url)
tables = pd.read_html(url)
cities = tables[0]
cities = cities.rename(columns=cities.iloc[0])
cities = cities[['City']]
city_list = (cities['City']).tolist()
city_list = city_list[1:21] # getting 20 largest cities in US


# Mine data from API
records = []

term = 'restaurant'
search_limit = 50 # getting 50 restaurants per city

for location in city_list:
    response = yelp_api.search_query(term = term,
                                  location = location,
                                  limit = search_limit)

    for business in response['businesses']:
        try:
            record = {
                'id':business['id'],
                'name':business['name'],
                'review_count':business['review_count'],
                'location': business['location']['city'],
                'category': business['categories'][0]['title'],
                'rating': business['rating'],
                'price':business['price'],
                'latitude':business['coordinates']['latitude'],
                'longitude':business['coordinates']['longitude'],
                'is_closed':business['is_closed'],
            }
        except:
            pass
    
        records.append(record)
        


# Convert dictionary of results to dataframe
df = pd.DataFrame.from_dict(records)


# Cleaning price column from $,$$,$$$,$$$$ to 1,2,3,4
df.loc[df['price'] == '$', 'price'] = 1
df.loc[df['price'] == '$$', 'price'] = 2
df.loc[df['price'] == '$$$', 'price'] = 3
df.loc[df['price'] == '$$$$', 'price'] = 4



# # Convert dataframe to CSV
# df.to_csv('/Users/madhuvenkidusamy/Documents/Data Science Bootcamp/Project-2-Yelp/records.csv', index = False, header = True)


# # Connect dataframe to postgres
# engine = create_engine("postgres://madhuvenkidusamy:blend62@localhost:5432/postgres")
# df.to_sql('yelp_records', con=engine, index=True, if_exists='replace')
