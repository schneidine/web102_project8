// Import hero images
import beeImg1 from './assets/heroimages/bee.jpg'
import beeImg2 from './assets/heroimages/bee2.jpg'
import catImg1 from './assets/heroimages/cat.jpg'
import catImg2 from './assets/heroimages/cat2.jpg'
import dragonImg1 from './assets/heroimages/dragon.jpg'
import dragonImg2 from './assets/heroimages/dragon2.jpg'
import foxImg1 from './assets/heroimages/fox.jpg'
import foxImg2 from './assets/heroimages/fox2.jpg'
import ladybugImg1 from './assets/heroimages/ladybug.jpg'
import ladybugImg2 from './assets/heroimages/ladybug2.jpg'
import snakeImg1 from './assets/heroimages/snake.jpg'
import snakeImg2 from './assets/heroimages/snake2.jpg'
import turtleImg1 from './assets/heroimages/turtle.jpg'
import turtleImg2 from './assets/heroimages/turtle2.jpg'

export const HEROES = [
  { id: 'bee', name: 'Bee', img1: beeImg1, img2: beeImg2 },
  { id: 'cat', name: 'Cat', img1: catImg1, img2: catImg2 },
  { id: 'dragon', name: 'Dragon', img1: dragonImg1, img2: dragonImg2 },
  { id: 'fox', name: 'Fox', img1: foxImg1, img2: foxImg2 },
  { id: 'ladybug', name: 'Ladybug', img1: ladybugImg1, img2: ladybugImg2 },
  { id: 'snake', name: 'Snake', img1: snakeImg1, img2: snakeImg2 },
  { id: 'turtle', name: 'Turtle', img1: turtleImg1, img2: turtleImg2 },
]

export const getHeroById = (id) => {
  return HEROES.find((h) => h.id === id)
}

export const getHeroImage = (heroId, useSecondImage = false) => {
  const hero = getHeroById(heroId)
  if (!hero) return null
  return useSecondImage ? hero.img2 : hero.img1
}
