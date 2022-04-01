# DeepKit 框架介绍

TypeScript 已经占领了 Web 开发的领域，并将继续存在。其对如今人们编写 Web 应用的方式产生了巨大的积极影响——过去如此，现在也如此。但我们认为，TypeScript 的能力并未得到充分的利用，我们想要通过一个全新的框架来填补这道空白，这个框架的形式是先前从未存在过的。

TypeScirpt 拥有令人难以置信的灵活性以及受众多开发者喜爱的类型系统。不幸的是，它在这方面的能力在运行时几乎完全不存在。类型是有价值的，但我们却轻易地在编译期间将其丢弃。在运行时保留这些类型将会有巨大的积极意义。

## 运行时类型

在运行时拥有类型信息将会改变一切。序列化器、验证器、GraphQL/RPC 框架，编码器，数据库抽象，以及许多其他的方案都需要类型信息来正确运作。这些方案中，许多已经以某种方式尝试通过变通方案来解决这个问题，并依赖上了 TypeScript 装饰器（译注：此指 TypeORM、MikroORM、Typegoose 等），而另一些则完全依赖上了自定义的领域特定语言，甚至依赖代码生成来正确运作（译注：此指 Prisma）。一些人尝试说服世界这是一种“现代的工作流”，但我们将其视为一种我们不应该接受的根本缺陷。应该存在一种更好的方式。

这种方式严重增加了项目的复杂性，并且，正如现在所证明的，根本没有必要。我们现在已经开发了一个编译器，其可以将 TypeScript 转换到字节码，因此在运行时，我们不仅可以动态计算类型，还可以使用一种反射（Reflection） API 来获取所有类型信息。

有了这个工具，用元数据来丰富类型，使用纯 TypeScript 来描述数据库、GraphQL 或验证器的结构，以及更多都变得可能。但其不止于此，它还允许使用崭新的方式来利用类型进行开发。

例如，我们可以在 TypeScript 中使用一种功能齐全的类型转换（cast）函数。由于所有的类型信息现在都可以在运行时获得，我们有史以来第一次有可能在 TypeScript 中实现真正的类型转换。

```typescript
cast<string>(12); //"12"
cast<boolean>(1); //true
cast<number>("1.2"); //1.2
```

当然，它并不局限于原始类型，它还可以拓展到更复杂的类型：类、接口、映射类型以及种种：

```typescript
class User {
  id: number = 0;
  created: Date = new Date();
  constructor(public username: string) {}
}

cast<User>({ username: "Peter" }); //User instance
cast<Partial<User>>({ username: "Peter" }); //{username: 'Peter'}

type Nums = { [name in `on${number}`]: number };
cast<Nums>({ on2: "12" }); //{on2: 12}
```

这对序列化到 JSON 或任何其他编码方式也有效：

```typescript
serialize<Date>(new Date()); //'2022-03-22T18:52:42.276Z'
```

验证以及类型守卫也可以用它实现：

```typescript
is<string>("abc"); //true
is<string>(23); //false
is<Date>(new Date()); //true
```

DeepKit 开箱即有类型转换、序列化/反序列化器，验证器和自动类型守卫，所有的 TypeScript 类型都受支持。这包括：原始类型（string, number, boolean, starts）、数组、元组、日期、类、接口、字面对象（object literals）、映射类型、索引签名、模板字面字符串（template literals）、以及集合、映射（map）。也就是所有你能在 TypeScript 中定义的类型。

## 类型装饰器

为了展示另一个用例——数据库结构——有必要先介绍一个新的概念：类型装饰器。

在 TypeScript 中，有一种模式被称为 Branded Types。我们略微采用了这一概念来用元数据（metadata）丰富类型。元数据可以是验证规则或某字段是否是主键。

```typescript
type PrimaryKey = { __meta?: ["primaryKey"] };
```

我们现在可以添加这个类型到其他类型中来附加元信息 `['primaryKey']。

```typescript
type ID = number & PrimaryKey;

