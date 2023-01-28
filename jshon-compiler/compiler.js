
//console.log(/^(\s*{)(.*?)(\s*})$/.test(" \n{ hel lo }"));
//  console.log("{function(){return 67}}".replace(/^(\s*{)/,"").replace(/(\s*})$/,""));

//  return;
function ConsoleStyle(){
    // console.log('\x1b[36m',\x1b[44m, 'sometext' ,'\x1b[0mm'); color, background, text, reset
    return {
        bold:function(text){return `\x1b[${1}m${text}\x1b[0m`},
        italize:function(text){return `\x1b[${3}m${text}\x1b[0m`},
        underline:function(text){return `\x1b[${4}m${text}\x1b[0m`},
        whiteBG:function(text){return `\x1b[${47}m${text}\x1b[0m`},
        blackBG:function(text){return `\x1b[${40}m${text}\x1b[0m`},
        redBG:function(text){return `\x1b[${41}m${text}\x1b[0m`},
        greenBG:function(text){return `\x1b[${42}m${text}\x1b[0m`},
        yellowBG:function(text){return `\x1b[${43}m${text}\x1b[0m`},
        blueBG:function(text){return `\x1b[${44}m${text}\x1b[0m`},
        magentaBG:function(text){return `\x1b[${45}m${text}\x1b[0m`},
        cyanBG:function(text){return `\x1b[${46}m${text}\x1b[0m`},
        greyBG:function(text){return `\x1b[${100}m${text}\x1b[0m`},
        invisible:function(text){return `\x1b[${8}m${text}\x1b[0m`},
        strike:function(text){return `\x1b[${9}m${text}\x1b[0m`},
        greyColor:function(text){return `\x1b[${30}m${text}\x1b[0m`},
        redColor:function(text){return `\x1b[${31}m${text}\x1b[0m`},
        greenColor:function(text){return `\x1b[${32}m${text}\x1b[0m`},
        yellowColor:function(text){return `\x1b[${33}m${text}\x1b[0m`},
        blueColor:function(text){return `\x1b[${34}m${text}\x1b[0m`},
        magentaColor:function(text){return `\x1b[${35}m${text}\x1b[0m`},
        cyanColor:function(text){return `\x1b[${36}m${text}\x1b[0m`},
        whiteColor:function(text){return `\x1b[${37}m${text}\x1b[0m`}
    }
}
var reg = /<\s*immutable-[a-zA-Z][^>]*>\s*(.*?)\s*<\/\s*immutable-[a-zA-Z][^>]*\s*>/g;
//this.TEXT=()=>{},args={};

/**
 * 
 * @param {string} renderingHtml 
 */
function parseImmutable(renderingHtml){
    var immutables = renderingHtml.match(reg),i;
    var immutableReplacers = [],tagInfo=[];
    if(immutables){
        for(i=0;i<immutables.length;i++){
            immutableReplacers.push(Math.random());
            renderingHtml = renderingHtml.replace(immutables[i],`+___${immutableReplacers[immutableReplacers.length-1]}___`);
            //immutables[i] = immutables[i].replace(/<\s*immutable-/,"<immutable-")
            tagInfo.push({});
            tagInfo[tagInfo.length-1].tagName= immutables[i].match(/<\s*immutable-(.*?)[^a-zA-Z0-9-]/)[1];
            tagInfo[tagInfo.length-1].properties = immutables[i].match(/<\s*immutable-[a-zA-Z0-9-]*(.*?)>/s)[1];
        }
    }
    return tagInfo;
};

