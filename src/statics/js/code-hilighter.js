var s = `
function CodeEditor(args){
    this.onCreation = function(){
        this.state = {
            components:{
                header:createCallback(this,function(){
                    if(!this.state.components.head){
                        this.state.components.head = CodeHeader.getInstanceRef();
                    }
                    return this.state.components.head;
                })
            },
            codeNode:null,
            buildCode:createCallback(this,function(code){
                var node = getElement(this,"code_container");
                if(node){
                    if(this.state.codeNode){
                        node.appendChild(this.state.codeNode)
                        return 
                    }
                    codeparser.toEditor(node,code,"js");
                    this.state.codeNode = node.children[0];
                }
                
            })
        }
        this.keepStateOnDetach(true);
    }

    this.onParentCall = function(args){
        this.state.buildCode(args.code);
        this.title = args.title;
    }

    this.onDetach = function(){
        this.state.codeNode.remove()
    }

    this.elements = {
        container:args.container?args.container:{}
    }

    return (
        <jshon>
            <div key="container" class="glow-on-hover" style="min-height:500px;padding: 10px 0px 0px 0px;border-radius: 15px;width:95%;border: 2px solid rgb(5,170,69);background-color: #011410;">
                <>{typeof(this.title)=="string"?render(this.state.components.header(),this.title):null}</>
                <div>
                    <div key="code_container"></div> 
                </div>
            </div>
        </jshon>
    )
}
`;


var htmlTags = [
    "script","html","i","head","meta","body","style","p","div","title","link","h1","jshon","span"
],htmlCpart=[],hts;
var blueKeyWords = ["const","export","false","true","final","void"]; 
var pinkKeyWords = ["while","break","try","case","catch","continue","default","do","else","for","goto","if","return","throw","switch"];
var javScriptBlueKeyWords = [
    "=>","debugger","async","delete","function","in","instanceof","interface","new","null",
    "super","this","typeof","var","let","of","NaN","class"
]; 
var javScriptPinkKeyWords = ["with","finally","package","import","as","await"];


function checkStart(s,arr){
    for(var i=0; i< arr.length; i++){
        if(arr[i].startsWith(s)){
            return arr[i];
        }
    }
    return "";
}
/**
 * 
 * @param {string} s 
 */
function isEmpty(s){
    return s.length==0||!(/[^\s]/.test(s));
}

/**
 * 
 * @param {string} s 
 */
function f(s){
    var i;
    var lines = s.split("\n");
    var parsed = [];
    var currentLine;
    

    for(i = 0; i<lines.length;i++){
        currentLine = lines[i];
        if(isEmpty(currentLine)){
            parsed.push({
                type:"empty",
                value:currentLine
            })
        }else{
            
        }
    }
}

function isHtmlSpecialChar(s){
    return /[\s)(\]\[}{]]/.test(s);
}
function isHtmlTag(s){
    //(.*?)(\/>|>)
    /<[a-zA-Z][a-zA-Z0-9-]*\s*/.test(s)
}

/**
 * 
 * @param {string} s 
 */
