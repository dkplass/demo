<template>
    <div>
      <h2 class="title">搜尋結果：{{ term }}</h2>
      <PostList>
        <PostItem v-for="post in searchResult" :post="post" :key="post.id"/>
      </PostList>
    </div>
  </template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import usePostStore from '../stores/post';
import PostItem from '../components/PostItem.vue';
import PostList from '../components/PostList.vue';

const postStore = usePostStore();
const searchResult = computed(() => postStore.searchResult);
const route = useRoute();
const term = computed(() => route.params.term);
</script>
  <style scoped>
  .title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 44px;
  }
  </style>
