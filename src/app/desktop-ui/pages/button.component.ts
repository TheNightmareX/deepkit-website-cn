import { Component } from '@angular/core';

@Component({
    selector: 'page-button',
    template: `
        <h1>Button</h1>

        <p>
            <dui-button [disabled]="disabled">Default Button</dui-button>
            <dui-button [active]="true" [disabled]="disabled">Active Button</dui-button>
            <dui-button textured [disabled]="disabled">Textured button</dui-button>
            <dui-button square [disabled]="disabled">Square button</dui-button>
        </p>

        <p>
            <dui-button square [disabled]="disabled" icon="add"></dui-button>
        </p>

        <div>
            <dui-button textured [disabled]="disabled" [openDropdown]="dropdown1" icon="arrow_down" iconRight>
                Dropdown
            </dui-button>
            <dui-dropdown #dropdown1>
                <div style="padding: 5px 25px;">
                    Hi there!
                </div>
            </dui-dropdown>
        </div>

        <p>
            <dui-button textured [disabled]="disabled" [openDropdown]="dropdown2" icon="arrow_down" iconRight>
                Dropdown items
            </dui-button>
            <dui-dropdown #dropdown2>
                <dui-dropdown-item>Flag A</dui-dropdown-item>
                <dui-dropdown-item [selected]="true">Flag B</dui-dropdown-item>
                <dui-dropdown-item>Flag C</dui-dropdown-item>
                <dui-dropdown-splitter></dui-dropdown-splitter>
                <dui-dropdown-item>Reset</dui-dropdown-item>
            </dui-dropdown>
        </p>

        <dui-checkbox [(ngModel)]="disabled">Disable all</dui-checkbox>
    `
})
export class ButtonComponent {
    disabled = false;
}
