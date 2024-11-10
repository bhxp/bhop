// BTML
// or
// BHOP HTML
// a simplified html for idiots!

function parseBTML(btmlContent) {
  console.log("Parsing BTML content...");

  const parsedContent = btmlContent
    .replace(/<img=([^>]+)>/g, '<img src="$1">')
    .replace(/<text>([^<]+)<\/text>/g, '<span>$1</span>')
    .replace(/<titletext>([^<]+)<\/titletext>/g, '<h1>$1</h1>')
    .replace(/<boldtext>([^<]+)<\/boldtext>/g, '<b>$1</b>')
    .replace(/<italictext>([^<]+)<\/italictext>/g, '<i>$1</i>')

    .replace(/<tx>([^<]+)<\/tx>/g, '<span>$1</span>')
    .replace(/<tt>([^<]+)<\/tt>/g, '<h1>$1</h1>')
    .replace(/<bt>([^<]+)<\/bt>/g, '<b>$1</b>')
    .replace(/<it>([^<]+)<\/it>/g, '<i>$1</i>')

    .replace(/<ibt>([^<]+)<\/ibt>/g, '<b><i>$1</i></b>')
    .replace(/<bit>([^<]+)<\/bit>/g, '<b><i>$1</i></b>')
    .replace(/<tit>([^<]+)<\/tit>/g, '<h1><i>$1</i></h1>')
    .replace(/<bti>([^<]+)<\/bti>/g, '<b><i>$1</i></b>')

    .replace(/<linebreak>/g, '<br>')
    .replace(/<embed (\d+)px, (\d+)px>([^<]+)<\/embed>/g, '<iframe src="$3" width="$1" height="$2"></iframe>');

  console.log("Parsed Content:", parsedContent);
  return parsedContent;
}

document.querySelectorAll('script[type="text/btml"]').forEach(script => {
  const btmlContent = script.innerHTML;
  console.log("Found BTML script:", btmlContent);  // Log content found in <script> tag
  const parsedHTML = parseBTML(btmlContent);
  document.getElementById("output").innerHTML += parsedHTML;
});
