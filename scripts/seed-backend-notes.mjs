#!/usr/bin/env node
// 后端知识骨架批量生成：每个叶子分类生成入口 index.md + 2-3 个主题骨架笔记。
// 内容只写核心问题清单、关键概念目录、待补充 TODO，不写编造答案。
import fs from 'node:fs'
import path from 'node:path'

const ROOT = '/Users/shanshan/Documents/My/CodeDesk/knowledge-base/docs/notes/backend'
const TODAY = new Date().toISOString().slice(0, 10)

const sections = {
  'java/spring-boot': {
    title: 'Spring Boot',
    items: [
      {
        slug: 'spring-boot-starter',
        title: 'Spring Boot Starter 机制',
        questions: [
          '为什么引入 `spring-boot-starter-web` 就能直接跑起 Tomcat？',
          'Starter 包如何管理传递依赖？',
          '如何手写一个自定义 Starter？',
        ],
        concepts: [
          'Starter 命名规范与 `spring-boot-starter-*`',
          '`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`',
          '传递依赖版本仲裁',
        ],
      },
      {
        slug: 'auto-configuration',
        title: 'Spring Boot 自动配置原理',
        questions: [
          '`@SpringBootApplication` 里 `@EnableAutoConfiguration` 做了什么？',
          '`spring.factories` 与 AutoConfiguration.imports 的区别？',
          '条件注解如何控制配置类生效？',
        ],
        concepts: [
          '`SpringApplication` 启动流程',
          '`AutoConfigurationImportSelector` 读取配置',
          '`@ConditionalOnClass` / `@ConditionalOnMissingBean` / `@ConditionalOnProperty`',
        ],
      },
      {
        slug: 'spring-boot-actuator',
        title: 'Spring Boot Actuator 与监控',
        questions: [
          'Actuator 暴露了哪些端点？',
          '如何自定义健康检查？',
          '如何与 Prometheus / Grafana 集成？',
        ],
        concepts: [
          '`/actuator/health` / `/actuator/metrics`',
          'Micrometer 指标门面',
          'InfoContributor / HealthIndicator 扩展',
        ],
      },
    ],
  },
  'java/spring-cloud': {
    title: 'Spring Cloud',
    items: [
      {
        slug: 'service-registration',
        title: '服务注册与发现',
        questions: [
          '服务注册中心要解决什么问题？',
          'Eureka / Nacos / Consul 的核心差异？',
          '注册表一致性与健康检查机制？',
        ],
        concepts: [
          'Client-Side 发现 vs Server-Side 发现',
          'Eureka Peer 复制',
          'Nacos 临时/永久实例',
        ],
      },
      {
        slug: 'circuit-breaker',
        title: '熔断与限流',
        questions: [
          '熔断、降级、限流的区别？',
          'Hystrix 的熔断状态机？',
          'Sentinel 的限流算法？',
        ],
        concepts: [
          '断路器 Closed / Open / Half-Open',
          '滑动窗口与漏桶/令牌桶',
          'Feign 整合 Hystrix / Sentinel',
        ],
      },
      {
        slug: 'gateway-routing',
        title: '网关路由与负载均衡',
        questions: [
          'Spring Cloud Gateway 与 Zuul 的区别？',
          'Predicate 与 Filter 的作用？',
          'LoadBalancer 与 Ribbon 的关系？',
        ],
        concepts: [
          '路由断言工厂',
          'GatewayFilter / GlobalFilter',
          'Reactor Netty 异步非阻塞',
        ],
      },
    ],
  },
  'java/jvm': {
    title: 'JVM 原理',
    items: [
      {
        slug: 'jvm-memory-model',
        title: 'JVM 内存模型',
        questions: [
          'JVM 运行时数据区划分？',
          '堆 vs 栈 vs 方法区 vs 元空间？',
          'Java 内存模型与 JVM 内存结构的区别？',
        ],
        concepts: [
          '程序计数器 / 虚拟机栈 / 本地方法栈',
          '堆（新生代、老年代）',
          '元空间 / 直接内存',
        ],
      },
      {
        slug: 'garbage-collection',
        title: '垃圾回收算法',
        questions: [
          '标记-清除、复制、标记-整理的区别？',
          'CMS / G1 / ZGC 的适用场景？',
          '如何查看 GC 日志并分析？',
        ],
        concepts: [
          '可达性分析 / 引用类型',
          'Minor GC / Major GC / Full GC',
          'STW 与低延迟 GC',
        ],
      },
      {
        slug: 'jvm-performance-tuning',
        title: 'JVM 性能调优',
        questions: [
          '如何定位内存泄漏？',
          'OOM 有哪些类型及排查思路？',
          '常用 JVM 参数与默认值？',
        ],
        concepts: [
          '堆内存参数 -Xms / -Xmx',
          'MAT / VisualVM / Arthas',
          '线程 Dump 与死锁分析',
        ],
      },
    ],
  },
  'java/concurrent-programming': {
    title: 'Java 并发编程',
    items: [
      {
        slug: 'java-thread-pool',
        title: 'Java 线程池',
        questions: [
          '`ThreadPoolExecutor` 的 7 个参数含义？',
          '四种常见线程池的隐患？',
          '如何自定义拒绝策略？',
        ],
        concepts: [
          '核心线程数 / 最大线程数 / 队列策略',
          'CallerRunsPolicy / AbortPolicy',
          'ForkJoinPool 工作窃取',
        ],
      },
      {
        slug: 'java-lock-mechanism',
        title: '锁机制与 CAS',
        questions: [
          'synchronized 与 ReentrantLock 的区别？',
          'CAS 的 ABA 问题及解决？',
          '读写锁 / StampedLock 的使用场景？',
        ],
        concepts: [
          '对象头与 Mark Word',
          '偏向锁 / 轻量级锁 / 重量级锁',
          'AQS 抽象队列同步器',
        ],
      },
      {
        slug: 'java-concurrent-collections',
        title: '并发集合类',
        questions: [
          'HashMap 为什么线程不安全？',
          'ConcurrentHashMap 的并发实现？',
          'CopyOnWriteArrayList 的读写分离？',
        ],
        concepts: [
          '分段锁 / CAS + synchronized',
          'BlockingQueue 家族',
          'ThreadLocal 与内存泄漏',
        ],
      },
    ],
  },
  'nodejs/node-core': {
    title: 'Node.js 核心',
    items: [
      {
        slug: 'node-event-loop',
        title: 'Node.js 事件循环',
        questions: [
          'Node.js 事件循环的 6 个阶段？',
          'process.nextTick 与 Promise 微任务优先级？',
          'setTimeout/setImmediate 在 I/O 回调中的顺序？',
        ],
        concepts: [
          'libuv 事件循环',
          'timers / poll / check 阶段',
          '事件循环与 CPU 密集型任务',
        ],
      },
      {
        slug: 'node-stream-buffer',
        title: 'Stream 与 Buffer',
        questions: [
          'Buffer 与 Stream 的关系？',
          '四种 Stream 模式与使用场景？',
          'pipeline 如何解决背压？',
        ],
        concepts: [
          'Readable / Writable / Duplex / Transform',
          'Buffer 内存分配策略',
          '背压（Backpressure）机制',
        ],
      },
      {
        slug: 'node-module-system',
        title: 'CommonJS 与 ES Modules',
        questions: [
          'CommonJS 与 ESM 的加载时机差异？',
          '循环引用时两者的表现？',
          'Node.js 中如何混用 CJS 与 ESM？',
        ],
        concepts: [
          'require 的模块查找路径',
          'ESM 的静态解析',
          'package.json type 字段',
        ],
      },
    ],
  },
  'nodejs/nestjs': {
    title: 'NestJS',
    items: [
      {
        slug: 'nest-architecture',
        title: 'NestJS 架构与依赖注入',
        questions: [
          'NestJS 的核心设计思想？',
          'Provider / Module / Controller 的关系？',
          '依赖注入容器如何解析依赖？',
        ],
        concepts: [
          '装饰器元数据',
          'IoC 与 DI',
          '模块化与作用域',
        ],
      },
      {
        slug: 'nest-decorators',
        title: '装饰器与路由',
        questions: [
          '常用装饰器有哪些？',
          '参数装饰器如何获取请求数据？',
          '如何定义 CRUD RESTful 路由？',
        ],
        concepts: [
          '@Controller / @Get / @Post',
          '@Body / @Query / @Param',
          'DTO 与 ValidationPipe',
        ],
      },
      {
        slug: 'nest-interceptor-guard',
        title: '拦截器、守卫与管道',
        questions: [
          'Guard / Interceptor / Pipe / Middleware 的执行顺序？',
          '如何做 JWT 鉴权？',
          '全局异常过滤怎么写？',
        ],
        concepts: [
          'AOP 切面编程',
          'ExecutionContext',
          'ExceptionFilter',
        ],
      },
    ],
  },
  'nodejs/express-koa': {
    title: 'Express / Koa',
    items: [
      {
        slug: 'express-middleware',
        title: 'Express 中间件机制',
        questions: [
          'Express 中间件执行顺序？',
          '错误处理中间件的位置？',
          'next() 不传参与传参的区别？',
        ],
        concepts: [
          '洋葱圈模型',
          'app.use / router',
          '中间件栈',
        ],
      },
      {
        slug: 'koa-async-middleware',
        title: 'Koa 洋葱圈模型',
        questions: [
          'Koa 的中间件为什么叫洋葱圈？',
          'async/await 在中间件中的优势？',
          'ctx 与 req/res 的关系？',
        ],
        concepts: [
          'compose 函数',
          'context 代理',
          '错误统一处理',
        ],
      },
      {
        slug: 'node-router-design',
        title: '路由设计与 RESTful API',
        questions: [
          'RESTful 接口设计原则？',
          '版本控制策略？',
          '如何组织大型项目路由？',
        ],
        concepts: [
          '资源命名与 HTTP 动词',
          '版本号在 URL / Header',
          '路由分层与自动加载',
        ],
      },
    ],
  },
  'nodejs/npm-pnpm': {
    title: '包管理',
    items: [
      {
        slug: 'npm-dependency-resolution',
        title: 'npm 依赖解析',
        questions: [
          'npm 如何处理依赖版本冲突？',
          'node_modules 扁平化与 doppelgangers？',
          'package-lock.json 的作用？',
        ],
        concepts: [
          '语义化版本',
          '依赖树解析算法',
          'npm ci 与 npm install',
        ],
      },
      {
        slug: 'pnpm-workspace',
        title: 'pnpm 与 Monorepo',
        questions: [
          'pnpm 如何解决幽灵依赖？',
          'pnpm workspace 命令？',
          'content-addressable store 是什么？',
        ],
        concepts: [
          '硬链接与符号链接',
          'pnpm-workspace.yaml',
          'workspace 脚本执行',
        ],
      },
      {
        slug: 'semver-versioning',
        title: '语义化版本控制',
        questions: [
          'SemVer 三段的含义？',
          '^` 与 `~` 的区别？',
          'lock 文件是否该提交？',
        ],
        concepts: [
          'MAJOR / MINOR / PATCH',
          '范围版本解析',
          'peerDependencies',
        ],
      },
    ],
  },
  'database/mysql/mysql-index': {
    title: 'MySQL 索引',
    items: [
      {
        slug: 'mysql-index-types',
        title: 'MySQL 索引类型',
        questions: [
          'B+Tree 索引与 Hash 索引的区别？',
          '聚簇索引 vs 非聚簇索引？',
          '联合索引的最左前缀原则？',
        ],
        concepts: [
          '主键索引 / 唯一索引 / 普通索引',
          '覆盖索引',
          '索引下推 ICP',
        ],
      },
      {
        slug: 'mysql-index-optimization',
        title: '索引优化与执行计划',
        questions: [
          'EXPLAIN 关键字段含义？',
          '索引失效的常见场景？',
          '如何选择联合索引列顺序？',
        ],
        concepts: [
          'type / key / rows / Extra',
          '索引选择性',
          '隐式转换与函数导致失效',
        ],
      },
      {
        slug: 'mysql-covering-index',
        title: '覆盖索引与最左前缀',
        questions: [
          '什么是覆盖索引？为何能避免回表？',
          '最左前缀原理的底层原因？',
          '索引冗余如何评估？',
        ],
        concepts: [
          '回表（Lookup）',
          '索引列顺序设计',
          '冗余索引与慢 SQL',
        ],
      },
    ],
  },
  'database/mysql/mysql-transaction': {
    title: 'MySQL 事务',
    items: [
      {
        slug: 'mysql-acid',
        title: 'ACID 与隔离级别',
        questions: [
          'ACID 分别代表什么及其实现？',
          '四种隔离级别与对应问题？',
          'MySQL 默认隔离级别是什么？',
        ],
        concepts: [
          '原子性 / 一致性 / 隔离性 / 持久性',
          '读未提交 / 读已提交 / 可重复读 / 串行化',
          '脏读 / 不可重复读 / 幻读',
        ],
      },
      {
        slug: 'mysql-mvcc',
        title: 'MVCC 实现原理',
        questions: [
          'MVCC 如何解决读写冲突？',
          'Read View 的构成？',
          'undo log 在 MVCC 中的作用？',
        ],
        concepts: [
          '事务 ID / 回滚指针',
          '行记录隐藏字段',
          '可重复读与幻读',
        ],
      },
      {
        slug: 'mysql-lock',
        title: 'InnoDB 锁机制',
        questions: [
          '共享锁与排他锁的区别？',
          '行锁、间隙锁、临键锁？',
          '死锁如何检测与避免？',
        ],
        concepts: [
          'Record Lock / Gap Lock / Next-Key Lock',
          '意向锁',
          '锁等待与死锁图',
        ],
      },
    ],
  },
  'database/mysql/mysql-optimization': {
    title: 'MySQL 查询优化',
    items: [
      {
        slug: 'mysql-slow-query',
        title: '慢查询分析与优化',
        questions: [
          '如何开启慢查询日志？',
          'pt-query-digest 怎么分析？',
          '优化慢 SQL 的常规步骤？',
        ],
        concepts: [
          'slow_query_log / long_query_time',
          '慢日志分析工具',
          'SQL 改写与索引优化',
        ],
      },
      {
        slug: 'mysql-execution-plan',
        title: '执行计划解读',
        questions: [
          'EXPLAIN 输出各列含义？',
          'Using filesort / Using temporary 怎么优化？',
          '如何选择驱动表？',
        ],
        concepts: [
          'id / select_type / table',
          'type 从 ALL 到 system',
          'Extra 常见提示',
        ],
      },
      {
        slug: 'mysql-partition-sharding',
        title: '分库分表',
        questions: [
          '什么场景需要分库分表？',
          '水平拆分与垂直拆分的区别？',
          '分片键如何选择？',
        ],
        concepts: [
          'Sharding-JDBC / MyCat',
          '全局 ID 方案',
          '跨分片查询与聚合',
        ],
      },
    ],
  },
  'database/postgresql': {
    title: 'PostgreSQL',
    items: [
      {
        slug: 'postgresql-index',
        title: 'PostgreSQL 索引与查询优化',
        questions: [
          'PostgreSQL 的索引类型？',
          'GIN / GiST 适用场景？',
          'VACUUM 与表膨胀？',
        ],
        concepts: [
          'B-tree / Hash / GiST / GIN',
          '部分索引与表达式索引',
          'ANALYZE 与统计信息',
        ],
      },
      {
        slug: 'postgresql-transaction',
        title: 'PostgreSQL 事务与 MVCC',
        questions: [
          'PG 如何实现 MVCC？',
          '快照隔离与可串行化？',
          'WAL 日志的作用？',
        ],
        concepts: [
          'xmin / xmax 系统列',
          'WAL / Checkpoint',
          '事务 ID 回卷',
        ],
      },
      {
        slug: 'postgresql-json',
        title: 'JSON/JSONB 应用',
        questions: [
          'JSON 与 JSONB 的存储差异？',
          'JSONB 索引与查询？',
          '什么场景适合用 JSONB？',
        ],
        concepts: [
          'JSONB 二进制存储',
          'GIN 索引加速 JSONB',
          'JSON 操作符',
        ],
      },
    ],
  },
  'database/mongodb': {
    title: 'MongoDB',
    items: [
      {
        slug: 'mongodb-index',
        title: 'MongoDB 索引设计',
        questions: [
          'MongoDB 的索引类型？',
          '复合索引的 ESR 规则？',
          '索引对写入性能的影响？',
        ],
        concepts: [
          '单键 / 复合 / 多键 / 文本 / TTL',
          'ESR（Equality, Sort, Range）',
          'explain() 分析',
        ],
      },
      {
        slug: 'mongodb-aggregation',
        title: '聚合管道',
        questions: [
          '聚合管道各阶段常用操作？',
          'pipeline 与 MapReduce 对比？',
          '如何在聚合中使用索引？',
        ],
        concepts: [
          '$match / $group / $sort / $lookup',
          '管道优化与 early filter',
          '聚合内存限制',
        ],
      },
      {
        slug: 'mongodb-replica-shard',
        title: '副本集与分片',
        questions: [
          '副本集的选举机制？',
          '分片集群的组件有哪些？',
          '片键选择的影响？',
        ],
        concepts: [
          'Primary / Secondary / Arbiter',
          'mongos / config server / shard',
          'chunk 分裂与均衡',
        ],
      },
    ],
  },
  'database/redis': {
    title: 'Redis',
    items: [
      {
        slug: 'redis-data-types',
        title: 'Redis 数据类型与应用场景',
        questions: [
          'String / Hash / List / Set / ZSet 的典型场景？',
          'Bitmap / HyperLogLog / Geo 的使用？',
          '如何用 Redis 实现排行榜？',
        ],
        concepts: [
          'ZSet 跳表实现',
          'Hash 对象压缩',
          'List  quicklist',
        ],
      },
      {
        slug: 'redis-persistence',
        title: '持久化机制',
        questions: [
          'RDB 与 AOF 的区别？',
          'AOF 重写过程？',
          '混合持久化是什么？',
        ],
        concepts: [
          'bgsave / fork 写时复制',
          'AOF rewrite / fsync 策略',
          'RDB + AOF 混合',
        ],
      },
      {
        slug: 'redis-cluster',
        title: 'Redis 集群与高可用',
        questions: [
          'Redis Cluster 的数据分片方式？',
          '主从切换与哨兵机制？',
          'Gossip 协议的作用？',
        ],
        concepts: [
          '16384 个槽位',
          'MOVED / ASK 重定向',
          'Sentinel 故障转移',
        ],
      },
    ],
  },
  'database/sql-optimization': {
    title: 'SQL 优化',
    items: [
      {
        slug: 'sql-optimization-principles',
        title: 'SQL 优化原则',
        questions: [
          'SQL 优化的整体思路？',
          '索引设计的基本准则？',
          '如何减少回表与排序？',
        ],
        concepts: [
          'SELECT * 的危害',
          '避免隐式转换',
          '分页优化',
        ],
      },
      {
        slug: 'sql-anti-patterns',
        title: 'SQL 反模式',
        questions: [
          '常见 SQL 反模式有哪些？',
          'N+1 查询如何解决？',
          '大事务的危害？',
        ],
        concepts: [
          'SELECT IN 大列表',
          'OR 条件优化',
          '批量插入 vs 单条插入',
        ],
      },
    ],
  },
  'microservices/service-design': {
    title: '微服务设计',
    items: [
      {
        slug: 'microservices-split-strategy',
        title: '服务拆分策略',
        questions: [
          '什么时候该拆微服务？',
          '按业务领域拆分 vs 按技术分层拆分？',
          '单体拆分时如何控制风险？',
        ],
        concepts: [
          '康威定律',
          'DDD 限界上下文',
          '绞杀者模式',
        ],
      },
      {
        slug: 'microservices-boundary',
        title: '领域边界与限界上下文',
        questions: [
          '限界上下文是什么？',
          '聚合与实体的关系？',
          '如何识别领域事件？',
        ],
        concepts: [
          'Entity / Value Object / Aggregate',
          'Domain Event',
          '防腐层 ACL',
        ],
      },
      {
        slug: 'microservices-data-isolation',
        title: '数据隔离与自治',
        questions: [
          '微服务之间能否直接访问数据库？',
          '如何处理跨服务查询？',
          '数据一致性与最终一致性？',
        ],
        concepts: [
          'Database per Service',
          'CQRS',
          '事件溯源',
        ],
      },
    ],
  },
  'microservices/service-discovery': {
    title: '注册发现',
    items: [
      {
        slug: 'service-registry-pattern',
        title: '服务注册模式',
        questions: [
          '自注册与第三方注册的区别？',
          '健康检查怎么做？',
          '注册中心挂了怎么办？',
        ],
        concepts: [
          'Self-Registration',
          'Third-Party Registration',
          '心跳续约',
        ],
      },
      {
        slug: 'service-discovery-pattern',
        title: '服务发现模式',
        questions: [
          '客户端发现 vs 服务端发现？',
          'DNS 发现的优缺点？',
          '多环境路由？',
        ],
        concepts: [
          'Client-Side Discovery',
          'Server-Side Discovery',
          '负载均衡位置',
        ],
      },
      {
        slug: 'consul-nacos',
        title: 'Consul 与 Nacos',
        questions: [
          'Consul 的核心组件？',
          'Nacos 的配置中心能力？',
          '两者选型差异？',
        ],
        concepts: [
          'Consul Agent / Server',
          'Nacos 命名空间与分组',
          'CP vs AP',
        ],
      },
    ],
  },
  'microservices/distributed-transaction': {
    title: '分布式事务',
    items: [
      {
        slug: '2pc-3pc',
        title: '2PC / 3PC',
        questions: [
          '2PC 的阶段与问题？',
          '3PC 解决了 2PC 的什么问题？',
          '协调者单点故障怎么处理？',
        ],
        concepts: [
          'Prepare / Commit',
          '阻塞与同步开销',
          '超时与恢复',
        ],
      },
      {
        slug: 'tcc',
        title: 'TCC 事务',
        questions: [
          'TCC 的三阶段是什么？',
          'Try / Confirm / Cancel 的幂等性？',
          'TCC 与 2PC 的对比？',
        ],
        concepts: [
          '业务补偿',
          '空回滚与悬挂',
          'TCC 框架设计',
        ],
      },
      {
        slug: 'saga-seata',
        title: 'Saga 与 Seata',
        questions: [
          'Saga 编排与协奏的区别？',
          'Seata 的 AT / TCC / Saga / XA 模式？',
          '长事务如何补偿？',
        ],
        concepts: [
          '正向服务 / 补偿服务',
          'Seata TC / TM / RM',
          'Undo Log',
        ],
      },
    ],
  },
  'microservices/gateway': {
    title: 'API 网关',
    items: [
      {
        slug: 'gateway-routing-auth',
        title: '路由与鉴权',
        questions: [
          '网关层鉴权 vs 服务层鉴权？',
          'JWT 在网关如何校验？',
          '黑白名单与灰度路由？',
        ],
        concepts: [
          '统一入口',
          'Token 解析与转发',
          '路由重写',
        ],
      },
      {
        slug: 'gateway-rate-limit',
        title: '限流与熔断',
        questions: [
          '网关层限流算法？',
          '如何防止 API 被刷？',
          '熔断与降级在网关的实现？',
        ],
        concepts: [
          '令牌桶 / 漏桶',
          'IP / 用户维度限流',
          '降级兜底',
        ],
      },
      {
        slug: 'gateway-spring-cloud-gateway',
        title: 'Spring Cloud Gateway',
        questions: [
          'Gateway 核心概念？',
          'Route / Predicate / Filter？',
          'GlobalFilter 执行顺序？',
        ],
        concepts: [
          'Netty 异步网关',
          '自定义 FilterFactory',
          '集成 Sentinel',
        ],
      },
    ],
  },
  'microservices/consensus': {
    title: '一致性协议',
    items: [
      {
        slug: 'cap-base',
        title: 'CAP 与 BASE',
        questions: [
          'CAP 三选二的含义？',
          'BASE 理论如何指导系统设计？',
          'CP 与 AP 系统的代表？',
        ],
        concepts: [
          '一致性 / 可用性 / 分区容错',
          '基本可用 / 软状态 / 最终一致',
          '业务对一致性的容忍度',
        ],
      },
      {
        slug: 'raft-paxos',
        title: 'Raft 与 Paxos',
        questions: [
          'Raft 如何解决一致性问题？',
          'Leader 选举过程？',
          'Paxos 与 Raft 的关系？',
        ],
        concepts: [
          'Leader / Follower / Candidate',
          '日志复制与提交',
          'Term / Index',
        ],
      },
      {
        slug: 'distributed-consistency',
        title: '分布式一致性场景',
        questions: [
          '缓存一致性 vs 数据一致性？',
          '顺序一致性、线性一致性、因果一致性？',
          '分布式锁的实现？',
        ],
        concepts: [
          'ZooKeeper / etcd 分布式锁',
          'Redlock 争议',
          '单调读一致性',
        ],
      },
    ],
  },
  'mq/kafka': {
    title: 'Kafka',
    items: [
      {
        slug: 'kafka-architecture',
        title: 'Kafka 架构与分区',
        questions: [
          'Kafka 的 Topic / Partition / Broker 关系？',
          'Partition 为何是并发的基本单位？',
          'ISR / AR / OSR 是什么？',
        ],
        concepts: [
          'Producer / Broker / Consumer',
          'Leader / Follower',
          'Log Segment',
        ],
      },
      {
        slug: 'kafka-producer-consumer',
        title: '生产者与消费者',
        questions: [
          'Producer 发送消息的关键参数？',
          'Consumer Group 与 Rebalance？',
          'offset 提交方式与重复消费？',
        ],
        concepts: [
          'ack / retries / batch.size',
          'Consumer Group 分配策略',
          '自动提交 vs 手动提交',
        ],
      },
      {
        slug: 'kafka-reliability',
        title: '可靠性保证',
        questions: [
          'Kafka 如何保证消息不丢失？',
          'Exactly-Once 怎么实现？',
          '幂等生产者与事务 API？',
        ],
        concepts: [
          '副本机制',
          'min.insync.replicas',
          '幂等 / 事务 / 两阶段提交',
        ],
      },
    ],
  },
  'mq/rabbitmq': {
    title: 'RabbitMQ',
    items: [
      {
        slug: 'rabbitmq-exchange-queue',
        title: '交换机与队列',
        questions: [
          'Exchange 类型有哪些？',
          'Binding Key 与 Routing Key 的区别？',
          'Queue 的持久化与镜像？',
        ],
        concepts: [
          'direct / topic / fanout / headers',
          'Virtual Host',
          'Dead Letter Exchange',
        ],
      },
      {
        slug: 'rabbitmq-routing-topics',
        title: '路由与主题',
        questions: [
          'Topic 通配符规则？',
          'Headers Exchange 的使用场景？',
          '如何实现延迟队列？',
        ],
        concepts: [
          '`*` 与 `#` 通配符',
          'Headers 匹配',
          '延迟队列插件 / 死信 TTL',
        ],
      },
      {
        slug: 'rabbitmq-reliability',
        title: '消息可靠性',
        questions: [
          'RabbitMQ 如何保证消息不丢失？',
          'Confirm / Return / ACK 机制？',
          '幂等消费怎么设计？',
        ],
        concepts: [
          '消息持久化 / 队列持久化',
          'Publisher Confirm',
          '消费者 ACK / 手动确认',
        ],
      },
    ],
  },
  'mq/rocketmq': {
    title: 'RocketMQ',
    items: [
      {
        slug: 'rocketmq-architecture',
        title: 'RocketMQ 架构',
        questions: [
          'RocketMQ 四大组件？',
          'NameServer 与 Kafka ZooKeeper 的差异？',
          'Broker 主从如何同步？',
        ],
        concepts: [
          'Producer / Broker / Consumer / NameServer',
          'CommitLog / ConsumeQueue',
          '主从同步与异步复制',
        ],
      },
      {
        slug: 'rocketmq-message-model',
        title: '消息模型',
        questions: [
          'RocketMQ 的消费模式？',
          '顺序消息怎么实现？',
          '延迟消息级别？',
        ],
        concepts: [
          '集群消费 / 广播消费',
          'MessageQueue 顺序',
          '延迟级别 18 级',
        ],
      },
      {
        slug: 'rocketmq-transaction-message',
        title: '事务消息',
        questions: [
          'RocketMQ 事务消息的流程？',
          '半消息是什么？',
          '事务反查机制？',
        ],
        concepts: [
          'Half Message',
          '本地事务执行',
          '回查与提交/回滚',
        ],
      },
    ],
  },
  'mq/mq-patterns': {
    title: '消息模式',
    items: [
      {
        slug: 'mq-publish-subscribe',
        title: '发布订阅',
        questions: [
          '发布订阅 vs 点对点？',
          '如何实现广播消费？',
          'Kafka / RabbitMQ 的发布订阅实现差异？',
        ],
        concepts: [
          'Topic / Exchange',
          'Consumer Group',
          '扇出',
        ],
      },
      {
        slug: 'mq-point-to-point',
        title: '点对点',
        questions: [
          '点对点如何保证每条消息只消费一次？',
          '消息被多个消费者竞争？',
          '队列模型的优缺点？',
        ],
        concepts: [
          'Queue',
          '竞争消费',
          'Pull vs Push',
        ],
      },
      {
        slug: 'mq-event-driven',
        title: '事件驱动',
        questions: [
          '事件驱动与命令驱动的区别？',
          '事件溯源是什么？',
          '事件总线 vs 消息队列？',
        ],
        concepts: [
          'Domain Event',
          'Event Sourcing',
          'CQRS 与事件驱动',
        ],
      },
    ],
  },
  'cache/redis-practice': {
    title: 'Redis 实战',
    items: [
      {
        slug: 'redis-cache-penetration',
        title: '缓存穿透、击穿、雪崩',
        questions: [
          '三者的区别与典型场景？',
          '如何解决缓存穿透？',
          '热点 Key 导致缓存击穿怎么办？',
        ],
        concepts: [
          '布隆过滤器',
          '互斥锁 / 逻辑过期',
          '随机 TTL / 多级缓存',
        ],
      },
      {
        slug: 'redis-cache-consistency',
        title: '缓存一致性方案',
        questions: [
          'Cache Aside 的读写流程？',
          '先更新数据库还是先更新缓存？',
          '延时双删能解决什么问题？',
        ],
        concepts: [
          'Cache Aside / Read Through / Write Through',
          '缓存与数据库不一致窗口',
          '消息队列保证最终一致',
        ],
      },
      {
        slug: 'redis-hot-key',
        title: '热点 Key 处理',
        questions: [
          '如何发现热点 Key？',
          '本地缓存如何与 Redis 配合？',
          '热点 Key 的降级策略？',
        ],
        concepts: [
          'Redis Hot Key 探测',
          '本地缓存 + 广播失效',
          '拆分 Key',
        ],
      },
    ],
  },
  'cache/local-cache': {
    title: '本地缓存',
    items: [
      {
        slug: 'local-cache-caffeine',
        title: 'Caffeine 本地缓存',
        questions: [
          'Caffeine 的淘汰策略？',
          'W-TinyLFU 的优势？',
          '刷新与过期区别？',
        ],
        concepts: [
          'Window-TinyLFU',
          'Size / Time / Reference based eviction',
          'LoadingCache',
        ],
      },
      {
        slug: 'local-cache-concurrent-hashmap',
        title: 'ConcurrentHashMap 实现',
        questions: [
          'ConcurrentHashMap 为什么适合本地缓存？',
          '如何给简单缓存加过期？',
          '与 Guava Cache 的对比？',
        ],
        concepts: [
          '分段锁 / CAS',
          '惰性删除',
          'Guava Cache',
        ],
      },
      {
        slug: 'local-cache-eviction',
        title: '过期与淘汰策略',
        questions: [
          'FIFO / LRU / LFU 的区别？',
          'TTL 与 TTI 的区别？',
          '大对象缓存如何防止 OOM？',
        ],
        concepts: [
          'LRU / LFU / W-TinyLFU',
          '主动过期与惰性过期',
          '内存权重控制',
        ],
      },
    ],
  },
  'cache/cache-strategy': {
    title: '缓存策略',
    items: [
      {
        slug: 'cache-aside',
        title: 'Cache Aside',
        questions: [
          'Cache Aside 的读流程？',
          '写流程为什么先写库再删缓存？',
          '这种策略的缺陷？',
        ],
        concepts: [
          '读：先缓存后数据库',
          '写：先数据库后删缓存',
          '不一致概率',
        ],
      },
      {
        slug: 'cache-read-through',
        title: 'Read Through / Write Through',
        questions: [
          'Read Through 与 Cache Aside 的区别？',
          'Write Through 的同步写库风险？',
          'Write Behind 的适用场景？',
        ],
        concepts: [
          '缓存组件统一维护',
          '同步 vs 异步写库',
          '写性能与一致性权衡',
        ],
      },
      {
        slug: 'cache-ttl-strategy',
        title: 'TTL 与预热策略',
        questions: [
          '如何设置合理的 TTL？',
          '缓存预热怎么做？',
          '大促前缓存准备？',
        ],
        concepts: [
          '固定 TTL / 滑动过期',
          '定时任务预热',
          '多级缓存兜底',
        ],
      },
    ],
  },
  'cache/cache-consistency': {
    title: '缓存一致性',
    items: [
      {
        slug: 'cache-update-strategy',
        title: '更新策略',
        questions: [
          '更新缓存 vs 删除缓存？',
          '双写的顺序为何重要？',
          '如何降低不一致窗口？',
        ],
        concepts: [
          '更新缓存的并发写问题',
          '删除缓存的懒加载',
          '版本号 / CAS 更新',
        ],
      },
      {
        slug: 'cache-delayed-consistency',
        title: '最终一致性',
        questions: [
          '为什么缓存不一致往往只能做到最终一致？',
          '消息队列如何同步缓存失效？',
          'Canal 订阅 binlog 的方案？',
        ],
        concepts: [
          '异步失效',
          'binlog 监听',
          '补偿机制',
        ],
      },
      {
        slug: 'cache-double-deletion',
        title: '延时双删',
        questions: [
          '延时双删的具体流程？',
          '延时时间如何估算？',
          '什么场景下仍然不够？',
        ],
        concepts: [
          '先删缓存 → 写库 → 延时再删',
          '主从延迟窗口',
          '配合消息队列删除',
        ],
      },
    ],
  },
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content.trimEnd() + '\n', 'utf8')
}

