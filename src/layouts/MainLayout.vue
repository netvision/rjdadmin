<script setup>
const openPdf = (file) => {
  const url = `https://api2.dalmiatrusts.in/reports/${file}`;
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = file; // The name of the file after download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <div class="bg-blue-2 q-pa-md">
        <q-toolbar>
          <q-img
            src="/logo.jpg"
            style="width: 120px; border: 10px solid #45a1f7; padding: 5px"
          />
          <q-toolbar-title
            class="text-black merriweather-regular text-uppercase text-h4 q-pt-md text-right"
            >Ramkrishna Jaidayal Dalmia Seva Sansthan</q-toolbar-title
          >
        </q-toolbar>
        <q-toolbar inset class="text-black text-right bg-blue-3 q-mt-md">
          <q-space />
          <q-btn stretch flat icon="home" to="/" />
          <q-separator dark vertical />
          <q-btn flat stretch label="About Us" to="about" />
          <q-separator dark vertical />
          <q-btn stretch flat label="Collaborators" to="collaborators" />
          <q-separator dark vertical />
          <q-btn stretch flat label="Activities" to="activities" />
          <q-separator dark vertical />
          <q-btn stretch flat label="Village Profiles" to="villages" />
          <q-separator dark vertical />
          <q-btn-dropdown stretch flat label="Reports">
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('General-Report-till-2015.pdf')"
              >
                <q-item-section>
                  <q-item-label>General Report upto 2015</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('Annual Report 2015-2016.pdf')"
              >
                <q-item-section>
                  <q-item-label>Annual Report upto 2015-16</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('Annual Report 2016-2017.pdf')"
              >
                <q-item-section>
                  <q-item-label>Annual Report upto 2016-17</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('Annual Report 2017-2018.pdf')"
              >
                <q-item-section>
                  <q-item-label>Annual Report upto 2017-18</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('Annual-Report-2018-19.pdf')"
              >
                <q-item-section>
                  <q-item-label>Annual Report upto 2018-19</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('Annual-Report-2019-20.pdf')"
              >
                <q-item-section>
                  <q-item-label>Annual Report upto 2019-20</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('Annual-Report-2020-21.pdf')"
              >
                <q-item-section>
                  <q-item-label>Annual Report upto 2020-21</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('Annual-Report-2021-22.pdf')"
              >
                <q-item-section>
                  <q-item-label>Annual Report upto 2021-22</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openPdf('Annual-report-2022-23.pdf')"
              >
                <q-item-section>
                  <q-item-label>Annual Report upto 2022-23</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
      <div class="row text-black text-center q-gutter-sm q-mb-sm">
        <div class="col bg-blue-grey-2 q-pa-sm">
          <div class="text-h5 text-left q-pa-sm">A Glimpse (Youtube)</div>
          <div class="video-responsive">
            <iframe
              width="100%"
              height="300"
              src="https://www.youtube.com/embed/qQYrQLpzb3k"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="col bg-blue-grey-2 q-pa-sm">
          <div class="text-h5 text-left q-pa-sm">Awards &amp; Recognitions</div>
          <div>
            <q-img src="ficci-award.jpg" />
          </div>
        </div>
        <div class="col bg-blue-grey-2 q-pa-sm">
          <div class="card-body">
            <div class="text-h5 text-left q-pa-sm">Contact Info</div>
            <address>
              <strong>Ramkrishna Jaidayal Dalmia Seva Sansthan</strong><br />
              Dalmia Sports Complex<br />
              Station Road<br />
              Chirawa - 333026<br />
              Phone: 01596-221109, 9928020502
            </address>
          </div>
        </div>
      </div>
    </q-page-container>
    <q-footer reveal class="bg-white">
      <div class="bg-blue-3 text-center q-pa-md">
        &copy; RKJDSS, Chirawa <q-btn stretch flat icon="login" to="/admin" />
      </div>
    </q-footer>
  </q-layout>
</template>
<style>
.merriweather-light {
  font-family: "Merriweather", serif;
  font-weight: 300;
  font-style: normal;
}

.merriweather-regular {
  font-family: "Merriweather", serif;
  font-weight: 400;
  font-style: normal;
}

.merriweather-bold {
  font-family: "Merriweather", serif;
  font-weight: 700;
  font-style: normal;
}

.merriweather-black {
  font-family: "Merriweather", serif;
  font-weight: 900;
  font-style: normal;
}

.merriweather-light-italic {
  font-family: "Merriweather", serif;
  font-weight: 300;
  font-style: italic;
}

.merriweather-regular-italic {
  font-family: "Merriweather", serif;
  font-weight: 400;
  font-style: italic;
}

.merriweather-bold-italic {
  font-family: "Merriweather", serif;
  font-weight: 700;
  font-style: italic;
}

.merriweather-black-italic {
  font-family: "Merriweather", serif;
  font-weight: 900;
  font-style: italic;
}
</style>
