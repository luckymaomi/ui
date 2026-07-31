---
name: rapid-dev-skill
description: 通用项目初始化与持续交付全家桶 skill。用于扫描事实、确认阶段、建立完整项目规则与文档，并按默认快速开发或用户明确启用的专业开发模式完成代码、文档、测试、验证和收口；内置不会覆盖已有文件的 Python 初始化器，默认建立 MIT 协议、贡献与安全文档，并以 master 为默认推送分支。
---

# Rapid Dev Skill

你是项目的执行 Agent。你的任务不是套用一份空模板，而是先确认事实和当前阶段，再把项目建立成边界清楚、可以运行、可以验证、可以持续维护的当前主干。

本 skill 自包含全部规则、示例和初始化代码，不依赖其他 skill、模板或脚本。

### 双开发模式

初始化逻辑和项目底座在两种模式下完全相同。模式只决定初始化后的执行重量，不降低代码、文档或测试质量。

- **快速开发模式（默认）**：需求清楚后直接完成必要调查、实现、最有证明力的定向测试、文档同步和收口。`plan.md` 会由初始化器创建，但当前任务不持续维护它。不要询问用户是否需要计划，也不要因为任务复杂、跨模块或文件很多自动升级模式。
- **专业开发模式（显式启用）**：只有用户明确要求“专业模式”“使用 plan.md”“按计划开发”或“继续当前计划”时启用。先把 `plan.md` 写成当前任务执行合同，再持续维护设计、checklist、验证和收口。

快速模式不是草率模式。两种模式使用同一生产级代码标准、当前事实文档标准和稳定结果测试标准；专业模式只增加持久计划、完整影响记录和更广验证证据。

## 一、必须遵守的执行协议

首次接入、基础文件缺失或用户明确要求重新初始化时，严格按以下顺序执行：

1. 定位本 `rapid-dev-skill.md`，确认目标项目根目录。
2. 在目标项目根目录运行“只扫描”命令，不修改任何项目文件。
3. 阅读扫描结果和已有项目规则，不凭目录名称猜测产品事实。
4. 向用户报告已确认事实、未知项和建议阶段，请用户确认当前阶段。
5. 用户确认后运行初始化命令。已有文件只能跳过，禁止覆盖。
6. 阅读新建文件与已有文件，消除占位项；无法确认的内容必须明确标为待确认，不能伪装成事实。
7. 按确认阶段继续实际工作，不能只创建文档就停止。
8. 运行与风险相称的验证；专业模式更新计划，快速模式直接给出完成事实和剩余风险。

如果 `AGENTS.md`、`spec.md`、项目开发 skill、plan skill 和 `plan.md` 已经成立，视为初始化完成。后续快速模式不得重复运行初始化器、重新确认阶段、重建底座或要求用户确认计划；直接读取规则，从当前需求进入调查、代码、测试、文档和收口。只有底座真实缺失时补齐缺失文件，已有文件仍然只能跳过。

如果用户已经明确说出当前阶段，并且仓库事实没有冲突，不要重复询问；报告扫描结果后直接按该阶段继续。用户没有明确启用专业模式时，初始化后默认进入快速开发模式。

如果工作目录有未提交改动，默认这些改动属于用户。只处理当前任务相关文件，不回滚、不覆盖、不顺手整理无关内容。

## 二、直接执行命令

下面命令假设本文件位于目标项目根目录且文件名是 `rapid-dev-skill.md`。如果文件在其他位置，只替换命令中的路径，不改其余内容。

### 1. 扫描项目，不写文件

```powershell
python -c "import pathlib,re; p=pathlib.Path('rapid-dev-skill.md'); s=p.read_text(encoding='utf-8'); m=re.search(r'<!-- PROJECT_INIT_START -->\s*\x60{3}python\s*(.*?)\s*\x60{3}\s*<!-- PROJECT_INIT_END -->',s,re.S); exec(compile(m.group(1),str(p),'exec'))" --scan
```

### 2. 用户确认阶段后初始化

把 `<阶段>` 替换成扫描结果中的阶段值：

```powershell
python -c "import pathlib,re; p=pathlib.Path('rapid-dev-skill.md'); s=p.read_text(encoding='utf-8'); m=re.search(r'<!-- PROJECT_INIT_START -->\s*\x60{3}python\s*(.*?)\s*\x60{3}\s*<!-- PROJECT_INIT_END -->',s,re.S); exec(compile(m.group(1),str(p),'exec'))" --init --stage <阶段>
```

默认初始化已经包含 `CONTRIBUTING.md`、`SECURITY.md` 和 MIT `LICENSE`。需要显式标记公开可见性时使用：

```powershell
python -c "import pathlib,re; p=pathlib.Path('rapid-dev-skill.md'); s=p.read_text(encoding='utf-8'); m=re.search(r'<!-- PROJECT_INIT_START -->\s*\x60{3}python\s*(.*?)\s*\x60{3}\s*<!-- PROJECT_INIT_END -->',s,re.S); exec(compile(m.group(1),str(p),'exec'))" --init --stage <阶段> --visibility public
```

需要显式指定 MIT 版权人时使用：

```powershell
python -c "import pathlib,re; p=pathlib.Path('rapid-dev-skill.md'); s=p.read_text(encoding='utf-8'); m=re.search(r'<!-- PROJECT_INIT_START -->\s*\x60{3}python\s*(.*?)\s*\x60{3}\s*<!-- PROJECT_INIT_END -->',s,re.S); exec(compile(m.group(1),str(p),'exec'))" --init --stage <阶段> --visibility public --license mit --copyright "<版权人>"
```

未指定版权人时，初始化器使用当前系统用户名生成默认 MIT 版权行；生成后应根据项目 owner 的真实信息核对。

## 三、通用事实纪律

- 事实只能来自用户明确输入、当前仓库、命令输出、真实运行结果或已核验的权威资料。
- 用户目标、当前实现、当前文档和当前测试结果都是待核验的证据，不自动等于正确事实。历史记录和已废弃实现不参与当前方案设计，也不定义兼容目标。
- 任何尚未实现或尚未验证的能力，在任何载体中都不能表述为已经实现或已经通过。
- 必须区分五种状态：已确认事实、用户提供但未验证的事实、未验证推测、计划事项、已完成并验证事项。
- 专业模式中，新事实推翻原计划时先更新计划再继续；快速模式不为当前任务维护计划。
- 当前实现只服务当前生效语义。除非用户明确要求，否则不保留旧入口、旧名称、旧数据形态、转发层或过渡文件。
- 不使用机械替换、跨文件无审查批量替换或大小写不受控的命名迁移。
- 不读取、打印、提交或上传与任务无关的密钥、令牌、个人数据和私有配置。
- commit、push、部署、发布、生产数据变更、权限扩大和付费操作必须得到用户明确授权。用户授权 push 但未指定分支时，默认推送 `master`，不自行改成其他分支。

### 断裂式重建铁规矩

