import { Component } from '@angular/core';

@Component({
    selector: 'page-indicator',
    template: `
        <h1>Indicator</h1>

        <textarea codeHighlight>
        import {DuiIndicatorModule} from '@deepkit/desktop-ui';
        </textarea>

        <dui-indicator [step]="progress"></dui-indicator> {{progress}}<br/>
        <dui-indicator [step]="0.2"></dui-indicator><br/>
        <dui-indicator [step]="1"></dui-indicator><br/>
        <dui-indicator [step]="0"></dui-indicator><br/>

        <p>
            <dui-slider [(ngModel)]="progress"></dui-slider>
        </p>
    `
})
export class IndicatorComponent {
    progress = 0.5;
}
