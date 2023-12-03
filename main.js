const SLIDER_URL = './data.json'
const SITE = ''
const ITEMS = 20
const ITEMS_ROW = 2
const SPEED_ITEMS_ROW = [0.4, 0.4]
const DIRECTION_ROW = ['right', 'left']
const DESING = {
  mobile: {
    widthItem: '260px',
    heightItem: '170px',
    gapSlider: '0.8rem',
    minHeightContainer: 'auto'
  },
  desktop: {
    widthItem: '380px',
    heightItem: '240px',
    gapSlider: '1.25rem',
    minHeightContainer: 'auto'
  }
}

function handleTranslateSlider(sliderWrapper, speed, direction, middleIndex) {
  const slider = sliderWrapper.children[0]
  const sliderBtn = sliderWrapper.children[1]

  let slideWidth = slider.firstElementChild.offsetWidth
  let totalWidth = slideWidth * middleIndex

  let translateValue = -totalWidth * 2
  let isMouseOver = false
  let isDragging = false
  let isPressing = false
  let dragStartX = 0

  // Update widths on window resize
  const updateWidths = () => {
    slideWidth = slider.firstElementChild.offsetWidth
    totalWidth = slideWidth * middleIndex
  }
  window.addEventListener('resize', updateWidths)

  const startAnimation = () => {
    if (!isMouseOver && !isDragging) {
      translateValue =
        direction === 'left'
          ? translateValue - speed
          : direction === 'right'
          ? translateValue + speed
          : translateValue - speed

      slider.style.transform = `translateX(${translateValue}px)`

      if (
        Math.abs(translateValue) >= totalWidth * 3 ||
        Math.abs(translateValue) <= totalWidth
      ) {
        translateValue = -totalWidth * 2
      }

      requestAnimationFrame(startAnimation)
    }
  }

  // Update event :hover change
  const handleHover = (e) => {
    e.stopPropagation()
    const isDesktop =
      window.innerWidth >= 768 && 'ontouchstart' in window === false
    if (isDesktop) {
      isMouseOver = true
    }
  }
  const handleHoverOut = (e) => {
    e.stopPropagation()
    if (isMouseOver) {
      isMouseOver = false
      requestAnimationFrame(startAnimation)
    }
  }
  sliderWrapper.addEventListener('mouseover', (e) => handleHover(e))
  sliderWrapper.addEventListener('mouseleave', (e) => handleHoverOut(e))

  // for mobile event touch
  slider.addEventListener('touchstart', (e) => {
    isDragging = true
    isMouseOver = false
    dragStartX = e.touches[0].clientX - translateValue
  })

  slider.addEventListener('touchmove', (e) => {
    if (isDragging) {
      // Limitar el desplazamiento
      if (
        Math.abs(translateValue) < totalWidth * 3 &&
        Math.abs(translateValue) > totalWidth
      ) {
        translateValue = e.touches[0].clientX - dragStartX
        slider.style.transform = `translateX(${translateValue}px)`
      }
    }
  })

  window.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false
      requestAnimationFrame(startAnimation)
    }

    if (isMouseOver) {
      isMouseOver = false
      requestAnimationFrame(startAnimation)
    }

    if (isPressing) {
      isPressing = false
    }
  })

  requestAnimationFrame(startAnimation)

  const prevBtn = sliderBtn.children[0]
  const nextBtn = sliderBtn.children[1]

  const extraSpeed = 5

  prevBtn.addEventListener('contextmenu', (event) => {
    event.preventDefault()
  })

  nextBtn.addEventListener('contextmenu', (event) => {
    event.preventDefault()
  })

  nextBtn.addEventListener('touchstart', (e) => {
    console.log('touchstart')
    e.stopPropagation()
    isPressing = true
    isMouseOver = true

    const pressNext = () => {
      if (isPressing && !isDragging) {
        translateValue -= extraSpeed
        slider.style.transform = `translateX(${translateValue}px)`

        if (
          Math.abs(translateValue) >= totalWidth * 3 ||
          Math.abs(translateValue) <= totalWidth
        ) {
          translateValue = -totalWidth * 2
        }

        requestAnimationFrame(pressNext)
      }
    }
    pressNext()
  })

  prevBtn.addEventListener('touchstart', (e) => {
    e.stopPropagation()
    isPressing = true
    isMouseOver = true

    const pressPrev = () => {
      if (isPressing && !isDragging) {
        translateValue += extraSpeed
        slider.style.transform = `translateX(${translateValue}px)`

        if (
          Math.abs(translateValue) >= totalWidth * 3 ||
          Math.abs(translateValue) <= totalWidth
        ) {
          translateValue = -totalWidth * 2
        }

        requestAnimationFrame(pressPrev)
      }
    }
    pressPrev()
  })

  // Event listener para el botón "Siguiente" (Next)
  nextBtn.addEventListener('mousedown', (e) => {
    e.stopPropagation()
    isPressing = true

    const pressNext = () => {
      if (isPressing && !isDragging) {
        translateValue -= extraSpeed
        slider.style.transform = `translateX(${translateValue}px)`

        if (
          Math.abs(translateValue) >= totalWidth * 3 ||
          Math.abs(translateValue) <= totalWidth
        ) {
          translateValue = -totalWidth * 2
        }

        requestAnimationFrame(pressNext)
      }
    }
    pressNext()
  })

  // Event listener para el botón "Anterior" (Prev)
  prevBtn.addEventListener('mousedown', (e) => {
    e.stopPropagation()
    isPressing = true

    const pressPrev = () => {
      if (isPressing && !isDragging) {
        translateValue += extraSpeed
        slider.style.transform = `translateX(${translateValue}px)`

        if (
          Math.abs(translateValue) >= totalWidth * 3 ||
          Math.abs(translateValue) <= totalWidth
        ) {
          translateValue = -totalWidth * 2
        }

        requestAnimationFrame(pressPrev)
      }
    }
    pressPrev()
  })

  window.addEventListener('mouseup', () => {
    isPressing = false
  })
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
        <button onselectstart="() => return false;"><</button>
        <button onselectstart="() => return false;">></button>
    </div>
  </div>
  `
}

function initializeSlider(dataSlider) {
  const sliderContainer = document.querySelector('.slider-container')

  /** 
    STYLES: VARIABLES DESING 
  **/

  const variablesStyles = {
    '--gap-mobile': DESING.mobile.gapSlider,
    '--minHeight-mobile': DESING.mobile.minHeightContainer,
    '--width-img-mobile': DESING.mobile.widthItem,
    '--height-img-mobile': DESING.mobile.heightItem,
    '--gap-desktop': DESING.desktop.gapSlider,
    '--minHeight-desktop': DESING.desktop.minHeightContainer,
    '--width-img-desktop': DESING.desktop.widthItem,
    '--height-img-desktop': DESING.desktop.heightItem
  }

  const styles = sliderContainer.style
  for (const [property, value] of Object.entries(variablesStyles)) {
    styles.setProperty(property, value)
  }

  /** 
    CREATE ROWS FORMAT AND SLIDERS IN CONTAINER
  **/

  const middleIndex = Math.floor(ITEMS / ITEMS_ROW)

  const rows = Array.from({ length: ITEMS_ROW }, (_, i) => {
    const row = dataSlider.slice(i * middleIndex, (i + 1) * middleIndex)
    const rows = [...row, ...row, ...row, ...row]
    return rows
  })

  sliderContainer.innerHTML = rows
    .map((sliderData) => generateSliderHTML(sliderData))
    .join('')

  /** 
    HANDLE TRANSLATE SLIDERS IN CONTAINER
  **/

  Array.from(sliderContainer.children).forEach((sliderWrapper, index) => {
    handleTranslateSlider(
      sliderWrapper,
      SPEED_ITEMS_ROW[index],
      DIRECTION_ROW[index],
      middleIndex
    )
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

// sliderParams = '{"items": 20, "itemsRow": 2, "speedItemsRow": [0.5, 1]}',

// const scriptSlider = (
//   sliderUrl: string,
//   site: string,
//   sliderParams: string
// ): string =>
//   // eslint-disable-next-line no-template-curly-in-string
//   `"use strict";const SLIDER_URL="<SLIDER_URL>",SITE="<SITE>",SLIDER_PARAMS_S='<SLIDER_PARAMS_S>';const SLIDER_PARAMS=JSON.parse(SLIDER_PARAMS_S);const {items:ITEMS,itemsRow:ITEMS_ROW,speedItemsRow:SPEED_ITEMS_ROW}=SLIDER_PARAMS;document.addEventListener('DOMContentLoaded',async()=>{setTimeout(async()=>{try{const r=await fetch(SLIDER_URL),d=await r.json(),s=d?.slider||[];if(s?.length>=ITEMS){const e=t=>\`<a class="slide" href="\${t.link}" target="_blank"><picture><source media="(min-width:768px)" srcset="\${t.image}"><img src="\${t.imageMobile}" alt="\${t?.title}"/></picture><div class="slide-data \${SITE||''}"><h2>\${t?.title}</h2><p>\${t?.description}</p></div></a>\`,a=t=>\`<div class="slider">\${t.map(e).join('')}</div>\`,o=document.querySelector('.slider-wrapper'),c=Math.floor(s.length/ITEMS_ROW);o&&(o.innerHTML=Array.from({length:ITEMS_ROW},(_,t)=>{const o=s.slice(t*c,(t+1)*c);return o.concat(o)}).map(a).join(''),document.querySelectorAll('.slider').forEach((t,a)=>{!function(t,a,o){let c=0;const n=()=>{const e=t.firstElementChild.offsetWidth,r=e*o;c-=a,t.style.transform=\`translateX(\${c}px)\`,Math.abs(c)>=r&&(c=0),f===!1&&requestAnimationFrame(()=>n())};let f=!1;t.addEventListener('mouseover',()=>{f=!0}),t.addEventListener('mouseleave',()=>{f=!1,requestAnimationFrame(()=>n())}),requestAnimationFrame(()=>n())}(t,SPEED_ITEMS_ROW[a],c)}))}}catch(t){console.error(t)}},50)});function animateSlider(t,a,o){let c=0;const n=()=>{const e=t.firstElementChild.offsetWidth,r=e*o;c-=a,t.style.transform=\`translateX(\${c}px)\`,Math.abs(c)>=r&&(c=0),f===!1&&requestAnimationFrame(()=>n())};let f=!1;t.addEventListener('mouseover',()=>{f=!0}),t.addEventListener('mouseleave',()=>{f=!1,requestAnimationFrame(()=>n())}),requestAnimationFrame(()=>n())}`
//     .replace(/<SLIDER_URL>/g, sliderUrl)
//     .replace(/<SITE>/g, site)
//     .replace(/<SLIDER_PARAMS_S>/g, JSON.stringify(JSON.parse(sliderParams)))

// export default scriptSlider
