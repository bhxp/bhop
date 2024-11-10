// BTML
// or
// BHOP HTML
// a simplified html for idiots!

function parseBTML(btmlContent) {
  return btmlContent
    // Images with link and file paths
    .replace(/<img=([^>]+)>/g, '<img src="$1">')
    
    // Text tags
    .replace(/<text>([^<]+)<\/text>/g, '<span>$1</span>')
    .replace(/<titletext>([^<]+)<\/titletext>/g, '<h1>$1</h1>')
    .replace(/<boldtext>([^<]+)<\/boldtext>/g, '<b>$1</b>')
    .replace(/<italictext>([^<]+)<\/italictext>/g, '<i>$1</i>')

    // Shortened forms for text tags
    .replace(/<tx>([^<]+)<\/tx>/g, '<span>$1</span>')
    .replace(/<tt>([^<]+)<\/tt>/g, '<h1>$1</h1>')
    .replace(/<bt>([^<]+)<\/bt>/g, '<b>$1</b>')
    .replace(/<it>([^<]+)<\/it>/g, '<i>$1</i>')

    // Mixed formats for text tags
    .replace(/<ibt>([^<]+)<\/ibt>/g, '<b><i>$1</i></b>')
    .replace(/<bit>([^<]+)<\/bit>/g, '<b><i>$1</i></b>')
    .replace(/<tit>([^<]+)<\/tit>/g, '<h1><i>$1</i></h1>')
    .replace(/<bti>([^<]+)<\/bti>/g, '<b><i>$1</i></b>')

    // Line break
    .replace(/<linebreak>/g, '<br>')

    // Embeds
    .replace(/<embed (\d+)px, (\d+)px>([^<]+)<\/embed>/g, '<iframe src="$3" width="$1" height="$2"></iframe>')

    // Pass-through for original HTML (prefixed with "html")
    .replace(/<html([^>]+)>([^<]+)<\/html([^>]+)>/g, '<$1>$2</$3>');
}

// Process each BTML script and inject parsed content
document.querySelectorAll('script[type="text/btml"]').forEach(script => {
  const btmlContent = script.innerHTML;
  const parsedHTML = parseBTML(btmlContent);
  document.getElementById("output").innerHTML += parsedHTML;
});
