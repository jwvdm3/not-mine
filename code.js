window.addEventListener('load', init, false);

function init() {
  const body = document.body,
        main = body.querySelector('main'),
        image = body.querySelector('img'),
        button = body.querySelector('button'),
        details = body.querySelector('details'),
        clone = image.cloneNode(true);
/* 
 * The original image is left in place, to preserve the layout.
 * The clone overlays the original, in a higher (z-index) level.
 */
  body.style.position = 'relative';
  clone.style = 'position:absolute; z-index:+1;';
  window.addEventListener('resize', resize, false);
  let inner, outer;  // establish scope
  resize();  // place the clone over the original image
  body.appendChild(clone);

  button.addEventListener('click', ()=>{
  	button.disabled = true;
  	clone.style.transition = 'all 500ms ease-in-out';
  	clone.style.width = '100vw';
  	clone.style.height = '100vh';
    clone.style.top = 0; 
    clone.style.left = 0;

    setTimeout(()=>{  // return clone to frame 
      // change the page
      main.querySelector('header').style.opacity = 0;
      button.style.display = 'none';
      details.style.margin = '30px';
      details.style.textAlign = 'center';
      details.style.fontSize = '120%';
      details.querySelector('summary').style.fontSize = '100%';
      details.open = true;
      
      // put the image back into its frame
      clone.style.transitionDuration = '1500ms';
      clone.style.width = inner.width + 'px';
  	  clone.style.height = inner.height + 'px';
      clone.style.top = (inner.top-outer.top) + 'px'; 
      clone.style.left = (inner.left-outer.left) + 'px';

      setTimeout (()=>{  // final clean up
        clone.style.transition = 'none';
      }, 1700);
    }, 1000);
  }, false);

  function resize() {  // keep the clone over the original
    outer = body.getBoundingClientRect(),
    inner = image.getBoundingClientRect();
    clone.style.top = (inner.top-outer.top) + 'px'; 
    clone.style.left = (inner.left-outer.left) + 'px';
  }
}