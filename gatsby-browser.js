import "unfetch/polyfill"
// Required to enable image uploads with react gravity forms
import "base64-js"

export const onClientEntry = async () => {
  if (!Object.entries) {
    /** IE9, IE10 and IE11 requires all of the following polyfills. **/
    require("core-js/es6/symbol")
    require("core-js/es6/object")
    require("core-js/es6/function")
    require("core-js/es6/parse-int")
    require("core-js/es6/parse-float")
    require("core-js/es6/number")
    require("core-js/es6/math")
    require("core-js/es6/string")
    require("core-js/es6/date")
    require("core-js/es6/array")
    require("core-js/es6/regexp")
    require("core-js/es6/map")
    require("core-js/es6/set")
  }

  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    require(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
  if (typeof window !== `undefined`) {
    // Smooth scrolling enabled for all anchor links pointing to #ids
    require("smooth-scroll")('a[href*="#"]')
  }

  // Object-fit/Object-position polyfill for gatsby-image (IE)
  const testImg = document.createElement(`img`)
  if (
    typeof testImg.style.objectFit === `undefined` ||
    typeof testImg.style.objectPosition === `undefined`
  ) {
    const objectFitImages = await import("object-fit-images")
    objectFitImages.default()
  }

  if (!Object.entries) {
    // polyfill for IE 11 mapbox layers
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i) // preallocate the Array
      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]]

      return resArray
    }
  }
}

export const onInitialClientRender = () => {
  // Scroll to location.hash on page load
  if (typeof document !== `undefined` && typeof window !== `undefined`) {
    const hashElement = document.getElementById(
      window.location.hash.replace("#", "")
    )
    if (!!hashElement) {
      hashElement.scrollIntoView()
      window.scrollBy(0, -120)
    }
  }
}
