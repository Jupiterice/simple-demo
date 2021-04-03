(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  function setscalingSize() {
    let scalingSize = docEl.clientWidth / 375;
    if (docEl.clientWidth > 700) {
      scalingSize = Math.min(1.95, scalingSize / 14 * 10);
    }
    window.scalingSize = Number(scalingSize.toFixed(2));
  }
  setscalingSize();

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px';
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize);
    }
  }

  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    // var rem = docEl.clientWidth / 10;
    // docEl.style.fontSize = rem + 'px';

    var w = docEl.clientWidth;
    window.phoneWidth = w;
    var ratio = 10;
    if (w > 700) {
      ratio = 14;
    }
    var rem = w / ratio;
    docEl.style.fontSize = rem + 'px';
    setscalingSize();
    window.isLoad = true;
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body');
    var testElement = document.createElement('div');
    testElement.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody);
  }
}(window, document));
