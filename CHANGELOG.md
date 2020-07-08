#### 2020-07-08

### Graphin v1.4.2

##### New Features

* **common:**  export G6 from @antv/g6 ([fc6885e4](https://github.com/antvis/graphin/commit/fc6885e483517def815129dcac22708ac5c44589))

### Graphin v1.4.1

##### New Features

* **site:**  add node combo static layout demo ([54faf117](https://github.com/antvis/graphin/commit/54faf117a9e985f05222d207ef7df4073142e12e))
* **components:**  update version to 1.4.0 ([7cf8daf9](https://github.com/antvis/graphin/commit/7cf8daf9bcf856f8e97a0aeda5993cbdd37063c6))

##### Other Changes

* **common:**
  *  fix poly edge display error when poly edge's count > 2 ([160ec2e5](https://github.com/antvis/graphin/commit/160ec2e5713261843d11c549aca2d0958e01f906))
  *  fix label size issue in default cfg ([06cc99e2](https://github.com/antvis/graphin/commit/06cc99e2165fe4a8cfa119f5bd317ee93f98145d))
* **graphin:**  fix ci ([eb56c951](https://github.com/antvis/graphin/commit/eb56c9510aa8f45d0f6abc444c9800ead19d93ae))

##### Code Style Changes

* **graphin:**  remove console.log ([25c51ac6](https://github.com/antvis/graphin/commit/25c51ac607ca363fde563579500b4c8c34222678))

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
