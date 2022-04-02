import { Component } from '@angular/core';

@Component({
    template: `
        <div class="page">
            <div class="wrapper fadeIn" style="position: relative;">
                <img class="bg" src="/assets/images/startpage-bg.svg"/>
            </div>
            <div class="wrapper text">
                <div class="overline fadeIn" style="--delay: 1s">登场</div>

                <h1 class="fadeIn" style="--delay: 1s">高性能<br/>TYPESCRIPT 框架</h1>
            </div>

            <main>
                <div class="overline fadeIn" style="--delay: 2s">主旨</div>
                <p class="tagline fadeIn" style="--delay: 2.5s">
                    高性能的 TypeScript 库，以及一个将所有东西聚合在一起的框架。<br/>
                    精确的集成，优雅的优化，坚实的工程。
                </p>
                <p class="buttons fadeIn" style="--delay: 3s">
                    <a class="button big" routerLink="/framework">框架</a>
                    <a class="button big" routerLink="/library">库</a>
                </p>
            </main>
            
            <dw-footer class="fadeIn" style="--delay: 4s"></dw-footer>
        </div>
    `,
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent {

}
