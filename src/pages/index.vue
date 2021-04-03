<template>
  <Page
    class="page">
    <vanProgress
      class="page-progress"
      slot="title"
      color="#7bccd6"
      :percentage="(1/8*100)"
      :show-pivot="false"
      stroke-width="8"
      />
      <div
        slot="right"
      >
        1/8
      </div>
    
    <div class="content">
      <vanTabs
        class="tabs-wrap"
        v-model="active"
        ref="vanTabs"
        animated>
        <vanTab>
          <div class="question">
            How old are you?
          </div>
        </vanTab>
        <vanTab>
        内容 2
        </vanTab>
        <vanTab>
        内容 3
        </vanTab>
        <vanTab>
        内容 4
        </vanTab>
      </vanTabs>
      <div class="answer">
        <AgePicker v-show="active==0"/>
      </div>
      <div
       class="bottom-btn"
       @click="next">
        Continue
      </div>
    </div>

  </Page>
</template>

<script>
  import Page from '../components/Page';
  import AgePicker from '../components/AgePicker';

  import {
    Tabs,
    Tab,
    Progress,
  } from 'vant';

  export default {
    name: 'index',
    components: {
      Page,
      AgePicker,
      'vanTabs': Tabs,
      'vanTab': Tab,
      'vanProgress': Progress,
    },
    mounted() {
      console.log(this.$refs.vanTabs);
    },
    data() {
      return {
        url: null,
        currentRate: 0,
        color: '#043365',
        rate: 9,
        time: 30 * 1000,
        showCountDown: false,
        chapter2: false,

        tabList: [],
        active: 0,
        // actImg,
        resultImg: '',

      };
    },
    computed: {
      text() {
        return '30';
      },
    },
    methods: {
      pageCreated() {
        this.getData();
        setTimeout(() => {
          this.color = '#ccc';
          this.chapter2 = true;
        }, 5000);
      },
      onClickCard(item) {
        console.log(item);
        this.$location.push('/main/');
      },
      next() {
        this.active += 1;
        // this.showCountDown = true;
      },
      getData() {
        this.tabList = [
          { text: 11 },
          { text: 21 },
        ];
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ a: 1 });
          }, 0);
        });


        // this.$api.card.getData().then(res => {
        //   console.log(res);
        // }).catch(() => {
        //   console.log('登录失败');
        // });
        // this.cardList = mockData.data.cardList;
      },
    },
  };
</script>

<style scoped lang="less">
#testimg {
  z-index: -1;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.page-progress {
  height: 20px;
  width: 100%;
}
.tabs-wrap {
  margin-top: -45px;
  // height: 100%;
}
.question {
  font-size: 20px;
  font-weight: 600;
  color: #535a60;
  padding-top: 15px;
  padding-left: 15px;
}
.answer {
  flex: 1;
}

.bottom-btn {
  @btnHeight: 48px;
  height: @btnHeight;
  line-height: @btnHeight;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  background-color: #7bccd6;
  border-radius: 24px;
  text-align: center;
  width: 75%;
  max-width: 300px;
  margin: 20px auto;
}
</style>