- 快速模式默认把旧代码、旧 schema、旧数据、旧状态、旧接口、旧测试、旧文档和本机持久状态全部视为可丢弃。它们不参与方案设计，不形成兼容要求，也不限制新主干形状。
- 日常开发禁止读取 `history.md`、旧提交、旧分支或归档代码寻找应当保留的行为。当前方案只由当前需求、当前事实 owner、当前权威合同和真实运行结果决定。只有用户的任务本身就是历史审计时，才临时读取历史取证。
- 当前正确事实一旦推翻旧 owner、schema、状态机、公共合同、入口或模块，直接按新模型重建唯一主干；定义、消费者、持久结构、配置、测试、文档、生成源和生成物必须在同一次交付全部替换。
- 不读取旧 schema，不推断旧字段，不保留旧状态，不增加旧接口别名、兼容转发、双读双写、临时桥接、历史包装、旧数据探测或测试专用路径。
- 开发数据库、临时验证记录、本机持久状态、旧测试绿灯、已投入时间和“少改文件”都不是迁移或兼容理由；需要时通过显式、范围可核验的 reset 重建。
- 用户明确声明存在必须保留的正式生产数据或外部公共合同时，本任务不再属于快速断裂模式；必须显式切换专业模式，单独设计一次性、可验证、可回滚的前向迁移，完成后仍删除旧路径。
- history 不是初始化必需文件，不属于代码、文档、测试三支柱，也不参与日常维护。历史弯路一旦提炼为本节禁止项，开发流程不再回读 history。
- 重建不是少做闭环。新主干仍必须同时闭合成功、拒绝、持久化、权限、中断、失败、恢复、观测、测试、文档和目标环境验证。

### 跨项目避雷

- 不用页面、菜单、接口、文件或功能数量冒充产品成熟；成熟只看用户任务和稳定业务结果是否闭环。
- 不用 mock、组件绿灯、代码存在或一次测试通过冒充真实产品完成。
- 不建立 Playground、概念稿、临时入口、隐藏 Tab、帮助文案或展示层第二状态源来绕开唯一业务主链。
- 不让 UI、handler、adapter、缓存或测试重新计算、保存或猜测 owner 已经拥有的事实。
- 不为修复表象添加项目名、文案、关键词、字符串或单次样例特判；先修事实模型和变化边界。
- 不把计划、功能地图、文件清单或 checklist 的完整度当成业务完成证据。
- 不为证明删除写旧字符串、旧路由、旧文件或旧元素“不存在”的反向长期测试。
- 不因某条旧路线曾经修好、投入很多或出现在历史中就永久保留；当前主线不再需要时直接删除。
- 不让菜单、CLI 命令、公共接口或模块一一暴露内部 owner；外部入口按用户任务收敛。
- 不复制参考项目的功能清单、模拟数据、业务规则或许可证受限源码；只吸收经过当前需求验证的机制。
- 不用固定高度、固定轨道、补偿断点、装饰容器或更多状态修补错误的信息结构；动态内容使用自然流，一个展示事实只有一个 owner。
- 不在未知副作用、丢响应或部分提交边界盲目重放；显式记录不确定事实并从持久 owner 对账。
- 不把“以前这样做过”“旧用户可能需要”“旧测试正在保护”“本机还有数据”当成任何设计论据。
- 不为旧入口写弃用期，不保留旧新并行窗口，不把已经推翻的模型包装成 fallback。
- 不让独立架构文档、功能地图、状态清单和 `spec.md` 重复拥有同一事实；同一事实只在唯一文档 owner 中演进。
- 不把技术栈、页面数量、模块数量、测试数量或 checklist 完成数当成产品完成；必须回到真实用户结果。
- 不把 demo、mock server、概念稿或内存 adapter 演化成第二套产品；展示入口必须消费同一合同和用户心智。
- 不让每个内部领域都变成公共菜单、CLI 命令或 API；公共面按用户任务收敛，内部 owner 留在边界内。
- 不用隐藏入口、帮助文案、万能设置页或“看起来正常”的假数据掩盖任务不可发现、状态未知或链路未闭合。
- 不因测试夹具、环境代理、浏览器时序或平台差异失败就给产品代码增加特判；先区分夹具、环境、外部 wire 与产品根因。
- 不用精确事件数量、固定调用次数、固定 DOM、固定文件名或固定时序证明业务正确；验证必要事实与最终结果。
- 不为了覆盖率在每一层重复同一结果；高层真实路径已证明时删除低层同义测试，底层不变量只留在可控同步点。
- 不把 HTTP 成功、函数返回、构建通过或单次绿灯等同于语义完整；核对用户可见结果、持久事实、拒绝和恢复。
- 不让正常退出成为正确性前提；接受、提交、中断、失败、重启、重放和清理都要有明确 owner。

事实表达示例：

```text
正确：仓库中存在 package.json，其中 scripts.test 为 "vitest run"；尚未实际运行。
错误：项目测试已通过。

正确：用户要求支持离线使用；当前代码中尚未找到离线存储实现。
错误：项目支持离线使用。

正确：计划采用 SQLite；这是待实现设计，不是当前数据事实。
错误：项目使用 SQLite。

正确：已运行完整验证命令，退出码为 0；核心路径另行实测通过。
错误：从代码看应该没问题。
```

## 四、项目阶段

阶段描述工作当前主要矛盾，不是版本号，也不是永久标签。

| 阶段值 | 阶段名称 | 进入条件 | 本阶段完成条件 |
| --- | --- | --- | --- |
| `requirements` | 需求确认 | 产品目标、用户、主路径或边界仍有关键未知项 | 需求、边界、验收方式得到用户确认 |
| `foundation` | 项目骨架 | 需求已确认，但规则、结构、运行入口或验证入口尚未成立 | 最小真实骨架可运行，项目规则和事实文档成立 |
| `implementation` | 实现执行 | 目标和设计明确，当前主要工作是实现当期范围 | 当期范围实现，针对性测试通过，文档同步 |
| `verification` | 验证验收 | 实现基本完成，当前主要工作是证明目标环境可用 | 完整验证和核心路径通过，失败项已修复或明确阻塞 |
| `closure` | 交付收口 | 验证已完成，当前主要工作是核对范围、状态和外部交付 | 计划收口，风险披露，授权的外部操作得到远端确认 |

阶段不是由文件数量机械决定。扫描器只提供建议，最终阶段必须结合用户目标和真实运行结果确认。

### 阶段确认示例

```text
已确认事实：仓库已存在源代码和测试配置；AGENTS.md 与 spec.md 缺失；当前测试尚未运行。
未知项：当期交付范围、目标环境和完整验证命令。
建议阶段：foundation（项目骨架）。
原因：实现已经存在，但项目规则、当前产品事实和验证入口尚未建立。
请确认当前按 foundation 阶段继续；如果不准确，请直接回复正确阶段和已经完成的事实。
```

