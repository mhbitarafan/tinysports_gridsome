<template>
  <v-app>
    <div>
      <v-row
        justify="center"
        align="center"
        class="primary elevation-6"
      >
        <v-col
          cols=12
          xl=9
          class="py-0"
        >
          <v-app-bar
            class="primary"
            dark
            elevation="0"
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>
              <v-btn
                text
                large
                href="/"
                class="pa-2"
              >
                {{ $static.metadata.siteName }}
              </v-btn>
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-btn
              text
              href="http://v2.tinysports.ir/login"
              target="_self"
            >ورود</v-btn>
            <v-btn
              text
              href="http://v2.tinysports.ir/register"
              target="_self"
            >ثبت نام</v-btn>
          </v-app-bar>
        </v-col>
      </v-row>
    </div>
    <main class="fill-height py-4">
      <slot />
    </main>
    <v-footer dark>
        <span>Tinysports © 2019</span>
        <div class="flex-grow-1"></div>
        <span>
          Made with <v-icon
            color="red"
            small
          >mdi-heart</v-icon> by mhbitarafan
        </span>
      </v-footer>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    base: { target: "_blank", href: "/qqq" }
  }
};
</script>
<style>
@font-face {
  font-family: byekan;
  src: url("../assets/BYekan.woff2");
  font-weight: normal;
}
body {
  font-family: byekan, Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
