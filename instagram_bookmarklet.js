javascript:[...document.querySelectorAll('img,video,source')].map(e=>e.src&&(e.tagName!='IMG'||e.srcset.includes('1080w'))&&this.open(e.src,''))
