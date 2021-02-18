---
title: 更新日志
order: 2
group:
  path: /quick-start
  order: 0
nav:
  path: /graphin
---

Graphin 严格遵循 [Semantic Versioning 2.0.0 语义化版本规范](http://semver.org/lang/zh-CN/)。

发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）

- 次版本号：每月发布一个带有新特性的向下兼容的版本。

- 主版本号：含有破坏性更新和新特性，不在发布周期内。

#### 2021-02-10

##### Chores

- adjust components demos ([27858a2b](https://github.com/antvis/graphin/commit/27858a2bd60d465dc93c8be9308ed68b777a1c82))
- adjust layout demos ([7a2849ef](https://github.com/antvis/graphin/commit/7a2849ef5ffb4bae7800605c9ca426e54d89506e))
- adjust behaviors demos ([6c2aa98e](https://github.com/antvis/graphin/commit/6c2aa98e6d930c02c8610aafca87a37ca2f00ff9))
- adjust render demos ([7347d5ac](https://github.com/antvis/graphin/commit/7347d5ac21d41323ca11840ab9dc73fdf665e0e5))
- adjust quick-start demos ([068681a6](https://github.com/antvis/graphin/commit/068681a69e0c61f50b02c4d9357910eb8c198697))
- adjust register demos ([b06ab9bc](https://github.com/antvis/graphin/commit/b06ab9bc9cd9763e1820c4ac95f468f803d12192))
- rename dirname from case to solution ([66dc416f](https://github.com/antvis/graphin/commit/66dc416f6ed1e881a1befd0518c99fc4dabfdb02))
- remove geamaker case ([348302a3](https://github.com/antvis/graphin/commit/348302a37fa100bfcda3876355b7a71b09f19b7c))
- update version to 2.0.0-beta.13 ([c77642d8](https://github.com/antvis/graphin/commit/c77642d83a97f464a4ea0b0e898eb273950833c3))
- update changelog ([cf047835](https://github.com/antvis/graphin/commit/cf047835ac340a055d2b881cba29cd1d569ab875))
- fix styling ([179dad8b](https://github.com/antvis/graphin/commit/179dad8bd2fb4c7764dec62959ea707382202be5))
- adjust layout demos dir ([1ec619b9](https://github.com/antvis/graphin/commit/1ec619b9b6303554a01e3484b80e97fd833a58af))
- style mock ([740980eb](https://github.com/antvis/graphin/commit/740980eb2ee2ff39ba65fb7aa108914ef80f478d))
- export layouts ([ffbfb6a2](https://github.com/antvis/graphin/commit/ffbfb6a2852735ccc3e32075aac7f451e989175e))
- **graphin:**
  - remove graphin graphin-components css ([75246659](https://github.com/antvis/graphin/commit/75246659117641b956972da3b93693c87160d464))
  - remove @antv/graphin/dist/index.css ([d4cc0948](https://github.com/antvis/graphin/commit/d4cc0948ffce7ed6e86f1c88cde6afaecc5f310c))
  - fix .umirc ([82330729](https://github.com/antvis/graphin/commit/82330729a4f5e684c9e0ed9c2a921cfea263fdd2))
  - fix npmclinet ([00e5e4f9](https://github.com/antvis/graphin/commit/00e5e4f93474945abbaec9a2f0aaed422d88f36b))
  - fix styles ([336dc850](https://github.com/antvis/graphin/commit/336dc850599cfc7e92b856d1deba55a4a6256228))
  - fix styles ([19f56e83](https://github.com/antvis/graphin/commit/19f56e838ab8670b5aa01aaf1782f95b0b0724ca))
  - prefect graphin-circle ([5fd48b17](https://github.com/antvis/graphin/commit/5fd48b17462be946d42ce97578b9531dadb9ff3a))
  - add github-pages : https://antv.vision/graphin-docs/ ([55f05cc2](https://github.com/antvis/graphin/commit/55f05cc2ce3b9a195d4389fd104e305c5faaeb1e))
- **deps-dev:**
  - bump @types/jest from 24.9.1 to 25.2.3 ([af0dbb68](https://github.com/antvis/graphin/commit/af0dbb68c088eed36cc73c9deca4a3b54b63beb6))
  - bump ts-loader from 6.2.2 to 7.0.4 ([67e6fbb3](https://github.com/antvis/graphin/commit/67e6fbb38857c028eb70f1f3d5b06cbad4660435))
  - bump @testing-library/jest-dom from 4.2.4 to 5.7.0 ([e211ec8a](https://github.com/antvis/graphin/commit/e211ec8aaecebdb2d8d61bfcf8183b813b6c78f7))
  - bump less-loader from 4.1.0 to 6.1.0 ([57d1d4a9](https://github.com/antvis/graphin/commit/57d1d4a9358db427808d7d07fd4ef980fb9bbbd7))
  - bump rimraf from 2.7.1 to 3.0.2 ([83b7530f](https://github.com/antvis/graphin/commit/83b7530fe0298a726b0d50fd9753ea92933d2fa9))
  - bump style-loader from 0.23.1 to 1.2.1 ([6a539f1c](https://github.com/antvis/graphin/commit/6a539f1cd906be7c1c3b2f5209decd4603ae79a0))
  - bump husky from 1.3.1 to 4.2.5 ([956c02af](https://github.com/antvis/graphin/commit/956c02afffefd5d378e6a0af53f187ccb07839c6))
  - bump file-loader from 4.3.0 to 6.0.0 ([164319b3](https://github.com/antvis/graphin/commit/164319b3527656db9027987ece19c9a22a8011a5))
  - bump lint-staged from 8.2.1 to 10.2.2 ([1f88753f](https://github.com/antvis/graphin/commit/1f88753f8a3243f8a42dc9f78ead18594575bd5f))
- **deps:** bump antd from 3.26.17 to 4.2.4 ([ab146cfb](https://github.com/antvis/graphin/commit/ab146cfb13ac2b5eaf4e32cc3157be2ed6a0b585))

##### Documentation Changes

- adjust icons demos ([753cda3a](https://github.com/antvis/graphin/commit/753cda3a57f742416fb3c536f22f7931c2eba2f1))
- add update elements demos ([b3956651](https://github.com/antvis/graphin/commit/b3956651c25ada961ebd4069b599075d4aa3b6f0))
- **graphin:**
  - add behaviors demos ([ad46384b](https://github.com/antvis/graphin/commit/ad46384bc22d0880a7d847893f8d9457b262e420))
  - add theme demos ([8206356c](https://github.com/antvis/graphin/commit/8206356cf23aeabc29b557ad39a4389a2030150b))
  - add edge demos ([c6f05617](https://github.com/antvis/graphin/commit/c6f05617c9c548e17198ccc4ea6d85a2299691d6))
  - add some demos ([8abf16bf](https://github.com/antvis/graphin/commit/8abf16bf44449562398aba009465a6432b421c2b))
  - fix demo style ([f9ed325f](https://github.com/antvis/graphin/commit/f9ed325fde3bb1d4e29546c8abcb21d55856a301))
  - add animate switch for large graph ([1815f3dd](https://github.com/antvis/graphin/commit/1815f3dd6e1668818a6e7e6b168df3769b00609e))
  - add graphin-docs ([df11f519](https://github.com/antvis/graphin/commit/df11f519736789dbb1e0e3ed5bdfaad3126fe549))
  - add source demo ([2c1bd398](https://github.com/antvis/graphin/commit/2c1bd39859659c05abfe91cd076f96f76de241ca))
  - add render layout demo ([33c4d138](https://github.com/antvis/graphin/commit/33c4d1381240e81d42cae591c86cc0f4340fc969))
  - add LargeGraph expand demos ([eac14249](https://github.com/antvis/graphin/commit/eac14249d9235e4cd6f61aaa24f543d8783f8590))

##### New Features

- update dumi-theme-graphin version to 0.1.1 ([7d022403](https://github.com/antvis/graphin/commit/7d0224031d90110248925e36f2c0b4065ba8705e))
- add overview demos ([f18853bd](https://github.com/antvis/graphin/commit/f18853bd968dc1a65abe458abe0c48861a658cc1))
- add dumi-theme-graphin ([61b5d96e](https://github.com/antvis/graphin/commit/61b5d96e7620501dcabb07126986368c50353973))
- set apis.focusItemById to selected status ([142b6274](https://github.com/antvis/graphin/commit/142b627462d4979d1d78574af26cb8466dbe8db3))
- adjust edge and node active status style ([3f4f3706](https://github.com/antvis/graphin/commit/3f4f3706bd4831e68b6eb99b7fe7effce5301b96))
- add cloud-security solution case ([08e52c99](https://github.com/antvis/graphin/commit/08e52c99fb28ab4cf9e3437759b336f0f43ba4ca))
- add knowledge-graph solution case ([50a67c29](https://github.com/antvis/graphin/commit/50a67c297d4a9ee2d4c76e2c0d5beff202620eab))
- add graph-database solution case ([53606fe3](https://github.com/antvis/graphin/commit/53606fe380e339387b528d0036cb790e8777c8dc))
- add financial-risk-control solution case ([d1b7b4ce](https://github.com/antvis/graphin/commit/d1b7b4ce2c641422ace52226d47d32fcc1da1d48))
- add enterprise-risk-control solution case ([203f3e46](https://github.com/antvis/graphin/commit/203f3e469c09b3c71702ecf57db4e833a9636fc4))
- add graph database case ([de0c59dd](https://github.com/antvis/graphin/commit/de0c59ddc0f7e4b6358947efc59c95adaab9b1a8))
- add poly and loop edge demos ([84773208](https://github.com/antvis/graphin/commit/84773208e1868806067b72e40da8e68075433876))
- add sub layout demos (WIP) ([e0576652](https://github.com/antvis/graphin/commit/e05766525ecc11adec3969be1533202ad50045fa))
- add tree layout switching ([f9c56c72](https://github.com/antvis/graphin/commit/f9c56c72440922b424b1b459c586eaa7a0c2e106))
- add subLayout method ([66b9cca9](https://github.com/antvis/graphin/commit/66b9cca9dd62918d4ca5a6f4ca2ae3957ec00412))
- add processEdges utils ([362a5c71](https://github.com/antvis/graphin/commit/362a5c71f5dc74ebb087dd4f4f0867cf2e4300d8))
- fix graphin typing error ([920a6f40](https://github.com/antvis/graphin/commit/920a6f40060ab0f86e111e5a9360c629021052a6))
- fix npmignore file ([af950dbc](https://github.com/antvis/graphin/commit/af950dbc87bc6821c14fc2ff1c6499169793e5ca))
- add layout demos ([95584b5b](https://github.com/antvis/graphin/commit/95584b5b98ac436d5f89864f83dbdfe41f8a34af))
- add walk utils and fix tree method ([d1949bad](https://github.com/antvis/graphin/commit/d1949bad100309e9fb00e9fa8aec3d7faa99a675))
- fix GraphinTreeData type ([65c8a6f8](https://github.com/antvis/graphin/commit/65c8a6f8c5e020aaca966c2e1f59480bacb7a8b6))
- prefect edge loop type ([0cbaedf0](https://github.com/antvis/graphin/commit/0cbaedf0a8ff43196786ec83dbd029682df6d162))
- fix label.visible not work ([20d81f9d](https://github.com/antvis/graphin/commit/20d81f9d41760d10453fe47efc16ef8f2bfc09ea))
- update components to 2.0.0-beta.11 ([cae74208](https://github.com/antvis/graphin/commit/cae7420800a5f62b7f8a4d2b01238108bdfb3b93))
- update graphin version to 2.0.0-beta.11 ([244b616d](https://github.com/antvis/graphin/commit/244b616de1402d329e78ed59c18684b88516f813))
- update utils.mock().tree().graphinTree() method ([a68b097c](https://github.com/antvis/graphin/commit/a68b097c28172ee8e4ae81035157f4613ff914f3))
- add update status demos ([2a20d311](https://github.com/antvis/graphin/commit/2a20d3116711829d74b70e633ed52313301ac60b))
- add dev tips when graphType change ([71ece7ed](https://github.com/antvis/graphin/commit/71ece7ed94b57875a51902111d46062a1a59f7d8))
- remove console.log ([73c5ada1](https://github.com/antvis/graphin/commit/73c5ada16b739d6f7c97be13fe0f38fc55fdd97c))
- fix calculate label position ([bb55afff](https://github.com/antvis/graphin/commit/bb55afff41071e8988d212cdfeff09e59e7f497f))
- add Tooltip demo to solve contextmenu event ([38dbda9f](https://github.com/antvis/graphin/commit/38dbda9f9936279a9b2a9a19369215cf14b094ec))
- fix getDataFromGraph ([84087e2d](https://github.com/antvis/graphin/commit/84087e2d2611bc64467047e23810d7b02818762b))
- update graphin-components version ([fecdc8ca](https://github.com/antvis/graphin/commit/fecdc8ca76c41292d4b58ab1f02bc38dd27b3ff0))
- update graphin version to 2.0.0-beta.10 ([6cb09d9f](https://github.com/antvis/graphin/commit/6cb09d9f2c8d64626ff10d09859c23d7bf33c3e7))
- auto set loop type in graphin ([3d56fbde](https://github.com/antvis/graphin/commit/3d56fbde906a0c39af38d02bafe1f6e9d65087c0))
- remove Hover edge in graphin ([c8d6a7c9](https://github.com/antvis/graphin/commit/c8d6a7c90439b9e11ee7a9ad9464e1a7ce4d8a29))
- add loop and poly edge ([05be2db9](https://github.com/antvis/graphin/commit/05be2db9e9f8c8869bebb819526f9e19ceb725fd))
- add demos for graphin ([226679cc](https://github.com/antvis/graphin/commit/226679cca25456fb7944c95a6128349597132f19))
- add layoutselector files ([77060d01](https://github.com/antvis/graphin/commit/77060d01ab20dd20b11efa68c5088ed79f48684d))
- add database build schema case ([e34b1d17](https://github.com/antvis/graphin/commit/e34b1d1770d3a14b077038602dd3022e2084a9f0))
- adjust graphin docs ([67b6792e](https://github.com/antvis/graphin/commit/67b6792e823581566475d3524661062e9c654bc8))
- add Graphin theme docs ([5482bf09](https://github.com/antvis/graphin/commit/5482bf09a33dbf13127561af07c86231622b604a))
- add theme dirs ([6352f565](https://github.com/antvis/graphin/commit/6352f565a646359ac8f864e02a384530a926743c))
- fix package dependencies ([620a0298](https://github.com/antvis/graphin/commit/620a0298af5e50db0267a35f2030d05059f9b946))
- fix components packing error ([bfb83fa7](https://github.com/antvis/graphin/commit/bfb83fa74582d4daff78189b9139cdf7d480ff0d))
- update local G6 external ([0d5a070c](https://github.com/antvis/graphin/commit/0d5a070cecd40e89738e5be65876010505c042a8))
- update G6 latest version ([b286d781](https://github.com/antvis/graphin/commit/b286d781014e582320c69fc3692e2a8c0536b9c4))
- fix DragCanvas shouldBegin returns ([1a67e8ac](https://github.com/antvis/graphin/commit/1a67e8acc48e38e0806ea9099784d9d17bbad2b3))
- publish dumi-theme-graphin@0.1.0 ([8eb61a07](https://github.com/antvis/graphin/commit/8eb61a07e057c95dd31791e1b5a4dab5b266ba01))
- add edge demo ([055f8b9c](https://github.com/antvis/graphin/commit/055f8b9c43cd61d60d0fe0e53bff403099ab8ff3))
- add edge interface docs ([fcd5cfbe](https://github.com/antvis/graphin/commit/fcd5cfbe5d0231c60c0b5552094a608f6006a6ee))
- adjust prettier config ([d6a31e5b](https://github.com/antvis/graphin/commit/d6a31e5b06c64ba2c03881493d7414185829df83))
- fix components typing error ([afc9b634](https://github.com/antvis/graphin/commit/afc9b634065bc5371fec641efa3a9b063fc4cb60))
- add EdgeStyle typing ([fb93a549](https://github.com/antvis/graphin/commit/fb93a54989d7e9014ec125f9e12108a486bbfd3e))
- add Edge Hover ([525c82d1](https://github.com/antvis/graphin/commit/525c82d1b0585dfb4ef7f68d72b0004a3bc962f2))
- adjust graphin default style ([f0b08be4](https://github.com/antvis/graphin/commit/f0b08be491e8b4296e5369817f85ad8bfe10500c))
- add fillOpacity attrs ([8991ad47](https://github.com/antvis/graphin/commit/8991ad470290e97c509151d15fb487597e1beaec))
- add background for line and fix typing error ([a5e139a3](https://github.com/antvis/graphin/commit/a5e139a3a5c71444922aca38c9a43aa7237c5ffc))
- get data from graph when layout changed ([7cf4773d](https://github.com/antvis/graphin/commit/7cf4773d28e86258fad2013fb884a1e6d9e84068))
- add update-node demos ([a4041543](https://github.com/antvis/graphin/commit/a4041543384589108c00fe49c9a0f31151247a87))
- remove x,y props ([f1567215](https://github.com/antvis/graphin/commit/f15672156a9f33e9354ecb4e45c6767f633743ab))
- update toolbar interface ([650e9f9c](https://github.com/antvis/graphin/commit/650e9f9cd15cf645466a51f6081bce57e16aff9b))
- update Toolbar docs ([82e284f6](https://github.com/antvis/graphin/commit/82e284f659a54808fa9fc846c7f7ba53671964da))
- update toolbar demos ([50186dc8](https://github.com/antvis/graphin/commit/50186dc87390fcf74b946452a214765b151d7c40))
- fix build-in theme ([840a5d74](https://github.com/antvis/graphin/commit/840a5d74b1c442c1af5551f37ea9a437eae5766f))
- add docs ([646844ef](https://github.com/antvis/graphin/commit/646844efb6d513294f15a616809ca6998dfece34))
- add render network and tree demo ([3a8d880a](https://github.com/antvis/graphin/commit/3a8d880a6030716314218a61524e682d6ddfd3f7))
- add typing description ([d83e91a5](https://github.com/antvis/graphin/commit/d83e91a57bb4f02ab29c8d32a5b49e3081e69346))
- add FontPaint behaviors ([9575d7bf](https://github.com/antvis/graphin/commit/9575d7bf664329316c8b902cc7acb7d117ae7aa8))
- add interface demos ([0d0fe668](https://github.com/antvis/graphin/commit/0d0fe6688e5bbf497fce797356d5d2dadb8946a0))
- remove graphin/icons ddemo ([1f10e783](https://github.com/antvis/graphin/commit/1f10e78305a9417a813e9f09158ec288ddcd07e4))
- add some docs ([1ac6a925](https://github.com/antvis/graphin/commit/1ac6a925904f880acf144f5437a154928ee4f198))
- refactor toolbar component ([27ca1d58](https://github.com/antvis/graphin/commit/27ca1d58efdecff6b927312cfc67747f5ffa1d61))
- add dumi-theme-graphin packages ([c21d787d](https://github.com/antvis/graphin/commit/c21d787d9acfd5e78a080094cdd8ad70839f9961))
- add 1.x site url ([9da0e364](https://github.com/antvis/graphin/commit/9da0e364c36786d41bb0f6caa3ffee5125e79dc7))
- update nodestyle ([f9253380](https://github.com/antvis/graphin/commit/f92533803ca4cdd038d6bf98767b2b3f65934a20))
- graphscope example ([38416926](https://github.com/antvis/graphin/commit/384169260c2dc41db48bbf6ae681a8cddaef5b70))
- init graphscope project ([d53e5e6a](https://github.com/antvis/graphin/commit/d53e5e6a6b4d52ba4c3fb56d00544043f88b1a43))
- add graphin-line edge ([e95374ac](https://github.com/antvis/graphin/commit/e95374acff4b39d0e0cfec7a383b2e0ec364d693))
- **graphin:**
  - share common utils in graphin-circle ([0f16bd5f](https://github.com/antvis/graphin/commit/0f16bd5f0a30b93a57efb4fca94ae35d60d02ee4))
  - fix typing error ([b3c0db23](https://github.com/antvis/graphin/commit/b3c0db23e54dd3569cc190f974808a6e8be2a71f))
  - fix typing error ([45a730fe](https://github.com/antvis/graphin/commit/45a730feef6f5626fa5195d3d34838501bdda720))
  - add active style ([5f9a799b](https://github.com/antvis/graphin/commit/5f9a799b74d30f65f3b5221d324122e6dea7b98b))
  - add Select demos ([c7e09880](https://github.com/antvis/graphin/commit/c7e098808ccf299ad54bcd1feea7b6bab12303d7))
  - add typing ([d3d44c3a](https://github.com/antvis/graphin/commit/d3d44c3a15d96f4f98c8f34e23997fd039056668))
  - add handleAfterLayout and graphin:afterlayout emit ([f6b0eaa1](https://github.com/antvis/graphin/commit/f6b0eaa16718327da18007a1e19c0343084f88a0))
  - FitView not work in TreeGraph ([8f6cadeb](https://github.com/antvis/graphin/commit/8f6cadeb9491934505293859bc5cd17856db5b64))
  - fix FitView import error ([e14d8b12](https://github.com/antvis/graphin/commit/e14d8b12dc4d0c379e9fbc5123ede75784dcad95))
  - add afterlayout emit ([1ce04d10](https://github.com/antvis/graphin/commit/1ce04d108908530772df5898569666d31266853d))
  - add FitView Behaviors ([3bd10ea7](https://github.com/antvis/graphin/commit/3bd10ea760d5434e576fbcddd6299f4304825788))
  - update pack tool ([bd998a7f](https://github.com/antvis/graphin/commit/bd998a7f1bc7ef62bf602befbbc22d632bd707e6))
  - deconstruct graphin static method ([49bf2403](https://github.com/antvis/graphin/commit/49bf24030da1652953d3456bfde6c89f0fbb84f8))
  - add quick-start demos ([a03e693d](https://github.com/antvis/graphin/commit/a03e693d00a9091ce0d832f9794c149db3ca90e8))
  - fix typing error ([ad3ef202](https://github.com/antvis/graphin/commit/ad3ef202a3db08be7000f13bb65265b7b83d6f40))
  - update quick-start component demos ([86112d6d](https://github.com/antvis/graphin/commit/86112d6d968182a3e8214f9ee3ebe66eedf832ac))
  - update quick-start demo ([f3734735](https://github.com/antvis/graphin/commit/f37347355eedb1bed0b42975d00cf2b75c5ca1f5))
  - add quick-start docs ([b8edff1a](https://github.com/antvis/graphin/commit/b8edff1a74b20daec16c244101dc056777ada439))
  - export utils ([b2bb0b97](https://github.com/antvis/graphin/commit/b2bb0b973b33f2522e0914052b2475aeff6a004b))
  - fix typing ([841dd6a5](https://github.com/antvis/graphin/commit/841dd6a5ac3042a566a149bbd75c8caec47e1a7a))
  - rename render layout to preset layout ([cf0c97eb](https://github.com/antvis/graphin/commit/cf0c97ebf861da68a43302a1cebd31f6ce7a40ae))
  - fix typing error ([7bb498db](https://github.com/antvis/graphin/commit/7bb498db9e947e4809c7223e0bf802b90f954341))
  - shared setStatusStyle code ([228f5305](https://github.com/antvis/graphin/commit/228f5305e4eb8a3ade73d825e5f6a33f28d64da9))
  - add graphin-line default value ([22078023](https://github.com/antvis/graphin/commit/220780230c9f37c36b85778d015d98c3048aaceb))
  - add theme into context ([db8841f7](https://github.com/antvis/graphin/commit/db8841f78735ee79c2c1d80dd2c8299feceab765))
  - add inactive style ([40e3f6ef](https://github.com/antvis/graphin/commit/40e3f6efe5b58b2d2b7817b97ea1409ebf25850d))
  - add typing ([ed6b84bf](https://github.com/antvis/graphin/commit/ed6b84bf1c0d3b75aa59245aaececbbabe55d439))
  - fix graphin-cricle animate ([5ce31cf2](https://github.com/antvis/graphin/commit/5ce31cf2fc6f7e4db95f44f8a9b70738f0bb0937))
  - add defaultNode and nodeStatesStyle for graphin ([919dfc33](https://github.com/antvis/graphin/commit/919dfc3340362313884d018ee5e74b44cf147f61))
  - add default nodeStyle and nodeStatusStyle ([dbc2aa02](https://github.com/antvis/graphin/commit/dbc2aa0232a29d73e5db7b8920ca034c75b6df00))
  - add HaloStyle typing ([f936bd91](https://github.com/antvis/graphin/commit/f936bd91be84ba151fce38f723f141b057ee056a))
  - add update method for graphin-circle ([b3140a2f](https://github.com/antvis/graphin/commit/b3140a2fbcabef7534da5d36efb8daf1b38e59de))
  - add default options for concentric ([9caf8c24](https://github.com/antvis/graphin/commit/9caf8c2448c69576f3d83772905d3e91ca8ef52a))
  - add \_intialStyle in model to fix reset issue ([ba20733f](https://github.com/antvis/graphin/commit/ba20733f51399e6b3194914d3a913453077a8d27))
  - add theme for graphin ([7cbc17c2](https://github.com/antvis/graphin/commit/7cbc17c2e572647c270562e29f5a41e62069413a))
  - add node expand demos ([98b8cee2](https://github.com/antvis/graphin/commit/98b8cee247ae5c19d4fa85de2f1193f6233cabbe))
  - fix graphin-force without animate ([f9a560bb](https://github.com/antvis/graphin/commit/f9a560bbe5f1c2f41befcb0318a356f00751c5de))
  - Merge branch master into sprint-0111 ([0893f599](https://github.com/antvis/graphin/commit/0893f599573f140b775182591f620570c74e852c))
  - add context init state ([223b0770](https://github.com/antvis/graphin/commit/223b07708218510d65f818923a835b651dd408fa))
  - add Hoverable Behaviors ([332f26a5](https://github.com/antvis/graphin/commit/332f26a579105f769b504e756fc81e326294560c))
  - fix mock utils ([a05daa81](https://github.com/antvis/graphin/commit/a05daa81a8a905f8c104ca00c4ca45c5c0cac44e))
  - adjust interface ([d0f9ea7c](https://github.com/antvis/graphin/commit/d0f9ea7c1cb5d7315e4250ea1fd9afbdda05cdf9))
  - add setStatus in graphin-circle ([9e863751](https://github.com/antvis/graphin/commit/9e86375197113860d21e76121eaeb6f11b3ab7d5))
  - adjust largeGraph style ([b3aa9ad7](https://github.com/antvis/graphin/commit/b3aa9ad78ed69c63d3f6645f2009ddd6c1ba1454))
  - adjust export file ([f59da1c5](https://github.com/antvis/graphin/commit/f59da1c599b9785d4d221f8fdd1dba6a261c92bb))
  - add preset layout ([abac5cfd](https://github.com/antvis/graphin/commit/abac5cfdd46a6f86b394acee266700ff200e08e9))
  - prefect largeGraph demo ([39938620](https://github.com/antvis/graphin/commit/39938620cbf2effcc647e6292e905d36c01107b3))
  - adjust package script ([dba0cd13](https://github.com/antvis/graphin/commit/dba0cd134b868bc67f3a99985838bc0c6cf58579))
  - add apiController ([7a615341](https://github.com/antvis/graphin/commit/7a615341fe0adbf06d5825f447d04b8fc6d3e1a7))
  - add apis into GraphinContext ([430207d1](https://github.com/antvis/graphin/commit/430207d11e11cd67df6a2359147102beb240d4c8))
  - add graphin apis ([f6c126d4](https://github.com/antvis/graphin/commit/f6c126d4605185d1b865d6755a377b3b37b5e9ef))
  - add ActivateRelations demo ([c5059afd](https://github.com/antvis/graphin/commit/c5059afdefe78d69136e44328fc1b510e1936872))
  - add ActivateRelations behavior ([bad0678c](https://github.com/antvis/graphin/commit/bad0678cfca62e7539d6e95ee1381fffa063bfb7))
  - upgrade g6@4.1.0-beta.1 version ([02dbdacd](https://github.com/antvis/graphin/commit/02dbdacda6183fd621d3100e79ea8c56a45380b7))
- **components:**
  - add theme inot Legend.Node ([f15303f8](https://github.com/antvis/graphin/commit/f15303f87fc372020a3b007f5eaeb5c062d4d0bd))
  - add custom legend ([08863413](https://github.com/antvis/graphin/commit/088634132d72e9829419f67f9670ce0720b00d67))
  - fix .npmignore ([6c4ba14e](https://github.com/antvis/graphin/commit/6c4ba14e6e1896d6c32104ab187637cf96ac30e6))
  - add build:umd script ([64f242e5](https://github.com/antvis/graphin/commit/64f242e5b20b8d0134fccefcda0a8b0a9db0e08d))
  - do not export VisSettingPanel ([2638cd30](https://github.com/antvis/graphin/commit/2638cd30638978a4a69bc12047880f36e06119ce))
  - change VisSetting Panel dir ([478de68f](https://github.com/antvis/graphin/commit/478de68faaad17854ad30e87cea3aa9e368f727b))
  - fix import url ([3ed056f8](https://github.com/antvis/graphin/commit/3ed056f8f615260781a7a49a3022e632aa9f4b82))
  - fix typing error ([ae452fb0](https://github.com/antvis/graphin/commit/ae452fb0f7e3bef59432389c61dc130d67d0fd48))
  - prefect VisSettingPanel ([f9458a5f](https://github.com/antvis/graphin/commit/f9458a5f005a0a96f74c50c8d61e17d52d0943dc))
  - add visualSetting Panel ([50b31002](https://github.com/antvis/graphin/commit/50b31002c34d9fc7f1cfb848b9c499e781ad0e6d))
  - add Legend demos ([c242677c](https://github.com/antvis/graphin/commit/c242677c5859f9a8fc90d4bae079e25ff765bc52))
  - add Legend Component ([d578d91c](https://github.com/antvis/graphin/commit/d578d91c67007da20411c2ecc7d75b7a11c90cf6))
  - add showLabel props into FishEye ([db66207b](https://github.com/antvis/graphin/commit/db66207b1f6c8c407a2cd1977555fdb2737afb42))
  - add Toolbar Antd Demo ([517b3316](https://github.com/antvis/graphin/commit/517b33160f71af85a6977b2fa3644abac3052e43))
  - remove g6 dependence in components ([8c8a5bd1](https://github.com/antvis/graphin/commit/8c8a5bd102c55e6e654504d0470da53652312271))
  - remove 1.x components ([858bae1f](https://github.com/antvis/graphin/commit/858bae1f44e3e60f65fa2c7a6d924f38cd9eeb33))
  - add FishEye Component ([154f24f8](https://github.com/antvis/graphin/commit/154f24f8695ef6a3529e2823f598cd4323811dcd))
  - add EdgeBundling demos ([24d471d0](https://github.com/antvis/graphin/commit/24d471d0fb01e7c7382b56ac397d6a60ee465a3c))
- **icons:**
  - add custom icons docs ([dac097c3](https://github.com/antvis/graphin/commit/dac097c3c7d5cead773fa5967f9754f1381a47d0))
  - add graphin-icons docs ([2ea043d3](https://github.com/antvis/graphin/commit/2ea043d396a3d173c055e9e15e5ee6456564a9ca))
  - add close search bar ([ee6d7c66](https://github.com/antvis/graphin/commit/ee6d7c66615de23ec95e7bcbaa1e088284704da2))
  - update icons docs ([9ec21b31](https://github.com/antvis/graphin/commit/9ec21b31357a4fb084dc37847a56b149921a9df9))
- **scope:**
  - update version ([1bf91ba0](https://github.com/antvis/graphin/commit/1bf91ba0f90cadb2e4c24295bcef14c2fa14d28e))
  - fix script ([f8275fa6](https://github.com/antvis/graphin/commit/f8275fa6fcf7729768bf8627e6ee8df959d5b8fc))
  - add keyshape.endArrow ([064188d4](https://github.com/antvis/graphin/commit/064188d499cf2240b59c8102d56702916ffc3d02))
- **Components:** ignore PieMenu theme type check ([0912ccf9](https://github.com/antvis/graphin/commit/0912ccf97fa3877b35dd77d5bc5522235e8d985e))
- **graphscope:** add npm script ([652d678f](https://github.com/antvis/graphin/commit/652d678fabb9924e0179e80fa7be2389fe1ae796))
- **component:** add MiniMap Component ([23890ec8](https://github.com/antvis/graphin/commit/23890ec823f1d374ab364cc6346f520f5b387e2b))

##### Bug Fixes

- fix Hoverable props ([864abb96](https://github.com/antvis/graphin/commit/864abb96f2e2e94ba6cae0eff10fa98f7e23fc41))
- adjust Legend demos ([8c4952fa](https://github.com/antvis/graphin/commit/8c4952fa6b7e646f8e19071c9d20f0a69dfb4ef1))
- fix defaultNode ([587b4ca7](https://github.com/antvis/graphin/commit/587b4ca7feb547409392e5e8993c4e8db75fc5be))
- remove parseLabel conditional judgment ([8df518ef](https://github.com/antvis/graphin/commit/8df518ef09230e0e89d942f9a32c7013ee81b5a5))
- add right label postion ([728b6b5b](https://github.com/antvis/graphin/commit/728b6b5b5fa85d622534723e32b264b8a1a53042))
- add isLoop ([78c10d01](https://github.com/antvis/graphin/commit/78c10d01fd67a311b81831c254f696857cb52152))
- resolve eslint rules ([03e4eedb](https://github.com/antvis/graphin/commit/03e4eedb914a6d5b475d54c1357857c7a9082801))
- update layoutselector ([f6ae590a](https://github.com/antvis/graphin/commit/f6ae590a9b8be7d29d3ec897c3d6ed01d2a2596a))
- update element detail panel style ([1f09dfaf](https://github.com/antvis/graphin/commit/1f09dfaf313d1a01bfb32e645340ad9370bbcb7e))
- graphScope add detail panel ([7725c162](https://github.com/antvis/graphin/commit/7725c162f21bd7a27fed9b9758ca4e1fa438d50d))
- set build config to lessinbablelmode ([ce0874bb](https://github.com/antvis/graphin/commit/ce0874bbb2f11845aedd97e64e37bce47ed7fb94))
- update graphscope ([3ddb5e1a](https://github.com/antvis/graphin/commit/3ddb5e1aaae13cd6625348381cca5791f1975302))
- node detail & color ([aaff1626](https://github.com/antvis/graphin/commit/aaff1626d5215d40d08369a7ab50e89a5316f322))
- update graphScope package ([ccd2cf01](https://github.com/antvis/graphin/commit/ccd2cf01d6d32abf370f1b08f19dc61555e75717))
- graphScope support components optional ([0c513646](https://github.com/antvis/graphin/commit/0c5136467e579ec6f9d1377831764c6afbb7fb0e))
- toolbar docs ([33124d1f](https://github.com/antvis/graphin/commit/33124d1f4c1b98824602828e79bbc4849ab1f4cb))
- toolbar component demos ([9a80bf4e](https://github.com/antvis/graphin/commit/9a80bf4e6949da8d67e81f3ff05e651d929ff7cf))
- solve dumi-theme-graphin error ([4dd0d1c2](https://github.com/antvis/graphin/commit/4dd0d1c2434fadd33dcf4f1b2666b13d6bb5bed9))
- github ci ignore graphscope ([0cd8dcce](https://github.com/antvis/graphin/commit/0cd8dcce509d191cd49897d8468d597cbd2e3e28))
- add label shape parseAttr ([727011d1](https://github.com/antvis/graphin/commit/727011d1e74dc3be7220328279bb9f92283db2af))
- add toolbar files ([94a13734](https://github.com/antvis/graphin/commit/94a13734fcf798f0fffe12ef6c006a97140bb9f9))
- graphin-comonent build ([cf93d3f6](https://github.com/antvis/graphin/commit/cf93d3f613f74a87941b64aa59ae9043f7bf3556))
- update graphin-component build problem ([ffac2ab5](https://github.com/antvis/graphin/commit/ffac2ab53dde2a5d006dde6ac26203c6dfa6493a))
- update graphscope eslint ([703cb4be](https://github.com/antvis/graphin/commit/703cb4be4a928c0c6930e0d71df78367c716e9d5))
- graphscope build problem ([db2367d6](https://github.com/antvis/graphin/commit/db2367d68892e3a66c4f1690e468ce336003dada))
- update entry file ([edc5c6e5](https://github.com/antvis/graphin/commit/edc5c6e5848e4e71b7259666b9fb7090ec68c747))
- update edge types file ([b36bea06](https://github.com/antvis/graphin/commit/b36bea060514877b5d7498b7770668cf2282b19f))
- add graphin-line type ([45e55205](https://github.com/antvis/graphin/commit/45e5520512af27bb8ad7e0e3dbaad80b4eda5e85))
- update edge types file ([16d8dcad](https://github.com/antvis/graphin/commit/16d8dcad95b18cbd85ce4ee311301015e62c45f3))
- update G6 & add node example ([3f1285c9](https://github.com/antvis/graphin/commit/3f1285c928b22e84e1e1c84c978a9add50ab5b08))
- add edge style types support parallel & animation ([ab6abe60](https://github.com/antvis/graphin/commit/ab6abe60a138bc34008154bb1e2d7f3db105798e))
- update type file path ([c0922eda](https://github.com/antvis/graphin/commit/c0922eda287cb34fc2895b48388dd15daad7b05c))
- update mirror action ([a38b4ad8](https://github.com/antvis/graphin/commit/a38b4ad80fe05364e8dc5c0ad308ad4c961f2478))
- **components:**
  - fix less-loader version ([e7a76496](https://github.com/antvis/graphin/commit/e7a76496f3c8fc1af048d90aa5648326a0c9299e))
  - fix url ([8b33ac5d](https://github.com/antvis/graphin/commit/8b33ac5deffd9b8fdf066083ab390ebd758361d3))
  - fix components ([80a4963e](https://github.com/antvis/graphin/commit/80a4963e3419ce135d9c3e8f9157aa7a4d8bce66))
  - fix index.d.ts path ([cf0f99c8](https://github.com/antvis/graphin/commit/cf0f99c81177f94c1676e3c93d0fc10baafb27a0))
- **graphin:**
  - fix eslint error ([f3e35db4](https://github.com/antvis/graphin/commit/f3e35db461bf35da056b27bd1e0ab78764b7ea5c))
  - fix typing error ([075781a3](https://github.com/antvis/graphin/commit/075781a38cd7182514197229fc81eb4ad0fd9049))
  - fix graphin typing error ([158a94a0](https://github.com/antvis/graphin/commit/158a94a0e47977916e32e265ea23a1a62f9f2f3e))
  - deep merge defaultStyle ([a49b928b](https://github.com/antvis/graphin/commit/a49b928be2671031a99a6a7a1dd512537cab4d9f))
  - deep merge defaultStyle ([a79bba82](https://github.com/antvis/graphin/commit/a79bba823794e5437bec65a726961e6d0ffd2eac))
  - fix highlight apis ([f26facf3](https://github.com/antvis/graphin/commit/f26facf352e58eeaef0df3be4147465056f9e156))
  - add GraphinContect type ([137f8f11](https://github.com/antvis/graphin/commit/137f8f11767b15ae52518cf41c9be5ecadf6fa33))
  - add prevOptions when layout init ([08a83422](https://github.com/antvis/graphin/commit/08a834220018f12186d92e516b4dcb234c1ab992))
- **style:** fix eslint error ([5e1debfc](https://github.com/antvis/graphin/commit/5e1debfc42d02cd7a9a12035a0e0e5cf219b8234))
- **component:** fix menu error ([c3d341b3](https://github.com/antvis/graphin/commit/c3d341b395c8e5243df94e78c445dc649bd12f77))

##### Other Changes

- add layout switching ([4096a667](https://github.com/antvis/graphin/commit/4096a667a556160d8b43e6a6663499f8f7725454))
- //github.com/antvis/Graphin ([d4e18a57](https://github.com/antvis/graphin/commit/d4e18a57af6db883cacb9ff83704ae9c5111fc1e))
- fix eslint error and skip test ([63162f23](https://github.com/antvis/graphin/commit/63162f23c3f12d2d4548712367253b987ce06fa5))
- **graphin:**
  - update g6 latest version ([b6ab97df](https://github.com/antvis/graphin/commit/b6ab97df570cc41df6539197fc63f965336c34ec))
  - fix version to lerna bootstrap ([c9ec56a8](https://github.com/antvis/graphin/commit/c9ec56a8f3c41ca51e1add99a35a0290670eb91b))

##### Refactors

- **graphin:**
  - refactor graphin-circle update logic ([850199fa](https://github.com/antvis/graphin/commit/850199fa504e2be655e42cff7ae3ab5004765c5e))
  - add graphin-line shape ([8fc761b1](https://github.com/antvis/graphin/commit/8fc761b1e4da78d7e61b9778a3433348154dacdf))
  - remove old shape ([335012cf](https://github.com/antvis/graphin/commit/335012cf637354e7a078771493057e36c65db4bf))
- **site:** add gallery into site ([64c2ca03](https://github.com/antvis/graphin/commit/64c2ca032c049e8616d3372603a9443ed8234852))

##### Code Style Changes

- fix eslint error ([88082fe7](https://github.com/antvis/graphin/commit/88082fe79f66f8e8f392444b711e9f5336459ebc))
- **graphin:**
  - fix eslint error and skip test ([99ac99af](https://github.com/antvis/graphin/commit/99ac99af0281431b9e56fab00e8e9dc760b011c6))
  - fix eslint error ([228241ea](https://github.com/antvis/graphin/commit/228241ea4a220beb3e7c7e0355e012cd34a4f084))
  - fix eslint error ([6be9a4f2](https://github.com/antvis/graphin/commit/6be9a4f26b52d4f8400aaa5b337a201573cdc3cc))
  - fix graphin typing error ([5f6d389d](https://github.com/antvis/graphin/commit/5f6d389df0629c39b5e5a4232de4cbdf72a2135a))
  - adjust eslint rules ([969aac4c](https://github.com/antvis/graphin/commit/969aac4cf188d3959c61520d29f13cb1b53043d8))
  - adjust demos ([5f9eabf1](https://github.com/antvis/graphin/commit/5f9eabf1384de4954683e63c14c5bbdb83bd3bf4))
  - fix typing error ([d62768f5](https://github.com/antvis/graphin/commit/d62768f59d35e531fc8bff7a4cb56afd33c57bad))
  - remove dump code ([de9bac0e](https://github.com/antvis/graphin/commit/de9bac0eae255ac72a5da5098b4e1c45a76666c9))
- **eslint:** fix lint error ([e686afa8](https://github.com/antvis/graphin/commit/e686afa89a907d53d50ca640a2ab1b957d1005b1))

#### 2021-02-07

##### Chores

- **graphin:**
  - remove graphin graphin-components css ([75246659](https://github.com/antvis/graphin/commit/75246659117641b956972da3b93693c87160d464))
  - remove @antv/graphin/dist/index.css ([d4cc0948](https://github.com/antvis/graphin/commit/d4cc0948ffce7ed6e86f1c88cde6afaecc5f310c))
  - fix .umirc ([82330729](https://github.com/antvis/graphin/commit/82330729a4f5e684c9e0ed9c2a921cfea263fdd2))
  - fix npmclinet ([00e5e4f9](https://github.com/antvis/graphin/commit/00e5e4f93474945abbaec9a2f0aaed422d88f36b))
  - fix styles ([336dc850](https://github.com/antvis/graphin/commit/336dc850599cfc7e92b856d1deba55a4a6256228))
  - fix styles ([19f56e83](https://github.com/antvis/graphin/commit/19f56e838ab8670b5aa01aaf1782f95b0b0724ca))
  - prefect graphin-circle ([5fd48b17](https://github.com/antvis/graphin/commit/5fd48b17462be946d42ce97578b9531dadb9ff3a))
  - add github-pages : https://antv.vision/graphin-docs/ ([55f05cc2](https://github.com/antvis/graphin/commit/55f05cc2ce3b9a195d4389fd104e305c5faaeb1e))
- **deps-dev:**
  - bump @types/jest from 24.9.1 to 25.2.3 ([af0dbb68](https://github.com/antvis/graphin/commit/af0dbb68c088eed36cc73c9deca4a3b54b63beb6))
  - bump ts-loader from 6.2.2 to 7.0.4 ([67e6fbb3](https://github.com/antvis/graphin/commit/67e6fbb38857c028eb70f1f3d5b06cbad4660435))
  - bump @testing-library/jest-dom from 4.2.4 to 5.7.0 ([e211ec8a](https://github.com/antvis/graphin/commit/e211ec8aaecebdb2d8d61bfcf8183b813b6c78f7))
  - bump less-loader from 4.1.0 to 6.1.0 ([57d1d4a9](https://github.com/antvis/graphin/commit/57d1d4a9358db427808d7d07fd4ef980fb9bbbd7))
  - bump rimraf from 2.7.1 to 3.0.2 ([83b7530f](https://github.com/antvis/graphin/commit/83b7530fe0298a726b0d50fd9753ea92933d2fa9))
  - bump style-loader from 0.23.1 to 1.2.1 ([6a539f1c](https://github.com/antvis/graphin/commit/6a539f1cd906be7c1c3b2f5209decd4603ae79a0))
  - bump husky from 1.3.1 to 4.2.5 ([956c02af](https://github.com/antvis/graphin/commit/956c02afffefd5d378e6a0af53f187ccb07839c6))
  - bump file-loader from 4.3.0 to 6.0.0 ([164319b3](https://github.com/antvis/graphin/commit/164319b3527656db9027987ece19c9a22a8011a5))
  - bump lint-staged from 8.2.1 to 10.2.2 ([1f88753f](https://github.com/antvis/graphin/commit/1f88753f8a3243f8a42dc9f78ead18594575bd5f))
- **deps:** bump antd from 3.26.17 to 4.2.4 ([ab146cfb](https://github.com/antvis/graphin/commit/ab146cfb13ac2b5eaf4e32cc3157be2ed6a0b585))

##### Documentation Changes

- **graphin:**
  - add behaviors demos ([ad46384b](https://github.com/antvis/graphin/commit/ad46384bc22d0880a7d847893f8d9457b262e420))
  - add theme demos ([8206356c](https://github.com/antvis/graphin/commit/8206356cf23aeabc29b557ad39a4389a2030150b))
  - add edge demos ([c6f05617](https://github.com/antvis/graphin/commit/c6f05617c9c548e17198ccc4ea6d85a2299691d6))
  - add some demos ([8abf16bf](https://github.com/antvis/graphin/commit/8abf16bf44449562398aba009465a6432b421c2b))
  - fix demo style ([f9ed325f](https://github.com/antvis/graphin/commit/f9ed325fde3bb1d4e29546c8abcb21d55856a301))
  - add animate switch for large graph ([1815f3dd](https://github.com/antvis/graphin/commit/1815f3dd6e1668818a6e7e6b168df3769b00609e))
  - add graphin-docs ([df11f519](https://github.com/antvis/graphin/commit/df11f519736789dbb1e0e3ed5bdfaad3126fe549))
  - add source demo ([2c1bd398](https://github.com/antvis/graphin/commit/2c1bd39859659c05abfe91cd076f96f76de241ca))
  - add render layout demo ([33c4d138](https://github.com/antvis/graphin/commit/33c4d1381240e81d42cae591c86cc0f4340fc969))
  - add LargeGraph expand demos ([eac14249](https://github.com/antvis/graphin/commit/eac14249d9235e4cd6f61aaa24f543d8783f8590))

##### New Features

- fix graphin typing error ([920a6f40](https://github.com/antvis/graphin/commit/920a6f40060ab0f86e111e5a9360c629021052a6))
- fix npmignore file ([af950dbc](https://github.com/antvis/graphin/commit/af950dbc87bc6821c14fc2ff1c6499169793e5ca))
- add layout demos ([95584b5b](https://github.com/antvis/graphin/commit/95584b5b98ac436d5f89864f83dbdfe41f8a34af))
- add walk utils and fix tree method ([d1949bad](https://github.com/antvis/graphin/commit/d1949bad100309e9fb00e9fa8aec3d7faa99a675))
- fix GraphinTreeData type ([65c8a6f8](https://github.com/antvis/graphin/commit/65c8a6f8c5e020aaca966c2e1f59480bacb7a8b6))
- prefect edge loop type ([0cbaedf0](https://github.com/antvis/graphin/commit/0cbaedf0a8ff43196786ec83dbd029682df6d162))
- fix label.visible not work ([20d81f9d](https://github.com/antvis/graphin/commit/20d81f9d41760d10453fe47efc16ef8f2bfc09ea))
- update components to 2.0.0-beta.11 ([cae74208](https://github.com/antvis/graphin/commit/cae7420800a5f62b7f8a4d2b01238108bdfb3b93))
- update graphin version to 2.0.0-beta.11 ([244b616d](https://github.com/antvis/graphin/commit/244b616de1402d329e78ed59c18684b88516f813))
- update utils.mock().tree().graphinTree() method ([a68b097c](https://github.com/antvis/graphin/commit/a68b097c28172ee8e4ae81035157f4613ff914f3))
- add update status demos ([2a20d311](https://github.com/antvis/graphin/commit/2a20d3116711829d74b70e633ed52313301ac60b))
- add dev tips when graphType change ([71ece7ed](https://github.com/antvis/graphin/commit/71ece7ed94b57875a51902111d46062a1a59f7d8))
- remove console.log ([73c5ada1](https://github.com/antvis/graphin/commit/73c5ada16b739d6f7c97be13fe0f38fc55fdd97c))
- fix calculate label position ([bb55afff](https://github.com/antvis/graphin/commit/bb55afff41071e8988d212cdfeff09e59e7f497f))
- add Tooltip demo to solve contextmenu event ([38dbda9f](https://github.com/antvis/graphin/commit/38dbda9f9936279a9b2a9a19369215cf14b094ec))
- fix getDataFromGraph ([84087e2d](https://github.com/antvis/graphin/commit/84087e2d2611bc64467047e23810d7b02818762b))
- update graphin-components version ([fecdc8ca](https://github.com/antvis/graphin/commit/fecdc8ca76c41292d4b58ab1f02bc38dd27b3ff0))
- update graphin version to 2.0.0-beta.10 ([6cb09d9f](https://github.com/antvis/graphin/commit/6cb09d9f2c8d64626ff10d09859c23d7bf33c3e7))
- auto set loop type in graphin ([3d56fbde](https://github.com/antvis/graphin/commit/3d56fbde906a0c39af38d02bafe1f6e9d65087c0))
- remove Hover edge in graphin ([c8d6a7c9](https://github.com/antvis/graphin/commit/c8d6a7c90439b9e11ee7a9ad9464e1a7ce4d8a29))
- add loop and poly edge ([05be2db9](https://github.com/antvis/graphin/commit/05be2db9e9f8c8869bebb819526f9e19ceb725fd))
- add demos for graphin ([226679cc](https://github.com/antvis/graphin/commit/226679cca25456fb7944c95a6128349597132f19))
- add layoutselector files ([77060d01](https://github.com/antvis/graphin/commit/77060d01ab20dd20b11efa68c5088ed79f48684d))
- add database build schema case ([e34b1d17](https://github.com/antvis/graphin/commit/e34b1d1770d3a14b077038602dd3022e2084a9f0))
- adjust graphin docs ([67b6792e](https://github.com/antvis/graphin/commit/67b6792e823581566475d3524661062e9c654bc8))
- add Graphin theme docs ([5482bf09](https://github.com/antvis/graphin/commit/5482bf09a33dbf13127561af07c86231622b604a))
- add theme dirs ([6352f565](https://github.com/antvis/graphin/commit/6352f565a646359ac8f864e02a384530a926743c))
- fix package dependencies ([620a0298](https://github.com/antvis/graphin/commit/620a0298af5e50db0267a35f2030d05059f9b946))
- fix components packing error ([bfb83fa7](https://github.com/antvis/graphin/commit/bfb83fa74582d4daff78189b9139cdf7d480ff0d))
- update local G6 external ([0d5a070c](https://github.com/antvis/graphin/commit/0d5a070cecd40e89738e5be65876010505c042a8))
- update G6 latest version ([b286d781](https://github.com/antvis/graphin/commit/b286d781014e582320c69fc3692e2a8c0536b9c4))
- fix DragCanvas shouldBegin returns ([1a67e8ac](https://github.com/antvis/graphin/commit/1a67e8acc48e38e0806ea9099784d9d17bbad2b3))
- publish dumi-theme-graphin@0.1.0 ([8eb61a07](https://github.com/antvis/graphin/commit/8eb61a07e057c95dd31791e1b5a4dab5b266ba01))
- add edge demo ([055f8b9c](https://github.com/antvis/graphin/commit/055f8b9c43cd61d60d0fe0e53bff403099ab8ff3))
- add edge interface docs ([fcd5cfbe](https://github.com/antvis/graphin/commit/fcd5cfbe5d0231c60c0b5552094a608f6006a6ee))
- adjust prettier config ([d6a31e5b](https://github.com/antvis/graphin/commit/d6a31e5b06c64ba2c03881493d7414185829df83))
- fix components typing error ([afc9b634](https://github.com/antvis/graphin/commit/afc9b634065bc5371fec641efa3a9b063fc4cb60))
- add EdgeStyle typing ([fb93a549](https://github.com/antvis/graphin/commit/fb93a54989d7e9014ec125f9e12108a486bbfd3e))
- add Edge Hover ([525c82d1](https://github.com/antvis/graphin/commit/525c82d1b0585dfb4ef7f68d72b0004a3bc962f2))
- adjust graphin default style ([f0b08be4](https://github.com/antvis/graphin/commit/f0b08be491e8b4296e5369817f85ad8bfe10500c))
- add fillOpacity attrs ([8991ad47](https://github.com/antvis/graphin/commit/8991ad470290e97c509151d15fb487597e1beaec))
- add background for line and fix typing error ([a5e139a3](https://github.com/antvis/graphin/commit/a5e139a3a5c71444922aca38c9a43aa7237c5ffc))
- get data from graph when layout changed ([7cf4773d](https://github.com/antvis/graphin/commit/7cf4773d28e86258fad2013fb884a1e6d9e84068))
- add update-node demos ([a4041543](https://github.com/antvis/graphin/commit/a4041543384589108c00fe49c9a0f31151247a87))
- remove x,y props ([f1567215](https://github.com/antvis/graphin/commit/f15672156a9f33e9354ecb4e45c6767f633743ab))
- update toolbar interface ([650e9f9c](https://github.com/antvis/graphin/commit/650e9f9cd15cf645466a51f6081bce57e16aff9b))
- update Toolbar docs ([82e284f6](https://github.com/antvis/graphin/commit/82e284f659a54808fa9fc846c7f7ba53671964da))
- update toolbar demos ([50186dc8](https://github.com/antvis/graphin/commit/50186dc87390fcf74b946452a214765b151d7c40))
- fix build-in theme ([840a5d74](https://github.com/antvis/graphin/commit/840a5d74b1c442c1af5551f37ea9a437eae5766f))
- add docs ([646844ef](https://github.com/antvis/graphin/commit/646844efb6d513294f15a616809ca6998dfece34))
- add render network and tree demo ([3a8d880a](https://github.com/antvis/graphin/commit/3a8d880a6030716314218a61524e682d6ddfd3f7))
- add typing description ([d83e91a5](https://github.com/antvis/graphin/commit/d83e91a57bb4f02ab29c8d32a5b49e3081e69346))
- add FontPaint behaviors ([9575d7bf](https://github.com/antvis/graphin/commit/9575d7bf664329316c8b902cc7acb7d117ae7aa8))
- add interface demos ([0d0fe668](https://github.com/antvis/graphin/commit/0d0fe6688e5bbf497fce797356d5d2dadb8946a0))
- remove graphin/icons ddemo ([1f10e783](https://github.com/antvis/graphin/commit/1f10e78305a9417a813e9f09158ec288ddcd07e4))
- add some docs ([1ac6a925](https://github.com/antvis/graphin/commit/1ac6a925904f880acf144f5437a154928ee4f198))
- refactor toolbar component ([27ca1d58](https://github.com/antvis/graphin/commit/27ca1d58efdecff6b927312cfc67747f5ffa1d61))
- add dumi-theme-graphin packages ([c21d787d](https://github.com/antvis/graphin/commit/c21d787d9acfd5e78a080094cdd8ad70839f9961))
- add 1.x site url ([9da0e364](https://github.com/antvis/graphin/commit/9da0e364c36786d41bb0f6caa3ffee5125e79dc7))
- update nodestyle ([f9253380](https://github.com/antvis/graphin/commit/f92533803ca4cdd038d6bf98767b2b3f65934a20))
- graphscope example ([38416926](https://github.com/antvis/graphin/commit/384169260c2dc41db48bbf6ae681a8cddaef5b70))
- init graphscope project ([d53e5e6a](https://github.com/antvis/graphin/commit/d53e5e6a6b4d52ba4c3fb56d00544043f88b1a43))
- add graphin-line edge ([e95374ac](https://github.com/antvis/graphin/commit/e95374acff4b39d0e0cfec7a383b2e0ec364d693))
- **graphin:**
  - share common utils in graphin-circle ([0f16bd5f](https://github.com/antvis/graphin/commit/0f16bd5f0a30b93a57efb4fca94ae35d60d02ee4))
  - fix typing error ([b3c0db23](https://github.com/antvis/graphin/commit/b3c0db23e54dd3569cc190f974808a6e8be2a71f))
  - fix typing error ([45a730fe](https://github.com/antvis/graphin/commit/45a730feef6f5626fa5195d3d34838501bdda720))
  - add active style ([5f9a799b](https://github.com/antvis/graphin/commit/5f9a799b74d30f65f3b5221d324122e6dea7b98b))
  - add Select demos ([c7e09880](https://github.com/antvis/graphin/commit/c7e098808ccf299ad54bcd1feea7b6bab12303d7))
  - add typing ([d3d44c3a](https://github.com/antvis/graphin/commit/d3d44c3a15d96f4f98c8f34e23997fd039056668))
  - add handleAfterLayout and graphin:afterlayout emit ([f6b0eaa1](https://github.com/antvis/graphin/commit/f6b0eaa16718327da18007a1e19c0343084f88a0))
  - FitView not work in TreeGraph ([8f6cadeb](https://github.com/antvis/graphin/commit/8f6cadeb9491934505293859bc5cd17856db5b64))
  - fix FitView import error ([e14d8b12](https://github.com/antvis/graphin/commit/e14d8b12dc4d0c379e9fbc5123ede75784dcad95))
  - add afterlayout emit ([1ce04d10](https://github.com/antvis/graphin/commit/1ce04d108908530772df5898569666d31266853d))
  - add FitView Behaviors ([3bd10ea7](https://github.com/antvis/graphin/commit/3bd10ea760d5434e576fbcddd6299f4304825788))
  - update pack tool ([bd998a7f](https://github.com/antvis/graphin/commit/bd998a7f1bc7ef62bf602befbbc22d632bd707e6))
  - deconstruct graphin static method ([49bf2403](https://github.com/antvis/graphin/commit/49bf24030da1652953d3456bfde6c89f0fbb84f8))
  - add quick-start demos ([a03e693d](https://github.com/antvis/graphin/commit/a03e693d00a9091ce0d832f9794c149db3ca90e8))
  - fix typing error ([ad3ef202](https://github.com/antvis/graphin/commit/ad3ef202a3db08be7000f13bb65265b7b83d6f40))
  - update quick-start component demos ([86112d6d](https://github.com/antvis/graphin/commit/86112d6d968182a3e8214f9ee3ebe66eedf832ac))
  - update quick-start demo ([f3734735](https://github.com/antvis/graphin/commit/f37347355eedb1bed0b42975d00cf2b75c5ca1f5))
  - add quick-start docs ([b8edff1a](https://github.com/antvis/graphin/commit/b8edff1a74b20daec16c244101dc056777ada439))
  - export utils ([b2bb0b97](https://github.com/antvis/graphin/commit/b2bb0b973b33f2522e0914052b2475aeff6a004b))
  - fix typing ([841dd6a5](https://github.com/antvis/graphin/commit/841dd6a5ac3042a566a149bbd75c8caec47e1a7a))
  - rename render layout to preset layout ([cf0c97eb](https://github.com/antvis/graphin/commit/cf0c97ebf861da68a43302a1cebd31f6ce7a40ae))
  - fix typing error ([7bb498db](https://github.com/antvis/graphin/commit/7bb498db9e947e4809c7223e0bf802b90f954341))
  - shared setStatusStyle code ([228f5305](https://github.com/antvis/graphin/commit/228f5305e4eb8a3ade73d825e5f6a33f28d64da9))
  - add graphin-line default value ([22078023](https://github.com/antvis/graphin/commit/220780230c9f37c36b85778d015d98c3048aaceb))
  - add theme into context ([db8841f7](https://github.com/antvis/graphin/commit/db8841f78735ee79c2c1d80dd2c8299feceab765))
  - add inactive style ([40e3f6ef](https://github.com/antvis/graphin/commit/40e3f6efe5b58b2d2b7817b97ea1409ebf25850d))
  - add typing ([ed6b84bf](https://github.com/antvis/graphin/commit/ed6b84bf1c0d3b75aa59245aaececbbabe55d439))
  - fix graphin-cricle animate ([5ce31cf2](https://github.com/antvis/graphin/commit/5ce31cf2fc6f7e4db95f44f8a9b70738f0bb0937))
  - add defaultNode and nodeStatesStyle for graphin ([919dfc33](https://github.com/antvis/graphin/commit/919dfc3340362313884d018ee5e74b44cf147f61))
  - add default nodeStyle and nodeStatusStyle ([dbc2aa02](https://github.com/antvis/graphin/commit/dbc2aa0232a29d73e5db7b8920ca034c75b6df00))
  - add HaloStyle typing ([f936bd91](https://github.com/antvis/graphin/commit/f936bd91be84ba151fce38f723f141b057ee056a))
  - add update method for graphin-circle ([b3140a2f](https://github.com/antvis/graphin/commit/b3140a2fbcabef7534da5d36efb8daf1b38e59de))
  - add default options for concentric ([9caf8c24](https://github.com/antvis/graphin/commit/9caf8c2448c69576f3d83772905d3e91ca8ef52a))
  - add \_intialStyle in model to fix reset issue ([ba20733f](https://github.com/antvis/graphin/commit/ba20733f51399e6b3194914d3a913453077a8d27))
  - add theme for graphin ([7cbc17c2](https://github.com/antvis/graphin/commit/7cbc17c2e572647c270562e29f5a41e62069413a))
  - add node expand demos ([98b8cee2](https://github.com/antvis/graphin/commit/98b8cee247ae5c19d4fa85de2f1193f6233cabbe))
  - fix graphin-force without animate ([f9a560bb](https://github.com/antvis/graphin/commit/f9a560bbe5f1c2f41befcb0318a356f00751c5de))
  - Merge branch master into sprint-0111 ([0893f599](https://github.com/antvis/graphin/commit/0893f599573f140b775182591f620570c74e852c))
  - add context init state ([223b0770](https://github.com/antvis/graphin/commit/223b07708218510d65f818923a835b651dd408fa))
  - add Hoverable Behaviors ([332f26a5](https://github.com/antvis/graphin/commit/332f26a579105f769b504e756fc81e326294560c))
  - fix mock utils ([a05daa81](https://github.com/antvis/graphin/commit/a05daa81a8a905f8c104ca00c4ca45c5c0cac44e))
  - adjust interface ([d0f9ea7c](https://github.com/antvis/graphin/commit/d0f9ea7c1cb5d7315e4250ea1fd9afbdda05cdf9))
  - add setStatus in graphin-circle ([9e863751](https://github.com/antvis/graphin/commit/9e86375197113860d21e76121eaeb6f11b3ab7d5))
  - adjust largeGraph style ([b3aa9ad7](https://github.com/antvis/graphin/commit/b3aa9ad78ed69c63d3f6645f2009ddd6c1ba1454))
  - adjust export file ([f59da1c5](https://github.com/antvis/graphin/commit/f59da1c599b9785d4d221f8fdd1dba6a261c92bb))
  - add preset layout ([abac5cfd](https://github.com/antvis/graphin/commit/abac5cfdd46a6f86b394acee266700ff200e08e9))
  - prefect largeGraph demo ([39938620](https://github.com/antvis/graphin/commit/39938620cbf2effcc647e6292e905d36c01107b3))
  - adjust package script ([dba0cd13](https://github.com/antvis/graphin/commit/dba0cd134b868bc67f3a99985838bc0c6cf58579))
  - add apiController ([7a615341](https://github.com/antvis/graphin/commit/7a615341fe0adbf06d5825f447d04b8fc6d3e1a7))
  - add apis into GraphinContext ([430207d1](https://github.com/antvis/graphin/commit/430207d11e11cd67df6a2359147102beb240d4c8))
  - add graphin apis ([f6c126d4](https://github.com/antvis/graphin/commit/f6c126d4605185d1b865d6755a377b3b37b5e9ef))
  - add ActivateRelations demo ([c5059afd](https://github.com/antvis/graphin/commit/c5059afdefe78d69136e44328fc1b510e1936872))
  - add ActivateRelations behavior ([bad0678c](https://github.com/antvis/graphin/commit/bad0678cfca62e7539d6e95ee1381fffa063bfb7))
  - upgrade g6@4.1.0-beta.1 version ([02dbdacd](https://github.com/antvis/graphin/commit/02dbdacda6183fd621d3100e79ea8c56a45380b7))
- **components:**
  - add theme inot Legend.Node ([f15303f8](https://github.com/antvis/graphin/commit/f15303f87fc372020a3b007f5eaeb5c062d4d0bd))
  - add custom legend ([08863413](https://github.com/antvis/graphin/commit/088634132d72e9829419f67f9670ce0720b00d67))
  - fix .npmignore ([6c4ba14e](https://github.com/antvis/graphin/commit/6c4ba14e6e1896d6c32104ab187637cf96ac30e6))
  - add build:umd script ([64f242e5](https://github.com/antvis/graphin/commit/64f242e5b20b8d0134fccefcda0a8b0a9db0e08d))
  - do not export VisSettingPanel ([2638cd30](https://github.com/antvis/graphin/commit/2638cd30638978a4a69bc12047880f36e06119ce))
  - change VisSetting Panel dir ([478de68f](https://github.com/antvis/graphin/commit/478de68faaad17854ad30e87cea3aa9e368f727b))
  - fix import url ([3ed056f8](https://github.com/antvis/graphin/commit/3ed056f8f615260781a7a49a3022e632aa9f4b82))
  - fix typing error ([ae452fb0](https://github.com/antvis/graphin/commit/ae452fb0f7e3bef59432389c61dc130d67d0fd48))
  - prefect VisSettingPanel ([f9458a5f](https://github.com/antvis/graphin/commit/f9458a5f005a0a96f74c50c8d61e17d52d0943dc))
  - add visualSetting Panel ([50b31002](https://github.com/antvis/graphin/commit/50b31002c34d9fc7f1cfb848b9c499e781ad0e6d))
  - add Legend demos ([c242677c](https://github.com/antvis/graphin/commit/c242677c5859f9a8fc90d4bae079e25ff765bc52))
  - add Legend Component ([d578d91c](https://github.com/antvis/graphin/commit/d578d91c67007da20411c2ecc7d75b7a11c90cf6))
  - add showLabel props into FishEye ([db66207b](https://github.com/antvis/graphin/commit/db66207b1f6c8c407a2cd1977555fdb2737afb42))
  - add Toolbar Antd Demo ([517b3316](https://github.com/antvis/graphin/commit/517b33160f71af85a6977b2fa3644abac3052e43))
  - remove g6 dependence in components ([8c8a5bd1](https://github.com/antvis/graphin/commit/8c8a5bd102c55e6e654504d0470da53652312271))
  - remove 1.x components ([858bae1f](https://github.com/antvis/graphin/commit/858bae1f44e3e60f65fa2c7a6d924f38cd9eeb33))
  - add FishEye Component ([154f24f8](https://github.com/antvis/graphin/commit/154f24f8695ef6a3529e2823f598cd4323811dcd))
  - add EdgeBundling demos ([24d471d0](https://github.com/antvis/graphin/commit/24d471d0fb01e7c7382b56ac397d6a60ee465a3c))
- **icons:**
  - add custom icons docs ([dac097c3](https://github.com/antvis/graphin/commit/dac097c3c7d5cead773fa5967f9754f1381a47d0))
  - add graphin-icons docs ([2ea043d3](https://github.com/antvis/graphin/commit/2ea043d396a3d173c055e9e15e5ee6456564a9ca))
  - add close search bar ([ee6d7c66](https://github.com/antvis/graphin/commit/ee6d7c66615de23ec95e7bcbaa1e088284704da2))
  - update icons docs ([9ec21b31](https://github.com/antvis/graphin/commit/9ec21b31357a4fb084dc37847a56b149921a9df9))
- **scope:**
  - update version ([1bf91ba0](https://github.com/antvis/graphin/commit/1bf91ba0f90cadb2e4c24295bcef14c2fa14d28e))
  - fix script ([f8275fa6](https://github.com/antvis/graphin/commit/f8275fa6fcf7729768bf8627e6ee8df959d5b8fc))
  - add keyshape.endArrow ([064188d4](https://github.com/antvis/graphin/commit/064188d499cf2240b59c8102d56702916ffc3d02))
- **Components:** ignore PieMenu theme type check ([0912ccf9](https://github.com/antvis/graphin/commit/0912ccf97fa3877b35dd77d5bc5522235e8d985e))
- **graphscope:** add npm script ([652d678f](https://github.com/antvis/graphin/commit/652d678fabb9924e0179e80fa7be2389fe1ae796))
- **component:** add MiniMap Component ([23890ec8](https://github.com/antvis/graphin/commit/23890ec823f1d374ab364cc6346f520f5b387e2b))

##### Bug Fixes

- add right label postion ([728b6b5b](https://github.com/antvis/graphin/commit/728b6b5b5fa85d622534723e32b264b8a1a53042))
- add isLoop ([78c10d01](https://github.com/antvis/graphin/commit/78c10d01fd67a311b81831c254f696857cb52152))
- resolve eslint rules ([03e4eedb](https://github.com/antvis/graphin/commit/03e4eedb914a6d5b475d54c1357857c7a9082801))
- update layoutselector ([f6ae590a](https://github.com/antvis/graphin/commit/f6ae590a9b8be7d29d3ec897c3d6ed01d2a2596a))
- update element detail panel style ([1f09dfaf](https://github.com/antvis/graphin/commit/1f09dfaf313d1a01bfb32e645340ad9370bbcb7e))
- graphScope add detail panel ([7725c162](https://github.com/antvis/graphin/commit/7725c162f21bd7a27fed9b9758ca4e1fa438d50d))
- set build config to lessinbablelmode ([ce0874bb](https://github.com/antvis/graphin/commit/ce0874bbb2f11845aedd97e64e37bce47ed7fb94))
- update graphscope ([3ddb5e1a](https://github.com/antvis/graphin/commit/3ddb5e1aaae13cd6625348381cca5791f1975302))
- node detail & color ([aaff1626](https://github.com/antvis/graphin/commit/aaff1626d5215d40d08369a7ab50e89a5316f322))
- update graphScope package ([ccd2cf01](https://github.com/antvis/graphin/commit/ccd2cf01d6d32abf370f1b08f19dc61555e75717))
- graphScope support components optional ([0c513646](https://github.com/antvis/graphin/commit/0c5136467e579ec6f9d1377831764c6afbb7fb0e))
- toolbar docs ([33124d1f](https://github.com/antvis/graphin/commit/33124d1f4c1b98824602828e79bbc4849ab1f4cb))
- toolbar component demos ([9a80bf4e](https://github.com/antvis/graphin/commit/9a80bf4e6949da8d67e81f3ff05e651d929ff7cf))
- solve dumi-theme-graphin error ([4dd0d1c2](https://github.com/antvis/graphin/commit/4dd0d1c2434fadd33dcf4f1b2666b13d6bb5bed9))
- github ci ignore graphscope ([0cd8dcce](https://github.com/antvis/graphin/commit/0cd8dcce509d191cd49897d8468d597cbd2e3e28))
- add label shape parseAttr ([727011d1](https://github.com/antvis/graphin/commit/727011d1e74dc3be7220328279bb9f92283db2af))
- add toolbar files ([94a13734](https://github.com/antvis/graphin/commit/94a13734fcf798f0fffe12ef6c006a97140bb9f9))
- graphin-comonent build ([cf93d3f6](https://github.com/antvis/graphin/commit/cf93d3f613f74a87941b64aa59ae9043f7bf3556))
- update graphin-component build problem ([ffac2ab5](https://github.com/antvis/graphin/commit/ffac2ab53dde2a5d006dde6ac26203c6dfa6493a))
- update graphscope eslint ([703cb4be](https://github.com/antvis/graphin/commit/703cb4be4a928c0c6930e0d71df78367c716e9d5))
- graphscope build problem ([db2367d6](https://github.com/antvis/graphin/commit/db2367d68892e3a66c4f1690e468ce336003dada))
- update entry file ([edc5c6e5](https://github.com/antvis/graphin/commit/edc5c6e5848e4e71b7259666b9fb7090ec68c747))
- update edge types file ([b36bea06](https://github.com/antvis/graphin/commit/b36bea060514877b5d7498b7770668cf2282b19f))
- add graphin-line type ([45e55205](https://github.com/antvis/graphin/commit/45e5520512af27bb8ad7e0e3dbaad80b4eda5e85))
- update edge types file ([16d8dcad](https://github.com/antvis/graphin/commit/16d8dcad95b18cbd85ce4ee311301015e62c45f3))
- update G6 & add node example ([3f1285c9](https://github.com/antvis/graphin/commit/3f1285c928b22e84e1e1c84c978a9add50ab5b08))
- add edge style types support parallel & animation ([ab6abe60](https://github.com/antvis/graphin/commit/ab6abe60a138bc34008154bb1e2d7f3db105798e))
- update type file path ([c0922eda](https://github.com/antvis/graphin/commit/c0922eda287cb34fc2895b48388dd15daad7b05c))
- update mirror action ([a38b4ad8](https://github.com/antvis/graphin/commit/a38b4ad80fe05364e8dc5c0ad308ad4c961f2478))
- **components:**
  - fix less-loader version ([e7a76496](https://github.com/antvis/graphin/commit/e7a76496f3c8fc1af048d90aa5648326a0c9299e))
  - fix url ([8b33ac5d](https://github.com/antvis/graphin/commit/8b33ac5deffd9b8fdf066083ab390ebd758361d3))
  - fix components ([80a4963e](https://github.com/antvis/graphin/commit/80a4963e3419ce135d9c3e8f9157aa7a4d8bce66))
  - fix index.d.ts path ([cf0f99c8](https://github.com/antvis/graphin/commit/cf0f99c81177f94c1676e3c93d0fc10baafb27a0))
- **graphin:**
  - fix eslint error ([f3e35db4](https://github.com/antvis/graphin/commit/f3e35db461bf35da056b27bd1e0ab78764b7ea5c))
  - fix typing error ([075781a3](https://github.com/antvis/graphin/commit/075781a38cd7182514197229fc81eb4ad0fd9049))
  - fix graphin typing error ([158a94a0](https://github.com/antvis/graphin/commit/158a94a0e47977916e32e265ea23a1a62f9f2f3e))
  - deep merge defaultStyle ([a49b928b](https://github.com/antvis/graphin/commit/a49b928be2671031a99a6a7a1dd512537cab4d9f))
  - deep merge defaultStyle ([a79bba82](https://github.com/antvis/graphin/commit/a79bba823794e5437bec65a726961e6d0ffd2eac))
  - fix highlight apis ([f26facf3](https://github.com/antvis/graphin/commit/f26facf352e58eeaef0df3be4147465056f9e156))
  - add GraphinContect type ([137f8f11](https://github.com/antvis/graphin/commit/137f8f11767b15ae52518cf41c9be5ecadf6fa33))
  - add prevOptions when layout init ([08a83422](https://github.com/antvis/graphin/commit/08a834220018f12186d92e516b4dcb234c1ab992))
- **style:** fix eslint error ([5e1debfc](https://github.com/antvis/graphin/commit/5e1debfc42d02cd7a9a12035a0e0e5cf219b8234))
- **component:** fix menu error ([c3d341b3](https://github.com/antvis/graphin/commit/c3d341b395c8e5243df94e78c445dc649bd12f77))

##### Other Changes

- //github.com/antvis/Graphin ([d4e18a57](https://github.com/antvis/graphin/commit/d4e18a57af6db883cacb9ff83704ae9c5111fc1e))
- fix eslint error and skip test ([63162f23](https://github.com/antvis/graphin/commit/63162f23c3f12d2d4548712367253b987ce06fa5))
- **graphin:**
  - update g6 latest version ([b6ab97df](https://github.com/antvis/graphin/commit/b6ab97df570cc41df6539197fc63f965336c34ec))
  - fix version to lerna bootstrap ([c9ec56a8](https://github.com/antvis/graphin/commit/c9ec56a8f3c41ca51e1add99a35a0290670eb91b))

##### Refactors

- **graphin:**
  - refactor graphin-circle update logic ([850199fa](https://github.com/antvis/graphin/commit/850199fa504e2be655e42cff7ae3ab5004765c5e))
  - add graphin-line shape ([8fc761b1](https://github.com/antvis/graphin/commit/8fc761b1e4da78d7e61b9778a3433348154dacdf))
  - remove old shape ([335012cf](https://github.com/antvis/graphin/commit/335012cf637354e7a078771493057e36c65db4bf))
- **site:** add gallery into site ([64c2ca03](https://github.com/antvis/graphin/commit/64c2ca032c049e8616d3372603a9443ed8234852))

##### Code Style Changes

- fix eslint error ([88082fe7](https://github.com/antvis/graphin/commit/88082fe79f66f8e8f392444b711e9f5336459ebc))
- **graphin:**
  - fix eslint error and skip test ([99ac99af](https://github.com/antvis/graphin/commit/99ac99af0281431b9e56fab00e8e9dc760b011c6))
  - fix eslint error ([228241ea](https://github.com/antvis/graphin/commit/228241ea4a220beb3e7c7e0355e012cd34a4f084))
  - fix eslint error ([6be9a4f2](https://github.com/antvis/graphin/commit/6be9a4f26b52d4f8400aaa5b337a201573cdc3cc))
  - fix graphin typing error ([5f6d389d](https://github.com/antvis/graphin/commit/5f6d389df0629c39b5e5a4232de4cbdf72a2135a))
  - adjust eslint rules ([969aac4c](https://github.com/antvis/graphin/commit/969aac4cf188d3959c61520d29f13cb1b53043d8))
  - adjust demos ([5f9eabf1](https://github.com/antvis/graphin/commit/5f9eabf1384de4954683e63c14c5bbdb83bd3bf4))
  - fix typing error ([d62768f5](https://github.com/antvis/graphin/commit/d62768f59d35e531fc8bff7a4cb56afd33c57bad))
  - remove dump code ([de9bac0e](https://github.com/antvis/graphin/commit/de9bac0eae255ac72a5da5098b4e1c45a76666c9))
- **eslint:** fix lint error ([e686afa8](https://github.com/antvis/graphin/commit/e686afa89a907d53d50ca640a2ab1b957d1005b1))

#### 2020-07-17

### Graphin v1.4.3

- **graphin:**
  - remove eslint error ([766a27cf](https://github.com/antvis/graphin/commit/766a27cf98785a969e778d5c0ea42985ec60e715))
  - fix tickInterval ([8da0543a](https://github.com/antvis/graphin/commit/8da0543a1eae0a33ea4e11ee7f1e7c1bdadaf66a))
- update docs and version ([c8cfd776](https://github.com/antvis/graphin/commit/c8cfd77685dc9737a3fe7248f9941c20593dabb2))
- fix force layout without animate ([6ab38e4d](https://github.com/antvis/graphin/commit/6ab38e4d6fd3a7e94d5f6267234ec85d7a309066))
- **components:** update version to 1.4.1 ([a6f31ab4](https://github.com/antvis/graphin/commit/a6f31ab482bfcddff739b8b4913313159aacd1ea))

##### Other Changes

- **common:**
  - fix typescript typing error ([f6d3ffbc](https://github.com/antvis/graphin/commit/f6d3ffbc9ce07550ce3cabec4694f66e6d1953d2))
  - export G6 from @antv/g6 ([9c17d292](https://github.com/antvis/graphin/commit/9c17d292aa10a891fc45c59f9e0b419a06250acf))

#### 2020-07-08

### Graphin v1.4.2

##### New Features

- **common:** export G6 from @antv/g6 ([fc6885e4](https://github.com/antvis/graphin/commit/fc6885e483517def815129dcac22708ac5c44589))

### Graphin v1.4.1

##### New Features

- **site:** add node combo static layout demo ([54faf117](https://github.com/antvis/graphin/commit/54faf117a9e985f05222d207ef7df4073142e12e))
- **components:** update version to 1.4.0 ([7cf8daf9](https://github.com/antvis/graphin/commit/7cf8daf9bcf856f8e97a0aeda5993cbdd37063c6))

##### Other Changes

- **common:**
  - fix poly edge display error when poly edge's count > 2 ([160ec2e5](https://github.com/antvis/graphin/commit/160ec2e5713261843d11c549aca2d0958e01f906))
  - fix label size issue in default cfg ([06cc99e2](https://github.com/antvis/graphin/commit/06cc99e2165fe4a8cfa119f5bd317ee93f98145d))
- **graphin:** fix ci ([eb56c951](https://github.com/antvis/graphin/commit/eb56c9510aa8f45d0f6abc444c9800ead19d93ae))

##### Code Style Changes

- **graphin:** remove console.log ([25c51ac6](https://github.com/antvis/graphin/commit/25c51ac607ca363fde563579500b4c8c34222678))

### Graphin v1.4.0

##### New Features

- **site:**
  - update some force layout ([2a037fb5](https://github.com/antvis/graphin/commit/2a037fb5464fd0fa5c495fed3924ae5350f929f5))
  - add combo example ([02a335b1](https://github.com/antvis/graphin/commit/02a335b1d81eee48edbace50a9f5fb454ee98b4b))
  - change event listener ([832cc2b3](https://github.com/antvis/graphin/commit/832cc2b366c785f001ffaf3d4378199968f56ad1))
  - Add legend component demo ([2fb07a23](https://github.com/antvis/graphin/commit/2fb07a23fc88bff87c020e6bea016fb2174f4e7d))
- **Graphin:** change shape to type for g6@3.5 ([8df002e9](https://github.com/antvis/graphin/commit/8df002e956341a6c3c3ca8c5c0f8226388477d08))
- **graphin:**
  - TODO mock combo data ([cd9a4eae](https://github.com/antvis/graphin/commit/cd9a4eaeb97c436192384cdca866d2eac3227539))
  - add combo feature ([3e7cec97](https://github.com/antvis/graphin/commit/3e7cec971014d4325585a2ac2c4640e86e62c724))
- **docs:** update Legend ([c59bc77d](https://github.com/antvis/graphin/commit/c59bc77d01610635d9974ee57f2785166decd811))
- **components:** Add Legend component ([3f452374](https://github.com/antvis/graphin/commit/3f4523740c4322b88513f735d59703ed6f15148d))
- release 1.0.6-beta ([5a9f21e4](https://github.com/antvis/graphin/commit/5a9f21e4665148c6c6d9118b0479a41f5e3706d9))

##### Bug Fixes

- **graphin:**
  - fix layout ([a4b5a1ef](https://github.com/antvis/graphin/commit/a4b5a1ef4ebc7d9e20a1ebbdd0af2332d444e12d))
  - add combo into data ([0e462478](https://github.com/antvis/graphin/commit/0e462478d1b5bdb1c001ea0ec9718f5ac38c4d5e))
  - fix types ([bc193e43](https://github.com/antvis/graphin/commit/bc193e43e06057328723cf04977592d832d768a2))
  - fix mock combo utils ([add85a64](https://github.com/antvis/graphin/commit/add85a64df1370c7991df562e71375d4dce43d01))

##### Other Changes

- v1.4.0 upgrade g6 version to 3.5 ([0d33bec2](https://github.com/antvis/graphin/commit/0d33bec29e85308af2490f0e841ee2da66f5d39b))
- add cursor pointer ([931e9dee](https://github.com/antvis/graphin/commit/931e9deec4782f8da8c0d390b5a2fd29ea7d7422))
- upgrading dependencies ([d844962c](https://github.com/antvis/graphin/commit/d844962c897945b07dab5ebecf03f1b9bc0fea04))
- **common:**
  - v1.3.0 ([dc167f4e](https://github.com/antvis/graphin/commit/dc167f4e851d3fbdac828096b5e38b69704800c2))
  - fix ts typing error after upgrade 3.5 ([2af719cc](https://github.com/antvis/graphin/commit/2af719cc540c0c81c47836bfd3065bf7bab392d1))
  - remove useless layout option for g6 degre layout ([2931dc2b](https://github.com/antvis/graphin/commit/2931dc2b4bc6d6503a0a312332ea26f3bcd30a89))
  - clear selected state brefore new node is selected ([77a0cc1a](https://github.com/antvis/graphin/commit/77a0cc1aaa64902ff6269c7e2ae30219232b277e))
  - fix line arrow direction after upgrade g6 ([b31d598b](https://github.com/antvis/graphin/commit/b31d598b16f38a476b6436361b4bd82c5e4c62c8))
  - close g6 local refresh to avoid clip ghost issue ([c7d470e5](https://github.com/antvis/graphin/commit/c7d470e5bb5862e0ffaf0cdb2096be94d581f72d))
  - upgrade inner shape to adopt g6 3.4 ([fe3893e1](https://github.com/antvis/graphin/commit/fe3893e13b70ee2636e93013cfee8f43724b2c47))
  - fix pointer center issue in layout after update g6 3.4 ([08c315c1](https://github.com/antvis/graphin/commit/08c315c1913bbc9f1d38626068cd7870ee9300c0))
  - replace shape by type in Node/Edge ([fbad8a89](https://github.com/antvis/graphin/commit/fbad8a89dcc6d4701c54f36334c061acf1bfee75))
  - upgrade clearItemStates api ([5f0d640d](https://github.com/antvis/graphin/commit/5f0d640de2c0fa0d46362f664165a012aee42dce))
  - upgrade @antv/g6 to 3.4 ([6bf439e6](https://github.com/antvis/graphin/commit/6bf439e628825b02a2f91b20c644c68573a55fc3))
  - fix ts error ([390fb4ec](https://github.com/antvis/graphin/commit/390fb4ec9798145a3dcc63207c1da93f2b93e553))
  - fix testing case ([17cf0f77](https://github.com/antvis/graphin/commit/17cf0f7786ca1e22d1d582569c4783e319d83832))
  - fix testing case which is broken after upgrading g6 to 3.3 ([b8b2102b](https://github.com/antvis/graphin/commit/b8b2102b0f92113339cfaa398006170def7ce732))
  - clean eslint warning ([9a51056a](https://github.com/antvis/graphin/commit/9a51056a778c52eed45efc46b274dfad96f942b2))
  - fix G Object is unknown issue ([e31f81c7](https://github.com/antvis/graphin/commit/e31f81c71ffbffd46a629e39fa2c6d31eb750a35))
  - fix typing error ([faf32663](https://github.com/antvis/graphin/commit/faf32663566e03cd74a8e9e64f14af8e223d2fba))
- **graphin:** change didupdate logic ([a1975c7b](https://github.com/antvis/graphin/commit/a1975c7b6ae66f282a6424a4c5519df3d83ab7e9))
- **upgrade:**
  - upgrade g6 type definition ([87645c5e](https://github.com/antvis/graphin/commit/87645c5e3943209329acc40d91bfcc9160e3a845))
  - update g6 to 3.4 ([bb8331c9](https://github.com/antvis/graphin/commit/bb8331c9902c9b6afb140de9cbf37d836fc6fb33))
  - upgrade g6 to 3.3.6 and upgrade ts definitions ([03eb7d18](https://github.com/antvis/graphin/commit/03eb7d18d1b4c648e1f60e9563910b4218c54d24))
  - upgrade @antv/g6 to ^3.3.5 ([a9d043fd](https://github.com/antvis/graphin/commit/a9d043fdc5136ab7bdf9ade932616b3e617ca728))

### Graphin v1.3.0

##### Other Changes

- **common:**
  - v1.3.0 ([dc167f4e](https://github.com/antvis/graphin/commit/dc167f4e851d3fbdac828096b5e38b69704800c2))
  - support poly edge ([d0d4ef7f](https://github.com/antvis/graphin/commit/d0d4ef7ffd0ae430ae75b631804a9c086e444765))
- feat(graphin) release version 1.2.2 ([1e93ddfb](https://github.com/antvis/graphin/commit/1e93ddfbdf5b47d2a4d62f6a0050c3f4e98ff81e))
- **upgrade:** upgrade prettier to 2.0 ([3a71fb9b](https://github.com/antvis/graphin/commit/3a71fb9bc42b06f59a71517ab542ef04af356331))
- **build:** add jest ts definite types ([1f947edc](https://github.com/antvis/graphin/commit/1f947edc9e054eacc96e9dacc93b0008eaefda4d))

### Graphin v1.2.2

##### Chores

- 🔀 add GitHub Action to sync Gitee ([79d9d937](https://github.com/antvis/graphin/commit/79d9d93769a9087fd170bb85126a90fc84e590dd))

##### New Features

- remove defaultNode and optimize code ([494328e0](https://github.com/antvis/graphin/commit/494328e090b006f9eca2a0dd1a81d3a64590763c))
- update deps ([15d72ab2](https://github.com/antvis/graphin/commit/15d72ab2f4e389fd67fbf80e7c9e1c6f3484a8c7))
- add style.nodeSize for mock utils ([7bff17b2](https://github.com/antvis/graphin/commit/7bff17b25183a4b2e7c2d4c2d3985d472637ff7f))
- add layout switching example ([4d9e0cb8](https://github.com/antvis/graphin/commit/4d9e0cb840078ed002706e9292f39b05c60c7f46))
- add risk knowledge graph case ([20ceff2f](https://github.com/antvis/graphin/commit/20ceff2f12058ce830eac12422cdd5e9102d3531))
- add graphin analysis case ([70c59e03](https://github.com/antvis/graphin/commit/70c59e033b090af53b2e9d503ce4e31212da2ad3))
- fix lerna npmclient ([902a6cf2](https://github.com/antvis/graphin/commit/902a6cf2928bfbd8c6548e799a9a3e7b3e8cfe7d))
- add tree for mock ([64909f67](https://github.com/antvis/graphin/commit/64909f677b0826339bb0cfe23f8d21d8d100f856))
- complete radial layout ([4abf3236](https://github.com/antvis/graphin/commit/4abf323646650cdbf2b461f6d0da0d7a557ee4ef))
- add simple Timebar demo ([98ffdae8](https://github.com/antvis/graphin/commit/98ffdae85c1303ce97adc2d1f5cb5fd2cf1495ee))
- Complete the demo of Toolbar and ContextMenu ([2557d6db](https://github.com/antvis/graphin/commit/2557d6dbfed478212576f9ea5894f04b3e070cd0))
- fix graphin options ([d0db5ca0](https://github.com/antvis/graphin/commit/d0db5ca0b79b5088b7b82885797cff7ef77fcadd))
- fix the preset layout ([9aca83e4](https://github.com/antvis/graphin/commit/9aca83e4fcfff04c9724598118ca6b8df94eb27b))
- Only arrow functions in the class can be packaged ([70c50c8b](https://github.com/antvis/graphin/commit/70c50c8bd7feb47a2e84c6b68ddb9552874dc335))
- add base layout example ([e892bf8a](https://github.com/antvis/graphin/commit/e892bf8a8d2b92b4cc48c6c39c81adc1a2b96635))
- **site:**
  - add force demo ([fa33d703](https://github.com/antvis/graphin/commit/fa33d7039110eb0a566752d77a0354effdc1ddaf))
  - add example/components ([777391b3](https://github.com/antvis/graphin/commit/777391b3ce630898c6e5c1de70054af451f59ccf))

##### Bug Fixes

- update npmClient ([e38808fd](https://github.com/antvis/graphin/commit/e38808fdd7ae047f4ab1c20a6292c8a4802ed2c6))
- replace tnpm with yarn to avoid ci error ([24682a8b](https://github.com/antvis/graphin/commit/24682a8b321861d8fe90eb2a8841b6d32ef3482e))
- support user defined property in date props ([49d0076f](https://github.com/antvis/graphin/commit/49d0076f77398caa520b36d6631daa8ca853c1b7))
- fetch data url ([988b580d](https://github.com/antvis/graphin/commit/988b580d955e702296ccd5293167fffa54a846cb))
- Support multiple behavior modes closes [#62](https://github.com/antvis/graphin/pull/62) ([f7f88968](https://github.com/antvis/graphin/commit/f7f8896829c8fd5c04c6698d73ed80acb9f201f6))
- **test:** graphin first render fragment should have only one child ([d3cfa49a](https://github.com/antvis/graphin/commit/d3cfa49a13579a3016d3a70267ee58cc95c49e87))
- **common:** update jest snapshot ([c78380e5](https://github.com/antvis/graphin/commit/c78380e5ce6b88b5cbd82d707a141720857e46c9))
- **site:** resolve style conflicts [#44](https://github.com/antvis/graphin/pull/44) ([3425139e](https://github.com/antvis/graphin/commit/3425139eef700a10723d5533424de5479fee001a))

##### Other Changes

- **common:**
  - Jest does not support ES module ([4beabd56](https://github.com/antvis/graphin/commit/4beabd56c79063f84b7063ea839f01685fbf7563))
  - uniform inner shape name ([f34af717](https://github.com/antvis/graphin/commit/f34af717b0cd7628ca0f24dd6428b6f799c4ed6d))
  - downgrade ts target to es2015 ([4967aba7](https://github.com/antvis/graphin/commit/4967aba71d5ea319edc7b5ae821ab7f5640060b0))
  - replace degre with badge and explore it to user ([df4c426b](https://github.com/antvis/graphin/commit/df4c426b00ea791ffa0599b4d1f4fbdc63d4132d))
  - fix inner shape label position and badge color ([f5f2f6f7](https://github.com/antvis/graphin/commit/f5f2f6f745b0ac55761d351fc293d9b310f02292))
  - new inner shape demo ([7abb7d11](https://github.com/antvis/graphin/commit/7abb7d11a78281ed0dc943ce8543783a7b9039e5))
  - update history change list ([bb908daa](https://github.com/antvis/graphin/commit/bb908daa56898a6784d83f3132392c52aeeda3fc))
  - add change log generator tool ([3abd8e3f](https://github.com/antvis/graphin/commit/3abd8e3f0a883ca2f21e85cf85e1067ef71bbf8c))
  - add change log generator tool ([57df91f7](https://github.com/antvis/graphin/commit/57df91f74b887b65dc7f4079dab4ad0547f9ed0c))
  - update edge label default color ([a1ded89e](https://github.com/antvis/graphin/commit/a1ded89ebdfbc464bbd6acbfc01b98831b6f307e))
  - adjust leabel position and label color ([365ab77b](https://github.com/antvis/graphin/commit/365ab77befca552ad3d5a80ee30024a93f6e8e24))
  - update dark style of graph studio shape ([faa9e7d2](https://github.com/antvis/graphin/commit/faa9e7d2c1aeac206974e956fe60ca3d48284818))
  - support user-defined layout option declaration ([40e9179b](https://github.com/antvis/graphin/commit/40e9179b1c4b28461f9bfb627a5e75da6ef1bd94))
  - fix behavior document ([9c863783](https://github.com/antvis/graphin/commit/9c8637831da9cddf10b6d3e14f494dca085d6e23))
  - opt tween animation of force layout in worker mode to make it more smoothly ([a07335b6](https://github.com/antvis/graphin/commit/a07335b6695a04fe8f80ac65c6f90daa97a1f184))
  - invalid data path ([cc617d0b](https://github.com/antvis/graphin/commit/cc617d0bb8aeca96f12734768b176d3041c4eb69))
  - new stub and point shape ([8cdc46a5](https://github.com/antvis/graphin/commit/8cdc46a545ae737be59cdfdd59b5e78ab1150c3e))
  - new hexagon shape ([901e9d9b](https://github.com/antvis/graphin/commit/901e9d9bdeb3566ae46778537710d17aae7f03fb))
  - new node/edge shape ([6b0cb8bd](https://github.com/antvis/graphin/commit/6b0cb8bda5f215cab3f77601543fa1f12f3c0672))
  - upgrade prettier to 2.0.2 to support ts optional chain ([c85e620e](https://github.com/antvis/graphin/commit/c85e620e5bb25ca882d78e9b802fd08179f96fcc))
  - update copyright ([f4cc64f6](https://github.com/antvis/graphin/commit/f4cc64f6e70ac66f0c4f472dd8c3f9556f895797))
  - replace graphin studio with graph studio ([0a5182aa](https://github.com/antvis/graphin/commit/0a5182aa1d6dbdc733b7ac05c617ba15b1535af7))
- antvis/Graphin into doc/graphin-shape-demo ([c52c7dab](https://github.com/antvis/graphin/commit/c52c7dab8cce5ada860c43c23a61f2cb00a34839))
- update to version 1.1.0-beta.1 ([4c0519d0](https://github.com/antvis/graphin/commit/4c0519d08827f9929767bd9d5403d2e86ea8affb))
- format code ([509a3ef9](https://github.com/antvis/graphin/commit/509a3ef90cc8952bcafb25e4e31d19f60feed8d3))
- update graphin-studio prettier config ([5e5ec40a](https://github.com/antvis/graphin/commit/5e5ec40acb79d117b0760bbf684cc74ed8845eec))
- find-connections and node-expand ([4a62c187](https://github.com/antvis/graphin/commit/4a62c1877c45711bfccad6c4b3e46f80290f38c9))
- update layout apis docs ([bc0af2f0](https://github.com/antvis/graphin/commit/bc0af2f0580943a29a7915a72fe03116ea78efde))
- add webworker for force layout ([53903091](https://github.com/antvis/graphin/commit/5390309107410f27d9e9b9d88579f6f92c984c68))
- fix full screen bugs ([50ca0ccc](https://github.com/antvis/graphin/commit/50ca0ccc640ad93070ccabe8b0fa02f12ea89094))
- demand loading antd for components ([5098991e](https://github.com/antvis/graphin/commit/5098991e36742f82e106be2e505dc3a64f324d4d))

### Graphin v1.0.5

##### New Features

- fix ci ([59b2fe2c](https://github.com/antvis/graphin/commit/59b2fe2cf54eda1b1860f70242bfb4670c300887))

##### Other Changes

- release graphon v1.0.5 ([e6888e1f](https://github.com/antvis/graphin/commit/e6888e1f95f0a62961b1411acf8cfe346fdc2400))
- release graphin-components v1.0.4 ([40148f7e](https://github.com/antvis/graphin/commit/40148f7e549ac920f3e0fb890801bd9b00aa5761))
- release graphin v1.0.4 ([a4263cd6](https://github.com/antvis/graphin/commit/a4263cd60e6855afe4a0636da452f719d641f09f))
- graphin v1.0.3 ([5d522dbe](https://github.com/antvis/graphin/commit/5d522dbec6d3d07e78c5a20c55a15180b5a72ab6))

### Graphin v1.0.3

##### Documentation Changes

- 🔍 Add algolia docsearchOptions ([c8b96a1e](https://github.com/antvis/graphin/commit/c8b96a1e7748eddceb8640f742a292cfd8631dda))
- fix example throw error ([f5222a0d](https://github.com/antvis/graphin/commit/f5222a0d0e150511ef262a6d4aa19e2f426a2e06))

##### New Features

- using shallow equal for should update for deps ([025ee503](https://github.com/antvis/graphin/commit/025ee503cf5a5c3f8cbec749a54b13ea89fdcac4))

##### Bug Fixes

- doc get started url ([442baa57](https://github.com/antvis/graphin/commit/442baa57ecfeaa74b52a48f2762d32d7da6f3271))

##### Other Changes

- add restartForceOnDrag flag in options ([fb706729](https://github.com/antvis/graphin/commit/fb706729d41a5d22af406ecb89897cb2c4dd4bf1))
- add umd bundle for graphin components and add umd install doc in readme ([23d3e46d](https://github.com/antvis/graphin/commit/23d3e46d24e5e96832cc665f04fd79899ba1f5ae))
- disable isZoomOptimize by default ([50fc0798](https://github.com/antvis/graphin/commit/50fc0798606fde7753d2018efb8fec730220e473))
- add id, source, target on data when check data ([591a705a](https://github.com/antvis/graphin/commit/591a705a23d405f1a0cc6f70257bf8f3ec93966a))
- remove useless file ([ec1b63d6](https://github.com/antvis/graphin/commit/ec1b63d65e7064d576badd0404f40fd2cfdd603e))
- format jsx file ([bf3bb100](https://github.com/antvis/graphin/commit/bf3bb10070097e1190c2ae5cc823e558fb18772a))
- add umd build for graphin ([2726fa63](https://github.com/antvis/graphin/commit/2726fa637e0be99eac7e47be13b8648470ca1cfb))
- fix doc typo ([29b58d87](https://github.com/antvis/graphin/commit/29b58d87c486d93baeef5e73a7da401105c662f2))
- format code with 2 spaces ([90996517](https://github.com/antvis/graphin/commit/90996517e797517d6a0ccc151eb9d00893b434b0))
- allow options.modes to be merge into g6 options ([1a8f1512](https://github.com/antvis/graphin/commit/1a8f151224d495275180c8e1cee845b85ef74401))
- 将 forceSimulation 的处理内置在 graphin，业务端不需要感知 ([cfb06a8e](https://github.com/antvis/graphin/commit/cfb06a8ed7e46825687e841c6e028073d7659aa9))
- remove forceSimulation before layout change ([466e67fe](https://github.com/antvis/graphin/commit/466e67fe60a9e169c1229af2423ba351e1a354d5))
- subgraph layout demo on site. ([4310001f](https://github.com/antvis/graphin/commit/4310001ffcd8e933bf7a770f933ecbdc9e5ad277))
- learn link graphin-site ([e160b0fa](https://github.com/antvis/graphin/commit/e160b0fa10de2bc9c1ae2f44aa01db753e4443cd))
- provide layout api's return type ([bc620591](https://github.com/antvis/graphin/commit/bc62059116278cf3d62acd5a9a587be665c5eee3))
- eslint is broken after upgrade to 2.19.1 ([ed4c867e](https://github.com/antvis/graphin/commit/ed4c867e5338b3b88b36018082640bd743062ab5))
- update deps version in graphin studio ([5dfd7c6a](https://github.com/antvis/graphin/commit/5dfd7c6aeaa67f34fc72d15c1e7b3d5c63bb2a01))
- fix graphin studio bundle config ([31ca2227](https://github.com/antvis/graphin/commit/31ca22275e918ecb0d865acbc6925733215956ba))
- move graphin to devDependencies ([0220fb35](https://github.com/antvis/graphin/commit/0220fb3540b7655c82a37f59e66bcc48efc66f96))
- modify gatsby.config.js ([af9b099f](https://github.com/antvis/graphin/commit/af9b099f2337a0c07f4e796e58d64cb3ee2a3d04))
- graphin examples ([94bca824](https://github.com/antvis/graphin/commit/94bca8247074fc6c9d41d8dd180a9b01da5abe23))
- modify the wrong word ([fd9f79cf](https://github.com/antvis/graphin/commit/fd9f79cf344d64a24c988f54f84b6abc6f84afa9))
- update readme.md ([23415f89](https://github.com/antvis/graphin/commit/23415f898aea842f6d80734d3cb010156824bbb8))
- add 红楼梦 case ([a8d0b10b](https://github.com/antvis/graphin/commit/a8d0b10b5ebf81af60bc611fd1c8e329a6b0e394))
- update docs for getting started ([ad34f9bb](https://github.com/antvis/graphin/commit/ad34f9bba4e447b125cb8852b034d0a4d923ebec))
- add examples ([859a081e](https://github.com/antvis/graphin/commit/859a081efe34df5bf92b1b95b94a9380041558b8))
- add label for Node type ([ba444e1e](https://github.com/antvis/graphin/commit/ba444e1ee20f5ec5b2644259dfcfa08acbb2b7f9))
- fix examples throw error ([a1b547a3](https://github.com/antvis/graphin/commit/a1b547a39053aaa88dba8a4820eb789081dc219e))
- add layout demo ([5615c67b](https://github.com/antvis/graphin/commit/5615c67b53a548d66f08d69300149ff1a8715625))
- add graphin-site/examples ([d3dfc810](https://github.com/antvis/graphin/commit/d3dfc810d4813165612d530690baefd56226db6f))

### Graphin 1.0.2

##### Other Changes

- update docs and update g6 version ([0878090a](https://github.com/antvis/graphin/commit/0878090af5f8c3e02b26a7ef07b07f6c928cd705))
- add DingTalk QR ([1236f5ca](https://github.com/antvis/graphin/commit/1236f5ca994d104f81eb63c8d7b2454a18580a4d))
- update en docs ([2189c43e](https://github.com/antvis/graphin/commit/2189c43e2239ff93cd30329e0d325182a0b9e648))
- update readme ([4ed7cc16](https://github.com/antvis/graphin/commit/4ed7cc166c608b874fe2ef27b7c37604a1e8d490))
- fix studio email node type icon ([5a604438](https://github.com/antvis/graphin/commit/5a604438c4dfe79b18a2210128ef7e035b0de83f))
- release graphin/1.0.1 ([3e724b43](https://github.com/antvis/graphin/commit/3e724b4362b76148932778eddfd42c0d29d98057))
- fix icon default value ([dde6585a](https://github.com/antvis/graphin/commit/dde6585ae47ac1453d89ffe900556e41fdd216fb))
- update codepen url in get started ([45b6c423](https://github.com/antvis/graphin/commit/45b6c423ad1ca27cb5fdef770cb3f7f83e2d0d60))
- fix ci ([20354818](https://github.com/antvis/graphin/commit/20354818f2e2cdaf5a56989baf9cbc17bc03f398))

### Graphin v1.0.0

##### Other Changes

- release graphin/v1.0.0 and graphin-components/v1.0.0 ([b72480d6](https://github.com/antvis/graphin/commit/b72480d6258f5b653fbb95379a79a03352781564))
- allow empty icon for circle shape ([18a42cb9](https://github.com/antvis/graphin/commit/18a42cb9a209aab86f49ac48bca76ebec248b73b))
- fix extend.icon issue ([ac2bb18f](https://github.com/antvis/graphin/commit/ac2bb18f64211619b48b6e616f1df47625e981f5))
- update readme ([dd9daff8](https://github.com/antvis/graphin/commit/dd9daff8899769afe333a0db2aaa80f9626f3a30))

### Graphin v1.0.0-beta.11

##### Bug Fixes

- iconfont extend issue ([01450a6e](https://github.com/antvis/graphin/commit/01450a6e5a243c7f186b55df94314ff2d27fa559))

### Graphin v1.0.0-beta.9

##### New Features

- **site:**
  - update theme version ([b1d48978](https://github.com/antvis/graphin/commit/b1d48978003682f431990a9b0fcc2a33a27f9218))
  - fix studio url ([e0baa43b](https://github.com/antvis/graphin/commit/e0baa43b56cd22993b913db607ff3638e27ce32f))
  - update docs ([731d9e94](https://github.com/antvis/graphin/commit/731d9e94f05760335045aa14356560b27b599fde))
  - add codesandbox ([d03ab393](https://github.com/antvis/graphin/commit/d03ab393ac7dfbd6b940a5fb6d043d70b854bd82))
  - update docs ([e40926d3](https://github.com/antvis/graphin/commit/e40926d30e4d16445b42688577395dd18e08f91a))
  - update english docs ([a1f0c39b](https://github.com/antvis/graphin/commit/a1f0c39b0f6a05ee8cc93ca9bb124520b65e7295))
  - update FAQ docs ([b1545ede](https://github.com/antvis/graphin/commit/b1545ede0c87280cbe64dac538d60ce4e754f0d0))
  - update home page ([d6a42bef](https://github.com/antvis/graphin/commit/d6a42bef3abf276bd50722d680b359000db2c1d8))
  - update docs codesandbox ([bd203c46](https://github.com/antvis/graphin/commit/bd203c46018094e66ceb3e65ec1da39ba000bc89))
- update doc ([714bf592](https://github.com/antvis/graphin/commit/714bf592814c0d25fc1aeda8ae77df989ca4e992))
- fix graphin studio webpack config ([ec40f4cf](https://github.com/antvis/graphin/commit/ec40f4cf7057453c81e116db3698b297724b5e27))
- update docs ([cbb7586d](https://github.com/antvis/graphin/commit/cbb7586d988b397b00159526f9e61a205edd2979))
- add antd icon for graphin ([950f0d66](https://github.com/antvis/graphin/commit/950f0d66b822bc984aa98b283a3d221ba9b0dac9))
- fix ci ([ce3426d9](https://github.com/antvis/graphin/commit/ce3426d954654c36855c916163b7d9f87945fca5))
- update readme ([0f7ed74e](https://github.com/antvis/graphin/commit/0f7ed74ee7be8a9e20248f715488bdd1c74e6015))
- tweak readme ([45bc8289](https://github.com/antvis/graphin/commit/45bc8289037946f089b99ff5728054a2e6c0ed4d))
- update graphin readme ([935c8942](https://github.com/antvis/graphin/commit/935c89422b51e2e11fcdaa3cc1f46002fa916398))
- update docs ([eee43fcd](https://github.com/antvis/graphin/commit/eee43fcd4354d9fb53be10f355bbbc3cebbbe1c4))
- fix ci ([58ccf55e](https://github.com/antvis/graphin/commit/58ccf55ede5dea0866411e686e55278faacf1897))
- fix all eslint errors ([7eba4394](https://github.com/antvis/graphin/commit/7eba43941030820fd239f54e273aaf1cb9b00982))
- set default force centripetalOptions ([9fdde7fd](https://github.com/antvis/graphin/commit/9fdde7fdc82f3de7de5e296b25566d6f68d1ef3c))
- fix mock type method ([c54484e4](https://github.com/antvis/graphin/commit/c54484e4e00866b7f7ae554c00dc477ae086b36d))
- update graphin components deps ([210cfcbd](https://github.com/antvis/graphin/commit/210cfcbd7f4a8fea195295afe8a1d74badff6b81))
- update graphin-components test ([6c403c80](https://github.com/antvis/graphin/commit/6c403c8078cbfad5f753aef8930e901073cce9ad))
- update ci ([c2fe0a2e](https://github.com/antvis/graphin/commit/c2fe0a2e524080cde3b4d785bb7110b3a0e924e1))
- setting up travis ci && update graphin icon font ([8c9aa2d0](https://github.com/antvis/graphin/commit/8c9aa2d0a47dc7ea59b09efc14ba670c779d77ee))
- update docs ([f37ed7c9](https://github.com/antvis/graphin/commit/f37ed7c90411a0aae74874d6efb327254fe145e2))
- update manual/main-concepts/layout.zh.md ([bd5f6616](https://github.com/antvis/graphin/commit/bd5f6616fad9c048502542856fdcf805bee50fe5))
- tweak studio webpack config ([f7a75f62](https://github.com/antvis/graphin/commit/f7a75f629fe7c8f47f7434a8b82084d385f88ed3))
- update bundling for studio ([1acb4f39](https://github.com/antvis/graphin/commit/1acb4f392db5be3d8245b68a39585ed7a882dbfa))
- update english docs ([03d1bc4e](https://github.com/antvis/graphin/commit/03d1bc4e107579fef99da7349c812a963dd017df))
- update searchbar ([6ab2f630](https://github.com/antvis/graphin/commit/6ab2f630dd8f3dac757c3a56d1a9e21a162e5c08))
- fix some bug ([7d21dc42](https://github.com/antvis/graphin/commit/7d21dc428ee15d791325aec600b529545c7c45e4))
- update docs ([b0a23b8f](https://github.com/antvis/graphin/commit/b0a23b8f04fd78d84d98c27f3d7f0c7399f53d88))
- update site home ([aaadc0db](https://github.com/antvis/graphin/commit/aaadc0db9210b91e7f8a17558d1558be221c8974))
- add english docs ([ae1c4fe9](https://github.com/antvis/graphin/commit/ae1c4fe9825e498b067d652dd786389753681e4d))
- update g6 version ([c8c7c0c7](https://github.com/antvis/graphin/commit/c8c7c0c7e8eed8e3093fd67fa3a17369a4794beb))
- update graphin version ([02bb7874](https://github.com/antvis/graphin/commit/02bb7874bba210f546a357d870731c5aa42b3e97))
- Fix the width and height of the initial layout ([97182b9b](https://github.com/antvis/graphin/commit/97182b9b42208a7abbc5f723f767ebdca0c2e267))
- update docs for api ([6418e798](https://github.com/antvis/graphin/commit/6418e798694463275a6b629a75d2dab1adeab208))
- add english docs ([04f57268](https://github.com/antvis/graphin/commit/04f57268f59b78316a0d4359c35efa20e1d8e772))
- update graphin version ([97f99595](https://github.com/antvis/graphin/commit/97f995957389d0d1dccfe0a6c97d31b2fc9e145f))
- add studio iframe ([e561182c](https://github.com/antvis/graphin/commit/e561182ca2fc585f10ea2a7be9e86c795c2682c0))
- add studio iframe ([62dc1cdc](https://github.com/antvis/graphin/commit/62dc1cdc3ab4c0729a4ec104fa91e03364b10c66))
- update docs ([49b11629](https://github.com/antvis/graphin/commit/49b11629540bdd92bde68ab328b85e8d6abf2167))
- update docs ([3fdcfd5f](https://github.com/antvis/graphin/commit/3fdcfd5fdd7441642d3459ed4cc587b7ccdf8a0f))
- test github webHooks ([e9841f4f](https://github.com/antvis/graphin/commit/e9841f4f7aefe77c2adfa043b0cd137bbec40acf))
- test github webHooks ([6234ad4a](https://github.com/antvis/graphin/commit/6234ad4ab1f5f102708c74ccb4a9b36f168e2ca5))
- update npmClient ([75ce7911](https://github.com/antvis/graphin/commit/75ce791167f730c4d75943baa1ba4d1c088ff436))
- update npmClient ([b402aa36](https://github.com/antvis/graphin/commit/b402aa36f389ae2807c535024950e1ef5949cccb))
- **studio:**
  - update build cli ([3a360bcb](https://github.com/antvis/graphin/commit/3a360bcbd69826bbdb6c00fbddd8b2de745a6bc7))
  - hidden operatorbar button ([fe4bd321](https://github.com/antvis/graphin/commit/fe4bd321824284985ddb34340918c044538c3bac))
- **graphin:**
  - add iconfont ([259e2b26](https://github.com/antvis/graphin/commit/259e2b26e1af65d37192d8b8e81f2fc007ecc472))
  - remove update method in compiler ([ec7bac64](https://github.com/antvis/graphin/commit/ec7bac646e258b152a96abc8938983a637ff77fe))
  - update readme ([b9c588c3](https://github.com/antvis/graphin/commit/b9c588c33f3a0a50884ad244f604a33355bf0104))

##### Bug Fixes

- remove compiler.update ([aeab8a6e](https://github.com/antvis/graphin/commit/aeab8a6ee5a4b840013f204e1a0a590a09f10505))
- update graphin test ([03aa50ae](https://github.com/antvis/graphin/commit/03aa50aed1ee43335ca3471a41f7e98334a84cc4))
- update graphin test ([b6f6afb5](https://github.com/antvis/graphin/commit/b6f6afb5e2e8441c66681219101b38f9039ae227))
- rename ci file ([6984d09c](https://github.com/antvis/graphin/commit/6984d09c3821db5f0400d5732dcc36c35b7402db))

##### Other Changes

- merge develop into master ([15d2e40c](https://github.com/antvis/graphin/commit/15d2e40cf79dcafe74aa7f49a8dd06b8b5ee50db))
- upgrade @antv/gatsby-theme-antv ([e24859e7](https://github.com/antvis/graphin/commit/e24859e7a33a2eeab8ddf668f3796066e7f13ab3))
- graphin.antv.vision ([a77f4d21](https://github.com/antvis/graphin/commit/a77f4d21fa114c4592c72652cdb135f25047aca5))
- //github.com/antvis/graphin into develop ([f31070f7](https://github.com/antvis/graphin/commit/f31070f79f28cf83d86a8001d11f353ba173b440))
- docz and d3 ([71a9381e](https://github.com/antvis/graphin/commit/71a9381e5ab648462806530aebab8778d87a00a2))
- **packages:**
  - initial packages ([5fb79a4d](https://github.com/antvis/graphin/commit/5fb79a4da556e24581d815e985d3efb36af17d14))
  - initial packages ([fe510c3d](https://github.com/antvis/graphin/commit/fe510c3d6a772c9a46439621635ef46e575606a6))

##### Code Style Changes

- fix studio iframe style ([7b27422c](https://github.com/antvis/graphin/commit/7b27422c793fc9680ee9ff8591917a923a047c4c))

### Graphin v1.0.0-beta.8

##### New Features

- test webHook ([73243364](https://github.com/antvis/graphin/commit/7324336419559f62d7f4829e6972123fb0de3f09))
- **graphin-site:** update docs for test ([adcbe568](https://github.com/antvis/graphin/commit/adcbe56833fa4f1d7eb4234c8a1600de61912727))
- **site:** add gatsby site ([c3bbe73f](https://github.com/antvis/graphin/commit/c3bbe73f57e867c9f3a4b7e949b994ca384b4157))

##### Other Changes

- init the repo ([623c2583](https://github.com/antvis/graphin/commit/623c25834352533a0e4a818569786a4c296db662))