var markupPattern = /<!--[\s\S]*?-->|<(\/|\s?)\s*([a-zA-Z][-.:0-9_a-zA-Z]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/g,
attributePattern = /([a-zA-Z()[\]#][a-zA-Z0-9-_:()[\]#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/gi,
templatePattern =/<>\s*{(\S|\s)*?(?!(?:'[^']*')|(?:"[^"]*")|(?:`[^`]*`))\s*}\s*<\/>/g,
// /<>\s*{(\S|\s)*?((?:\s+[^]*?(?:(?:'[^']*').|(?:"[^"]*").|(?:`[^`]*`).)?)*)\s*}\s*<\/>/, 
// /<>\s*{(\S|\s)*?((?:\s+[^\b(}\s*<\/>)\b]*?(?:(?:'[^']*').|(?:"[^"]*").)?)*)\s*}\s*<\/>/,
 ///<>\s*{(\S|\s)*?}\s*<\/>/,
  ///{(\S|\s)*?((?:\s?[^}]*?(?:(?:`[^`]*`)|(?:'[^']*')|(?:"[^"]*")|(?:{[^}]*}))?)*)\s*}/g, 
 //{(\S|\s)*?((?:\s?(?:(?:`[^`]*`)|(?:'[^']*')|(?:"[^"]*")|(?:(^[}]$[\$])*}))*))\s*}\$
festPattern = /<jshon>(\S|\s)*?<\/jshon>/g
;
// ({)(\S|\s)*?((?:\s?[^}]*?(?:(?:`[^`]*`)|(?:'[^']*')|(?:"[^"]*")|(?:{[^}]*}))?)*)\s*}
// /(?:^[a-zA-Z]|(?<=[^<\/]\s)[a-zA-Z])[a-zA-Z0-9-]*\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)|((?<=[^<\/]\s)[a-zA-Z](.*?)[a-zA-Z0-9-](?=[^a-zA-Z0-9-]))/gi;
//
//(id|class)
/**
 * 
 * @param {string} text 
 */
 function excapeRegexChars(text){
    return text.replace(/[\\[.*+(?{^$|})]/g,'\\$&');
}
/**
 * 
 * @param {string} html 
 */
 function removeWhiteSpace(html){
    return html.replace(/\s(.*?)\s*(?=[^\s])/g," ");
}
/**
 * 
 * @param {string} html 
 */
function getHtml(html){
    return html.match(markupPattern);
}
/**
 * 
 * @param {string} html 
 */
 function getTemplateLiterals(html){
    return html.match(templatePattern);
}
/**
 * 
 * @param {string} html 
 */
 function getAttributes(html){
    return html.match(attributePattern);
}
/**
 * 
 * @param {string} html 
 */
 function getFestComponents(html){
    return html.match(festPattern);
}
/**
 * 
 * @param {string} html 
 */
function parse(html){
    var 
    HTMLTags,NODES=[],
    JScripts = getTemplateLiterals(html),//mv=html,
    i,JS_ID,TEXTS,RESULT_STRING="return (\n";//console.log(JScripts.join("\n................\n"));return '';
    //Assign IDs to all JavaScript templates 
    if(JScripts){
        for(i=0;i<JScripts.length;i++){
            JS_ID = `${REPLACERS._templateStart}${i}${Math.random()}${REPLACERS._templateEnd}`;
            html = html.replace(JScripts[i],JS_ID);
            //console.log(getHtml(JScripts[i]));
            JScripts[i] = {id:JS_ID,value:JScripts[i]};
        }
    }else{
        JScripts=[];
    }
    html = removeWhiteSpace(html);//console.log(954);
    HTMLTags = getHtml(html);//console.log(HTMLTags);
    //console.log(removeWhiteSpace(mv),"\n");console.log(html);
    NODES.push(getAttributes(HTMLTags[0])); 
    for(i=0;i<HTMLTags.length-1;i++){
        TEXTS = html.match(RegExp(`${excapeRegexChars(HTMLTags[i])}(.*?)${excapeRegexChars(HTMLTags[i+1])}`))[1];
        html = html.replace(HTMLTags[i],"");
        //console.log(TEXTS,"\n",[HTMLTags[i],HTMLTags[i+1]]);//break;
        //continue;
        if(TEXTS.length>0&&/[^ ]/.test(TEXTS)){
            NODES.push(TEXTS);
        }
        NODES.push(getAttributes(HTMLTags[i+1]));
    }//return '0';
    //console.log(html,JScripts,HTMLTags,NODES);return "";
    var currentNode=createNode(NODES[0]),currentOpenedNodes=[currentNode.object],nextNode,j=0,k=0,l;//console.log(98);
    //var buildString = currentNode.string;
    for(i=1;i<NODES.length-1;i++){
        if(typeof (NODES[i])!=="string"){
            j++;
            HTMLTags[j] = HTMLTags[j].trim();
            if(HTMLTags[j].startsWith("</")){//Closing tag
                if(currentOpenedNodes[currentOpenedNodes.length-1].tag==NODES[i][0]){
                    currentOpenedNodes.pop();
                }else{
                    //The html is malformed... Can throw some errors here

                }

            }else if(HTMLTags[j].endsWith("/>")){//Self closing
                currentOpenedNodes[currentOpenedNodes.length-1].children.push(createNode(NODES[i]).object);

            }else{//Openning tag
                nextNode = createNode(NODES[i]).object;
                currentOpenedNodes[currentOpenedNodes.length-1].children.push(nextNode);
                if(!selfClosingElements[NODES[i][0]]){currentOpenedNodes.push(nextNode)}
            }
        }else{ 
            
            //Text nodes
            while(k<JScripts.length&&NODES[i].indexOf(JScripts[k].id)>=0){
                NODES[i] = NODES[i].split(JScripts[k].id);
               
                if(NODES[i].length==1){
                    currentOpenedNodes[currentOpenedNodes.length-1].children.push({//}\s*<\/>
                        JS:true,value:`function(args)${JScripts[k].value.replace(/<>\s*{/,"{return (").replace(/(}\s*<\/>)$/,")}")}`
                    });
                }else{
                    if(NODES[i][0].length>0){
                        if(/[^ ]/.test(NODES[i][0])){
                            l=currentOpenedNodes[currentOpenedNodes.length-1].children.length;
                            if(typeof (currentOpenedNodes[currentOpenedNodes.length-1].children[l-1])==="string"){
                                currentOpenedNodes[currentOpenedNodes.length-1].children[l-1]+=NODES[i][0];
                            }else{
                                currentOpenedNodes[currentOpenedNodes.length-1].children.push(NODES[i][0]);
                            }
                            
                        }
                        currentOpenedNodes[currentOpenedNodes.length-1].children.push({
                            JS:true,value:`function(args)${JScripts[k].value.replace(/<>\s*{/,"{return (").replace(/(}\s*<\/>)$/,")}")}`
                        });
                    }else{
                        currentOpenedNodes[currentOpenedNodes.length-1].children.push({
                            JS:true,value:`function(args)${JScripts[k].value.replace(/<>\s*{/,"{return (").replace(/(}\s*<\/>)$/,")}")}`
                        });
                    }
                }
                NODES[i].shift();
                NODES[i]=NODES[i].join('');
                k++;
            }
            if(NODES[i].length>0){
                if(/[^ ]/.test(NODES[i])){
                    l=currentOpenedNodes[currentOpenedNodes.length-1].children.length;
                    if(typeof (currentOpenedNodes[currentOpenedNodes.length-1].children[l-1])==="string"){
                        currentOpenedNodes[currentOpenedNodes.length-1].children[l-1]+=NODES[i];
                    }else{
                        currentOpenedNodes[currentOpenedNodes.length-1].children.push(NODES[i]);
                    }
                }
            }
        }
    }
    
    
    //console.log(html,JScripts,HTMLTags,NODES,JSON.stringify(currentOpenedNodes,undefined,2));
    // console.log(" g".split("g"));
    // console.log(" g ".split("g"));
    // console.log("g ".split("g"));
    // for(i=150;i<301;i++){
    //     console.log(`\x1b[${i}m${'My Text === '+i}\x1b[0mm and this`);
    // }
    
    // console.log("%cHello","color:red;");
    return currentOpenedNodes.pop();
}
var attr_Rep = `ATTR__${Math.random()}__ATTR`,
child_Rep = `CHILD__${Math.random()}__CHILD`;
/**
 * 
 * 
 * @param {string[]} nodeInfo  
 */
function createNode(nodeInfo){
    var node = {
        tag:nodeInfo[0],
        attr:{},
        children:[]
    },i;
    //var nodeString = `{name:'${nodeInfo[0]}',attr:{${attr_Rep}},children:[${child_Rep}]}`,at=false;
    if(nodeInfo.length>1){
        at=true;
        for(i=1;i<nodeInfo.length;i++){
            nodeInfo[i] = nodeInfo[i].split("=");//nodeInfo[i][1]
            nodeInfo[i].length==1?node.attr[nodeInfo[i][0]]=true:nodeInfo[i].length==2?
            node.attr[nodeInfo[i][0]]=/^(\s*{)(.*?)(\s*})$/.test(nodeInfo[i][1])?nodeInfo[i][1].replace(/^(\s*{)/,"").replace(/(\s*})$/,""):nodeInfo[i][1]:null;
            // if(nodeInfo[i].length==1){
            //     nodeString = nodeString.replace(`${attr_Rep}`,`${nodeInfo[i][0]}:true,${attr_Rep}`); 
            // }else if(nodeInfo[i].length==2){
            //     nodeString = nodeString.replace(`${attr_Rep}`,`${nodeInfo[i][0]}:${nodeInfo[i][1]},${attr_Rep}`);
            // }
        }
    }
    //nodeString = nodeString.replace(`${at?',':''}${attr_Rep}`,"");
    //console.log(nodeString);
    return {string:'',object:node};
}
/**
 * 
 * @param {{tag:string,attr:{},children:[]}} node 
 * @param {{value:string}} valueObj
 */
function buildString(node,valueObj){
    node.tag = node.tag=="image"?"img":node.tag;
    var nodeString = `{t:'${node.tag}',a:{${attr_Rep}},c:[${child_Rep}]}`,ch=false,at=false,i;
    //console.log(node);
    var atrris = Object.keys(node.attr),itemIndex;
    if(atrris.length>0){
        at=true;
        //Find style and class attributes and push them at the end of the attributes array
        itemIndex = atrris.indexOf("style");
        if(itemIndex>-1){
            atrris.splice(itemIndex,1);
            itemIndex = atrris.indexOf("class");
            if(itemIndex<0){
                atrris.push("class");
                node.attr["class"] = '"';
            }else{
                node.attr["class"] = node.attr["class"].replace(/.$/,"");
            }
            node.attr["class"] = `${node.attr["class"]} ${cssBuilder(node.attr["style"]).join(" ")}${node.attr["class"][0]}`;
        }
        for(i=0;i<atrris.length;i++){
            nodeString = nodeString.replace(`${attr_Rep}`,`${JSON.stringify(atrris[i])}:${node.attr[atrris[i]]},${attr_Rep}`);
        }
    }
    nodeString = nodeString.replace(`${at?',':''}${attr_Rep}`,"");
    if(node.children.length>0){
        ch=true;
        //var jsStr=
        for(i=0;i<node.children.length;i++){
            if(typeof (node.children[i])==="string"){
                nodeString = nodeString.replace(child_Rep,`${JSON.stringify(node.children[i])},${child_Rep}`);
            }else{
                if(node.children[i].JS){
                    //nodeString = nodeString.replace(child_Rep,`{JS:true,value:${node.children[i].value}},${child_Rep}`);
                    nodeString = nodeString.replace(child_Rep,`${node.children[i].value},${child_Rep}`);
                }else{
                    nodeString = nodeString.replace(child_Rep,`${buildString(node.children[i])},${child_Rep}`);
                }
            }
        }
    }
    return nodeString.replace(`${ch?',':''}${child_Rep}`,"");
}
/**
 * 
 * @param {{tag:string,attr:{},children:[]}} node 
 * @param {{value:string}} valueObj
 */
function buildPreString(node,valueObj){
    switch (node.tag.toLowerCase()) {
        //case "style":
        case "script":
        case "link":
            return ""
    }
    var ch=false,at=false,i;
    var atrris = Object.keys(node.attr),itemIndex;
    var keyed = atrris.indexOf("key");
    if(atrris.length>0){
        at=true;
        //Find style and class attributes and push them at the end of the attributes array
        itemIndex = atrris.indexOf("style");
        if(itemIndex>-1){
            atrris.splice(itemIndex,1);
            // if(itemIndex>-1){
            //     atrris.splice(itemIndex,1);
            //     itemIndex = atrris.indexOf("class");
            //     console.log(node.attr["class"],1);
            //     if(itemIndex<0){
            //         atrris.push("class");
            //         node.attr["class"] = '"';
            //     }else{
            //         node.attr["class"] = node.attr["class"].replace(/.$/,"");
            //     }
            //     node.attr["class"] = `${node.attr["class"]} ${cssBuilder(node.attr["style"]).join(" ")}${node.attr["class"][0]}`;
            //     console.log(node.attr["class"],2);
            // }
        }
        
        itemIndex = atrris.indexOf("class");
        if(itemIndex>-1){
            atrris.splice(itemIndex,1);
        }
    }
    if(selfClosingElements[node.tag]){
        switch (node.tag) {
            // case "image":
            // case "IMAGE":
            //     if(oneSrcImages.length){
            //         var nodeString = `<img${attr_Rep}${keyed>=0?`\${JSHON.getDynamicAttributes(this,${node.attr[atrris[keyed]]},${itemIndex>-1?node.attr.class:'""'})}`:`${itemIndex>-1?` class=${node.attr.class}`:''}`} src="${oneSrcImages}"/>`;
            //     }else{
            //         return "";
            //     }
            //     break;
            case "img":
            case "IMG":
                nodeString = `<${node.tag}${attr_Rep}${keyed>=0?`\${JSHON.getDynamicAttributes(this,${node.attr[atrris[keyed]]},${itemIndex>-1?node.attr.class:'""'})}`:`${itemIndex>-1?` class=${node.attr.class}`:''}`}/>`
                for(i=0;i<atrris.length;i++){
                    nodeString = nodeString.replace(`${attr_Rep}`,` ${atrris[i].replace(/`/g,"\\`")}=${node.attr[atrris[i]].replace(/`/g,"\\`")}${attr_Rep}`);
                }
                nodeString = nodeString.replace(`${at?'':''}${attr_Rep}`,"");
                return nodeString.replace(`<${node.tag}`,"<noscript").replace(/(\/>)$/,">")+nodeString+"</noscript>";
                
            default:
                nodeString = `<${node.tag.replace(/`/g,"\\`")}${attr_Rep}${keyed>=0?`\${JSHON.getDynamicAttributes(this,${node.attr[atrris[keyed]]},${itemIndex>-1?node.attr.class:'""'})}`:`${itemIndex>-1?` class=${node.attr.class}`:''}`}/>`
                break;
        }
        for(i=0;i<atrris.length;i++){
            nodeString = nodeString.replace(`${attr_Rep}`,` ${atrris[i].replace(/`/g,"\\`")}=${node.attr[atrris[i]].replace(/`/g,"\\`")}${attr_Rep}`);
        }
        return nodeString.replace(`${at?'':''}${attr_Rep}`,"");
    }
    var tag = node.tag.replace(/`/g,"\\`");
    nodeString = `<${tag}${attr_Rep}${keyed>=0?`\${JSHON.getDynamicAttributes(this,${node.attr[atrris[keyed]]},${itemIndex>-1?node.attr.class:'""'})}`:`${itemIndex>-1?` class=${node.attr.class}`:''}`}>${child_Rep}</${tag}>`;

    
    
    
    //if(atrris.length>0){
        // at=true;
        // //Find style and class attributes and push them at the end of the attributes array
        // itemIndex = atrris.indexOf("style");
        // if(itemIndex>-1){
        //     itemIndex = atrris.indexOf("style");
        //     if(itemIndex>-1){
        //         atrris.splice(itemIndex,1);
        //         itemIndex = atrris.indexOf("class");
        //         if(itemIndex<0){
        //             atrris.push("class");
        //             node.attr["class"] = '"';
        //         }else{
        //             node.attr["class"] = node.attr["class"].replace(/.$/,"");
        //         }
        //         node.attr["class"] = `${node.attr["class"]} ${cssBuilder(node.attr["style"]).join(" ")}${node.attr["class"][0]}`;
        //     }
        // }
        // itemIndex = atrris.indexOf("class");
        // if(itemIndex>-1){
        //     atrris.splice(itemIndex,1);
        // }
    for(i=0;i<atrris.length;i++){
        nodeString = nodeString.replace(`${attr_Rep}`,` ${atrris[i].replace(/`/g,"\\`")}=${node.attr[atrris[i]].replace(/`/g,"\\`")}${attr_Rep}`);
    }
    nodeString = nodeString.replace(`${at?'':''}${attr_Rep}`,"");
    if(node.children.length>0){
        ch=true;
        //var jsStr=
        for(i=0;i<node.children.length;i++){
            if(typeof (node.children[i])==="string"){
                nodeString = nodeString.replace(child_Rep,`${node.children[i].replace(/`/g,"\\`")}${child_Rep}`);
            }else{
                if(node.children[i].JS){
                    //nodeString = nodeString.replace(child_Rep,`{JS:true,value:${node.children[i].value}},${child_Rep}`);
                    nodeString = nodeString.replace(child_Rep,`${node.children[i].value.replace("function(args){return (","${JSHON.getRightValue(")}${child_Rep}`);
                }else{
                    nodeString = nodeString.replace(child_Rep,`${buildPreString(node.children[i])}${child_Rep}`);
                }
            }
        }
    }
    return nodeString.replace(`${ch?'':''}${child_Rep}`,"");
}
function escape(str) {
    return (str+"").replace(/&/gs,"&amp;")
        .replace(/</gs, "&lt;")
        .replace(/>/gs, "&gt;")
        .replace(/"/gs, "&quot;")
        .replace(/'/gs, "&#39;")
        .replace(/`/gs, "&#96;");
}
class ExtendedBases{
    
    CSSVARCHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    CSSCURSOR1;
    CSSCURSOR2;
    CSSCURSOR3;
    CSSCURSOR4;
    CSSCURSOR5;
    VARLENGTH;
    TOTAL;
    constructor(){
        this.CSSCURSOR1=-1;
        this.CSSCURSOR2=0;
        this.CSSCURSOR3=-1;
        this.CSSCURSOR4=-1;
        this.CSSCURSOR5=-1;
        this.VARLENGTH = 0;
        this.TOTAL=0;
    }
   getUniqueVar(){
       switch (this.VARLENGTH) {
           case 0:
               if(this.CSSCURSOR1==61){
                   this.VARLENGTH++;
               }
               return this.CSSCURSOR1++,`${this.CSSVARCHARS[this.CSSCURSOR1]}`;
           case 1:
               if(this.CSSCURSOR2==61&&this.CSSCURSOR3==61){
                   this.VARLENGTH++;
                   this.CSSCURSOR2=0;this.CSSCURSOR3=0;
                   this.CSSCURSOR4=-1;
               }else if(this.CSSCURSOR3==61){
                   this.CSSCURSOR2++;
                   this.CSSCURSOR3=-1;
               }
               break;
           case 2:
               if(this.CSSCURSOR2==61&&this.CSSCURSOR3==61&&this.CSSCURSOR4==61){
                   this.VARLENGTH++;
                   this.CSSCURSOR2=0;this.CSSCURSOR3=0;
                   this.CSSCURSOR4=0;this.CSSCURSOR5=-1;
               }else if(this.CSSCURSOR3==61&&this.CSSCURSOR4==61){
                   this.CSSCURSOR2++;
                   this.CSSCURSOR3=0;
                   this.CSSCURSOR4=-1;
               }else if(this.CSSCURSOR4==61){
                   this.CSSCURSOR3++;
                   this.CSSCURSOR4=-1;
               }
               break;
           case 3:
               if(this.CSSCURSOR2==61&&this.CSSCURSOR3==61&&this.CSSCURSOR4==61&&this.CSSCURSOR5==61){
                   this.VARLENGTH++;
                   this.CSSCURSOR2=-1;this.CSSCURSOR3=-1;
                   this.CSSCURSOR4=-1;this.CSSCURSOR5=-1;//add sixth variable
               }else if(this.CSSCURSOR3==61&&this.CSSCURSOR4==61&&this.CSSCURSOR5==61){
                   this.CSSCURSOR2++;
                   this.CSSCURSOR3=0;
                   this.CSSCURSOR4=0;
                   this.CSSCURSOR5=-1;
               }else if(this.CSSCURSOR4==61&&this.CSSCURSOR5==61){
                   this.CSSCURSOR3++;
                   this.CSSCURSOR4=0;
                   this.CSSCURSOR5=-1;
               }else if(this.CSSCURSOR5==61){
                   this.CSSCURSOR4++;
                   this.CSSCURSOR5=-1;
               }
               break;
           default:
               break;
       }
       switch (this.VARLENGTH) {
           case 1://return two chars. Total Length: (3906-62)
               return this.CSSCURSOR3++,`${this.CSSVARCHARS[this.CSSCURSOR2]}${this.CSSVARCHARS[this.CSSCURSOR3]}`;
           case 2://return three chars. Total Length: (242234-3906)
               return this.CSSCURSOR4++,`${this.CSSVARCHARS[this.CSSCURSOR2]}${this.CSSVARCHARS[this.CSSCURSOR3]}${this.CSSVARCHARS[CSSCURSOR4]}`;
           case 3://return four chars. Total Length: (Over 13 million)
               return this.CSSCURSOR5++,`${this.CSSVARCHARS[this.CSSCURSOR2]}${this.CSSVARCHARS[this.CSSCURSOR3]}${this.CSSVARCHARS[CSSCURSOR4]}${this.CSSVARCHARS[CSSCURSOR5]}`;
           default:
               //We wouldn't need up to this point.
               //Crash if only we are here--> That's too much geek;
               throw new Error(
                "You have more than 14 million distinct css rules."+
                "Try to break your css file into two or more by parsing some of your HTML files separately."
                );
       }
       this.TOTAL++;
   }
};

var CSSOBJECT = {},STYLETRACE={},STYLESHEET="";
/**
 * 
 * @param {string} styles 
 */
function cssBuilder(styles){
    styles = styles.replace('"','').replace(/.$/,'').split(";");
    var i,traceValue,classNames=[];
    for(i=0;i<styles.length;i++){
        styles[i]=styles[i].split(":");//Must be in form: [style-atribute:value]
        if(styles[i].length==2){//well formed style value
            traceValue = `${styles[i][0]}:${styles[i][1]}`.replace(/\s+/g,' ');
            if(!STYLETRACE[traceValue]){
                STYLETRACE[traceValue]={
                    cssVariable : getCssVar()
                };
                CSSOBJECT[STYLETRACE[traceValue].cssVariable]=`.${STYLETRACE[traceValue].cssVariable}{${traceValue}}`;
                STYLESHEET+=`.${STYLETRACE[traceValue].cssVariable}{${traceValue}}`;
            }
            if(classNames.indexOf(STYLETRACE[traceValue].cssVariable)<0){//ignore duplicate class names
                classNames.push(STYLETRACE[traceValue].cssVariable);
            }
        }
    }
    return classNames;
}

var CSSCONSTANT="rs-",eBase = new ExtendedBases();
function getCssVar(){
    return `${CSSCONSTANT}${eBase.getUniqueVar()}`;
};
function prefix(p){
    CSSCONSTANT=typeof (p)=="string"?p:CSSCONSTANT;
    CSSCONSTANT+="-";
}

const REPLACERS = {
    _templateStart:"JS__",
    _templateEnd:"__JS",
},
selfClosingElements = {
    area: true,
    AREA: true,
    base: true,
    BASE: true,
    br: true,
    BR: true,
    col: true,
    COL: true,
    hr: true,
    HR: true,
    img: true,
    IMG: true,
    input: true,
    INPUT: true,
    link: true,
    LINK: true,
    meta: true,
    META: true,
    source: true,
    SOURCE: true,
    embed: true,
    EMBED: true,
    param: true,
    PARAM: true,
    track: true,
    TRACK: true,
    wbr: true,
    WBR: true,
    image:true,
    IMAGE:true
};
function getCSSObject(){
    return CSSOBJECT;
}
function getStyleSheet(){
    return STYLESHEET;
}
/**
 * @param {string} html
 */
function translate(html){
    var fests = getFestComponents(html),i;
    //console.log(fests);
    var compiledFests = null;
    if(fests){
        if(ssrMode){
            var ssrHtml = html;
            for(i=0;i<fests.length;i++){
                //compiledFests.push(parse(fests[i]));
                compiledFests = parse(fests[i]);
                if(compiledFests.children.length==1){
                    if(typeof (compiledFests.children[0])!=="string"){
                        if(!compiledFests.children[0].JS){
                            html = html.replace(fests[i],buildString(compiledFests.children[0]))
                            .replace(/\/\/==INTERNAL\s(.*?)\/\/INTERNAL\s/gs,"//");
                            ssrHtml = ssrHtml.replace(fests[i],`function htmlString(args){return (\`${buildPreString(compiledFests.children[0])}\`)}`)
                            .replace(/\/\/==EXTERNAL\s(.*?)\/\/EXTERNAL\s/gs,"//");;
                        }
                    }
                }else{
                    //Throw some error here -- component must have one top-most parent apart from the '<fest>...</fest>'
                }
            
                //console.log(JSON.stringify(compiledFests[0],undefined,2));
                //console.log(buildString(compiledFests[0]));
                //break;
            }
        }else{
            for(i=0;i<fests.length;i++){
                //compiledFests.push(parse(fests[i]));
                compiledFests = parse(fests[i]);
                if(compiledFests.children.length==1){
                    if(typeof (compiledFests.children[0])!=="string"){
                        if(!compiledFests.children[0].JS){
                            html = html.replace(fests[i],buildString(compiledFests.children[0]))
                            .replace(/\/\/==INTERNAL\s(.*?)\/\/INTERNAL\s/gs,"//");
                        }
                    }
                }else{
                    //Throw some error here -- component must have one top-most parent apart from the '<fest>...</fest>'
                }
            
                //console.log(JSON.stringify(compiledFests[0],undefined,2));
                //console.log(buildString(compiledFests[0]));
                //break;
            }
        }
    }else{
        var ssrHtml = html;
        html = html.replace(/\/\/==INTERNAL\s(.*?)\/\/INTERNAL\s/gs,"//");
        ssrHtml = ssrHtml.replace(/\/\/==EXTERNAL\s(.*?)\/\/EXTERNAL\s/gs,"//");
    
    }
    //console.log(JSON.stringify(compiledFests[0],undefined,2));
   // console.log(html.replace(fests[0],JSON.stringify(compiledFests[0])));
   
//    fs.writeFileSync("C:/Users/Public/NES/Festjs/PROJECT208/festjs/scripts/bodybuilder2.js",html);
//    fs.writeFileSync("C:/Users/Public/NES/Festjs/PROJECT208/festjs/app.css",STYLESHEET);
return ssrMode?{ssrCode:ssrHtml,code:html}:html;
}
// var xc = '<fest><div onclick={function(){return 67}} fest={s} class={"dark-color-1"} style="font-size:18px;position:relative;paddin:35px 10px 10px 10px;margin:10em 0px 20px 60px;opacit:0.4"></div></fest>'
// console.log(translate(xc));
//var fs = require("fs");
//console.log(getFestComponents(s));`function(
//translate(fs.readFileSync("C:/Users/Public/NES/Festjs/PROJECT208/festjs/statics/js/test1.jsx","utf-8"));
var ssrMode = !false;
function ssr(b){return
    if(typeof (b)=="boolean"){ssrMode=b;return}
    ssrMode=false;
}
/**
 * 
 * @param {string} html 
 */
function parseSSRHtml(html){
    html = html.replace(/\/\/<.*?\/\/>/gs,"");
    var templates = html.match(/{{.*?}}/gs);
    var JSTemplates = [],i,count=0;
    if(templates){
        var jsValue = {
            value:"",
            replace:""
        }
        for(i=0;i<templates.length;i++){
            jsValue.replace = `${REPLACERS._templateStart}${Math.random()}${REPLACERS._templateEnd}${i}`;
            jsValue.value = templates[i].replace("{{","${HTMLEscape(").replace(/(}})$/,")}");
            html=html.replace(templates[i],jsValue.replace);
            JSTemplates.push(jsValue);
            jsValue = {};
        }
        html = html.replace(/\s\s/gs," ");//.replace(/<\!\-\-\?PLEASE DO NOT MODIFY THIS COMMENT. IT WILL BE REPLACED WITH YOUR APP\?\-\->/,"${render()}")
        
        for(i=0;i<JSTemplates.length;i++){
            html = html.replace(JSTemplates[i].replace,JSTemplates[i].value)
        }
    }else{
        html = html.replace(/\s\s/gs," ");//.replace(/<\!\-\-\?PLEASE DO NOT MODIFY THIS COMMENT. IT WILL BE REPLACED WITH YOUR APP\?\-\->/,"${render()}")
       
    }
    return `module.exports = function(JSERVE,HTMLEscape,PAGEDATA,INSERTABLE){\nreturn \`${html.replace(/[ ][ ]/g," ").replace(/[ ][ ][ ]/g," ").replace(/[ ][ ]/g," ")}\`;\n}`
}
var oneSrcImages = "";
function imageSrc(v){
    if(typeof (v)=="string"&&v.length){
        oneSrcImages=escape(v);
    }
}
module.exports = {translate,getCSSObject,getStyleSheet,prefix,ssr,parseSSRHtml,imageSrc}
//translate(s);

// var babel = require("@babel/core");
// var t = require("@babel/types");

// const code = "<div id='myId' class='thanks' >{kt==df?<div><h1 class='hello ok you' >{props.tag.text}</h1></div>:'GOOD'}</div>";

// const output = babel.transformSync(code, {
//   sourceType: "module",
//   ast: true,
//   plugins: [
//   "C:/Users/Public/NES/Festjs/PROJECT208/festjs/node_modules/@babel/plugin-syntax-jsx",
//     function myCustomPlugin() {
//       return {
//         visitor: {
//           Identifier(path) {
//             if (t.isJSXElement(path.node)) {
//               console.log("JSXElement found");
//             }
//           },
//         },
//       };
//     },
//   ],
// });
// console.log(JSON.stringify(output,undefined,2));


// var more = true,kl=0;
// while(kl<10000){
//     kl++;
//     try {
//         console.log(getCssVar()," ____________________________ ",kl);
//     } catch (error) {
//         more=false;
//     }
// }

