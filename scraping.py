import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pyperclip
import json


def getSoup(url):
  response = requests.get(url)
  return BeautifulSoup(response.content, 'html.parser')


def ddGet(element):
  dt = element.find_parent('dt')
  dd = dt.find_next('dd')
  return dd


def getSel(url):
  driver = webdriver.Chrome()
  return driver.get(url)


def waitElement(xpath):
  global wait
  return wait.until(EC.visibility_of_element_located((By.XPATH, xpath)))


soup = getSoup('https://www.rottentomatoes.com/browse/movies_at_home/sort:popular?page=8')
frames = soup.select(".discovery-tiles__wrap div")

catalogue = []
movies = 0

for i, frame in enumerate(frames):
  if(i % 2 == 0):
    movies += 1

    # Get Image
    image = frame.select('rt-img')
    imageLink = image[0].get('src')

    # Get Title
    title = image[0].get('alt')

    # Get Description
    link = frame.select('a')
    href = link[0].get('href')
    soup2 = getSoup('https://www.rottentomatoes.com/' + href)
    descriptionSlot = soup2.find_all(attrs={'slot': 'description'})
    contentSlot = descriptionSlot[0].find_all(attrs={'slot': 'content'})
    description = contentSlot[0].get_text().strip()

    # Get Genres
    genreString = soup2.find(string='Genre')
    rtList = ddGet(genreString).find_all('rt-link')
    genreList = []
    for rt in rtList:
      genre = rt.get_text()
      genreList.append(genre)
    genres = ', '.join(genreList)
    
    # Get Release Date
    dateElement = ''
    dateTheaters = soup2.find(string='Release Date (Theaters)')
    if dateTheaters == None:
      dateStreaming = soup2.find(string='Release Date (Streaming)')
      dateElement = dateStreaming
    else:
      dateElement = dateTheaters
    rt = ddGet(dateElement).find('rt-text')
    date = rt.get_text()
    dateStrings = date.split(', ')
    releaseDate = f'{dateStrings[0]}, {dateStrings[1]}'

    # Get Runtime
    runtimeString = soup2.find(string='Runtime')
    rt = ddGet(runtimeString).find('rt-text')
    runtime = rt.get_text()

    # Get Score
    audienceSlot = soup2.find_all(attrs={'slot': 'audienceScore'})
    rt = audienceSlot[0].find_all('rt-text')
    score = rt[0].get_text()[:-1]
    if score == '':
      score = 'Score not yet available'
    
    # Get Trailer
    titleSplit = title.split()
    linkTitle = '+'.join(titleSplit)
    driver = webdriver.Chrome()
    driver.get('https://www.youtube.com/results?search_query=' + linkTitle + '+english+trailer')
    wait = WebDriverWait(driver, 5)
    waitElement('//*[@id="video-title"]/yt-formatted-string').click()
    waitElement('//*[@id="top-level-buttons-computed"]/yt-button-view-model/button-view-model/button').click()
    waitElement('//*[@id="target"]').click()
    waitElement('//*[@id="action-buttons"]/yt-button-renderer/yt-button-shape/button').click()
    driver.quit()
    iframe = pyperclip.paste()


    catalogue.append({
    'image': imageLink,
    'title': title,
    'description': description,
    'genres': genres,
    'release': releaseDate,
    'runtime': runtime,
    'score': score,
    'iframe': iframe
  })


with open('movies.json', 'w') as f:
  json.dump(catalogue, f)
