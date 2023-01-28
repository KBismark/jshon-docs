module.exports = function(JSHON){


!function(){

    JSHON.pathname = "/module/topnav.js";

    function App(){

        return (
            function htmlString(args){return (`<div class="white-color jsh-H jsh-I jsh-J jsh-K jsh-L jsh-M jsh-N"><div><h1 class=" jsh-y jsh-O jsh-P jsh-Q">${JSHON.getRightValue('{JSHON}')}</h1></div><nav id="top-nav-1" class=" jsh-R"><a href="" class="btn white-btn jsh-S">Get Started</a><a href="" class="link white-color">Documentation</a><a href="" class="link white-color">Learn by Doing</a><a href="" class="link white-color">Useful Blogs</a><a href="" class="link white-color">Our Community</a><span title="Switch between light and dark modes" tabindex="0" role="button" class="ti ti-moon white-border-on-hover jsh-C jsh-q jsh-E jsh-F"></span><a target="_blank" referrerpolicy="no-referrer" title="See source code on github" href="" class="ti ti-brand-github white-color white-border-on-hover jsh-S jsh-C jsh-q jsh-E jsh-F"></a></nav><nav title="Navigation alternative for small screens" id="top-nav-2" class=" jsh-R"><a href="" class="btn white-btn jsh-S">Get Started </a><a href="" class="link white-color">Docs</a><a href="" class="link white-color">Learn</a><a href="" class="link white-color">Blogs</a><a href="" class="link white-color">Community</a><span title="Switch between light and dark modes" tabindex="0" role="button" class="ti ti-moon white-border-on-hover jsh-C jsh-q jsh-E jsh-F"></span><a target="_blank" referrerpolicy="no-referrer" title="See source code on github" href="" class="ti ti-brand-github white-color white-border-on-hover jsh-S jsh-C jsh-q jsh-E jsh-F"></a></nav><div id="menu"><span class="ti ti-menu-2 jsh-T jsh-F"></span><nav></nav></div></div>`)}
        )
    };

    JSHON.export = {
        App:JSHON.ui.createComponent(App)
    }
}();
}