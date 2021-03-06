import { Component } from '@angular/core';

@Component({
    selector: 'page-menu',
    template: `
        <h1>Window Menu</h1>

        <textarea codeHighlight>
        import {DuiAppModule} from '@deepkit/desktop-ui';
        </textarea>

        <p>
            Directives to manipulate the application's and windows's OS menu bar.
            This only works when the app is running in Electron.
        </p>

        <p>
            See Electron documentation to check what property values are available.<br/>
            <a openExternal="https://electronjs.org/docs/api/menu-item">electronjs.org/docs/api/menu-item</a>
        </p>

        <textarea codeHighlight="html">
        <dui-menu role="appMenu" onlyMacOs></dui-menu>
        <dui-menu role="fileMenu">
            <dui-menu-item label="Test"></dui-menu-item>
        </dui-menu>
        <dui-menu label="Menu 2" *ngIf="showMenu2">
            <dui-menu-item label="Hi =)"></dui-menu-item>
        </dui-menu>
        </textarea>
    `
})
export class MenuComponent {
}

