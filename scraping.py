import requests
from bs4 import BeautifulSoup
import json

url = 'https://www.rottentomatoes.com/browse/movies_at_home/sort:popular?page=5'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

frames = soup.select(".discovery-tiles__wrap div")

catalogue = []

for i, frame in enumerate(frames):
  if(i % 2 == 0):
    image = frame.select('rt-img')
    imageLink = image[0].get('src')

    title = image[0].get('alt')

    link = frame.select('a')
    href = link[0].get('href')
    externalLink = 'https://www.rottentomatoes.com/' + href
    soup2 = BeautifulSoup(requests.get(externalLink).content, 'html.parser')
    descriptionSlot = soup2.find_all(attrs={'slot': 'description'})
    content = descriptionSlot[0].find_all(attrs={'slot': 'content'})
    descricao = content[0].get_text().strip()

    catalogue.append({
    'image': imageLink,
    'title': title,
    'description': descricao
  })

with open('movies.json', 'w') as f:
  json.dump(catalogue, f)