```text
已确认事实：需求、设计和任务清单已存在；计划中仍有 6 项实现任务未完成。
建议阶段：implementation（实现执行）。
我将继续完成计划内实现、测试与文档同步。这个阶段判断是否准确？
```

```text
已确认事实：实现任务全部完成，针对性测试通过；尚未运行项目完整验证命令。
建议阶段：verification（验证验收）。
我将先运行完整验证和核心路径检查，再根据真实失败修复。这个阶段判断是否准确？
```

## 五、需求确认

先从用户已经提供的信息和仓库事实中找答案，不重复提问。只询问无法自行确认且不同答案会实质改变结果的问题，每轮优先问一到三个。

必须建立的需求事实：

- 项目是什么，服务谁，解决什么问题。
- 最重要的端到端用户路径是什么。
- 当前必须完成什么，明确不做什么。
- 输入、输出、状态和数据的来源、归属与生命周期。
- 权限、隐私、安全、成本、版权、合规和失败恢复边界。
- 目标运行环境、交付方式和不可改变的约束。
- 怎样验证完成，哪些观察结果代表失败。

提问示例：

```text
我已经确认目标是让用户完成 [主路径]。现在唯一会改变数据边界的问题是：数据只保存在当前设备，还是需要跨设备同步？
```

```text
当前仓库同时存在两种运行入口，但文档没有说明哪一个生效。请确认本次保留的唯一入口；确认后我会删除不再生效的入口，不建立兼容转发。
```

```text
当期范围和成功路径已经清楚。还缺一个验收事实：完成标准以自动验证命令通过为准，还是还必须包含目标环境中的人工主路径验收？
```

不合格提问示例：

```text
请一次性告诉我产品名、技术栈、颜色、数据库、部署平台、协议、用户画像、所有页面和全部未来功能。
```

问题在于它没有利用已有事实，也没有按对架构和边界的影响排序。

## 六、调查顺序

按以下顺序调查，先广后深：

1. 读取目标目录内所有适用的工作规则。
2. 查看目录结构、Git 状态、分支、远端和未提交改动。
3. 读取项目入口、事实文档、计划、依赖、运行配置和验证配置。
4. 从核心路径追踪真实状态、规则、数据和外部边界。
5. 运行最小只读检查，验证文档与实现是否一致。
6. 记录已确认事实、冲突、未知项和建议阶段。

调查结果示例：

```text
已确认事实
- 当前分支跟踪 origin/main，工作区有 2 个与本任务无关的未提交文件。
- 项目完整验证入口定义在 package scripts 的 verify 命令中。
- 主路径会写入本地数据库，写入失败会返回显式错误。

冲突
- README 仍描述已经删除的入口，与当前实现不一致。

未知项
- 目标环境中的权限拒绝路径尚未实测。

行动
- 保留无关未提交改动；先建立失败测试，再修正当前入口和 README，最后运行 verify 与主路径实测。
```

## 七、文件职责与完整示例

初始化器会按需创建以下文件。代码区中的模板是完整示例，不存在省略内容；生成后仍必须用真实事实替换明确标注的待确认项。

### `AGENTS.md`

只记录长期工作规则与协作纪律。产品能力变化不应直接导致它变化。

应包含：交流语言、事实纪律、工作区保护、项目级 skill 入口、计划规则、工程纪律、验证命令、安全边界和交付标准。

### `.agents/skills/plan/SKILL.md`

所有项目默认生成，但只有用户明确启用专业开发模式时才触发。它负责 `plan.md` 的写作、执行、进度更新和收口；任务规模本身不能触发计划。

### `.agents/skills/<项目名>-dev/SKILL.md`

所有项目默认生成。它负责当前项目的快速与专业两种开发流程，把事实调查、职责边界、代码、测试、文档同步、验证和交付规则放在一个可触发入口中。默认直接快速开发，用户明确启用专业模式时再接入 plan skill。初始化器会把目录名规范成小写连字符名称；无法得到有效英文名称时使用 `project-dev`。

业务、数据格式、外部系统或特定工作流需要独立方法时，可以在后续任务中新增对应 skill。初始化阶段不猜测这些业务 skill，也不自动创建只用于客户端展示的 `agents/openai.yaml`。

### `spec.md`

只记录当前生效的产品事实与边界。建议结构：产品定位、当前事实、用户路径、业务边界、技术边界、数据边界、当前不做、验收标准、协议事实。

待确认内容必须这样写：

```markdown
## 待确认

- [待用户确认，不是当前事实] 目标用户范围。
- [待仓库验证，不是当前事实] 数据持久化方式。
```

不能把它改写成没有证据的肯定句。

### `plan.md`

所有项目初始化时都创建。快速模式保留它但不为当前任务持续更新；用户明确启用专业模式后，它成为持续更新的唯一执行合同，固定顺序如下：

```markdown
# 当前任务

## 需求文档
- 用户要求与可验收解释。

## 当前事实
- 已由仓库或运行结果确认的事实。

## 失败测试
- 当前问题仍存在时可以观察到的结果。

## 目标
- 本次交付完成后的终局。

## 不做范围
- 本次明确排除的内容。

## 设计
- 职责、数据流、接口、错误与关键取舍。

## 实施任务
- [ ] research
- [ ] 实现
- [ ] 测试
- [ ] 文档同步
- [ ] 完整验证
- [ ] 收口

## 验证计划
- 要运行的真实命令、场景、环境和预期结果。

## 收口
- 完成事实、实际命令、通过项、未验证项和剩余风险。
```

以上执行规则只在专业模式生效：写完计划再改实现，checklist 随进度更新，新事实推翻计划时先改计划。快速模式直接完成实现、测试、文档和验证，不为流程更新计划。

### `README.md`

面向用户和新读者，只描述项目是什么、当前能做什么、如何开始、如何验证和适用的授权边界。不得承担内部工作日志或未来路线图职责。

### `.gitignore`

只忽略当前环境真实产生且不应进入版本控制的内容。不得用忽略规则掩盖应该清理或应该提交的文件。

### `CONTRIBUTING.md`

所有项目默认创建，说明贡献前提、默认 `master` 分支、变更边界、验证要求、提交信息和安全问题入口。

### `SECURITY.md`

所有项目默认创建，说明报告渠道、需要提供的信息、禁止公开披露的内容和敏感数据处理方式。

### `LICENSE`

所有项目默认创建 MIT License。不得覆盖已有协议；未指定版权人时使用当前系统用户名生成并在初始化后核对。

## 八、设计与实现规则

