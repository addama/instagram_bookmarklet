# instagram_bookmarklet
A small bookmarklet for viewing full size image/video from Instagram posts, your Feed, and Stories

[](javascript:[...document.querySelectorAll('img,video,source')].map(e => (!e.src || (e.tagName == 'IMG' && !e.srcset.includes('1080w'))) || this.open(e.src, ''));)Drag this link</a> to your bookmarks to create a bookmarklet. 
