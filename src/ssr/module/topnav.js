module.exports = function(JSHON){


!function(){

    JSHON.pathname = "/module/topnav.js";

    function App(){

        return (
            function htmlString(args){return (`<div class="white-color jsh-S jsh-P jsh-Q jsh-A jsh-R jsh-C jsh-D"><div><h1 class=" jsh-E jsh-F jsh-G jsh-H">${JSHON.getRightValue('{JSHON}')}</h1></div><nav id="top-nav-1" class=" jsh-I"><a href="" class="btn white-btn jsh-J">Get Started</a><a href="" class="link white-color">Documentation</a><a href="" class="link white-color">Learn by Doing</a><a href="" class="link white-color">Useful Blogs</a><a href="" class="link white-color">Our Community</a><span title="Switch between light and dark modes" tabindex="0" role="button" class="ti ti-moon white-border-on-hover jsh-K jsh-q jsh-L jsh-M"></span><a target="_blank" referrerpolicy="no-referrer" title="See source code on github" href="" class="ti ti-brand-github white-color white-border-on-hover jsh-J jsh-K jsh-q jsh-L jsh-M"></a></nav><nav title="Navigation alternative for small screens" id="top-nav-2" class=" jsh-I"><a href="" class="btn white-btn jsh-J">Get Started </a><a href="" class="link white-color">Docs</a><a href="" class="link white-color">Learn</a><a href="" class="link white-color">Blogs</a><a href="" class="link white-color">Community</a><span title="Switch between light and dark modes" tabindex="0" role="button" class="ti ti-moon white-border-on-hover jsh-K jsh-q jsh-L jsh-M"></span><a target="_blank" referrerpolicy="no-referrer" title="See source code on github" href="" class="ti ti-brand-github white-color white-border-on-hover jsh-J jsh-K jsh-q jsh-L jsh-M"></a></nav><div id="menu"><span class="ti ti-menu-2 jsh-N jsh-M"></span><nav></nav></div></div>`)}
        )
    };

    JSHON.export = {
        App:JSHON.ui.createComponent(App)
    }
}();
}