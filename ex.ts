/*

const SLIDER_URL = './data.json'

const sliderParamsJSON =
  '{"items": 20, "itemsRow": 2, "speedItemsRow": [0.4, 0.7]}'
const SLIDER_PARAMS = JSON.parse(sliderParamsJSON)
const {
  items: ITEMS,
  itemsRow: ITEMS_ROW,
  speedItemsRow: SPEED_ITEMS_ROW
} = SLIDER_PARAMS

function handleTranslateSlider(
  sliderWrapper,
  speed,
  middleIndex,
  direction = 'left'
) {
  const slider = sliderWrapper.children[0]
  const sliderBtn = sliderWrapper.children[1]
  let slideWidth = slider.firstElementChild.offsetWidth
  let totalWidth = slideWidth * middleIndex

  const updateWidths = () => {
    slideWidth = slider.firstElementChild.offsetWidth
    totalWidth = slideWidth * middleIndex
  }
  window.addEventListener('resize', updateWidths)

  let translateValue = -totalWidth * 2
  let isMouseOver = false // el cursor esta encima  del slider
  let isDragging = false // se está deslizando en pantalla touch

  function updateTranslateValue(delta) {
    translateValue += delta
    slider.style.transform = `translateX(${translateValue}px)`

    const limitSlider =
      Math.abs(translateValue) >= totalWidth * 3 ||
      Math.abs(translateValue) <= totalWidth

    if (limitSlider) {
      translateValue = -totalWidth * 2
    }
  }

  function animateSlider() {
    if (!isMouseOver && !isDragging) {
      updateTranslateValue(
        direction === 'left' ? -speed : direction === 'right' ? speed : -speed
      )
      requestAnimationFrame(animateSlider)
    }
  }

  // EVENT HOVER IN  SLIDER

  function handleHover(e) {
    e.stopPropagation()
    const isDesktop =
      window.innerWidth >= 768 && 'ontouchstart' in window === false
    if (isDesktop) {
      isMouseOver = true
    }
  }

  function handleHoverOut(e) {
    e.stopPropagation()
    if (isMouseOver) {
      isMouseOver = false
      requestAnimationFrame(animateSlider)
    }
  }

  sliderWrapper.addEventListener('mouseover', handleHover)
  sliderWrapper.addEventListener('mouseleave', handleHoverOut)

  // EVENT DRAG IN MOBILE SLIDER

  let dragStartX = 0

  function handleTouchStart(e) {
    isDragging = true
    isMouseOver = false
    dragStartX = e.touches[0].clientX - translateValue
  }

  function handleTouchMove(e) {
    const limitSlider =
      Math.abs(translateValue) < totalWidth * 3 &&
      Math.abs(translateValue) > totalWidth

    if (isDragging && limitSlider) {
      translateValue = e.touches[0].clientX - dragStartX
      slider.style.transform = `translateX(${translateValue}px)`
    }
  }

  slider.addEventListener('touchstart', handleTouchStart)
  slider.addEventListener('touchmove', handleTouchMove)

  // BUTTONS

  const prevBtn = sliderBtn.children[0]
  const nextBtn = sliderBtn.children[1]
  const extraSpeed = 10
  let isPressing = false

  function handlePressNext(e) {
    e.stopPropagation()
    isPressing = true

    const pressNext = () => {
      if (isPressing && !isDragging) {
        updateTranslateValue(-extraSpeed)
        requestAnimationFrame(pressNext)
      }
    }
    pressNext()
  }

  function handlePressPrev(e) {
    e.stopPropagation()
    isPressing = true

    const pressPrev = () => {
      if (isPressing && !isDragging) {
        updateTranslateValue(extraSpeed)
        requestAnimationFrame(pressPrev)
      }
    }
    pressPrev()
  }

  nextBtn.addEventListener('touchstart', handlePressNext)
  prevBtn.addEventListener('touchstart', handlePressPrev)
  nextBtn.addEventListener('mousedown', handlePressNext)
  prevBtn.addEventListener('mousedown', handlePressPrev)

  // HANDLER END

  function handleTouchEnd() {
    if (isMouseOver || isDragging) {
      isMouseOver = false
      isDragging = false
      requestAnimationFrame(animateSlider)
    }

    if (isPressing) {
      isPressing = false
    }
  }

  window.addEventListener('touchend', handleTouchEnd)
  window.addEventListener('mouseup', () => (isPressing = false))

  animateSlider()
}

function generateSlideHTML(slideData) {
  return `
    <a 
      class="slide" 
      href="${slideData.link}" 
      target="_blank" 
    >
      <picture>
        <source 
          media="(min-width:768px)" 
          srcset="${slideData.image}" 
        >
          <img
            src="${slideData.imageMobile}"
            alt="${slideData.title}"
          />
      </picture>
    </a>
  `
}

function generateSliderHTML(sliderData) {
  return `
  <div class="slider-wrapper">
    <div class="slider">
      ${sliderData.map((slideData) => generateSlideHTML(slideData)).join('')}
    </div>
    <div class="slider-btns">
      <button type="button"><</button>
      <button type="button">></button>
    </div>
  </div>
  `
}

function initializeSlider(dataSlider) {
  const sliderContainer = document.querySelector('.slider-container')

  // CREATE ROWS FORMAT AND SLIDERS IN CONTAINER

  const middleIndex = Math.floor(ITEMS / ITEMS_ROW)

  const rows = Array.from({ length: ITEMS_ROW }, (_, i) => {
    const row = dataSlider.slice(i * middleIndex, (i + 1) * middleIndex)
    const rows = [...row, ...row, ...row, ...row]
    return rows
  })

  sliderContainer.innerHTML = rows
    .map((sliderData) => generateSliderHTML(sliderData))
    .join('')

  //  HANDLE TRANSLATE SLIDERS IN CONTAINER

  Array.from(sliderContainer.children).forEach((sliderWrapper, index) => {
    handleTranslateSlider(sliderWrapper, SPEED_ITEMS_ROW[index], middleIndex)
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  setTimeout(async () => {
    try {
      const response = await fetch(SLIDER_URL)
      const data = await response.json()
      const dataSlider = data?.slider || []

      if (Array.isArray(dataSlider) && dataSlider.length >= ITEMS) {
        initializeSlider(dataSlider)
      }
    } catch (error) {
      console.error(error)
    }
  }, 50)
})

*/

