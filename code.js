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

  function resize() {  // keep the clone over the original
    outer = body.getBoundingClientRect(),
    inner = image.getBoundingClientRect();
    clone.style.top = (inner.top-outer.top) + 'px'; 
    clone.style.left = (inner.left-outer.left) + 'px';
  }

  let counter = 0, finalize;
  button.addEventListener('click', ()=>{ 
  	  changeTo(withoutMe); 
  	  button.disabled = true;
  	}, false);

  function changeTo(newPage) {
  	clone.style.transition = 'all 500ms ease-in-out';
  	clone.style.width = '100vw';
  	clone.style.height = '100vh';
    clone.style.top = 0; 
    clone.style.left = 0;

    setTimeout(()=>{ 
      newPage();  // change the page behind image

      // put the image back into its frame
      clone.style.transitionDuration = '1500ms';
      clone.style.width = inner.width + 'px';
  	  clone.style.height = inner.height + 'px';
      clone.style.top = (inner.top-outer.top) + 'px'; 
      clone.style.left = (inner.left-outer.left) + 'px';

      setTimeout (()=>{  // final clean up
        clone.style.transition = 'none';
        finalize();
      }, 1700);
    }, 1000);
  }
  function withoutMe() {
    main.querySelector('header').style.opacity = 0;
    button.style.display = 'none';
    details.style.margin = '30px';
    details.style.textAlign = 'center';
    details.style.fontSize = '120%';
    details.querySelector('summary').style.fontSize = '100%';
    details.open = true;
    finalize = ()=>{
      clone.addEventListener('click', rubySlippers, false);
      clone.title = 'Click three times to restore the original page.';
    };
  }
  function rubySlippers() {  // click three times to get back to ...
    switch(counter) {
    case 0:
      setTimeout(()=>{
          counter = 0;
          timeout = undefined;
        }, 1000);  // 1 second time limit
      // fall through
    case 1:
      counter++;
      break;
    default:  // more than two clicks
      clone.removeEventListener('click', rubySlippers, false);
      clone.title = '';
      changeTo(withMe);
    }
  }
  function withMe() {
    main.querySelector('header').style.opacity = 1;
    button.style.display = 'inline-block';
    details.style.margin = '-3px 0';
    details.style.textAlign = 'left';
    details.style.fontSize = '100%';
    details.querySelector('summary').style.fontSize = '75%';
    details.open = false;
    finalize = ()=>{ button.disabled = false; };
  }
}