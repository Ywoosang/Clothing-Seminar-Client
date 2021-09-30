<template>
  <title-message/>
  <main>
    <article>
      <table>
          <language/>
        <thead>
          <tr>
            <td class="time"><span style="color: white">TIME</span></td>
            <td class="contents" colspan="6">
              <span style="color: white">CONFERENCE TIMELINE</span>
            </td>
            <td class="moderator">
              <span style="color: white">MODERATOR</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>9:30 - 9:45</td>
            <td colspan="6">Arrival(Allow for chat)</td>
            <td></td>
          </tr>
          <tr>
            <td>9:45 - 10:00</td>
            <td colspan="6">KSCIC 2021 소개영상</td>
            <td></td>
          </tr>
          <tr>
            <td>10:00 - 10:10</td>
            <td colspan="6">개회사와 환영 인사</td>
            <td>김지영<br />충북대학교</td>
          </tr>
          <tr>
            <td>10:10 - 11:10</td>
            <td class="contengit t-title">기조강연 1</td>
            <td class="content-speaker" colspan="3">
              공우석<br />경희대학교 교수
            </td>
            <td colspan="2">'지구와 공생하는 삶'</td>
            <td>최미영<br />덕성여자대학교</td>
          </tr>
          <tr>
            <td>11:10 - 11:40</td>
            <td class="content-title">특별주제강연 1</td>
            <td class="content-speaker" colspan="3">
              김미정<br />한양대학교 교수
            </td>
            <td colspan="2">
              '이공계 대학원생을 위한 Metaverse의 이해와 활용'
            </td>
            <td>최정욱<br />경희대학교</td>
          </tr>
          <tr>
            <td>11:40 - 11:50</td>
            <td class="content-title">연구윤리세미나</td>
            <td class="content-speaker" colspan="3">
              양희순<br />상명대학교 교수
            </td>
            <td colspan="2">'영어 논문을 위한 윤리세미나'</td>
            <td>김지영<br />충북대학교</td>
          </tr>
          <tr>
            <td>11:50 - 12:50</td>
            <td colspan="4">휴식</td>
            <td colspan="2">Virtual Tour : 2021 국제 KOSCO전</td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="2">12:50 - 13:30</td>
            <td class="content-title" rowspan="2">포스터세션</td>
            <td style="padding: 0" colspan="5">
              <div class="section">
                <div>복식사</div>
                <div>복식미학·패션디자인</div>
                <div>패션마케팅·심리</div>
                <div>의복구성·텍스타일·일반복식</div>
              </div>
            </td>

            <td rowspan="2">김영삼<br />중앙대학교</td>
          </tr>
          <tr>
            <td colspan="5">분야별 논문 포스터 발표 및 질의 응답</td>
          </tr>
          <tr>
            <td rowspan="2">13:30 - 14:50</td>
            <td class="content-title" rowspan="2">구두발표</td>
            <td colspan="2">복식사</td>
            <td>복식미학·패션디자인</td>
            <td>패션마케팅·심리</td>
            <td>의복구성·텍스타일·일반복식</td>
            <td rowspan="2"></td>
          </tr>
          <tr>
            <td>좌장</td>
            <td>최연우<br />단국대학교</td>
            <td>우주형<br />인하대학교</td>
            <td>박민정<br />이화여자대학교</td>
            <td>박진아<br />창원대학교</td>
          </tr>
          <tr>
            <td>14:50 - 15:00</td>
            <td colspan="6">휴식</td>
            <td></td>
          </tr>
          <tr>
            <td>15:00 - 15:50</td>
            <td class="content-title">특별주제강연 2</td>
            <td class="content-speaker" colspan="3">
              Alana Kennedy (Retail Transformation Manager at FARFETCH, UK.)<br />Minji
              Seo (Researcher, UAL, UK)<br />Soon Min Yoon (CEO of Viepa, Korea)
            </td>
            <td colspan="2">'글로벌 플랫폼의 패션스페셜리스트의 미래'</td>
            <td>정소진<br />경희대학교</td>
          </tr>
          <tr>
            <td>15:50 - 16:50</td>
            <td class="content-title">기조강연 2</td>
            <td class="content-speaker" colspan="3">
              Alessandra Vecchi (Reader, University of the Arts London, UK)
            </td>
            <td colspan="2">
              'Mapping the UK Fashion, Textiles and Technology Ecosystem'
            </td>
            <td>박주연<br />서울대학교</td>
          </tr>
          <tr>
            <td>16:50 - 17:20</td>
            <td colspan="6">우수논문 및 KOSCO 작품상 시상</td>
            <td>장남경<br />한세대학교</td>
          </tr>
          <tr>
            <td>17:20</td>
            <td colspan="6">폐회</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </article>
  </main>
</template>
<script>
import Language from './common/Language.vue';
import TitleMessage from './common/Title.vue';

export default {
    components : {Language,TitleMessage}
}
</script>
<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
}
table {
  position: relative;
  width: 85%;
  border: 1px solid;
  border-collapse: collapse;
  text-align: center;
  font-size: 0.9em;
  margin-top: 3em;
  margin-bottom: 3em;
  font-weight: 500;
}
thead {
  background-color: #787878;
}
td {
  border: 1px solid;
  padding: 8px 5px;
}
.time {
  width: 10%;
}
.contents {
  width: 75%;
}
.moderator {
  width: 15%;
}
.content-title {
  width: 13%;
}
.content-speaker {
  width: 23.5%;
}
.section {
  display: flex;
}
.section div:first-child {
  border-left: none;
}
.section div {
  flex: 1;
  border-left: 1px solid black;
  padding: 10px 0px;
}
.section .section-01 {
  flex: 1;
}
.section .section-02 {
  flex: 2;
}

@media all and (max-width: 767px) {
    article {
    padding: 0 5px;
  }
  table{
    width: 100%;
    margin-top: 4em;
  }
  td {
  font-size: 11px;
  word-break: break-all;
  }
}
</style>