interface User {
  id: ID;
  username: string;
}
```

在运行时，元信息是可获取的，因此验证器、序列化器或其他数据库工具可以使用它。

DeepKit 提供了一整套这样的类型装饰器：integer、int8、uint8、int16、int32、PrimaryKey、Reference、AutoIncrement ，以及一些用于验证的类型：Alpha、Alphanumeric、Positive、Negative、MinLength、Maximum、Includes、Excludes、Validator\<Function\>，以及 Group、Excluded、MapName，和更多其他类型。有了这些类型，崭新的工作流就可以将担保映射到类型中（map guarantees into types） 。

例如，可以定义一个 `Username` 类型，其所有的语义规则都内嵌在类型中。

```typescript
type Username = string & MinLength<3> & MaxLength<23> & Alphanumeric;
```

然后使用它：

```typescript
is<Username>("Peter"); //true
is<Username>("xo"); //false
validate<Username>("xo"); //[{message: '过短, 至少三个字符'}]

cast<Username>("xo"); //抛出错误
cast<Username>("Peter"); //验证通过

// 也可以在其他类型中使用
interface User {
  username: Username;
}

cast<User>({ username: "xo" }); //抛出错误
cast<User>({ username: "Peter" }); //验证通过
```

就像这样，我们拥有一个远比这更强大的类型系统。但它并没有就此停止。

## 数据库结构

我们可以在多得多的地方使用这些类型装饰器。例如数据库结构。我们可以使用类型来声明什么是主键、外键、索引、唯一键，以及更多。

```typescript
interface User {
  id: integer & PrimaryKey & AutoIncrement;
  username: Username & Unique;
  createdAt: Date & MapName<"created_at">;
  image?: Image & Reference; //成为外键
  posts: Post[] & BackReference;
}
```

事实上，DeepKit ORM 正式基于这些类型，这使得只是用 TypeScript 来描述你的数据库实体成为可能。代码生成或是实验性的只能用于类的属性装饰器将不再有必要。

DeepKit ORM 是唯一一个开箱即支持所有 TypeScript 类型的 ORM。这包括：嵌入式文档（embedded documents）、泛型、索引签名、联合类型、常量枚举，以及其他的一切。所有类型的验证都是自动进行的。这是将 TypeScript 的力量与数据库抽象，如 ORM，相结合的重大飞跃。

## 路由器

在 HTTP 路由器中也是一样的：定义路由参数的类型后，它们会被自动转换并验证。这对查询参数、url 参数以及 body 都有效。

```typescript
router.get("/user/:id", (id: number & Positive) => {
  //id 被担保为一个正的 number
});

type UserCreate = Omit<User, "id" | "createdAt">;

router.post("/user", (body: HttpBody<UserCreate>) => {
  //body 被担保为是确切的形状 （body is guaranteed to be that exact constructed shape）
});
```

这可以大量节省代码，因为否则你必须在路由器的控制器中编写验证和转换的逻辑。

## 依赖注入

在后端框架中，直到最近才有可能编写适当模块化的应用和库（译注：此指 NestJS 等），因为一旦依赖注入的容器与 TypeScirpt 一起使用，人们就或多或少地被迫针对实现而非抽象进行开发。这只是因为 TypeScript 接口在与你形式并不存在。半成品变通方法被使用，但他们都没法规模化（scale），也看起来不是很好。但那都是过去的事了。

有了 DeepKit Injector，你现在可以基于抽象编写真正的模块化代码。也就是说，接口可以作为依赖使用。

```typescript
interface Logger {
  log(...message: any[]): void;
}

class MyService {
  constructor(private logger: Logger) {}
}

class LoggerImplementation implements Logger {
  log(...message: any[]): void {
    console.log(...message);
  }
}

new App({
  providers: [MyService, LoggerImplementation],
}).run();
```

就像这样，你完美地将 `MyService` 与任何日志库解耦了。 `MyService` 类不再依赖于具体的实现，就像你目前在许多其他框架中需要的那样，而是一个松散耦合的接口，你只需要提供（译注：特指依赖注入中的 provide）一个适当的服务来实现它。然后它就将被自动注入到 `MyService` 中。这种连接依赖关系的方式 在 PHP 和 Java 等语言中是众所周知的，而现在这也成为了 TypeScript 的一部分。

## 配置

在服务中获取配置总是相当繁琐的。然而，拥有了运行时类型和获取计算信息（computation information）的能力，我们可以使用一种以前从未存在过的崭新模式。

```typescript
class Config {
  debug: boolean = false;
  domain: string = "localhost";
}

