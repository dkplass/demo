<template>
  <nav class="navbar">
    <!-- <router-link to="/"><img src="../assets/logo.svg" /></router-link> -->
    <h2>POST</h2>
    <div class="searchInput">
      <input type="text" @change="searchPosts"/>
      <TheIcon icon="search" />
    </div>
    <div class="navItems">
      <router-link to="/"><TheIcon icon="home" /></router-link>
      <button @click="publishPost()">
        <TheIcon icon="publish" />
      </button>
      <!-- dropdown -->
      <div class="profileDropDown">
        <TheAvatar
          :width="42"
          :height="42"
          style="cursor: pointer"
          @click="showDropdown = !showDropdown"
          :src="user?.avatar"
        />
        <div
          class="dropdownMenu"
          v-show="showDropdown"
          @click="showDropdown = false"
        >
          <ul class="profileMenu">
            <li><router-link to="/profile">個人頁面</router-link></li>
            <li @click="logout">登出</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import TheAvatar from './TheAvatar.vue';
import TheIcon from './TheIcon.vue';
import useMainStore from '../stores/main';
import useUserStore from '../stores/user';
import usePostStore from '../stores/post';

const store = useMainStore();
const userStore = useUserStore();
const postStore = usePostStore();
const router = useRouter();

const user = computed(() => userStore.user);

const showDropdown = ref(false);

function publishPost() {
  store.changeShowPostUpload(true);
}

async function searchPosts(e) {
  await postStore.searchPosts(e.target.value);
  router.push({
    name: 'search_result',
    params: {
      term: e.target.value,
    },
  });
}

async function logout() {
  await userStore.logoutUser();
  router.push('/login');
}
</script>
<style scoped>
.navbar {
  width: 90vw;
  height: 80px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}
.navbar svg {
  width: 38px;
  height: 38px;
}

.searchInput {
  position: relative;
}

.searchInput input {
  width: 100%;
  padding: 12px;
  padding-left: 36px;

  background: #f1f1f1;
  border-radius: 14px;
  border: none;
}

.searchInput > svg {
  position: absolute;
  left: 0;
  top: 11px;
  left: 12px;
}

.navItems {
  justify-self: end;
  display: flex;
  gap: 24px;
  align-items: center;
}

.navItems > button {
  border: none;
  background: none;
}

.profileDropDown {
  position: relative;
}

.profileMenu {
  position: absolute;
  width: max-content;
  padding: 24px 26px;
  list-style: none;
  background: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  right: 0;
  display: grid;
  row-gap: 18px;
  transform: translateY(18px);
}

.profileMenu::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  top: -12px;
  right: 10px;
  border-bottom: 12px solid white;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

.profileMenu a,
.profileMenu li {
  text-decoration: none;
  cursor: pointer;
}

.profileMenu a:visited {
  color: initial;
}
</style>
