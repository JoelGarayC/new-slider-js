const SLIDER_URL = './data.json'
const SITE = 'gestion'
const ITEMS = 20
const ITEMS_ROW = 2
const SPEED_ITEMS_ROW = [0.4, 0.7]
const DIRECTION_ROW = ['left', 'left']
const DESING = {
  mobile: {
    widthItem: '178px',
    heightItem: '100px',
    gapSlider: '0.625rem'
  },
  desktop: {
    widthItem: '380px',
    heightItem: '214px',
    gapSlider: '1.25rem'
  }
}

function handleTranslateSlider(sliderWrapper, speed, direction, middleIndex) {
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

  /*

  EVENT HOVER IN  SLIDER

  */

  function handleHover() {
    const isDesktop =
      window.innerWidth >= 768 && 'ontouchstart' in window === false
    if (isDesktop) {
      isMouseOver = true
    }
  }

  function handleHoverOut() {
    if (isMouseOver) {
      isMouseOver = false
      requestAnimationFrame(animateSlider)
    }
  }

  slider.addEventListener('mouseover', handleHover)
  slider.addEventListener('mouseleave', handleHoverOut)

  /*

    EVENT DRAG IN MOBILE SLIDER

  */

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

  /*

  BUTTONS

  */

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

  /*

  HANDLER END

  */

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

  /** 
    STYLES: VARIABLES DESING 
  **/

  sliderContainer.classList.add(SITE)

  const variablesStyles = {
    '--gap-mobile': DESING.mobile.gapSlider,
    '--width-img-mobile': DESING.mobile.widthItem,
    '--height-img-mobile': DESING.mobile.heightItem,
    '--gap-desktop': DESING.desktop.gapSlider,
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
