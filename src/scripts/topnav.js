//<
import "../jshon"
//>

!function(){

    JSHON.pathname = "/module/topnav.js";

    function App(){

        return (
            <jshon>
                <div class="white-color" style="z-index:10;position:sticky;top:0;padding:10px;background-color:#092032;display:flex;justify-content:space-between;">
                    <div>
                        <h1 style="color:#fff;font-size: 30px;font-weight:700;margin: 0px;"><>{'{JSHON}'}</></h1>
                    </div>
                    <nav id="top-nav-1" style="align-self: center;">
                        <a href="" class="btn white-btn" style="text-decoration: none;" >Get Started</a>
                        <a href="" class="link white-color">Documentation</a>
                        <a href="" class="link white-color">Learn by Doing</a>
                        <a href="" class="link white-color">Useful Blogs</a>
                        <a href="" class="link white-color">Our Community</a>
                        <span title="Switch between light and dark modes" tabindex="0" role="button" class="ti ti-moon white-border-on-hover" style="background-color: #000;border-radius: 50%;padding: 4px 5.5px;cursor: pointer;"></span>
                        <a target="_blank" referrerpolicy="no-referrer" title="See source code on github" href="" class="ti ti-brand-github white-color white-border-on-hover" style="text-decoration: none;background-color: #000;border-radius: 50%;padding: 4px 5.5px;cursor: pointer;"></a>
                    </nav>
                    <nav title="Navigation alternative for small screens" id="top-nav-2" style="align-self: center;">
                        <a href="" class="btn white-btn" style="text-decoration: none;" >Get Started </a>
                        <a href="" class="link white-color">Docs</a>
                        <a href="" class="link white-color">Learn</a>
                        <a href="" class="link white-color">Blogs</a>
                        <a href="" class="link white-color">Community</a>
                        <span title="Switch between light and dark modes" tabindex="0" role="button" class="ti ti-moon white-border-on-hover" style="background-color: #000;border-radius: 50%;padding: 4px 5.5px;cursor: pointer;"></span>
                        <a target="_blank" referrerpolicy="no-referrer" title="See source code on github" href="" class="ti ti-brand-github white-color white-border-on-hover" style="text-decoration: none;background-color: #000;border-radius: 50%;padding: 4px 5.5px;cursor: pointer;"></a>
                    </nav>
                    <div id="menu">
                        <span class="ti ti-menu-2" style="font-size: 26px;cursor: pointer;"></span>
                        <nav>

                        </nav>
                    </div>
                </div>
            </jshon>
        )
    };

    JSHON.export = {
        App:JSHON.ui.createComponent(App)
    }
}();