function l(s,lineNum){
    var i;
    var isMatching = false;
    var singleCommentOn = false;
    var multiCommentOn = false;
    var tildStringOn = false;
    var singleQuoteStringOn = false;
    var multiQuoteStringOn = false;
    var tildStringValue = "";
    var singleQuoteValue = "";
    var multiQuoteValue = "";
    var singleCommentValue = "";
    var multiCommentValue = "";
    var htmlOn = false;
    var htmlValue = "";
    var htmlSingleQuoteOn = false;
    var htmlMultiQuoteOn = false;
    var htmlMultiQuoteValue = "";
    var htmlSingleQuoteValue = "";
    var htmlAttributes = "";
    var htmlJsAttrOn = false;
    var htmlJsAttrValue = "";
    var htmlAssigning = false;
    var html = [];
    var lastHTML = -1;
    var lastHtmlAttr;
    var matchingKey = "";
    var expectedKey = "";
    var parsed = [];
    var colors = {
        blue:1,
        pink:2,
        green:3,
        tag:4
    };
    var colorOn = 0;
    var fallBackWord = "";
    var currentWord = "";
    var isOn = 0;
    function whatsOn(){
        if(singleCommentOn){return 1}
        if(multiCommentOn){return 2}
        if(tildStringOn){return 3}
        if(singleQuoteStringOn){return 4}
        if(multiQuoteStringOn){return 5}
        if(htmlOn){return 6}
        return 0;
    }
    function addvalue(s,on){
        switch (on) {
            case 1:
                singleCommentValue+=s;
                break;
            case 2:
                multiCommentValue+=s;
                break;
            case 3:
                tildStringValue+=s;
                break;
            case 4:
                singleQuoteValue+=s;
                break;
            case 5:
                multiQuoteValue+=s;
                break;
            case 6:
                htmlValue+=s;
                break;
            default:
                fallBackWord+=s
                break;
        }
    };
    
    loop:
    for(i = 0; i < s.length; i++){
        if(/[\s]/.test(s[i])){//Whitespace

        }else{
            
            if(
                !(
                    isOn = whatsOn()
                )
            ){
                if(!matchingKey.length){
                    switch (s[i]) {
                        case "/":
                            if(s.length>i){
                                if(s[i+1]=="/"){//Single Line Comment from here
                                    parsed.push({
                                        type:"comment",
                                        value:s.slice(i),
                                        single:1
                                    });
                                    break loop;
                                }else if(s[i+1]=="*"){
                                    multiCommentOn = true;
                                    multiCommentValue += "/";
                                }
                            }
                            break;
                        case "'":
                            singleQuoteStringOn = true;
                            singleQuoteValue = "'";
                            break;
                        case '"':
                            multiQuoteStringOn = true;
                            multiQuoteValue = '"';
                            break;
                        case "`":
                            tildStringOn = true;
                            tildStringValue = "`";
                            break;
                        case "<":
                            if(i==0||(isHtmlSpecialChar(s[i-1])&&s.length>i&&isHtmlTag("<"+s[i+1]))){
                                htmlOn = true;
                                htmlValue = "<";
                            }
                    
                        default:
                            break;
                    }
                }else{
                    currentWord = matchingKey + s[i];

                    expectedKey = checkStart(currentWord,blueKeyWords);
                    if(!expectedKey.length){
                        expectedKey = checkStart(currentWord,javScriptBlueKeyWords);
                        if(!expectedKey.length){
                            expectedKey = checkStart(currentWord,javScriptPinkKeyWords);
                            if(!expectedKey.length){
                                expectedKey = checkStart(currentWord,pinkKeyWords);
                                if(!expectedKey.length){
                                    expectedKey = checkStart(currentWord,htmlTags.map(e=>"<"+e));
                                    colorOn = colors.tag;
                                }
                            }
                        }
                    }

                    if(!expectedKey.length){
                        colorOn = 0;
                        fallBackWord = currentWord;
                    }
                }
                
            }else{
                if(htmlOn){
                    lastHTML = html[html.length-1];
                    if(!lastHTML||!lastHTML.opened){
                        lastHTML = {
                            opened:true,
                            tag:"",
                            attrs:[]
                        };
                        html.push(lastHTML);
                    }
                    if(/[\s]/.test(s[i])){
                        if(lastHTML.gotTag){
                            if(htmlAssigning){
                                switch (s[i]) {
                                    case '"':
                                        
                                        break;
                                
                                    default:
                                        break;
                                }
                                if(htmlMultiQuoteOn){

                                }else if(htmlSingleQuoteOn){

                                }else if(htmlJsAttrOn){

                                }
                            }else{
                                htmlAssigning = false;
                                htmlMultiQuoteOn = false;
                                htmlSingleQuoteOn = false;
                                htmlJsAttrOn = false;

                            }
                        }else{
                            lastHTML.gotTag = true;

                        }
                    }else{
                        if(!lastHTML.gotTag){
                            lastHTML.tag+=s[i];
                        }else{
                            if(!htmlAssigning){
                                if(s[i]=="="){
                                    htmlAssigning = true;
                                }else{
                                    lastHtmlAttr = lastHTML.attrs[lastHTML.attrs.length-1];
                                    if(!lastHtmlAttr){
                                        lastHtmlAttr = {
                                            name:""
                                        }
                                    }
                                    lastHtmlAttr.name+=s[i];
                                }
                                
                            }else{
                                lastHtmlAttr = lastHTML.attrs[lastHTML.attrs.length-1]
                                if(!lastHtmlAttr||!lastHtmlAttr.name.length){
                                    //Throw error. Html attributes must have a name
                                }else{
                                    if(typeof(lastHtmlAttr.value)!="string"){
                                        lastHtmlAttr.value = "";
                                    }
                                    lastHtmlAttr.value+=s[i];
                                }
                            }
                        }
                    }
                    lastHTML.tag+=s[i];
                }else{
                    addvalue(s[i],isOn);
                    switch (s[i]) {
                        case "*":
                            if(s.length>i&&multiCommentOn){
                                if(s[i+1]=="/"){//Multi Line Comment from here
                                    parsed.push({
                                        type:"comment",
                                        value:multiCommentValue,
                                        multi:1,
                                        ends:true
                                    });
                                    multiCommentOn = false;
                                    multiCommentValue = "";
                                }
                            }
                            break;
                        case "'":
                            if(singleQuoteStringOn){
                                parsed.push({
                                    type:"string",
                                    value:singleQuoteValue,
                                    single:1
                                });
                            }
                            singleQuoteStringOn = false;
                            singleQuoteValue = "'";
                            break;
                        case '"':
                            if(multiQuoteStringOn){
                                parsed.push({
                                    type:"string",
                                    value:multiQuoteValue,
                                    multi:1
                                });
                            }
                            multiQuoteStringOn = false;
                            multiQuoteValue = '"';
                            break;
                        case "`":
                            if(tildStringOn){
                                parsed.push({
                                    type:"string",
                                    value:tildStringValue,
                                    tild:1,
                                    ends:true
                                });
                            }
                            tildStringOn = false;
                            tildStringValue = "`";
                            break;
                    
                        default:
                            break;
                    }
                }
                
            }
        }
        
    }
    
    
}



function errors(lineNum,errstartNum,lineValue){

}