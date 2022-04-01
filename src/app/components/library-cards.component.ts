import { Component } from '@angular/core';

@Component({
    selector: 'library-cards',
    template: `
        <div class="big-cards">
            <library-card class="card fancy-hover" package="@deepkit/type" title="Type" sub="运行时类型系统">
                <p>拥有反射、高性能序列化和验证以及更多特性的运行时 TypeScript 类型。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/orm" title="ORM" sub="数据库抽象层">
                <p>具备 Unit of Work、迁移以及更多特性的高性能 TypeScript ORM。</p>
                <p>MySQL, PostreSQL, SQLite, MongoDB.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/orm-browser" title="ORM Browser" sub="可视化数据库浏览器">
                <p>填充、迁移或显示你的数据库的 ER 示意图。附带交互式查询提示。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/rpc" title="RPC" sub="远程过程调用">
                <p>为 TypeScript 打造的一个现代高性能远程过程调用（RPC）框架。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/desktop-ui" title="Desktop UI" sub="为桌面应用打造的 GUI 库">
                <p>拥有 Electron 特性的为 桌面/Web 用户界面打造的 Angular 桌面 GUI 库。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/broker" title="Broker" sub="消息总线">
                <p>可用于发布/订阅模式、键值对存储以及中心原子应用锁的高性能且类型安全的消息总线服务器。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/debugger" [linkDocumentation]="true" title="Debugger" sub="调试器和分析器">
                <p>用于 DeepKit 框架的，具有高阶分析器、数据管理，以及上下文调试的交互式调试器。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/bson" [linkDocumentation]="true" title="BSON" sub="BSON 编码/解码器">
                <p>最快的 BSON 解析器和序列化器。比官方的 bson-js/bson-ext 快 13 倍，且比 JSON 快 2 倍。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/mongo" [linkDocumentation]="true" title="Mongo" sub="MongoDB 客户端">
                <p>用于现代 TypeScript 的高性能的 MongoDB 客户端：完整的异步错误堆栈跟踪、大整数支持、完全类型安全。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/injector" [linkDocumentation]="true" title="Injector" sub="依赖注入">
                <p>一个拥有构造函数/属性注入、类型安全的配置系统、compiler-passes、作用域和标签的编译式高性能依赖注入容器</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/template" [linkDocumentation]="true" title="Template" sub="HTML 模板引擎">
                <p>基于 TSX 的完全类型安全且快速的模板引擎，支持依赖注入和异步模板。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/topsort" [linkDocumentation]="true" title="Topsort" sub="拓扑排序">
                <p>一个拓扑排序/依赖解析的快速实现，拥有类型分组算法。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/http" [linkDocumentation]="true" title="HTTP" sub="HTTP 内核">
                <p>基于工作流系统和装饰器的一个拥有异步控制器支持的 HTTP 内核。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/logger" [linkDocumentation]="true" title="Logger" sub="日志抽象">
                <p>支持颜色、域、多种传输器和格式化器的日志库。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/event" [linkDocumentation]="true" title="Event" sub="事件调度器">
                <p>异步、类型化、解耦的事件调度器。</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/workflow" [linkDocumentation]="true" title="Workflow" sub="有限状态机">
                <p>用于管理工作流或有限状态机的工作流库。</p>
            </library-card>

<!--            <library-card class="card fancy-hover" package="@deepkit/type-angular" [linkDocumentation]="true" title="Type-Angular" sub="Type: Angular addon">-->
<!--                <p>A powerful form builder for Angular based on @deepkit/type.</p>-->
<!--            </library-card>-->
        </div>
    `
})
export class LibraryCardsComponent {

}
