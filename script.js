
function init(chatBotId, chatBubbleColor, width = '450px', height = '600px') 
{
  const chatIframeUrl =`https://chatfast.io/chat/${chatBotId}`;
  const tablerChatIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5.821 4.91c3.898 -2.765 9.469 -2.539 13.073 .536c3.667 3.127 4.168 8.238 1.152 11.897c-2.842 3.447 -7.965 4.583 -12.231 2.805l-.232 -.101l-4.375 .931l-.075 .013l-.11 .009l-.113 -.004l-.044 -.005l-.11 -.02l-.105 -.034l-.1 -.044l-.076 -.042l-.108 -.077l-.081 -.074l-.073 -.083l-.053 -.075l-.065 -.115l-.042 -.106l-.031 -.113l-.013 -.075l-.009 -.11l.004 -.113l.005 -.044l.02 -.11l.022 -.072l1.15 -3.451l-.022 -.036c-2.21 -3.747 -1.209 -8.392 2.411 -11.118l.23 -.168z" stroke-width="0" fill="currentColor"></path></svg>`;
  const tablerCloseIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M18 6l-12 12"></path> <path d="M6 6l12 12"></path> </svg>`;
  const chatBubble = document.createElement('div');
  chatBubble.style.position = 'fixed';
  chatBubble.style.bottom = '20px';
  chatBubble.style.right = '20px';
  chatBubble.style.width = '60px';
  chatBubble.style.height = '60px';
  chatBubble.style.backgroundColor = chatBubbleColor;
  chatBubble.style.borderRadius = '50%';
  chatBubble.style.color = '#fff';
  chatBubble.style.display = 'flex';
  chatBubble.style.justifyContent = 'center';
  chatBubble.style.alignItems = 'center';
  chatBubble.style.cursor = 'pointer';
  chatBubble.innerHTML = tablerChatIcon;
  chatBubble.setAttribute('tabindex', '-1');
  const chatIframe = document.createElement('iframe');
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  chatIframe.style.zIndex = '999';
  chatIframe.style.position = 'fixed';
  chatIframe.style.bottom = '100px';
  chatIframe.style.right = '20px';
  chatIframe.style.width = '100%';
  chatIframe.style.height = '100%';
  chatIframe.style.maxWidth = Math.min(screenWidth, width) + "px";
  chatIframe.style.maxHeight = Math.min(screenHeight, height) + "px";
  chatIframe.style.border = 'none';
  chatIframe.style.display = 'none';
  chatIframe.style.borderRadius = '10px';
  chatIframe.style.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
  chatIframe.style.opacity = '0';
  chatIframe.style.transition = 'opacity 0.2s ease-in-out';
  chatIframe.style.userSelect = 'none';
  chatIframe.style.setProperty('-moz-user-select', 'none');
  chatIframe.style.setProperty('-webkit-user-select', 'none');
  chatIframe.style.setProperty('-khtml-user-select', 'none');
  chatIframe.src = chatIframeUrl;
  let isChatOpen = false;
  chatBubble.addEventListener('click', () => {
    if (isChatOpen) {
      chatIframe.style.opacity = '0';
      setTimeout(() => {
        chatIframe.style.display = 'none';
      }, 200);
      isChatOpen = false;
      chatBubble.innerHTML = tablerChatIcon;
    } else {
      chatIframe.style.display = 'block';
      setTimeout(() => {
        chatIframe.style.opacity = '1';
      }, 0);
      isChatOpen = true;
      chatBubble.innerHTML = tablerCloseIcon;
    }
  });
  document.body.appendChild(chatBubble);
  document.body.appendChild(chatIframe);
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
    return;
  }
  document.addEventListener('DOMContentLoaded', fn);
}

(function(){
    const botId = document.querySelector('script[data-chat-service="ChatFast"][data-bot-id]').getAttribute('data-bot-id');
    const bubbleColor = document.querySelector('script[data-chat-service="ChatFast"][data-bubble-color]')?.getAttribute('data-bubble-color') ?? "#101010";
    const width = document.querySelector('script[data-chat-service="ChatFast"][data-chat-width]')?.getAttribute('data-chat-width') ?? "450px";
    const height =  document.querySelector('script[data-chat-service="ChatFast"][data-chat-height]')?.getAttribute('data-chat-height') ?? "600px";
    ready(() => init(botId, bubbleColor, width, height));
})();