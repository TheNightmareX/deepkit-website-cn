import { Component } from '@angular/core';

@Component({
    template: `
        <div class="page">
            <div class="wrapper">
                <div class="overline">TYPESCRIPT</div>
                <h2>库</h2>

                <p class="feature-text">
                    一个在 MIT 许可下的开源 TypeScript 库的集合，可独立使用也可合并使用。
                    每个库都存在于其专属的 NPM 包中，这些库经过精心优化，且遵循现代最佳实践。
                </p>

                <p class="feature-text">
                    渐进式地依次采用 DeepKit 的库，或者在 DeepKit 框架中使用所有这些库。
                </p>

                <library-cards style="display: block; margin: 80px 0;"></library-cards>
            </div>
        </div>
    `
})
export class LibrariesComponent {

}