// const sliderParams = '{"items": 20, "itemsRow": 2, "speedItemsRow": [0.5, 1]}'

const scriptSlider = (sliderUrl: string, sliderParams: string): string =>
  // eslint-disable-next-line no-template-curly-in-string
  `"use strict";const SLIDER_URL="<SLIDER_URL>",SLIDER_PARAMS_S='<SLIDER_PARAMS_S>';const SLIDER_PARAMS=JSON.parse(SLIDER_PARAMS_S);const {items:ITEMS,itemsRow:ITEMS_ROW,speedItemsRow:SPEED_ITEMS_ROW}=SLIDER_PARAMS;function handleTranslateSlider(e,t,n,s="left"){function i(){slideWidth=r.firstElementChild.offsetWidth,totalWidth=slideWidth*n}const r=e.children[0],o=e.children[1],a=r.firstElementChild.offsetWidth,l=a*n,u=-2*l,c=!1,d=!1;function f(e){u+=e,r.style.transform=\`translateX(\${u}px)\`;const t=Math.abs(u)>=3*l||Math.abs(u)<=l;t&&(u=-2*l)}function h(){if(!c&&!d){const e="left"===s?-t:"right"===s?t:-t;f(e),requestAnimationFrame(h)}}function p(e){e.stopPropagation();const t=window.innerWidth>=768&&!("ontouchstart"in window);t&&(c=!0)}function m(e){e.stopPropagation(),c&&(c=!1,requestAnimationFrame(h))}e.addEventListener("mouseover",p),e.addEventListener("mouseleave",m);let g=0;function v(e){d=!0,c=!1,g=e.touches[0].clientX-u}function y(e){const t=Math.abs(u)<3*l&&Math.abs(u)>l;t&&(u=e.touches[0].clientX-g,r.style.transform=\`translateX(\${u}px)\`)}r.addEventListener("touchstart",v),r.addEventListener("touchmove",y);const b=o.children[0],w=o.children[1],S=10;let x=!1;function E(e){e.stopPropagation(),x=!0;const t=()=>{if(x&&!d){f(-S),requestAnimationFrame(t)}};t()}function L(e){e.stopPropagation(),x=!0;const t=()=>{if(x&&!d){f(S),requestAnimationFrame(t)}};t()}w.addEventListener("touchstart",E),b.addEventListener("touchstart",L),w.addEventListener("mousedown",E),b.addEventListener("mousedown",L);function T(){(c||d)&&(c=!1,d=!1,requestAnimationFrame(h)),x&&(x=!1)}window.addEventListener("touchend",T),window.addEventListener("mouseup",()=>x=!1),h()}function generateSlideHTML(e){return\`<a class="slide" href="\${e.link}" target="_blank"><picture><source media="(min-width:768px)" srcset="\${e.image}"><img src="\${e.imageMobile}" alt="\${e.title}"></picture></a>\`}function generateSliderHTML(e){return\`<div class="slider-wrapper"><div class="slider">\${e.map((e) => generateSlideHTM(e)).join('')}</div><div class="slider-btns"><button type="button"><</button><button type="button">></button></div></div>\`}function initializeSlider(e){const t=document.querySelector(".slider-container"),n=Math.floor(ITEMS/ITEMS_ROW),s=Array.from({length:ITEMS_ROW},(t,s)=>{const i=e.slice(s*n,(s+1)*n),r=[...i,...i,...i,...i];return r});t.innerHTML=s.map(e=>generateSliderHTML(e)).join(''),Array.from(t.children).forEach((e,n)=>{handleTranslateSlider(e,SPEED_ITEMS_ROW[n],n)}),document.addEventListener("DOMContentLoaded",async()=>{setTimeout(async()=>{try{const e=await fetch(SLIDER_URL),t=await e.json(),n=t?.slider||[];Array.isArray(n)&&n.length>=ITEMS&&initializeSlider(n)}catch(e){console.error(e)}},50)})}!function(){document.addEventListener("DOMContentLoaded",async()=>{setTimeout(async()=>{try{const e=await fetch(SLIDER_URL),t=await e.json(),n=t?.slider||[];Array.isArray(n)&&n.length>=ITEMS&&initializeSlider(n)}catch(e){console.error(e)}},50)})}();`
    .replace(/<SLIDER_URL>/g, sliderUrl)
    .replace(/<SLIDER_PARAMS_S>/g, JSON.stringify(JSON.parse(sliderParams)))

export default scriptSlider
