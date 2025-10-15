export function el(tag, props = {}, ...children){
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(props || {})){
    if(k === 'class') node.className = v;
    else if(k === 'html') node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for(const c of children){
    if(typeof c === 'string') node.appendChild(document.createTextNode(c));
    else if(c) node.appendChild(c);
  }
  return node;
}
