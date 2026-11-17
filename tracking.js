/* Browser events only. Purchase is owned by the payment provider after approval. */
(function () {
  'use strict';
  if (window.rebanadasPixel) return;
  var pixelId = '1857339102353545';
  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=true;t.src=v;
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  function track(name, data) {
    var id = name + '_' + (window.crypto && window.crypto.randomUUID
      ? window.crypto.randomUUID()
      : Date.now().toString(36) + '_' + Math.random().toString(36).slice(2));
    // A server copy of THIS action must use this event name and ID.
    // Never reuse a ViewContent/InitiateCheckout ID for a Purchase.
    window.fbq('trackSingle', pixelId, name, data || {}, {eventID:id});
    return id;
  }
  window.rebanadasPixel = {track:track};
  window.fbq('init',pixelId);
  track('PageView');

  function setup() {
    if (!document.body.classList.contains('sales-page')) return;
    var product = {
      content_name:'La Reina de las Rebanadas - Plan VIP',
      content_ids:['rebanadas-vip'],
      content_type:'product',
      value:99,
      currency:'MXN'
    };
    track('ViewContent',product);
    var checkout = document.getElementById('comprar-ahora');
    if (!checkout) return;
    var lastCheckout = 0;
    function onCheckout(event) {
      if (event.type === 'auxclick' && event.button !== 1) return;
      var now = Date.now();
      if (now - lastCheckout < 1500) return;
      lastCheckout = now;
      track('InitiateCheckout',Object.assign({num_items:1},product));
    }
    checkout.addEventListener('click',onCheckout);
    checkout.addEventListener('auxclick',onCheckout);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',setup,{once:true});
  } else setup();
}());
