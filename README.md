# 🎞️ Project Web Scraping - Filmalyze
This project is a conceptual model of a social network with a film theme, where users could check out new movies, rate them, interact with others,
and make new friends. Additionally, this project is a blend of Python and Front-End tools.

## ⚠️ Disclaimer:
I am not the owner of the content about the movies in this project. All this information and the rights reserved about it belong exclusively to the
Rotten Tomatoes website. This project aims for educational purposes only. Nothing more.

## 🛠️ Tools needed to build it:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Selenium](https://img.shields.io/badge/Selenium-%23222?style=for-the-badge&logo=selenium&logoColor=%2343B02A)
![BeautifulSoup4](https://img.shields.io/badge/BeautifulSoup-%23eee?style=for-the-badge&logo=python&logoColor=%23222222)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 📖 How stuff works:
It’s no surprise that Python served as the foundational language for the success of this project. It enabled smooth web scraping through powerful
libraries like BeautifulSoup4 and Selenium. Accessing the Rotten Tomatoes website with BeautifulSoup4 was straightforward, especially since the page
lacks JavaScript dynamism. Every piece of movie information was extracted from Rotten Tomatoes (except for views: each time you refresh the Filmalyze
page, those values are randomly generated).

However, I also needed to retrieve the YouTube iframe links for trailers… and that’s where Selenium came into play! It was able to accurately locate
every necessary element on the pages, from the correct trailers to the arrival at each iframe link. That was certainly a wonderful blend of two
web scraping tools.

After that, it was only necessary to give a shape to the collected information through a webpage. I gave freedom to creativity by adding elements that characterized the
project's theme, and I styled the containers where each movie would be placed. It was my first time using SCSS in a project, and I found it to be a
much more organized method for maintaining styles.
