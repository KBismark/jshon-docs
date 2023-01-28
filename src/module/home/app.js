

!function(){
    JSHON.pathname = "/module/home/app.js"
    JSHON.include("/module/topnav.js");
    JSHON.include("/module/global.js");
    JSHON.onload = function(){
        const {
            render, createCallback, setState, setClass,
            setAttribute
        } = JSHON.ui;

        const {
            ToggleBodyStyle, CodeShowCase, CodeEditor
        } = JSHON.import.from("/module/global.js");

        function App(){
            

            this.onCreation = function(){
                function update(This){
                    This=!This?this:This;
                    This.state.timer = setTimeout(createCallback(This,function(){
                        if(!this.state.paused){
                            this.state.next(this);
                            this.state.timer = this.state.update(this);
                        }
                        
                    },true),11000);
                };
                function next(This){
                    This=!This?this:This;
                    var next = This.state.nextEditor+1;
                    if(next>This.state.lastEditor){
                        next=0;
                    }
                    setState(This,{nextEditor:next});
                }
                function prev(This){
                    This=!This?this:This;
                    var prev = This.state.nextEditor-1;
                    if(prev<0){
                        prev=This.state.lastEditor;
                    }
                    setState(This,{nextEditor:prev});
                };

                this.state = {
                    nextEditor:0,
                    lastEditor:2,
                    paused:false,
                    timer:undefined,
                    update:update,
                    next:next,
                    prev:prev,
                    components:{
                        topnav:JSHON.import.from("/module/topnav.js").App.getInstanceRef(),
                        togglebody:ToggleBodyStyle.getInstanceRef(),
                        showcase:CodeShowCase.getInstanceRef(),
                    },
                    showcaseEditors:[
                        {
                            editors:[CodeEditor.getInstanceRef(),CodeEditor.getInstanceRef()],
                            titles:["HelloWorld.js","HelloWorld.js --Compiled"],
                            codes:[
`function HelloWorld(){
    return <jshon${">"}
        <h1>Hello World!</h1>
    </jshon>
}`.replace(/    /gs,"  "),
`function HelloWorld(){
    return {
        tag: "h1", attr: {},
        children: ["Hello World!"]
    }
}`.replace(/    /gs,"  ")
                            ],
                            
                        },
                        {
                            editors:[CodeEditor.getInstanceRef(),CodeEditor.getInstanceRef()],
                            titles:["HelloName.js","HelloName.js --Compiled"],
                            codes:[
`function HelloName(){
    this.onCreation=function(){
        this.state = {
            name:"John",
            ...yourdata
        };
        //Persist state object even 
        //if this component is destroyed 
        //and detached from the DOM
        this.keepStateOnDetach(true);
    }
    return <jshon${">"}
        <h1>
            Hello <>{this.state.name}</>!
        </h1>
    </jshon>
}`.replace(/    /gs,"  "),
`function HelloName(){
    this.onCreation=function(){
        this.state = {
            name:"John",
            ...yourdata
        };
        //Persist state object even 
        //if this component is destroyed 
        //and detached from the DOM
        this.keepStateOnDetach(true);
    }
    return {
        tag: "h1", attr: {},
        children: [
            "Hello ",
            function(args){
                return this.state.name
            },
            "!"
        ]
    }
}`.replace(/    /gs,"  ")
                            ],
                            
                        },
                        {
                            editors:[CodeEditor.getInstanceRef(),CodeEditor.getInstanceRef()],
                            titles:["Welcome.js","Welcome.js --Compiled"],
                            codes:[
`const {createComponent, render} = JSHON.ui;
function Welcome(){
    return <jshon${">"}
        <h1>
            Hello <>{args.name}</>!
            Welcome.
        </h1>
    </jshon>
}
Welcome = createComponent(Welcome);
function App(){
    this.onCreation = function(){
        this.state = {
            welcome:Welcome.getInstanceRef()
        };
        this.keepStateOnDetach(true);
    }
    return <jshon${">"}
        <div style="text-align:center">
            <>
                {
                    render(
                        this.state.welcome,
                        {name:"John"}
                    )
                }
            </>
        </div>
    </jshon>
}
App = createComponent(App);
//Start App
createApp(
    "/welcome",//Route name
    App.getInstanceRef(),
    null,
    document.getElementById("app")
)
`.replace(/    /gs,"  "),
`const {createComponent, render} = JSHON.ui;
function Welcome(){
    return {
        tag: "h1", attr: {},
        children: [
            "Hello ",
            function(args){
                return args.name
            },
            "! Welcome."
        ]
    }
};
Welcome = createComponent(Welcome);
function App(){
    this.onCreation = function(){
        this.state = {
            welcome:Welcome.getInstanceRef()
        };
        this.keepStateOnDetach(true);
    }
    return {
        tag: "div", attr: {
            style:"text-align:center"
        },
        children: [
            function(args){
                return render(
                    this.state.welcome,
                    {name:"John"}
                )
            }
        ]
    }
}
App = createComponent(App);
//Start App
createApp(
    "/welcome",//Route name
    App.getInstanceRef(),
    null,
    document.getElementById("app")
)
`.replace(/    /gs,"  ")
                            ],
                            
                        }
                    ]
                };

                this.keepStateOnDetach(true);
                this.state.update(this);
            };

            this.elements = {
                control:{
                    onclick:createCallback(this,function(){
                        if(this.state.paused){
                            this.state.paused = false;
                            this.state.timer = this.state.update(this);
                            setClass(this,"control",{
                                remove:["white-border","ti-player-play"],
                                add:["ti-player-pause"]
                            });
                            setAttribute(this,"control",{title:"Pause presentation"})
                        }else{
                            this.state.paused = true;
                            clearTimeout(this.state.timer);
                            this.state.timer = undefined;
                            setClass(this,"control",{
                                add:["white-border","ti-player-play"],
                                remove:["ti-player-pause"]
                            });
                            setAttribute(this,"control",{title:"Play presentation"})
                            
                        }
                    })
                },
                prev:{
                    onclick:createCallback(this,function(){
                        clearTimeout(this.state.timer);
                        this.state.prev(this);
                        this.state.timer = this.state.update(this);
                    })
                },
                next:{
                    onclick:createCallback(this,function(){
                        clearTimeout(this.state.timer);
                        this.state.next(this);
                        this.state.timer = this.state.update(this);
                    })
                }
            }

            return (
                {t:'div',a:{},c:[function(args){return (render(this.state.components.togglebody,false))},function(args){return (render(this.state.components.topnav))},{t:'div',a:{"id":"frontage","class":" jsh-w"},c:[{t:'div',a:{"class":" jsh-x"},c:[{t:'h2',a:{},c:["JavaScript-HTML Object Notation"]}]},{t:'h3',a:{"class":" jsh-y jsh-z jsh-A"},c:[" Reactivity with ",{t:'span',a:{"class":" jsh-B"},c:["Possibilities"]}]},{t:'div',a:{"class":" jsh-g jsh-h jsh-A"},c:[{t:'span',a:{"key":"prev","title":"Show previous slide","tabindex":"0","role":"button","class":"ti ti-player-track-prev white-border-on-hover jsh-C jsh-D jsh-E jsh-F"},c:[]},{t:'span',a:{"key":"control","title":"Pause presentation","tabindex":"0","role":"button","class":"ti ti-player-pause white-border-on-hover jsh-C jsh-D jsh-E jsh-F jsh-G"},c:[]},{t:'span',a:{"key":"next","title":"Show next slide","tabindex":"0","role":"button","class":"ti ti-player-track-next white-border-on-hover jsh-C jsh-D jsh-E jsh-F"},c:[]}]}]},function(args){return (render(this.state.components.showcase,this.state.showcaseEditors[this.state.nextEditor].editors.map((e,i)=>{
                            return render(e,{
                                title:this.state.showcaseEditors[this.state.nextEditor].titles[i],
                                code:this.state.showcaseEditors[this.state.nextEditor].codes[i],
                                container:i?{
                                    class:"popper-show-cn"
                                }:{
                                    class:"popper-show-cn"
                                }
                            })
                        },this)))}]}
            )
        };

        

        JSHON.export = {
            App:JSHON.ui.createComponent(App)
        }
    }
    
}()