function renderNote(item, sectionTitle) {
  const tags = ['backend', kebab(sectionTitle), 'interview']
  const questions = item.questions.map((q) => `- ${q}`).join('\n')
  const concepts = item.concepts.map((c) => `- ${c}`).join('\n')
  return `---
title: ${item.title}
date: ${TODAY}
category: backend
tags: [${tags.join(', ')}]
description: ${item.title} 学习笔记大纲与面试题整理。
---

# ${item.title}

## 核心问题
${questions}

## 关键概念
${concepts}

## 待补充
- [ ] 补充核心原理与源码细节
- [ ] 补充典型面试题答案
- [ ] 补充实际项目踩坑案例

## 相关链接
- [${sectionTitle} 分类首页](./)
`
}

function kebab(str) {
  return str
    .replace(/[\s/]+/g, '-')
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9-]/g, '')
    .toLowerCase()
}

let totalNotes = 0
for (const [dir, section] of Object.entries(sections)) {
  const fullDir = path.join(ROOT, dir)
  fs.mkdirSync(fullDir, { recursive: true })

  const links = section.items.map((i) => `- [${i.title}](./${i.slug})`).join('\n')
  const index = `---
title: ${section.title}
date: ${TODAY}
category: backend
tags: [backend, ${kebab(section.title)}]
description: ${section.title} 学习笔记与面试题整理。
---

# ${section.title}

本分类下共 ${section.items.length} 篇笔记：

${links}
`
  writeFile(path.join(fullDir, 'index.md'), index)

  for (const item of section.items) {
    writeFile(path.join(fullDir, `${item.slug}.md`), renderNote(item, section.title))
    totalNotes++
  }
}

const backendIndexContent = `---
title: 后端
date: ${TODAY}
category: backend
tags: [backend]
description: 后端知识体系：Java / Spring、Node.js、数据库、微服务、消息队列、缓存。
---

# 后端

后端知识分类：

- [Java / Spring](./java/)
- [Node.js](./nodejs/)
- [数据库](./database/)
- [微服务 / 分布式](./microservices/)
- [消息队列](./mq/)
- [缓存](./cache/)
`
writeFile(path.join(ROOT, 'index.md'), backendIndexContent)

const sampleFile = path.join(ROOT, 'sample-spring-transaction.md')
if (fs.existsSync(sampleFile)) {
  fs.rmSync(sampleFile)
  console.log('removed placeholder sample-spring-transaction.md')
}

console.log(`seeded backend notes: ${Object.keys(sections).length} categories, ${totalNotes} topic notes`)