- 每次交付同时处理三个互相校验的支柱：代码实现当前事实，文档说明当前事实，测试证明稳定结果。任一支柱不能反向制造另一支柱的错误工作。
- 优先沿用已经成立的技术栈、命名、模块边界和本地辅助能力。
- 抽象只有在消除真实复杂度、减少有意义的重复或匹配既有模式时才成立。
- 单一职责按事实 owner 和变化原因判断，不按行数机械判断；文件体积只能触发职责审查，不能自动拆分。
- 状态、规则、数据读写、展示、外部接线和错误处理混在一起且变化原因不同时，拆清边界。
- 每个事实只有一个 owner；跨 owner 决策、事实重复、循环依赖或领域反向依赖交付层时，重审并收敛边界。
- 结构化数据使用结构化接口或解析器处理，不用脆弱的文本拼接代替。生成物必须从明确源确定性重建，禁止手改。
- 错误类型服务调用方恢复策略，不靠散落字符串控制核心流程；错误在拥有处理能力的边界解决，不能静默吞掉，也不能泄露敏感上下文。
- 测试保护稳定、可观察的业务结果、公共合同和高风险不变量，不保护已经废弃的行为或当前实现形状。
- 修改共享行为、跨边界合同、持久数据、安全规则或核心路径时，扩大验证范围。
- 文档、实现、测试和配置必须在同一次交付中描述同一套当前事实。

### 代码

- 从用户可观察结果追到唯一事实 owner，再同步入口、消费者、状态、错误、恢复和输出。
- 范围可以小，但进入主干的切片必须完整；不交 demo、占位成功、假兼容、双轨实现、空 handler 或无验收落点的 TODO。
- 当前事实推翻旧 owner、schema、状态机或公共合同时，在适用的数据边界内重建唯一主干并删除旧消费者；只有已确认的正式生产数据或外部合同才构成迁移与兼容理由。
- 不为了少改文件、保留本机状态或让旧测试继续通过而保留错误接口、旧字段、旧状态、别名或临时桥接。

### 文档

- `spec.md` 只拥有当前产品事实，`README.md` 只拥有用户入口，`AGENTS.md` 和项目 skill 只拥有长期开发规则，`plan.md` 只在专业模式拥有当前任务合同。
- 当前能力、运行方式、公共合同或长期规则没有变化时，不为了显得完整反复改文档。
- 未实现、未验证或已经删除的能力不能继续出现在当前文档；历史证据不能伪装成当前事实。

### 测试

新增或保留长期测试前先回答：

1. 它保护当前项目哪个稳定、可观察的业务结果、公共合同或高风险不变量？
2. 为什么现有更高层证据不能证明这个结果？
3. 页面、模块、文件和内部实现重建后，它是否仍有产品意义？

任一项答不出，就不新增；已有测试答不出时删除或提升到更有证明力的层级。

- 新增测试前先用一句业务语言说明它保护什么。只能描述文字、按钮、菜单、标题、颜色、布局、顺序、文件、路由、调用次数、查询批次或内部步骤时，它不属于长期合同。
- 每个结果只保留最有证明力的一层。真实主旅程已经证明的结果，不在 mock、组件、handler、service 和 repository 重复保护。
- UI 增删、改名、重新排列或模块重建不触发测试，除非稳定业务结果、权限边界或公共合同变化。可访问名称可以定位操作，但定位方式不是验收结果。
- 测试不能反向控制产品设计。稳定合同未变而测试因 UI、文件名或内部重构失败时，修正或删除测试，不为它保留旧实现或兼容路径。
- 并发和时序测试等待事件或可观察状态，不使用固定 sleep 或重复运行掩盖竞态。
- 默认快速模式运行最接近改动、最有证明力的短验证；专业模式按当前风险和计划扩大验证。耗时全量、真实外部服务、容量和发布物验收只在项目规则、风险或用户明确授权要求时运行。

实现决策示例：

```text
事实：两个调用方共享同一组独立规则，并且第三个调用方将在本次范围内接入。
决定：提取可测试的规则模块，调用方只负责接线。
```

```text
事实：一个 340 行文件只有一个变化原因，内部状态与规则高度内聚。
决定：记录职责审查结果并保留，不为了行数拆分。
```

```text
事实：旧名称只被旧测试引用，当前产品事实已经统一为新名称。
决定：删除旧测试与旧名称，不增加别名导出。
```

## 九、验证与收口

验证必须证明结果，不只是证明代码可以被读取。

快速模式从下列层级中选择足以证明当前稳定结果的最小证据集，不自动运行所有层级；专业模式按计划、风险和目标环境扩大验证。无论哪种模式，都不能用低层绿灯替代当前改动真正需要的高层证据。

验证层次：

1. 与改动最接近的格式、静态、规则或单元检查。
2. 真实模块协作、数据流和错误路径。
3. 项目定义的完整验证命令。
4. 核心用户路径在目标环境中的运行结果。
5. 最终差异、文件清单、工作区状态和授权外部状态。

验证记录示例：

```text
已运行
- <完整命令 A>：退出码 0。
- <完整命令 B>：共 42 项通过，0 项失败。
- <核心路径>：在 <目标环境> 实测成功。

未验证
- <场景>：因 <客观原因> 无法运行。

剩余风险
- <风险及影响>；如果没有，明确写“没有已知剩余风险”。
```

错误示例：

```text
测试应该能过。
代码看起来没问题。
后面再继续优化。
```

专业模式的完整交付必须回填计划中的完成事实、实际命令、通过项、未验证项和剩余风险。快速模式在最终回复中给出同样的事实，不为了记录形式维护计划。不能把未完成范围包装成“后续优化”。

## 十、初始化器完整源码

初始化器只使用 Python 标准库。它不会修改任何已有文件；每个已有路径都会输出 `skipped`。它根据可见仓库事实建议阶段和验证命令，但建议不是最终事实。

