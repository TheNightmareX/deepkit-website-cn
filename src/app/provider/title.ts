import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class TitleService {

    constructor(
        protected title: Title,
    ) {
    }

    setTitle(name: string = '') {
        this.title.setTitle(
            (name ? name + ' | ' : '')
            + 'Deepkit - 高性能 TypeScript 框架'
        );
    }
}
