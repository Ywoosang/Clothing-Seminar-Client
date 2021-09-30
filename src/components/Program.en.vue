<template>
  <title-message />
  <main>
    <article>
      <table>
        <language />
        <thead>
          <tr>
            <td class="time">
              <span style="color: white">TIME</span>
            </td>
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
            <td colspan="6">KSCIC 2021 Introduction Video</td>
            <td></td>
          </tr>
          <tr>
            <td>10:00 - 10:10</td>
            <td colspan="6">KSCIC 2021 Introduction Video</td>
            <td>
              Ji Young Kim
              <br />Chungbuk National Univ
            </td>
          </tr>
          <tr>
            <td>10:10 - 11:10</td>
            <td class="content-title">Keynote Talks 1</td>
            <td class="content-speaker" colspan="3">
              Woo Seok Kong
              <br />Professor, Kyung Hee Univ
            </td>
            <td colspan="2">'Homo symbiosis'</td>
            <td>
              Mi Young Choi
              <br />Duksung Women's Univ
            </td>
          </tr>
          <tr>
            <td>11:10 - 11:40</td>
            <td class="content-title">Special Topic Session 1</td>
            <td class="content-speaker" colspan="3">
              Mi Jeong Kim
              <br />Professor, Hanyang Univ
            </td>
            <td colspan="2">'Discourse on Metaverse for Graduate Students’ Understanding'</td>
            <td>
              Jeongwook Choi
              <br />Kyung Hee Univ
            </td>
          </tr>
          <tr>
            <td>11:40 - 11:50</td>
            <td class="content-title">Research Ethics Seminar</td>
            <td class="content-speaker" colspan="3">
              Heesoon Yang
              <br />Professor, Sangmyung Univ
            </td>
            <td colspan="2">'Research Ethics'</td>
            <td>
              Ji Young Kim
              <br />Chungbuk National Univ
            </td>
          </tr>
          <tr>
            <td>11:50 - 12:50</td>
            <td colspan="4">Break time</td>
            <td colspan="2">Virtual Tour: International KOSCO Exhibition 2021</td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="2">12:50 - 13:30</td>
            <td class="content-title" rowspan="2">Poster Session</td>
            <td style="padding: 0" colspan="5">
              <div class="section">
                <div
                  
                >History of Costume</div>
                <div
                   
                >Aesthetics·Fashion Design</div>
                <div
                  
                >Fashion Marketing·Psychology</div>
                <div>Clothing Construction·Textiles·General Costume</div>
              </div>
            </td>
            <td rowspan="2">
              Young Sam Kim
              <br />Chung-Ang Univ
            </td>
          </tr>
          <tr>
            <td colspan="5">Poster Presentation and Q&A</td>
          </tr>
          <tr>
            <td rowspan="2">13:30 - 14:50</td>
            <td class="content-title" rowspan="2">Oral Session</td>
            <td style="padding: 0" colspan="5">
              <div class="section">
                <div
                >History of Costume</div>
                <div
                >Aesthetics·Fashion Design</div>
                <div
                 
                >Fashion Marketing·Psychology</div>
                <div>Clothing Construction·Textiles·General Costume</div>
              </div>
            </td>
            <td rowspan="2"></td>
          </tr>
          <tr>
            <td style="padding: 0" colspan="5">
              <div class="section">
                <div class="section" style="padding: 0">
                  <div class="section-01">chair</div>
                  <div class="section-02">
                    Yeon Woo Choi
                    <br />Dankook Univ
                  </div>
                </div>
                <div>
                  Juhyung Woo
                  <br />Inha Univ
                </div>
                <div>
                  Minjung Park
                  <br />Ewha Womans Univ
                </div>
                <div>
                  Gin Ah Park
                  <br />Changwon National Univ
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>14:50 - 15:00</td>
            <td colspan="6">Break time</td>
            <td></td>
          </tr>
          <tr>
            <td>15:00 - 15:50</td>
            <td class="content-title">Special Topic Session 2</td>
            <td class="content-speaker" colspan="3">
              Alana Kennedy (Retail Transformation Manager at FARFETCH, UK.)
              <br />Minji
              Seo (Researcher, UAL, UK)
              <br />Soon Min Yoon (CEO of Viepa, Korea)
            </td>
            <td colspan="2">'The Future of Fashion Specialists on Global Platforms'</td>
            <td>
              Sojin Jung
              <br />Kyung Hee Univ
            </td>
          </tr>
          <tr>
            <td>15:50 - 16:50</td>
            <td class="content-title">Keynote Talks 2</td>
            <td
              class="content-speaker"
              colspan="3"
            >Alessandra Vecchi (Reader, University of the Arts London, UK)</td>
            <td colspan="2">'Mapping the UK Fashion, Textiles and Technology Ecosystem'</td>
            <td>
              Juyeon Park
              <br />Seoul National Univ
            </td>
          </tr>
          <tr>
            <td>16:50 - 17:20</td>
            <td colspan="6">Awards Ceremony</td>
            <td>
              Jang Nam Kyung
              <br />Hansei Univ
            </td>
          </tr>
          <tr>
            <td>17:20</td>
            <td colspan="6">Closing Remarks</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </article>
  </main>
</template>
<script>
import Language from "./common/Language.vue";
import TitleMessage from "./common/Title.vue";
export default {
  components: { Language, TitleMessage }
};
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
  /* font-weight: bold; */
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
  word-break:break-all;
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