<!-- PROJECT_INIT_START -->
```python
from __future__ import annotations

import argparse
import datetime as dt
import getpass
import json
import os
import re
from pathlib import Path


PHASES = {
    "requirements": "需求确认",
    "foundation": "项目骨架",
    "implementation": "实现执行",
    "verification": "验证验收",
    "closure": "交付收口",
}

IGNORED_DIRS = {
    ".git", ".hg", ".svn", ".idea", ".vscode", "node_modules",
    "vendor", "dist", "build", "target", ".next", ".nuxt",
    ".venv", "venv", "__pycache__", ".pytest_cache", ".mypy_cache",
    ".ruff_cache", "coverage", ".coverage",
}

CODE_SUFFIXES = {
    ".c", ".cc", ".cpp", ".cs", ".css", ".dart", ".ex", ".exs",
    ".go", ".html", ".java", ".js", ".jsx", ".kt", ".kts", ".php",
    ".py", ".rb", ".rs", ".scala", ".swift", ".ts", ".tsx", ".vue",
}

MANIFESTS = {
    "package.json", "pyproject.toml", "requirements.txt", "Pipfile",
    "poetry.lock", "go.mod", "Cargo.toml", "pom.xml", "build.gradle",
    "build.gradle.kts", "composer.json", "Gemfile", "mix.exs", "pubspec.yaml",
}


def visible_files(root: Path) -> list[Path]:
    result = []
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        relative = path.relative_to(root)
        if any(part in IGNORED_DIRS for part in relative.parts):
            continue
        result.append(relative)
    return sorted(result, key=lambda item: item.as_posix().lower())


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except (OSError, UnicodeError):
        return ""


def skill_slug(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "project"


def detect_validation(root: Path) -> list[str]:
    commands: list[str] = []
    package_json = root / "package.json"
    if package_json.exists():
        try:
            scripts = json.loads(read_text(package_json)).get("scripts", {})
        except (json.JSONDecodeError, AttributeError):
            scripts = {}
        for name in ("format:check", "lint", "typecheck", "test", "build", "verify"):
            if name in scripts:
                commands.append(f"npm run {name}")

    pyproject = read_text(root / "pyproject.toml")
    if pyproject:
        if "[tool.ruff" in pyproject:
            commands.append("python -m ruff check .")
        if "[tool.mypy" in pyproject:
            commands.append("python -m mypy .")
        if "[tool.pytest" in pyproject or "pytest" in pyproject:
            commands.append("python -m pytest")

    if (root / "go.mod").exists():
        commands.append("go test ./...")
    if (root / "Cargo.toml").exists():
        commands.extend(["cargo fmt --check", "cargo clippy --all-targets", "cargo test"])
    if any(root.glob("*.sln")) or any(root.glob("*.csproj")):
        commands.extend(["dotnet build", "dotnet test"])

    unique = []
    for command in commands:
        if command not in unique:
            unique.append(command)
    return unique


def inspect_project(root: Path) -> dict:
    files = visible_files(root)
    names = {path.as_posix() for path in files}
    code_files = [path for path in files if path.suffix.lower() in CODE_SUFFIXES]
    manifests = [path.as_posix() for path in files if path.name in MANIFESTS]
    tests = [
        path.as_posix() for path in files
        if "test" in path.name.lower() or any(part.lower() in {"test", "tests"} for part in path.parts)
    ]
    docs = [name for name in ("AGENTS.md", "spec.md", "plan.md", "README.md") if name in names]
    plan = read_text(root / "plan.md")
    unchecked = len(re.findall(r"^- \[ \]", plan, flags=re.MULTILINE))
    checked = len(re.findall(r"^- \[[xX]\]", plan, flags=re.MULTILINE))
    validation = detect_validation(root)
    project_slug = skill_slug(root.name)
    expected_skills = [
        ".agents/skills/plan/SKILL.md",
        f".agents/skills/{project_slug}-dev/SKILL.md",
    ]
    project_skills = [
        path.as_posix() for path in files
        if len(path.parts) >= 4
        and path.parts[0] == ".agents"
        and path.parts[1] == "skills"
        and path.name == "SKILL.md"
    ]

    if "spec.md" not in names and not code_files and not manifests:
        suggested = "requirements"
        reason = "尚未发现已确认需求文档、代码或技术栈入口。"
    elif (
        any(name not in names for name in ("AGENTS.md", "spec.md", "README.md"))
        or any(path not in names for path in expected_skills)
    ):
        suggested = "foundation"
        reason = "项目已有内容，但长期规则、项目级 skill、当前事实或使用入口尚未完整建立。"
    elif unchecked > 0:
        suggested = "implementation"
        reason = "当前计划仍有未完成任务。"
    elif code_files and not validation:
        suggested = "verification"
        reason = "项目已有实现，但尚未识别出完整验证入口。"
    elif checked > 0 and unchecked == 0:
        suggested = "closure"
        reason = "计划任务已全部勾选，需要核验真实结果并完成收口。"
    elif code_files:
        suggested = "implementation"
        reason = "项目已有实现，尚需根据当前目标确认当期执行范围。"
    else:
        suggested = "foundation"
        reason = "需求文档或项目入口已出现，下一步应建立可运行、可验证的真实骨架。"

    return {
        "root": str(root),
        "project_name": root.name,
        "git_repository": (root / ".git").exists(),
        "file_count": len(files),
        "documents": docs,
        "project_skills": project_skills,
        "expected_project_skills": expected_skills,
        "manifests": manifests,
        "code_file_count": len(code_files),
        "test_file_count": len(tests),
        "plan_checked": checked,
        "plan_unchecked": unchecked,
        "detected_validation_commands": validation,
        "suggested_stage": suggested,
        "suggested_stage_name": PHASES[suggested],
        "suggestion_reason": reason,
    }


def validation_block(commands: list[str]) -> str:
    if not commands:
        return "- [待仓库确认，不是当前事实] 项目完整验证命令。"
    return "\n".join(f"- `{command}`" for command in commands)


def agents_template(project: str, project_slug: str, commands: list[str]) -> str:
    return f"""# {project} Agent 工作规约

本文件是本仓库的最高工作约束。产品事实看 `spec.md`；`plan.md` 始终存在，但只有 owner 明确启用专业模式时才是当前任务合同。

## 基础约束

- 始终使用简体中文和项目 owner 交流，除非 owner 明确要求其他语言。
- 阅读文本时使用正确编码；显示异常时先验证编码，不误判文件损坏。
- 不回滚 owner 已有改动，只处理当前任务相关文件。
- commit、push、发布和部署只在 owner 明确授权时执行。授权 push 但未指定分支时默认推送 `master`。
- 禁止机械替换、无审查批量替换和大小写不受控的命名迁移。
- 禁止旧别名、兼容转发、旧语义包装、历史适配层和过渡文件。
- 当前实现只服务当前生效事实。

## 事实纪律

- 判断必须基于 owner 明确输入、当前仓库、命令输出或真实运行结果。
- 区分已确认事实、owner 提供但未验证的事实、推测、计划事项和已完成并验证事项。
- 任何未实现或未验证内容，在任何载体中都不能写成已经实现或已经通过。
- 专业模式中新事实推翻计划时先更新 `plan.md`；快速模式不为当前任务维护计划。

## 文件职责

- `AGENTS.md`：工作规则和协作纪律。
- `spec.md`：当前产品事实、边界和验收标准。
- `plan.md`：初始化时创建；只在 owner 明确启用专业模式时成为当前任务合同。
- `README.md`：面向用户和新读者的使用入口。

## Skills

- 项目级 skill 放在 `.agents/skills/`。
- 任务命中 skill 的 `description` 时，必须先读取对应 `SKILL.md` 再行动。
- 默认使用快速开发模式，直接完成代码、文档、定向测试和收口。
- 只有 owner 明确要求专业模式、使用计划或继续计划时，才使用 `.agents/skills/plan/SKILL.md` 并维护根目录 `plan.md`；任务规模不能自动触发。
- 修改实现、测试、事实文档或运行配置时使用 `.agents/skills/{project_slug}-dev/SKILL.md`。
- 业务专属 skill 只在真实业务需要时新增，不把临时任务或产品事实硬编码进通用 skill。

## 双开发模式

- 快速模式是默认：需求清楚后直接调查、实现、运行最有证明力的短测试、同步文档并收口。
- 专业模式由 owner 明确启用：计划按需求、事实、失败测试、目标、不做范围、设计、任务、验证、收口组织，checklist 随进度更新。
- 两种模式使用相同生产级代码、当前事实文档和稳定结果测试标准；专业模式只增加持久计划和更广验证证据。

## 工程规则

- 优先沿用仓库已经成立的技术栈、命名和模块边界。
- 单一职责按事实 owner 和变化原因判断；文件体积只能触发职责审查，不能机械拆分。
- 状态、规则、数据、展示、外部接线和错误处理变化原因不同时，拆清边界。
- 结构化数据使用结构化接口，错误类型服务恢复策略，生成物只由确定性命令重建。
- 快速模式把旧代码、旧 schema、旧数据、旧状态、旧接口、旧测试、旧文档和本机状态视为可丢弃，禁止读取 history、旧提交、旧分支或归档代码寻找兼容行为。
- 当前事实推翻旧路径时断裂式重建唯一主干，同一次交付替换定义、消费者、持久结构、配置、测试、文档和生成物，不为历史、本机状态或旧测试保留兼容壳。
- owner 明确声明必须保留正式生产数据或外部合同时，退出快速模式并显式启用专业迁移；否则不设计 migration、弃用期或新旧并行窗口。
- 测试保护稳定业务结果、公共合同和高风险不变量，不保护文案、按钮、布局、顺序、文件、路由或内部步骤。
- 每个结果只保留最有证明力的一层；mock 绿灯和一次测试通过不能冒充真实用户路径完成。
- 不用页面、功能、文件、计划或测试数量冒充产品成熟，不建立临时入口或展示层第二事实源。
- 不为修表象增加项目名、文案、关键词、字符串或单次样例特判，不用反向缺席测试证明删除。
- 不从历史恢复旧能力，不以旧接口、旧 schema、旧数据、旧状态或旧测试定义当前兼容目标；history 不属于日常代码、文档、测试闭环。
- 文档、实现、测试和配置在同一次交付中保持一致。

## 完整验证

{validation_block(commands)}

快速模式先运行最接近改动、最有证明力的短验证；专业模式按计划和风险扩大验证。无法运行时说明具体命令、原因和剩余风险。

## 安全与交付

- 不泄露密钥、令牌、个人数据或私有配置。
- 破坏性操作、生产变更、权限扩大和付费操作需要明确授权。
- 交付必须说明完成事实、实际验证、未验证项和剩余风险，不交半成品。
- `LICENSE` 默认采用 MIT，贡献走 `CONTRIBUTING.md`，安全问题走 `SECURITY.md`。
"""


def spec_template(project: str) -> str:
    return f"""# {project} Spec

`spec.md` 只记录当前生效的产品事实与边界。所有待确认项都不是当前事实。

## 产品定位

- [待用户确认，不是当前事实] 项目是什么、服务谁、解决什么问题。

## 当前事实

- 项目名称：`{project}`。
- [待仓库确认，不是当前事实] 当前技术栈、运行入口和已实现能力。
- [待仓库确认，不是当前事实] 当前完整验证命令。

## 核心用户路径

1. [待用户确认，不是当前事实] 用户从哪里开始。
2. [待用户确认，不是当前事实] 用户执行什么关键动作。
3. [待用户确认，不是当前事实] 用户得到什么可观察结果。

## 业务边界

- [待用户确认，不是当前事实] 当期必须完成的范围。
- [待用户确认，不是当前事实] 权限、失败与恢复边界。

## 技术边界

- [待仓库确认，不是当前事实] 模块职责、外部依赖与运行环境。

## 数据边界

- [待用户与仓库共同确认，不是当前事实] 数据来源、归属、存储、生命周期和敏感级别。

## 当前不做

- [待用户确认，不是当前事实] 本期明确排除的内容。

## 验收标准

- [待用户确认，不是当前事实] 可复现的成功结果与失败结果。
- 项目完整验证命令通过。
- 文档、实现、测试和配置描述同一套当前事实。

## 授权边界

- 默认协议：MIT；以根目录 `LICENSE` 为准。
- 默认贡献分支：`master`；commit、push、发布和部署仍需 owner 明确授权。
"""


def plan_template(project: str, stage: str, commands: list[str]) -> str:
    return f"""# {project} 当前任务

> 初始化器预先创建本文件。默认快速模式不持续维护；只有 owner 明确启用专业模式、使用计划或继续计划时，本文件才成为当前任务合同。

## 需求文档

- 当前阶段：`{stage}`（{PHASES[stage]}），已由用户确认后写入。
- [待用户确认，不是当前事实] 当期目标和可验收要求。

## 当前事实

- 项目根目录：`{project}`。
- [待调查] 当前结构、主路径、数据流、工作区状态和验证入口。

## 失败测试

- [待定义] 哪些可观察结果代表当前问题仍然存在。

## 目标

- [待定义] 本次完成后的唯一当前主干和可验证终局。

## 不做范围

- [待用户确认] 本次明确排除的内容。

## 设计

- [待 research 后填写] 职责、数据流、接口、错误、安全与关键取舍。

## 实施任务

- [ ] 确认需求、边界与当前阶段。
- [ ] 调查当前实现和真实运行事实。
- [ ] 建立失败测试或等价复现。
- [ ] 完成当期实现。
- [ ] 完成测试与文档同步。
- [ ] 运行针对性检查和完整验证。
- [ ] 回填收口并完成授权范围内的交付。

## 验证计划

{validation_block(commands)}
- [待确认] 核心路径、目标环境和预期结果。

## 收口

- 完成事实：待填写。
- 实际命令：待填写。
- 通过项：待填写。
- 未验证项：待填写。
- 剩余风险：待填写。
"""


def plan_example_template() -> str:
    return """# <任务名称>

## 需求文档
- 把用户目标转成明确、可验收的要求。

## 当前事实
- 只记录仓库、命令或运行结果已经确认的事实。

## 失败测试
- 描述问题仍存在时可以观察到的结果。

## 目标
- 描述本次完成后的终局。

## 不做范围
- 明确排除容易扩张或误解的内容。

## 设计
- 说明职责、数据流、接口、错误、安全和关键取舍。

## 实施任务
- [ ] research
- [ ] 实现
- [ ] 测试
- [ ] 文档同步
- [ ] 完整验证
- [ ] 收口

## 验证计划
- 列出真实命令、场景、环境和预期结果。

## 收口
- 完成事实、实际命令、通过项、未验证项和剩余风险。
"""


def plan_skill_template(project: str, project_slug: str) -> str:
    return f"""---
name: plan
description: 仅当 owner 明确要求 {project} 使用专业开发模式、使用 plan.md、按计划开发或继续当前计划时，编写和执行单文件 plan.md；不得因任务复杂、跨模块、耗时或风险高自动触发。
---

# Plan

`plan.md` 在初始化时已经创建，但默认快速模式不持续维护。owner 明确启用专业模式后，它才成为当前任务的单文件执行合同，同时承担需求、事实、失败测试、目标、设计、任务、验证和收口记录。

## 触发后先做

1. 读取根目录 `AGENTS.md`。
2. 读取 `.agents/skills/{project_slug}-dev/SKILL.md`。
3. 调查当前仓库、工作区、实现、测试、文档和运行事实。
4. 已有 `plan.md` 属于当前任务时更新；不属于时先向 owner 确认是否替换。
5. 没有当前计划时，以 `plan.example.md` 为结构参考创建根目录 `plan.md`。
6. 写完计划再做大改；新事实推翻计划时，先更新计划再继续。

## 事实边界

- 用户输入是需求来源，不自动等于已经实现的事实。
- 只把仓库、命令、运行结果和 owner 明确确认的内容写成事实。
- 区分已确认事实、owner 提供但未验证的事实、推测、计划事项和已完成并验证事项。
- 一个任务只维护一个根目录 `plan.md`。
- checklist 随进度即时更新，不能在最后一次性全部勾选。
- 不把历史过程、废弃语义或兼容方案写入当前产品主干。

## 标准结构

`plan.md` 必须按以下顺序组织：

1. 需求文档：用户、问题、范围和可验收完成标准。
2. 当前事实：已经核实的实现、测试、文档、配置、能力、缺口和未知项。
3. 失败测试：问题仍存在时可观察或可自动验证的结果。
4. 目标：完成后可以明确判断成功或失败的终局。
5. 不做范围：本次明确排除的内容。
6. 设计：职责、状态、数据流、接口、错误、恢复、安全和关键取舍。
7. 实施任务：覆盖调查、实现、测试、文档、验证和交付的 checklist。
8. 验证计划：局部检查、完整验证、核心路径、目标环境和预期结果。
9. 收口：完成事实、实际命令、通过项、未验证项、剩余风险和外部操作状态。

## 完成标准

- owner 能从计划中判断需求、边界和完成状态。
- 开发者能按设计和任务继续执行。
- 验证者能按真实命令和场景复现结果。
- `plan.example.md` 只作为结构模板，不替代当前任务计划。
"""


def project_dev_skill_template(project: str, project_slug: str, commands: list[str]) -> str:
    return f"""---
name: {project_slug}-dev
description: 维护 {project} 项目时使用。适用于修改实现、接口、数据、测试、事实文档、依赖、构建和运行配置，要求先确认事实，再完成实现、验证、文档同步与交付闭环。
---

# {project} Development

在本项目发生开发性修改时使用本 skill。

## 开始前

1. 读取根目录 `AGENTS.md`、`spec.md` 和 `README.md`；只有 owner 明确启用专业模式时才把 `plan.md` 作为当前任务合同。
2. 检查 Git 状态、分支、未提交改动、目录结构、运行入口和验证入口。
3. 从当前任务涉及的入口追踪真实规则、状态、数据、错误和外部边界。
4. 区分已确认事实、owner 提供但未验证的事实、推测、计划事项和已完成并验证事项。
5. 默认进入快速模式直接开发；只有 owner 明确要求专业模式或计划时，才读取 `.agents/skills/plan/SKILL.md` 并维护根目录 `plan.md`。

## 实现规则

- 优先沿用仓库已经成立的技术栈、命名、模块边界和本地辅助能力。
- 每次交付同时闭合代码、文档和测试；测试与文档服务当前代码事实，不能反向制造无意义工作。
- 单一职责按事实 owner 和变化原因判断；文件体积只能触发职责审查，不能按行数机械拆分。
- 状态、规则、数据读写、展示、外部接线和错误处理变化原因不同时，拆清边界。
- 每个事实只保留一个 owner；跨 owner 决策、事实重复、循环依赖或领域反向依赖交付层时重审边界。
- 结构化数据使用结构化接口，错误类型服务恢复策略，生成物只由明确源和确定性命令重建。
- 不覆盖或回滚 owner 的无关改动，不建立旧别名、兼容转发、历史包装或过渡文件。
- 快速模式把旧代码、旧 schema、旧数据、旧状态、旧接口、旧测试、旧文档和本机状态视为可丢弃，禁止读取 history、旧提交、旧分支或归档代码寻找兼容行为。
- 当前正确事实推翻旧 owner、schema、状态机、接口或模块时，断裂式重建唯一主干，同一次交付替换定义、消费者、持久结构、配置、测试、文档、生成源和生成物；历史、本机状态、旧绿灯和少改文件不是兼容理由。
- owner 明确声明必须保留正式生产数据或外部合同时，退出快速模式并显式启用专业迁移；否则不设计 migration、弃用期或新旧并行窗口。
- 不用页面、功能、文件、计划或测试数量冒充产品成熟，不建立临时入口、概念稿消费者或展示层第二事实源。
- 不为修表象增加项目名、文案、关键词、字符串或单次样例特判，不从历史恢复旧能力或兼容目标。
- 不复制参考项目的功能清单、模拟数据、业务规则或受限源码；不在未知副作用或部分提交边界盲目重放。
- 任何未实现或未验证内容，在任何载体中都不能写成已经实现或已经通过。

## 测试规则

- 新增测试前先用一句业务语言说明它保护的稳定结果；再确认现有更高层证据不能证明，且页面、模块、文件或实现重建后仍有产品意义。任一项答不出就不新增。
- 每个结果只保留最有证明力的一层，不在浏览器、组件、handler、service、repository 和 mock 间重复证明。
- 不长期测试文案、按钮、菜单、标题、颜色、布局、顺序、文件、路由、调用次数、查询批次或内部步骤。
- UI 增删、改名、排列或模块重建不触发测试，除非稳定业务结果、权限边界或公共合同变化。
- 修复回归时先建立可复现的业务失败或等价证据；不用旧字符串、旧文件或旧路由“不存在”证明删除完成。
- 并发和时序等待事件或可观察状态，不用固定 sleep 或复跑掩盖竞态。

## 文档同步

- 产品当前事实变化时同步 `spec.md`。
- 用户使用、安装、运行或验证方式变化时同步 `README.md`。
- 长期协作规则或验证入口变化时同步 `AGENTS.md` 和本 skill。
- 专业模式中，当前任务范围、设计、状态或验证变化时同步 `plan.md`；快速模式不为流程更新计划。
- 删除的能力不得继续出现在实现、测试、文档或配置中。

## 完整验证

{validation_block(commands)}

快速模式先运行与改动最接近、最有证明力的短检查；专业模式再按计划和风险扩大到完整验证与核心路径。昂贵全量、真实外部服务、容量和发布物测试只在项目规则、风险或 owner 明确授权要求时运行。无法运行时写明具体命令、阻塞原因和剩余风险，不能写成已通过。

## 交付

- 检查最终差异、文件清单和工作区状态，只交付当前任务相关内容。
- commit、push、部署和发布只在 owner 明确授权时执行；授权 push 但未指定分支时默认推送 `master`。
- 收口说明完成事实、实际验证、未验证项和剩余风险，不以“后续优化”代替当期完成。
"""


def readme_template(project: str, commands: list[str]) -> str:
    command_text = "\n".join(f"{index}. `{command}`" for index, command in enumerate(commands, 1))
    if not command_text:
        command_text = "项目完整验证命令尚待根据当前技术栈确认。"
    return f"""# {project}

[待用户确认，不是当前事实] 用一句话说明项目是什么、服务谁和解决什么问题。

## 当前能力

- [待仓库验证，不是当前事实] 当前已经实现且用户可以使用的能力。

## 开始使用

[待仓库确认，不是当前事实] 写出从干净环境开始可以直接执行的安装与运行步骤。

## 验证

{command_text}

## 授权

本项目默认采用 MIT License，详见 `LICENSE`。贡献要求见 `CONTRIBUTING.md`，安全问题见 `SECURITY.md`。
"""


def gitignore_template(root: Path) -> str:
    lines = [
        "# Local secrets", ".env", ".env.*", "!.env.example",
        "", "# Editor and operating system", ".idea/", ".vscode/",
        ".DS_Store", "Thumbs.db", "", "# Logs", "*.log",
    ]
    if (root / "package.json").exists():
        lines.extend(["", "# JavaScript", "node_modules/", "dist/", "coverage/"])
    if (root / "pyproject.toml").exists() or (root / "requirements.txt").exists():
        lines.extend([
            "", "# Python", "__pycache__/", "*.py[cod]", ".venv/", "venv/",
            ".pytest_cache/", ".mypy_cache/", ".ruff_cache/", "dist/", "build/", "*.egg-info/",
        ])
    if (root / "Cargo.toml").exists():
        lines.extend(["", "# Rust", "target/"])
    if (root / "go.mod").exists():
        lines.extend(["", "# Go", "bin/", "coverage.out"])
    return "\n".join(dict.fromkeys(lines)) + "\n"


def contributing_template(commands: list[str]) -> str:
    return f"""# Contributing

## Before You Start

- Read `AGENTS.md` and `spec.md`. Read `plan.md` as the current task contract only when the owner explicitly enables professional mode.
- Target the `master` branch unless the owner explicitly names another branch.
- Open an issue or discussion before changing product boundaries.
- Never include secrets, private data, generated artifacts, or unrelated changes.

## Changes

- Keep each change focused on one current objective.
- Update implementation, tests, documentation, and configuration together.
- Do not add compatibility aliases or preserve behavior that is no longer current.

## Verification

{validation_block(commands)}

Run all applicable checks and report anything that could not be verified.

## Security

Do not disclose vulnerabilities in public issues. Follow `SECURITY.md`.
"""


def security_template() -> str:
    return """# Security Policy

## Reporting a Vulnerability

Report security issues privately to the repository owner through a private channel published by the project host. Do not open a public issue.

Include the affected version or commit, reproduction steps, impact, and any known mitigation. Remove secrets, personal data, and unrelated private information from the report.

The maintainer will acknowledge the report, verify the issue, coordinate a fix, and disclose it only after affected users have a reasonable mitigation path.
"""


def mit_license(copyright_holder: str) -> str:
    year = dt.datetime.now().year
    return f"""MIT License

Copyright (c) {year} {copyright_holder}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""


def write_new(path: Path, content: str, results: dict[str, list[str]]) -> None:
    if path.exists():
        results["skipped"].append(path.as_posix())
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8", newline="\n")
    results["created"].append(path.as_posix())


def initialize(root: Path, report: dict, args: argparse.Namespace) -> dict:
    project = args.project_name or report["project_name"]
    project_slug = skill_slug(report["project_name"])
    commands = report["detected_validation_commands"]
    results: dict[str, list[str]] = {"created": [], "skipped": []}

    files = {
        root / "AGENTS.md": agents_template(project, project_slug, commands),
        root / "spec.md": spec_template(project),
        root / "plan.md": plan_template(project, args.stage, commands),
        root / "plan.example.md": plan_example_template(),
        root / "README.md": readme_template(project, commands),
        root / ".gitignore": gitignore_template(root),
        root / ".agents" / "skills" / "plan" / "SKILL.md": plan_skill_template(project, project_slug),
        root / ".agents" / "skills" / f"{project_slug}-dev" / "SKILL.md": project_dev_skill_template(
            project, project_slug, commands
        ),
    }
    files[root / "CONTRIBUTING.md"] = contributing_template(commands)
    files[root / "SECURITY.md"] = security_template()
    if args.license == "mit":
        holder = args.copyright.strip() or getpass.getuser()
        files[root / "LICENSE"] = mit_license(holder)

    for path, content in files.items():
        write_new(path, content, results)
    return results


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Scan and initialize a project without overwriting files.")
    action = parser.add_mutually_exclusive_group()
    action.add_argument("--scan", action="store_true", help="Inspect only; this is the default.")
    action.add_argument("--init", action="store_true", help="Create missing project files.")
    parser.add_argument("--stage", choices=tuple(PHASES), help="User-confirmed current stage.")
    parser.add_argument("--project-name", help="Project name used in newly created documents.")
    parser.add_argument("--visibility", choices=("undecided", "private", "public"), default="public")
    parser.add_argument("--license", choices=("none", "mit"), default="mit")
    parser.add_argument("--copyright", default="", help="Copyright holder for a new MIT License.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = Path.cwd().resolve()
    report = inspect_project(root)
    output = {"scan": report}

    if args.init:
        if not args.stage:
            raise SystemExit("--init requires --stage after the user confirms the current stage.")
        output["initialization"] = initialize(root, report, args)
        output["next_action"] = (
            f"Read all project rules, replace confirmed placeholders with facts, "
            f"and continue the {args.stage} stage. Do not stop after creating documents."
        )
    else:
        output["next_action"] = (
            "Report confirmed facts and unknowns to the user, ask them to confirm the suggested stage, "
            "then run --init with the confirmed --stage."
        )

    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
```
<!-- PROJECT_INIT_END -->

## 十一、初始化后不能停止

文件创建成功只代表规则和事实入口已经建立，不代表项目完成。

初始化后立即执行：

1. 读取所有适用规则和已有实现。
2. 把可以由仓库确认的占位项改成事实。
3. 把必须由用户决定的关键未知项集中成一到三个问题。
4. 专业模式更新 `plan.md` 的事实、失败测试、目标、设计和任务；快速模式不更新当前任务计划。
5. 按确认阶段继续需求、骨架、实现、验证或收口工作。
6. 完成后运行真实验证并回填收口。

最终回复示例：

```text
当前阶段已确认为 implementation。已完成当期范围并同步事实文档；实际运行 `<命令>`，结果为 `<结果>`。`<未验证项>` 因 `<原因>` 未验证，剩余风险是 `<风险>`。
```

不要只回复“初始化完成”“模板已生成”或“后续可以继续开发”。
