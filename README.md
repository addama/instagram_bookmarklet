# instagram_bookmarklet
A small bookmarklet for viewing full size image/video from Instagram posts, your Feed, and Stories.

For sanity's sake, when I use the word "images" below, I mean both images and videos, and when I say "tabs", I mean tabs or new windows depending on how you have your browser set up.

## How to use it
Create a bookmarklet by creating a new bookmark, but instead of a normal URL, use the javascript text (all of it!) found in the file included here. Now, when you click that bookmark, it will execute the javascript on the page you're looking at.

Alternatively, you can just copypasta the javascript portion (without the `javascript:` in the beginning) into the console.

**Important**: You need to allow popups for instagram.com! This will allow the bookmarklet to open new tabs.

## What it does
This bookmarklet will open full-sized source images of Instagram posts in new tabs. Instagram only loads between 3 and 9 images/videos into memory at any given time, depending on which layout you're looking at, to keep the site from slowing down. Which images are loaded is based on what's on-screen, and changes as you scroll around. This also happens in gallery posts with more than one image. As such, the bookmarklet will only be able to see the images based on the following criteria:

* **On your Feed page:** The "current" Post, as well as 3-4 Posts before and after, if applicable
* **On Stories that are just an image:** That Story's image
* **On Stories that are a video:** A screenshot of the video, a lower resolution source video, and a higher resolution source video
* **On Posts that have one image:** The Post's image
* **On Posts that have multiple images:** The "current" image, as well as the previous image and the next image in the gallery, if applicable
* **On Profile pages:** Nothing!
* **On your Saved page:** Nothing!
* **On your Mentions page:** Nothing!

In general, if you can see a large image, or a vertically-scrolling set of large images, the bookmarklet will work. If there is only a grid of smaller images, it's not going to find anything.

Something that's important to notice is that on the Feed page, we're dealing with about 9 Posts, and if any of those posts have multiple images, you will get the first two images from those posts opened up. As an example, if the last 9 Posts in your Feed all have 1 image, that's 9 new tabs. If your last 9 Posts are all galleries, that's 18 new tabs!

The "original" is only *technically* the original - the image will be compressed down to a size Instagram is comfortable with storing, and any filters the user applied will be present. But, the image will be in its original aspect ratio instead of a square.

## Technical Information
Instagram, and lots of big app companies in general, have made it a pain in the ass to crawl their DOM to find stuff. You can't hook onto IDs or classes because they're randomly generated and frequently change. In fact, nearly anything could be changed and completely screw up similar functions. 

So, instead of that, I am focusing on semantic and mandatory attributes of the elements in question, which could theoretically be changed or omitted, but then the site would be non-compliant or non-responsive and therefore buggy. Those elements are:

* `<img>` elements that have a `src` attribute, as well as a `srcset` attribute which contains the string "1080w". Images that don't have "1080w" in their `srcset` are gallery thumbnails and profile pictures, which we are not interested in.
* `<video>` elements that have a `src` attribute. This is the first kind of video element, which is found in Posts.
* `<source>` elements that have a `src` attribute. This is the second kind of video element, which is found in Stories. They are children of a `<video>` element that does *not* have a `src`, and is therefore ignored.

Unfortunately, you can't just look for a particular pattern in the `src` of these elements because the Facebook CDN generates keys for each URI node that I can't just guess from the outside. You also can't grab the source images from grid pages because the URIs those point to are not the source image, only a set of smaller thumbnails. Thankfully though, videos and images are largely treated the same, with only Stories using the `<video><source /></video>` structure.

This is definitely not foolproof. At a minimum, they could change their widths ("1080w"), which would require changing the bookmarklet. At a maximum... well, I encourage you to look at Youtube's source and see what you can find. Good luck. Of course, that's video streaming, not images, but it does show that there is a higher level of complexity and obfuscation by using Polymer, lots of very smart sysadmins, and even more div soup. 

## Why?
To see if I could. Actually, it started because I wanted a profile picture for another site, but I don't find any that I liked. I knew my girlfriend had taken a few that made me look good, so I thought *'There's got to be a way to get that image outta there'*. This isn't the first, and it's not the last, but I guarantee it's likely probably maybe the shortest at only 144 characters.
