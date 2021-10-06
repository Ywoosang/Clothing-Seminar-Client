<template>
  <div class="wrapper">
    <title-message />
    <main>
      <article>
        <div class="speaker">
          <div class="speaker-img">
            <img src="/img/welcome.png" />
            <p>President of KSC<br />Youngsun Yoo</p>
          </div>
          <div class="speaker-body">
            <p class="header" style="color: #5b9bd5">Welcome Message</p>
            <p class="en">
              Welcome to the 2021 International Conference on Korean Society of
              Costume (KSCIC)!
              <br />
              The 2021 conference title is ‘Fashion for Human, Peace and the
              Future’. This year’s KSCIC will be in Jeju and virtual.
              <br />
              KSCIC 2021 provides a forum for scholars from Korea, the UK, the
              US, China, Spain, Japan, and Italy to come together to share
              practical solutions to achieve the sustainable development goals
              of the fashion industry for the better future. There are two
              keynote lectures, Professor Woo Seok Kong's lecture ‘Homo
              symbiosis’, and Reader Alessandra Vecchi on a Uk fashion
              industry-led project, which focusses on delivering sustainable
              innovation within the entire fashion and textile supply chain.
              KSCIC 2021 provides two special topic session on the global
              fashion platform and metaverse, which are spotlighted as a future
              workplace of young fashion professional.
              <br />
              Korean Society of Costume (KSC) was founded in 1975 and holds
              international academic conferences every year. In KSCIC 2021, oral
              presentations and poster presentations will be held in four
              divisions consisting of ‘History of Costume’, ‘Aesthetics ·
              Fashion Design’, ‘Fashion Marketing · Psychology’, and ‘Clothing
              Construction · Textiles · General Costume’.
              <br />
              I hope you will have a useful and enjoyable day to Improve your
              research, and a real contribution to knowledge with the various
              programs prepared by KSCIC 2021.
            </p>
            <p class="ko">
              2021년 한국 복식학회 추계 국제 학술대회(KSCIC 2021)에 오신 것을
              환영합니다!
              <br />
              이번 학술대회는 ‘Fashion for Human, Peace and the Future (인간,
              평화, 미래를 위한 패션)’ 라는 주제로 Covid로 손상된 사람간의
              관계회복과 미래 삶에 대한 질적 가치를 조명하고자 합니다.
              <br />
              KSCIC 2021은 한국, 영국, 미국, 중국, 스페인, 일본, 이탈리아의
              학자들이 한자리에 모여 더 나은 미래를 위하여 패션 산업의
              지속가능한 발전 목표를 달성할 수 있는 실질적인 솔루션을 찾고자
              합니다. 이를 위하여 기조강연으로 미래생활의 본질적 가치를 지구와
              공생하는 삶에서 발견하고자 한 공우석 교수의 강연과 패션과 섬유
              공급망 내에서 지속가능한 혁신에 중점을 둔 5년간의 영국 패션산업
              주도 프로젝트에 관한 Alessandra Vecchi 교수의 강연이 있습니다.
              <br />
              또한 이번 KSCIC 2021에서는 패션을 전공하는 젊은이들의 꿈을 실현할
              수 있도록 미래 환경으로 떠오르고 있는 글로벌 패션 플랫폼과
              메타버스에 관한 2개의 스페셜 토픽 세션도 제공합니다.
              <br />
              한국복식학회(KSC)는 1975년 창립되어 매년 국제 학술 회의를 개최하고
              있습니다. 올해도 KSCIC 2021에서는 ‘복식사’, ‘복식미학 ·
              패션디자인’, ‘패션마케팅 · 심리’, ‘의복구성 · 텍스타일 ·
              복식일반’으로 구성되는 4개의 분과에서 구두 발표와 포스터 발표가
              진행됩니다.
              <br />
              KSCIC 2021가 준비한 다양한 프로그램으로 여러분의 연구와 지식
              증진에 실질적으로 도움되는 유익하고 즐거운 하루가 되시기를
              바랍니다.
            </p>
            <br />
             
          </div>
        </div>
         <zoom-button link="https://us06web.zoom.us/j/85364532741?pwd=VWFXTjQxRml3TzN5QXhLY29PTEl3QT09"></zoom-button>
      </article>
    </main>
    <img src="/img/background-logo.png" />
  </div>
</template>

<script>
import TitleMessage from "../components/common/Title.vue";
import ZoomButton from '../components/common/ZoomButton.vue';
export default {
  components: { TitleMessage,
  ZoomButton },
};
</script>


<style scoped>
.wrapper {
  flex: 1;
}
.wrapper > img {
  z-index: -1;
  position: absolute;
  bottom: 0;
left: 8vw;
  height: 80%;
}
article {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.speaker {
  width: 70%;
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
}
.speaker-img {
  flex: 1;
  margin-right: 3em;
}
.speaker-img img {
  width: 140px;
}
.speaker-img p {
  padding-top: 1rem;
  width: 140px;
  text-align: center;
}
.speaker-body {
  flex: 7;
}
.speaker-body .header {
  font-size: 2em;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 20px;
}
.speaker-body p {
  text-align: justify;
  font-size: 20px;
  line-height: 30px;
}
.speaker-body .ko {
  font-family: "Noto Sans KR", sans-serif;
}
.speaker-body .en {
  font-family: "Heebo", sans-serif;
  margin-bottom: 3rem;
}

@media (max-width: 767px) {
  main {
    margin-top: 3rem;
  }
  .speaker {
    flex-direction: column;
    width: 90%;
  }
  .speaker-img {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .speaker-img img {
    width: 160px;
  }
  .speaker-img p {
    width: 160px;
  }
  .speaker-body .header {
    font-size: 20px;
    font-weight: 800;
    margin-top: 0.9em;
    text-align: center;
  }
  
  .speaker-body p {
  text-align: justify;
  font-size: 11px;
  line-height: 20px;
}
}

@media (min-width: 768px) and (max-width: 1024px) {
  .speaker {
    width: 90%;
  }
  .speaker-img {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .speaker-img p {
    width: auto;
    margin: 0;
    text-align: center;
  }
}
</style>