class MyService {
  constructor(private domain: Config["domain"]) {}

  doIt() {
    this.domain; //localhost
  }
}

new App({
  config: Config,
  providers: [MyService],
}).run();
```

通过简单地将 `Config['domain']` 定义为依赖，`domain` 背后的实际值会被依赖注入的容器注入。`domain` 属性的类型是 `string`，并且可以在单元测试中轻易提供。与框架完全解耦。

```typescript
new MyService("localhost");
```

同样的，获取部分配置也是可实现的：

```typescript
class MyService {
  constructor(private config: Pick<Config, "domain" | "debug">) {}
}

// 在单元测试中
new MyService({ domain: "localhost", debug: false });
```

由于已经介绍了附加验证规则（validation information）到任何类型的能力，服务或应用的必要配置可以在 TypeScript 中被完整描述，框架会确保一切都被正确地反序列化并验证，例如从环境变量中。

## 运作方式

类型编译器的核心是一个 TypeScript 转换器（transformer），它将显式声明的类型信息提取到字节码，这些字节码随后在运行时会在一个迷你虚拟机中执行。结果是一个包含所有信息的类型对象（`{ kind: ReflectionKind.string }`）。

一旦安装了 `@deepkit/type-compiler`，该转换器就会被安装在本地安装的 typescript 包中，因此它可以直接与 `Angular`、`ts-node`、`Webpack` 与 `co` （Webpack&co） 一起运作。另外，你也可以在类似 `Webpack` 和 `ts-loader` 这样的构建系统中手动配置该转换器。

如果你想要拥有一个关于它工作方式的非常详细的解释，请阅读 <a target="_blank" href="https://github.com/microsoft/TypeScript/issues/47658">TypeScript Bytecode Interpreter / Runtime Types</a>。

## 高性能

通过在运行时拥有所有详细的类型信息，我们便有可能为所有类型的过程创建 JIT 优化后的函数：序列化、验证、变更检测（译注：用于 Angular）等等。DeepKit 利用运行时的类型信息做到了这一点。它的序列化器、验证其和 ORM 按需构建高度优化的函数，这些函数比任何通用的版本做得更好、更快。这也是为什么 DeepKit ORM 是市面上最快的 JavaScript ORM 的原因。JSON 序列器、BSON 编码器和验证器也经过了优化，这使得 DeepKit RPC、HTTP 路由器、配置系统和许多其他功能都非常快。

![ORM Performance](/assets/blog/deepkit-orm-performance.png)

## 调试器和分析器

一个项目越大、越复杂，拥有为框架专门定制的复杂的调试和分析工具就越重要。我们想确保你能感受到应用的行为，而不是在黑暗中使用 `console.log()` 胡乱调试。

我们希望为 TypeScript 带来同样的开发者体验，就像开发者在其他语言的框架中已经享受到的一样，比如 `Symfony`/`Laravel`。

![Profiler](/assets/screenshots-profiler/overview.png)

## 企业

由于我们专门针对企业，在你的项目开发过程中，我们可以成为你的后盾。我们将提供企业支持，确保你在面临架构或技术问题时不是孤独无依的。只有你是成功的，我们才也会成功。

## 更多

我希望上面展示的内容能够很好地概述 DeepKit 框架所提供的新特性。DeepKit 库是基于这些基本理论的新方案：ORM、RPC、Broker、Desktop UI 等等。我们想在以后的博文中向你详细介绍这些。

如果你有任何问题，或者只是好奇，加入我们的 Discord 聊天吧！

<a class="button" target="_blank" href="https://discord.gg/U24mryk7Wq">加入 Deepkit 的 Discord</a>

如果你已经读到这儿了，是时候尝试一下了！

<a class="button" href="/documentation/framework">起步</a>
