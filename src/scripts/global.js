//<
import "../jshon"
//>

!function(){
    JSHON.pathname = "/module/global.js";
    const {createComponent,render,createCallback, getElement} = JSHON.ui;
    const codeparser = new Parser();
    codeparser.theme(1,true);

    function ToggleBodyStyle(){

        return (
            <jshon>
                <style>
                    <>{
                        args?`
                        body{
                            margin: 0px;background-color: #011410;color: rgb(206, 200, 200);font-weight: 500;
                            font-size: 18px;
                            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                            overflow-x: hidden;
                        }
                        `:`
                        body{
                            margin: 0px;background-color: #011410;color: rgb(206, 200, 200);font-weight: 500;
                            font-size: 18px;
                            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                            background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 3000 700" width="100%25" height="700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"%3E%3Crect x="0" y="0" width="100%25" height="700" fill="%23001220"%3E%3C/rect%3E%3Cpath d="M0 110L116.7 113.3C233.3 116.7 466.7 123.3 700 130.2C933.3 137 1166.7 144 1283.3 147.5L1400 151L1400 0L1283.3 0C1166.7 0 933.3 0 700 0C466.7 0 233.3 0 116.7 0L0 0Z" fill="%23e0ffff" fil="%230d0448"%3E%3C/path%3E%3Cpath d="M0 73L116.7 70C233.3 67 466.7 61 700 54.7C933.3 48.3 1166.7 41.7 1283.3 38.3L1400 35L1400 0L1283.3 0C1166.7 0 933.3 0 700 0C466.7 0 233.3 0 116.7 0L0 0Z" fill="%23001220"%3E%3C/path%3E%3C/svg%3E');
                            background-repeat: no-repeat;
                            overflow-x: hidden; 
                        }
                        `
                    }</>
                </style>
            </jshon>
        )
    };

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

    function CodeShowCase(){


        return (
            <jshon>
                <div style="display: flex;justify-content: center;flex-wrap: wrap;">
                    <div id="jshon-hello-1" style="flex:1;display: flex;justify-content: center;">
                        <>{args[0]}</>
                    </div>
                    <div id="jshon-hello-2" style="flex:1;display: flex;justify-content: center;">
                        <>{args[1]}</>
                    </div>
                </div>
            </jshon>
        )
    }

    function CodeHeader(){

        return (
            <jshon>
                <div style="border-bottom: 1px solid rgb(56, 56, 56);padding:0px 10px 5px 10px;margin-bottom: 10px;display: flex;justify-content: space-between;">
                    <div>
                        <div style="display: flex;">
                            <span style="background-color: rgb(5,170,69);padding: 9px;border-radius: 50%;margin-right: 5px;"></span>
                            <span style="background-color: rgb(177, 189, 6);padding: 9px;border-radius: 50%;margin-right: 5px;"></span>
                            <span style="background-color: rgb(128, 0, 28);padding: 9px;border-radius: 50%;margin-right: 5px;"></span>
                        </div>
                    </div>
                    <div>
                        <i style="color: rgb(56, 56, 56);font-size: 15px;"><>{args}</></i>
                    </div>
                </div>
            </jshon>
        )
    }
    CodeHeader = createComponent(CodeHeader);

    JSHON.export = {
        ToggleBodyStyle:createComponent(ToggleBodyStyle),
        CodeEditor:createComponent(CodeEditor),
        CodeShowCase:createComponent(CodeShowCase)

    }
    

}();